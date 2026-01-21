'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/MetricCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users, TrendingUp, Target, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface AnalyticsData {
  overview: {
    totalLearners: number;
    interviewCompleted: number;
    withActionPlan: number;
    appliedSkills: number;
    adoptionRate: number;
    totalPrograms: number;
    activePrograms: number;
  };
  programMetrics: Array<{
    id: string;
    name: string;
    status: string;
    totalLearners: number;
    adoptionRate: number;
  }>;
}

const statusStyles: Record<string, { label: string; variant: 'secondary' | 'success' | 'info' | 'outline' }> = {
  DRAFT: { label: 'Draft', variant: 'secondary' },
  ACTIVE: { label: 'Active', variant: 'success' },
  COMPLETED: { label: 'Completed', variant: 'info' },
  ARCHIVED: { label: 'Archived', variant: 'outline' },
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics/overview')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Failed to load analytics</p>
      </div>
    );
  }

  const { overview, programMetrics } = data;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track training adoption across your organization.</p>
      </div>

      {/* Overall Adoption */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Overall Adoption Rate</CardTitle>
          <CardDescription>
            Percentage of learners who have applied skills from training
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <div className="text-5xl font-bold text-primary">{overview.adoptionRate}%</div>
            <div className="flex-1">
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${overview.adoptionRate}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                vs ~15% industry baseline for training transfer
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Learners"
          value={overview.totalLearners}
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          title="Interviews Completed"
          value={overview.interviewCompleted}
          icon={<Target className="h-5 w-5" />}
        />
        <MetricCard
          title="With Action Plan"
          value={overview.withActionPlan}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          title="Skills Applied"
          value={overview.appliedSkills}
          icon={<CheckCircle className="h-5 w-5" />}
        />
      </div>

      {/* Funnel */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Adoption Funnel</CardTitle>
          <CardDescription>
            Track learners through the post-training journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: 'Training Complete', value: overview.totalLearners },
              { label: 'Interview Completed', value: overview.interviewCompleted },
              { label: 'Action Plan Created', value: overview.withActionPlan },
              { label: 'Skills Applied', value: overview.appliedSkills },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className="w-40 text-sm font-medium">{step.label}</div>
                <div className="flex-1 h-8 bg-gray-100 rounded overflow-hidden">
                  <div
                    className="h-full bg-primary rounded transition-all duration-500"
                    style={{
                      width: `${overview.totalLearners > 0 ? (step.value / overview.totalLearners) * 100 : 0}%`,
                      opacity: 1 - i * 0.15,
                    }}
                  />
                </div>
                <div className="w-16 text-sm font-medium text-right">{step.value}</div>
                <div className="w-16 text-sm text-muted-foreground text-right">
                  {overview.totalLearners > 0
                    ? Math.round((step.value / overview.totalLearners) * 100)
                    : 0}
                  %
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* By Program */}
      <Card>
        <CardHeader>
          <CardTitle>By Program</CardTitle>
          <CardDescription>
            Adoption metrics for each training program
          </CardDescription>
        </CardHeader>
        <CardContent>
          {programMetrics.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No programs yet. Create a program to see metrics.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Program</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Learners</TableHead>
                  <TableHead className="text-right">Adoption</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {programMetrics.map((program) => {
                  const status = statusStyles[program.status] || statusStyles.DRAFT;
                  return (
                    <TableRow key={program.id}>
                      <TableCell>
                        <Link
                          href={`/programs/${program.id}`}
                          className="font-medium hover:text-primary"
                        >
                          {program.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{program.totalLearners}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${program.adoptionRate}%` }}
                            />
                          </div>
                          <span className="w-10">{program.adoptionRate}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
