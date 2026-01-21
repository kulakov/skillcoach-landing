import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.organizationId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify participant belongs to organization's program
  const participant = await prisma.participant.findFirst({
    where: { id: params.id },
    include: {
      program: {
        select: { organizationId: true },
      },
    },
  });

  if (!participant || participant.program.organizationId !== session.user.organizationId) {
    return NextResponse.json({ error: 'Participant not found' }, { status: 404 });
  }

  await prisma.participant.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
