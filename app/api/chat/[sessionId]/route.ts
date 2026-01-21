import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const session = await prisma.chatSession.findUnique({
    where: { id: params.sessionId },
    include: {
      participant: {
        include: {
          program: {
            select: {
              name: true,
              trainingContext: true,
              companyContext: true,
            },
          },
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

  return NextResponse.json(session);
}
