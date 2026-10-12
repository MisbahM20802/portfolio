import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ContactCard = ({ type, title, subtitle, link, icon }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(cardRef.current, {
      rotateX: -y * 0.1,
      rotateY: x * 0.1,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  return (
    <a
      href={link}
      className={`contact-card glass-cuboid ${type}`}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="contact-card-inner">
        <div className="contact-icon">{icon}</div>
        <div className="contact-info">
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <div className="contact-arrow">→</div>
      </div>
      <div className="glass-highlight" />
    </a>
  );
};

export default function Connect() {
  const sectionRef = useRef(null);

  return (
    <section id="connect" className="connect section" ref={sectionRef}>
      <div className="section-header connect-header">
        <p className="small-text">04 — CONTACT</p>
        <h2>Connect With Me</h2>
      </div>

      <div className="contact-grid">
        <ContactCard
          type="email"
          title="EMAIL"
          subtitle="misbah20802@gmail.com"
          link="mailto:misbah20802@gmail.com"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
          }
        />

        <ContactCard
          type="linkedin"
          title="LINKEDIN"
          subtitle="Connect on LinkedIn"
          link="https://linkedin.com/in/misbah-m-04275232b/"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
          }
        />

        <ContactCard
          type="github"
          title="GITHUB"
          subtitle="Explore my code"
          link="https://github.com/MisbahM20802"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
          }
        />
      </div>
    </section>
  );
}
