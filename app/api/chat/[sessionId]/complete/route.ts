import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { openai } from '@/lib/openai';
import { EXTRACT_ACTIONS_PROMPT } from '@/lib/prompts';
import { Message } from '@prisma/client';

export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const session = await prisma.chatSession.findUnique({
    where: { id: params.sessionId },
    include: {
      participant: true,
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  // Format conversation for extraction
  const conversation = session.messages
    .map((m: Message) => `${m.role}: ${m.content}`)
    .join('\n\n');

  try {
    // Extract action items using AI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: EXTRACT_ACTIONS_PROMPT.replace('{{messages}}', conversation),
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    const responseText = completion.choices[0].message.content || '[]';

    // Parse action items
    let actionItems: Array<{
      title: string;
      description?: string;
      suggestedDueDate?: string;
    }> = [];

    try {
      // Find JSON in response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        actionItems = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('Failed to parse action items:', e);
    }

    // Create action items in database
    if (actionItems.length > 0) {
      await prisma.actionItem.createMany({
        data: actionItems.map((item) => ({
          participantId: session.participant.id,
          title: item.title,
          description: item.description || null,
          dueDate: item.suggestedDueDate ? new Date(item.suggestedDueDate) : null,
        })),
      });
    }

    // Generate summary
    const summaryCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Summarize this coaching conversation in 2-3 sentences, focusing on what the employee committed to doing and any challenges they mentioned. Be concise.

CONVERSATION:
${conversation}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 200,
    });

    const summary = summaryCompletion.choices[0].message.content || '';

    // Update session
    await prisma.chatSession.update({
      where: { id: session.id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        summary,
      },
    });

    // Update participant status
    await prisma.participant.update({
      where: { id: session.participant.id },
      data: {
        status: actionItems.length > 0 ? 'INTERVIEW_DONE' : 'IN_PROGRESS',
      },
    });

    return NextResponse.json({
      success: true,
      actionItemsCreated: actionItems.length,
      summary,
    });
  } catch (error) {
    console.error('Complete session error:', error);
    return NextResponse.json(
      { error: 'Failed to complete session' },
      { status: 500 }
    );
  }
}
