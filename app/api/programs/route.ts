import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createProgramSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  trainingContext: z.string().min(1, 'Training context is required'),
  companyContext: z.string().optional(),
});

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.organizationId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const programs = await prisma.program.findMany({
    where: { organizationId: session.user.organizationId },
    include: {
      participants: {
        select: {
          id: true,
          status: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(programs);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.organizationId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = createProgramSchema.parse(body);

    const program = await prisma.program.create({
      data: {
        ...data,
        organizationId: session.user.organizationId,
      },
    });

    return NextResponse.json(program);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Create program error:', error);
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 });
  }
}
