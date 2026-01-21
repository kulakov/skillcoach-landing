import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Program, Participant, ActionItem } from '@prisma/client';

type ProgramWithParticipants = Program & {
  participants: (Participant & { actionItems: ActionItem[] })[];
};

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.organizationId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const programs: ProgramWithParticipants[] = await prisma.program.findMany({
    where: { organizationId: session.user.organizationId },
    include: {
      participants: {
        include: {
          actionItems: true,
        },
      },
    },
  });

  // Calculate overall metrics
  const totalLearners = programs.reduce((acc: number, p: ProgramWithParticipants) => acc + p.participants.length, 0);

  const interviewCompleted = programs.reduce(
    (acc: number, p: ProgramWithParticipants) =>
      acc +
      p.participants.filter((part: Participant) =>
        ['INTERVIEW_DONE', 'IN_PROGRESS', 'COMPLETED'].includes(part.status)
      ).length,
    0
  );

  const withActionPlan = programs.reduce(
    (acc: number, p: ProgramWithParticipants) =>
      acc + p.participants.filter((part: Participant & { actionItems: ActionItem[] }) => part.actionItems.length > 0).length,
    0
  );

  const appliedSkills = programs.reduce(
    (acc: number, p: ProgramWithParticipants) =>
      acc +
      p.participants.filter((part: Participant & { actionItems: ActionItem[] }) =>
        part.actionItems.some((a: ActionItem) => a.status === 'COMPLETED')
      ).length,
    0
  );

  const adoptionRate = totalLearners > 0 ? Math.round((appliedSkills / totalLearners) * 100) : 0;

  // Per-program metrics
  const programMetrics = programs.map((program: ProgramWithParticipants) => {
    const total = program.participants.length;
    const completed = program.participants.filter((p: Participant & { actionItems: ActionItem[] }) =>
      p.actionItems.some((a: ActionItem) => a.status === 'COMPLETED')
    ).length;

    return {
      id: program.id,
      name: program.name,
      status: program.status,
      totalLearners: total,
      adoptionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  });

  return NextResponse.json({
    overview: {
      totalLearners,
      interviewCompleted,
      withActionPlan,
      appliedSkills,
      adoptionRate,
      totalPrograms: programs.length,
      activePrograms: programs.filter((p: ProgramWithParticipants) => p.status === 'ACTIVE').length,
    },
    programMetrics,
  });
}
