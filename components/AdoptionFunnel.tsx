interface AdoptionFunnelProps {
  data: {
    trained: number;
    interviewed: number;
    planMade: number;
    applied: number;
  };
}

export function AdoptionFunnel({ data }: AdoptionFunnelProps) {
  const max = Math.max(data.trained, 1);

  const bars = [
    { label: 'Training Complete', value: data.trained, color: 'bg-gray-400' },
    { label: 'Interview Done', value: data.interviewed, color: 'bg-blue-400' },
    { label: 'Plan Created', value: data.planMade, color: 'bg-primary/70' },
    { label: 'Skills Applied', value: data.applied, color: 'bg-primary' },
  ];

  return (
    <div className="space-y-3">
      {bars.map((bar) => (
        <div key={bar.label} className="flex items-center gap-4">
          <div className="w-32 text-sm text-muted-foreground">{bar.label}</div>
          <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
            <div
              className={`h-full ${bar.color} rounded transition-all duration-500`}
              style={{ width: `${(bar.value / max) * 100}%` }}
            />
          </div>
          <div className="w-12 text-sm font-medium text-right">{bar.value}</div>
        </div>
      ))}
    </div>
  );
}
