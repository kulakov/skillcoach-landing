import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, ArrowRight } from 'lucide-react';

interface ProgramCardProps {
  id: string;
  name: string;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
  participantCount: number;
  completedCount: number;
}

const statusStyles = {
  DRAFT: { label: 'Draft', variant: 'secondary' as const },
  ACTIVE: { label: 'Active', variant: 'success' as const },
  COMPLETED: { label: 'Completed', variant: 'info' as const },
  ARCHIVED: { label: 'Archived', variant: 'outline' as const },
};

export function ProgramCard({ id, name, status, participantCount, completedCount }: ProgramCardProps) {
  const statusConfig = statusStyles[status];
  const adoptionRate = participantCount > 0 ? Math.round((completedCount / participantCount) * 100) : 0;

  return (
    <Link href={`/programs/${id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{name}</CardTitle>
            <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>
                  {completedCount}/{participantCount}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${adoptionRate}%` }}
                  />
                </div>
                <span>{adoptionRate}%</span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
