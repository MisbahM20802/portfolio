import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const sectionRef = useRef(null);
  const [flippedId, setFlippedId] = useState(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Parallax section title
      gsap.to('.parallax-text--projects', {
        x: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      // Section header entrance
      gsap.from('.projects-header .small-text', {
        y: 40, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.projects-header', start: 'top 80%' },
      });
      gsap.from('.projects-header h2', {
        y: 50, opacity: 0, duration: 0.9,
        scrollTrigger: { trigger: '.projects-header', start: 'top 78%' },
      });

      // Staggered card entrance
      gsap.from('.project-card-wrapper', {
        y: 120,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.project-grid',
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects section" ref={sectionRef}>
      <div className="parallax-text parallax-text--projects" aria-hidden="true">PROJECTS</div>

      <div className="section-header projects-header">
        <p className="small-text">02 — WORK</p>
        <h2>My Projects</h2>
      </div>

      <div className="project-grid">
        {PROJECTS.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
            isFlipped={flippedId === project.id}
            onHover={() => setFlippedId(project.id)}
            onLeave={() => setFlippedId(prev => prev === project.id ? null : prev)}
          />
        ))}
      </div>
    </section>
  );
}
