import { useEffect, useRef, useCallback } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);
  const mouse = useRef({ x: -600, y: -600 });
  const pos = useRef({ x: -600, y: -600 });
  const raf = useRef(null);

  const onMove = useCallback((e) => {
    mouse.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.07;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.07;
      if (glowRef.current) {
        glowRef.current.style.left = `${pos.current.x}px`;
        glowRef.current.style.top = `${pos.current.y}px`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [onMove]);

  return <div className="cursor-glow" ref={glowRef} aria-hidden="true" />;
}
