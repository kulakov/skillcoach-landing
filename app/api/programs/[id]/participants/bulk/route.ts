import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
    const { participants } = body as { participants: Array<{ email: string; name: string; role?: string }> };

    if (!Array.isArray(participants) || participants.length === 0) {
      return NextResponse.json({ error: 'No participants provided' }, { status: 400 });
    }

    // Filter out invalid entries
    const validParticipants = participants.filter(
      (p) => p.email && p.name && typeof p.email === 'string' && typeof p.name === 'string'
    );

    if (validParticipants.length === 0) {
      return NextResponse.json({ error: 'No valid participants found' }, { status: 400 });
    }

    // Get existing participants
    const existingEmails = await prisma.participant.findMany({
      where: {
        programId: params.id,
        email: { in: validParticipants.map((p) => p.email.toLowerCase()) },
      },
      select: { email: true },
    });

    const existingSet = new Set(existingEmails.map((e: { email: string }) => e.email.toLowerCase()));

    // Filter out existing
    const newParticipants = validParticipants.filter(
      (p) => !existingSet.has(p.email.toLowerCase())
    );

    if (newParticipants.length === 0) {
      return NextResponse.json({
        created: 0,
        skipped: validParticipants.length,
        message: 'All participants already exist',
      });
    }

    // Create new participants
    const created = await prisma.participant.createMany({
      data: newParticipants.map((p) => ({
        email: p.email.toLowerCase(),
        name: p.name,
        role: p.role || null,
        programId: params.id,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({
      created: created.count,
      skipped: validParticipants.length - created.count,
      message: `Added ${created.count} participants`,
    });
  } catch (error) {
    console.error('Bulk import error:', error);
    return NextResponse.json({ error: 'Failed to import participants' }, { status: 500 });
  }
}
