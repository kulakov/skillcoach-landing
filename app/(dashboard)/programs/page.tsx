import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ProgramCard } from '@/components/ProgramCard';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen } from 'lucide-react';

export default async function ProgramsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.organizationId) {
    redirect('/login');
  }

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
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Programs</h1>
          <p className="text-muted-foreground">Manage your training programs and track adoption.</p>
        </div>
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
