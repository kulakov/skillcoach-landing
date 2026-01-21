'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NewProgramPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    trainingContext: '',
    companyContext: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create program');
        return;
      }

      router.push(`/programs/${data.id}`);
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <Link
        href="/programs"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Programs
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Create Training Program</CardTitle>
          <CardDescription>
            Set up a new program to track post-training adoption.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Program Name</Label>
              <Input
                id="name"
                placeholder="e.g., Leadership Fundamentals Q1"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the training program..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trainingContext">
                Training Context
                <span className="text-destructive"> *</span>
              </Label>
              <Textarea
                id="trainingContext"
                placeholder="What was taught? Include frameworks, models, key concepts, expected behaviors...

Example: Feedback frameworks (SBI model), 1:1 meeting structure, coaching questions, difficult conversations, performance review preparation..."
                value={formData.trainingContext}
                onChange={(e) => setFormData({ ...formData, trainingContext: e.target.value })}
                rows={5}
                required
              />
              <p className="text-xs text-muted-foreground">
                This context helps the AI coach ask relevant questions about skill application.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyContext">Company Context (optional)</Label>
              <Textarea
                id="companyContext"
                placeholder="Company-specific language, priorities, tools, culture notes...

Example: We use Lattice for performance reviews. Quarterly feedback cycles. Value direct communication."
                value={formData.companyContext}
                onChange={(e) => setFormData({ ...formData, companyContext: e.target.value })}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Helps personalize conversations to your company culture.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Program
              </Button>
              <Link href="/programs">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
