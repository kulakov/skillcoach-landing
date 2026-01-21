'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ParticipantTable } from '@/components/ParticipantTable';
import { AddParticipantDialog } from '@/components/AddParticipantDialog';
import { AdoptionFunnel } from '@/components/AdoptionFunnel';
import { ArrowLeft, Play, Loader2, Settings } from 'lucide-react';

interface Program {
  id: string;
  name: string;
  description: string | null;
  trainingContext: string;
  companyContext: string | null;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
  participants: Array<{
    id: string;
    email: string;
    name: string;
    role: string | null;
    status: string;
    actionItems: Array<{ status: string }>;
    chatSessions: Array<{ id: string; type: string; status: string }>;
  }>;
}

const statusStyles = {
  DRAFT: { label: 'Draft', variant: 'secondary' as const },
  ACTIVE: { label: 'Active', variant: 'success' as const },
  COMPLETED: { label: 'Completed', variant: 'info' as const },
  ARCHIVED: { label: 'Archived', variant: 'outline' as const },
};

export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [program, setProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLaunching, setIsLaunching] = useState(false);
  const [error, setError] = useState('');

  const fetchProgram = async () => {
    try {
      const response = await fetch(`/api/programs/${params.id}`);
      if (!response.ok) {
        if (response.status === 404) {
          router.push('/programs');
          return;
        }
        throw new Error('Failed to fetch program');
      }
      const data = await response.json();
      setProgram(data);
    } catch {
      setError('Failed to load program');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgram();
  }, [params.id]);

  const handleLaunch = async () => {
    if (!program) return;
    setIsLaunching(true);
    setError('');

    try {
      const response = await fetch(`/api/programs/${program.id}/launch`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to launch program');
        return;
      }

      fetchProgram();
    } catch {
      setError('An error occurred');
    } finally {
      setIsLaunching(false);
    }
  };

  const handleDeleteParticipant = async (participantId: string) => {
    if (!confirm('Remove this participant?')) return;

    try {
      const response = await fetch(`/api/participants/${participantId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      fetchProgram();
    } catch {
      setError('Failed to remove participant');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Program not found</p>
          <Link href="/programs">
            <Button variant="link">Back to Programs</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate funnel data
  const funnelData = {
    trained: program.participants.length,
    interviewed: program.participants.filter((p) =>
      ['INTERVIEW_DONE', 'IN_PROGRESS', 'COMPLETED'].includes(p.status)
    ).length,
    planMade: program.participants.filter((p) => p.actionItems.length > 0).length,
    applied: program.participants.filter((p) =>
      p.actionItems.some((a) => a.status === 'COMPLETED')
    ).length,
  };

  const statusConfig = statusStyles[program.status];

  return (
    <div className="p-8">
      <Link
        href="/programs"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Programs
      </Link>

      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">{program.name}</h1>
            <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
          </div>
          {program.description && (
            <p className="text-muted-foreground">{program.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          {program.status === 'DRAFT' && (
            <Button onClick={handleLaunch} disabled={isLaunching || program.participants.length === 0}>
              {isLaunching ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Launch Program
            </Button>
          )}
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Training Context */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Training Context</CardTitle>
            <CardDescription>What was taught in this program</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{program.trainingContext}</p>
            {program.companyContext && (
              <>
                <h4 className="font-medium mt-4 mb-2">Company Context</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {program.companyContext}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Adoption Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Adoption Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <AdoptionFunnel data={funnelData} />
          </CardContent>
        </Card>
      </div>

      {/* Participants */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">
                Participants ({program.participants.length})
              </CardTitle>
              <CardDescription>
                Manage learners and track their progress
              </CardDescription>
            </div>
            <AddParticipantDialog programId={program.id} onAdd={fetchProgram} />
          </div>
        </CardHeader>
        <CardContent>
          <ParticipantTable
            participants={program.participants}
            onDelete={handleDeleteParticipant}
          />
        </CardContent>
      </Card>
    </div>
  );
}
