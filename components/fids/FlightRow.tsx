'use client';

import { useEffect, useState } from 'react';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';
import type { Flight, FlightStatus } from '@/types';

interface FlightRowProps {
  flight: Flight;
  index: number;
}

const STATUS_BORDER_COLOR: Record<FlightStatus, string> = {
  'On Time':  '#00C2FF',
  'Boarding': '#E8C84A',
  'Departed': '#1A2D3D',
  'Delayed':  '#FF7A30',
  'Cancelled':'#FF3060',
};

export function FlightRow({ flight, index }: FlightRowProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevStatus, setPrevStatus] = useState(flight.status);

  // Currently animates the entire status badge as one unit
  // TODO: implement full split-flap animation for each character
  if (prevStatus !== flight.status) {
    setPrevStatus(flight.status);
    setIsAnimating(true);
  }

  useEffect(() => {
    if (!isAnimating) return;
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [isAnimating]);

  const isCancelled = flight.status === 'Cancelled';
  const isDeparted = flight.status === 'Departed';
  const borderColor = STATUS_BORDER_COLOR[flight.status];

  return (
    <div
      className={cn(
        'flight-row grid grid-cols-[100px_150px_1fr_80px_60px_60px_150px] items-center gap-x-4 py-3.5 text-sm border-b border-board-border transition-opacity',
        index % 2 === 0 ? 'bg-board-row' : 'bg-board-row-alt',
        isCancelled && 'opacity-40',
        isDeparted && 'opacity-50'
      )}
      style={{
        animationDelay: `${Math.min(index * 35, 700)}ms`,
        borderLeft: `3px solid ${borderColor}`,
        paddingLeft: '1.75rem',
      }}
    >
      <span className="font-bold tracking-[0.1em] text-white text-[13px]">
        {flight.flightNumber}
      </span>

      <span className="text-board-muted text-[11px] truncate tracking-wide">
        {flight.airline}
      </span>

      <span
        className={cn(
          'truncate text-[13px] font-medium tracking-wide',
          isCancelled ? 'line-through text-board-muted' : 'text-board-text'
        )}
      >
        {flight.destination}
      </span>

      <span className="tabular-nums text-center text-white text-[13px] font-bold tracking-widest">
        {flight.departureTime}
      </span>

      <span className="text-center text-board-muted text-[11px]">{flight.terminal}</span>

      <span className="text-center text-[13px] text-board-text">{flight.gate}</span>

      <div className={cn('split-flap-wrapper flex items-center gap-1', isAnimating && 'split-flap-char animating')}>
        <StatusBadge status={flight.status} />
        {flight.status === 'Delayed' && flight.delayMinutes && (
          <span className="text-[11px] tracking-wide" style={{ color: '#FF7A30' }}>
            +{flight.delayMinutes}m
          </span>
        )}
      </div>
    </div>
  );
}
