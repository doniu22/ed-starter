import { cn } from '@/lib/utils';
import type { FlightStatus } from '@/types';

const STATUS_CONFIG: Record<FlightStatus, { color: string; pulse: boolean }> = {
  'On Time':  { color: '#00C2FF', pulse: false },
  'Boarding': { color: '#E8C84A', pulse: true  },
  'Departed': { color: '#2A4055', pulse: false },
  'Delayed':  { color: '#FF7A30', pulse: false },
  'Cancelled':{ color: '#FF3060', pulse: false },
};

interface StatusBadgeProps {
  status: FlightStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { color, pulse } = STATUS_CONFIG[status];
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-bold', className)}
      style={{ color }}
    >
      <span
        className={cn('inline-block w-1.5 h-1.5 rounded-full shrink-0', pulse && 'boarding-pulse')}
        style={{ backgroundColor: color }}
      />
      {status}
    </span>
  );
}
