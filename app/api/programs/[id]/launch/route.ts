import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Participant } from '@prisma/client';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.organizationId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify program belongs to organization
  const program = await prisma.program.findFirst({
    where: {
      id: params.id,
      organizationId: session.user.organizationId,
    },
    include: {
      participants: true,
    },
  });

  if (!program) {
    return NextResponse.json({ error: 'Program not found' }, { status: 404 });
  }

  if (program.participants.length === 0) {
    return NextResponse.json({ error: 'Add participants before launching' }, { status: 400 });
  }

  // Update program status
  await prisma.program.update({
    where: { id: params.id },
    data: { status: 'ACTIVE' },
  });

  // Create initial chat sessions for all pending participants
  const pendingParticipants = program.participants.filter(
    (p: Participant) => p.status === 'PENDING' || p.status === 'TRAINING_COMPLETE'
  );

  for (const participant of pendingParticipants) {
    // Create initial interview session
    await prisma.chatSession.create({
      data: {
        participantId: participant.id,
        type: 'INITIAL_INTERVIEW',
        status: 'PENDING',
      },
    });

    // Update participant status
    await prisma.participant.update({
      where: { id: participant.id },
      data: {
        status: 'INTERVIEW_SENT',
        trainingCompleted: new Date(),
      },
    });
  }

  return NextResponse.json({
    success: true,
    sessionsCreated: pendingParticipants.length,
  });
}
