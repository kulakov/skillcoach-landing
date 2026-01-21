import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { MetricCard } from '@/components/MetricCard';
import { ProgramCard } from '@/components/ProgramCard';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, BookOpen, Plus } from 'lucide-react';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.organizationId) {
    redirect('/login');
  }

  // Fetch data
  const programs = await prisma.program.findMany({
    where: { organizationId: session.user.organizationId },
    include: {
      participants: {
        select: {
          status: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  // Calculate metrics
  const totalLearners = programs.reduce((acc: number, p: typeof programs[number]) => acc + p.participants.length, 0);
  const completedLearners = programs.reduce(
    (acc: number, p: typeof programs[number]) => acc + p.participants.filter((part: { status: string }) => part.status === 'COMPLETED').length,
    0
  );
  const adoptionRate = totalLearners > 0 ? Math.round((completedLearners / totalLearners) * 100) : 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome back, {session.user.name?.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your training programs.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Learners"
          value={totalLearners}
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          title="Adoption Rate"
          value={`${adoptionRate}%`}
          subtitle="vs 15% industry baseline"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          title="Active Programs"
          value={programs.filter((p: typeof programs[number]) => p.status === 'ACTIVE').length}
          icon={<BookOpen className="h-5 w-5" />}
        />
      </div>

      {/* Programs */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Active Programs</h2>
        <Link href="/programs/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Program
          </Button>
        </Link>
      </div>

      {programs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No programs yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first training program to start measuring impact.
          </p>
          <Link href="/programs/new">
            <Button>Create Program</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {programs.map((program: typeof programs[number]) => (
            <ProgramCard
              key={program.id}
              id={program.id}
              name={program.name}
              status={program.status}
              participantCount={program.participants.length}
              completedCount={
                program.participants.filter((p: { status: string }) => p.status === 'COMPLETED').length
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
