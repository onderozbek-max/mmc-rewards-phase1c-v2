import { useState } from 'react';

export function Confetti() {
  const pieces = Array.from({ length: 26 }, (_, index) => index);

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          className="confetti-piece"
          key={piece}
          style={{
            left: `${(piece * 37) % 100}%`,
            animationDelay: `${(piece % 9) * 0.08}s`,
            backgroundColor: ['#0071dc', '#ffc220', '#2a8703', '#e91c24', '#6d3bbf'][piece % 5],
          }}
        />
      ))}
    </div>
  );
}

export function useCelebrationQueue<T>(items: T[]) {
  const [queue, setQueue] = useState(items);
  const current = queue[0];

  return {
    current,
    hasMore: queue.length > 0,
    dismiss: () => setQueue((remaining) => remaining.slice(1)),
  };
}
