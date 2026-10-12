import React, { useEffect, useState } from 'react';

const FIREFLY_COUNT = 14;

export default function Fireflies() {
  const [fireflies, setFireflies] = useState([]);

  useEffect(() => {
    // Generate static values once on mount to avoid React re-renders breaking the animation flow
    const generated = Array.from({ length: FIREFLY_COUNT }).map((_, i) => {
      // Natural distribution
      const positions = [
        { top: '15%', left: '10%' },
        { top: '25%', left: '75%' },
        { top: '55%', left: '85%' },
        { top: '45%', left: '25%' },
        { top: '75%', left: '50%' },
        { top: '10%', left: '85%' },
        { top: '65%', left: '15%' },
        { top: '80%', left: '80%' },
        { top: '35%', left: '15%' },
        { top: '85%', left: '30%' },
        { top: '20%', left: '50%' },
        { top: '50%', left: '60%' },
        { top: '60%', left: '95%' },
        { top: '30%', left: '40%' },
      ];
      
      const pos = positions[i];
      const duration = 50 + Math.random() * 40;       // 50-90s drift
      const glowDuration = 12 + Math.random() * 8;    // 12-20s breathe
      const delay = Math.random() * 15;               // Staggered start delay

      return {
        id: i,
        top: pos.top,
        left: pos.left,
        animationDelay: `${-delay}s`, // Negative delay so it's already running smoothly
        '--drift-duration': `${duration}s`,
        '--glow-duration': `${glowDuration}s`,
      };
    });
    setFireflies(generated);
  }, []);

  return (
    <div className="ambient-fireflies-container" aria-hidden="true">
      {fireflies.map((ff) => (
        <div
          key={ff.id}
          className={`ambient-firefly ambient-firefly--${ff.id}`}
          style={{
            top: ff.top,
            left: ff.left,
            animationDelay: ff.animationDelay,
            '--drift-duration': ff['--drift-duration'],
            '--glow-duration': ff['--glow-duration']
          }}
        >
          <div className="ambient-firefly-dot" style={{ animationDelay: ff.animationDelay }} />
        </div>
      ))}
    </div>
  );
}
