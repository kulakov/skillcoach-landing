import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { openai } from '@/lib/openai';
import { buildSystemPrompt } from '@/lib/prompts';
import { Message, ActionItem } from '@prisma/client';

export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const body = await request.json();
  const { content, isInit } = body as { content: string; isInit?: boolean };

  // Get session with related data
  const session = await prisma.chatSession.findUnique({
    where: { id: params.sessionId },
    include: {
      participant: {
        include: {
          program: true,
          actionItems: true,
        },
      },
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  if (session.status === 'COMPLETED' || session.status === 'EXPIRED') {
    return NextResponse.json({ error: 'Session is no longer active' }, { status: 400 });
  }

  let userMessage = null;

  // Only save user message if not init
  if (!isInit) {
    userMessage = await prisma.message.create({
      data: {
        chatSessionId: session.id,
        role: 'USER',
        content,
      },
    });
  }

  // Build conversation history
  const conversationHistory = session.messages.map((m: Message) => ({
    role: m.role.toLowerCase() as 'user' | 'assistant',
    content: m.content,
  }));

  if (!isInit) {
    conversationHistory.push({ role: 'user', content });
  }

  // Build system prompt based on session type
  const systemPrompt = buildSystemPrompt(
    session.type === 'INITIAL_INTERVIEW' ? 'INITIAL_INTERVIEW' : 'FOLLOWUP',
    {
      programName: session.participant.program.name,
      trainingContext: session.participant.program.trainingContext,
      companyContext: session.participant.program.companyContext,
      participantName: session.participant.name,
      participantRole: session.participant.role,
      previousSummary: session.summary,
      actionItems: session.participant.actionItems
        .map((a: ActionItem) => `- ${a.title} (${a.status})`)
        .join('\n'),
    }
  );

  // For initial message, add instruction to greet
  let messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemPrompt },
  ];

  if (isInit) {
    messages.push({
      role: 'user',
      content: `Start the conversation with a warm greeting to ${session.participant.name}. Ask how they're doing with applying what they learned.`,
    });
  } else {
    messages = [...messages, ...conversationHistory];
  }

  try {
    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";

    // Save AI response
    const assistantMessage = await prisma.message.create({
      data: {
        chatSessionId: session.id,
        role: 'ASSISTANT',
        content: aiResponse,
      },
    });

    // Update session status if first interaction
    if (session.status === 'PENDING') {
      await prisma.chatSession.update({
        where: { id: session.id },
        data: {
          status: 'IN_PROGRESS',
          startedAt: new Date(),
        },
      });

      // Update participant status
      await prisma.participant.update({
        where: { id: session.participant.id },
        data: { status: 'IN_PROGRESS' },
      });
    }

    return NextResponse.json({
      userMessage,
      assistantMessage: {
        id: assistantMessage.id,
        role: assistantMessage.role,
        content: assistantMessage.content,
        createdAt: assistantMessage.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
