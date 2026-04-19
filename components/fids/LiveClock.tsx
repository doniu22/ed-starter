'use client';

import { useEffect, useState } from 'react';

export function LiveClock() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    function tick() {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hh}:${mm}:${ss}`);
      setDate(
        now.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
      );
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-right shrink-0">
      <div
        className="text-[52px] leading-none tracking-[0.04em] text-board-accent tabular-nums"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {time || '--:--:--'}
      </div>
      <div className="text-[10px] text-board-muted tracking-[0.25em] uppercase mt-1 text-right">
        {date || '--- -- --- ----'}
      </div>
    </div>
  );
}
