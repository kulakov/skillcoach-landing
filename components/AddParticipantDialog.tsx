'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus, Upload } from 'lucide-react';

interface AddParticipantDialogProps {
  programId: string;
  onAdd: () => void;
}

export function AddParticipantDialog({ programId, onAdd }: AddParticipantDialogProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'single' | 'bulk'>('single');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Single participant
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  // Bulk import
  const [csvData, setCsvData] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setRole('');
    setCsvData('');
    setError('');
    setMode('single');
  };

  const handleSingleAdd = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`/api/programs/${programId}/participants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role: role || undefined }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to add participant');
        return;
      }

      resetForm();
      setOpen(false);
      onAdd();
    } catch {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkImport = async () => {
    setError('');
    setIsLoading(true);

    try {
      // Parse CSV
      const lines = csvData.trim().split('\n');
      const participants = lines
        .filter((line) => line.trim())
        .map((line) => {
          const [email, name, role] = line.split(',').map((s) => s.trim());
          return { email, name, role };
        })
        .filter((p) => p.email && p.name);

      if (participants.length === 0) {
        setError('No valid participants found. Format: email, name, role (one per line)');
        return;
      }

      const response = await fetch(`/api/programs/${programId}/participants/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participants }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to import participants');
        return;
      }

      resetForm();
      setOpen(false);
      onAdd();
    } catch {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) resetForm(); }}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Participant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Participants</DialogTitle>
          <DialogDescription>
            Add a single participant or import multiple from CSV.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mb-4">
          <Button
            variant={mode === 'single' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('single')}
          >
            <Plus className="h-4 w-4 mr-1" />
            Single
          </Button>
          <Button
            variant={mode === 'bulk' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('bulk')}
          >
            <Upload className="h-4 w-4 mr-1" />
            Bulk Import
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        {mode === 'single' ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="alex@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role (optional)</Label>
              <Input
                id="role"
                placeholder="Product Manager"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label>Paste CSV data</Label>
            <Textarea
              placeholder="email@company.com, Full Name, Role
another@company.com, Another Person, Manager"
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              rows={6}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Format: email, name, role (one participant per line)
            </p>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={mode === 'single' ? handleSingleAdd : handleBulkImport}
            disabled={isLoading || (mode === 'single' ? !name || !email : !csvData)}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === 'single' ? 'Add Participant' : 'Import'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
