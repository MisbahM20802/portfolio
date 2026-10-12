import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const orbs = canvasRef.current?.querySelectorAll('.bg-orb');
      if (!orbs) return;

      const speeds = [0.15, -0.2, 0.1, -0.14, 0.18];
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          y: () => window.innerHeight * (speeds[i] || 0.1),
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.8,
          },
        });
      });
    }, canvasRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="bg-canvas" ref={canvasRef} aria-hidden="true">
        <div className="bg-grid" />
        <div className="bg-orb bg-orb--1" />
        <div className="bg-orb bg-orb--2" />
        <div className="bg-orb bg-orb--3" />
        <div className="bg-orb bg-orb--4" />
        <div className="bg-orb bg-orb--5" />
      </div>
      <div className="bg-noise" aria-hidden="true" />
    </>
  );
}
