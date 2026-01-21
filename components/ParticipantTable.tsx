'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, Trash2 } from 'lucide-react';

interface Participant {
  id: string;
  email: string;
  name: string;
  role: string | null;
  status: string;
  actionItems: Array<{ status: string }>;
  chatSessions: Array<{ id: string; type: string; status: string }>;
}

interface ParticipantTableProps {
  participants: Participant[];
  onDelete: (id: string) => void;
}

const statusStyles: Record<string, { label: string; variant: 'default' | 'secondary' | 'success' | 'warning' | 'info' | 'outline' }> = {
  PENDING: { label: 'Pending', variant: 'secondary' },
  TRAINING_COMPLETE: { label: 'Training Done', variant: 'info' },
  INTERVIEW_SENT: { label: 'Interview Sent', variant: 'warning' },
  INTERVIEW_DONE: { label: 'Interview Done', variant: 'success' },
  IN_PROGRESS: { label: 'In Progress', variant: 'info' },
  COMPLETED: { label: 'Completed', variant: 'success' },
};

export function ParticipantTable({ participants, onDelete }: ParticipantTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyLink = (sessionId: string) => {
    const url = `${window.location.origin}/chat/${sessionId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(sessionId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getInterviewSession = (participant: Participant) => {
    return participant.chatSessions.find((s) => s.type === 'INITIAL_INTERVIEW');
  };

  const getActionProgress = (participant: Participant) => {
    const total = participant.actionItems.length;
    const completed = participant.actionItems.filter((a) => a.status === 'COMPLETED').length;
    return total > 0 ? `${completed}/${total}` : '-';
  };

  if (participants.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No participants yet. Add participants to get started.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
          <TableHead className="text-right">Interview Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {participants.map((participant) => {
          const status = statusStyles[participant.status] || statusStyles.PENDING;
          const session = getInterviewSession(participant);

          return (
            <TableRow key={participant.id}>
              <TableCell className="font-medium">{participant.name}</TableCell>
              <TableCell>{participant.email}</TableCell>
              <TableCell>{participant.role || '-'}</TableCell>
              <TableCell>
                <Badge variant={status.variant}>{status.label}</Badge>
              </TableCell>
              <TableCell>{getActionProgress(participant)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {session && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyLink(session.id)}
                        title="Copy interview link"
                      >
                        {copiedId === session.id ? (
                          <span className="text-xs text-green-600">Copied!</span>
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <a
                        href={`/chat/${session.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="sm" title="Open interview">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(participant.id)}
                    className="text-destructive hover:text-destructive"
                    title="Remove participant"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
