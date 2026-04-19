'use client';

import { useEffect } from 'react';
import { FlightRow } from './FlightRow';
import { LiveClock } from './LiveClock';
import { useShallow } from 'zustand/react/shallow';
import { useFlightsStore, selectFilteredFlights } from '@/store/flightsStore';
import type { Flight, FlightStatus, Terminal } from '@/types';
import { ALL_AIRLINES, ALL_STATUSES, ALL_TERMINALS } from '@/types';

interface FlightBoardProps {
  initialFlights: Flight[];
}

export function FlightBoard({ initialFlights }: FlightBoardProps) {
  const { filters, setFilter, setFlights } = useFlightsStore();
  const flights = useFlightsStore(useShallow(selectFilteredFlights));

  useEffect(() => {
    setFlights(initialFlights);
  }, [initialFlights, setFlights]);

  return (
    <div className="min-h-screen bg-board-bg">
      {/* Header */}
      <header className="bg-board-header px-8 pt-8 pb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-board-accent to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-board-border" />

        <div className="flex items-end justify-between gap-6 max-w-[1400px] mx-auto">
          <div>
            <h1
              className="text-[80px] leading-none tracking-[0.06em] text-white uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Departures
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-[10px] text-board-muted tracking-[0.28em] uppercase">
                RunwayBriefing&nbsp;&nbsp;·&nbsp;&nbsp;Flight Information Display
              </p>
              <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-board-accent" aria-hidden="true" />
              <span className="text-[10px] text-board-accent tracking-[0.2em] uppercase opacity-60">Live</span>
            </div>
          </div>
          <LiveClock />
        </div>
      </header>

      {/* Filters */}
      <div className="bg-board-header border-b border-board-border px-8 py-3.5">
        <div className="flex flex-wrap gap-3 items-center max-w-[1400px] mx-auto">
          <span className="text-[9px] text-board-muted uppercase tracking-[0.3em] shrink-0">Filter</span>
          <div className="w-px h-3.5 bg-board-border" />

          <select
            value={filters.terminal}
            onChange={(e) => setFilter('terminal', e.target.value as Terminal | 'All')}
            className="bg-transparent border border-board-border text-board-text text-[11px] px-3 py-1.5 rounded-sm focus:outline-none focus:border-board-accent hover:border-board-muted transition-colors cursor-pointer"
          >
            <option value="All" className="bg-board-header">All Terminals</option>
            {ALL_TERMINALS.map((t) => (
              <option key={t} value={t} className="bg-board-header">{t}</option>
            ))}
          </select>

          <select
            value={filters.airline}
            onChange={(e) => setFilter('airline', e.target.value)}
            className="bg-transparent border border-board-border text-board-text text-[11px] px-3 py-1.5 rounded-sm focus:outline-none focus:border-board-accent hover:border-board-muted transition-colors cursor-pointer"
          >
            <option value="All" className="bg-board-header">All Airlines</option>
            {ALL_AIRLINES.map((a) => (
              <option key={a} value={a} className="bg-board-header">{a}</option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilter('status', e.target.value as FlightStatus | 'All')}
            className="bg-transparent border border-board-border text-board-text text-[11px] px-3 py-1.5 rounded-sm focus:outline-none focus:border-board-accent hover:border-board-muted transition-colors cursor-pointer"
          >
            <option value="All" className="bg-board-header">All Statuses</option>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s} className="bg-board-header">{s}</option>
            ))}
          </select>

          <input
            type="text"
            value={filters.destination}
            onChange={(e) => setFilter('destination', e.target.value)}
            placeholder="Destination..."
            className="bg-transparent border border-board-border text-board-text text-[11px] px-3 py-1.5 rounded-sm focus:outline-none focus:border-board-accent hover:border-board-muted transition-colors placeholder:text-board-muted"
          />

          <span className="ml-auto text-[11px] text-board-muted tabular-nums">
            <span className="text-board-accent font-bold">{flights.length}</span>
            {' '}flight{flights.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[100px_150px_1fr_80px_60px_60px_150px] gap-x-4 pl-[1.75rem] pr-8 py-2 text-[9px] text-board-muted uppercase tracking-[0.22em] border-b border-board-border bg-board-header max-w-[1400px] mx-auto w-full">
        <span>Flight</span>
        <span>Airline</span>
        <span>Destination</span>
        <span className="text-center">Departs</span>
        <span className="text-center">Term.</span>
        <span className="text-center">Gate</span>
        <span>Status</span>
      </div>

      {/* Flights */}
      <div className="max-w-[1400px] mx-auto w-full">
        {flights.length === 0 ? (
          <div className="px-8 py-24 text-center">
            <div
              className="text-5xl text-board-muted opacity-25 mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              No Flights Found
            </div>
            <p className="text-[10px] text-board-muted tracking-[0.3em] uppercase">
              No flights match the current filters
            </p>
          </div>
        ) : (
          flights.map((flight, i) => <FlightRow key={flight.id} flight={flight} index={i} />)
        )}
      </div>

      {/* Admin link */}
      <div className="fixed bottom-5 right-5">
        <a
          href="/admin"
          className="text-[9px] text-board-muted hover:text-board-accent transition-colors border border-board-border px-3 py-1.5 rounded-sm bg-board-header tracking-[0.2em] uppercase hover:border-board-accent"
        >
          Admin Panel →
        </a>
      </div>
    </div>
  );
}
