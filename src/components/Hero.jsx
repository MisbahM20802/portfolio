import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Fireflies from './Fireflies';

const DESCRIPTIONS = [
  "Turning ideas into digital experiences.",
  "Passionate about technology and creating meaningful solutions."
];

export default function Hero() {
  const textRef = useRef(null);
  const [displayText, setDisplayText] = useState('');
  const [descIndex, setDescIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentDesc = DESCRIPTIONS[descIndex];

    if (!isDeleting && displayText === currentDesc) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setDescIndex((prev) => (prev + 1) % DESCRIPTIONS.length);
      timeout = setTimeout(() => {}, 500);
    } else {
      const nextText = isDeleting
        ? currentDesc.substring(0, displayText.length - 1)
        : currentDesc.substring(0, displayText.length + 1);
        
      timeout = setTimeout(() => {
        setDisplayText(nextText);
      }, isDeleting ? 30 : 80);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, descIndex]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8, delay: 0.2 })
        .from('.hero-title', { y: 40, opacity: 0, duration: 1 }, '-=0.5')
        .from('.hero-description', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4');

      // Parallax text scroll
      gsap.to(textRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="hero-section section">
      <Fireflies />
      <div className="hero-content" ref={textRef}>
        <div style={{ background: 'transparent', boxShadow: 'none', border: 'none', padding: '0 20px' }}>
          <p className="hero-subtitle small-text" style={{ fontSize: '24px', letterSpacing: '4px', marginBottom: '10px' }}>HELLO, I'M</p>
          <h1 className="hero-title" style={{ fontSize: '110px' }}>Misbah</h1>
          <p className="hero-description description" style={{ fontSize: '20px', minHeight: '60px' }}>
            {displayText}<span className="cursor-blink">|</span>
          </p>
          <a href="#connect" className="glass-button hero-cta">
            Let's Connect
            <span className="button-arrow">→</span>
          </a>
        </div>
      </div>

      <div className="hero-glass-flower-wrapper">
         <img 
           src="/glass-flower.png" 
           alt="Decorative glass flower sculpture" 
           className="hero-flower-image"
         />
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span>scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
