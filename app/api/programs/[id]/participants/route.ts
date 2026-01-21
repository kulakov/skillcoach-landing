import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const addParticipantSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(1, 'Name is required'),
  role: z.string().optional(),
});

export async function GET(
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
  });

  if (!program) {
    return NextResponse.json({ error: 'Program not found' }, { status: 404 });
  }

  const participants = await prisma.participant.findMany({
    where: { programId: params.id },
    include: {
      actionItems: true,
      chatSessions: {
        select: {
          id: true,
          type: true,
          status: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(participants);
}

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
  });

  if (!program) {
    return NextResponse.json({ error: 'Program not found' }, { status: 404 });
  }

  try {
    const body = await request.json();
    const data = addParticipantSchema.parse(body);

    // Check if participant already exists for this program
    const existing = await prisma.participant.findFirst({
      where: {
        email: data.email,
        programId: params.id,
      },
    });

    if (existing) {
      return NextResponse.json({ error: 'Participant already exists in this program' }, { status: 400 });
    }

    const participant = await prisma.participant.create({
      data: {
        ...data,
        programId: params.id,
      },
    });

    return NextResponse.json(participant);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Add participant error:', error);
    return NextResponse.json({ error: 'Failed to add participant' }, { status: 500 });
  }
}
