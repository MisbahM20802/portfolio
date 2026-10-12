import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TECHNICAL_SKILLS, NON_TECHNICAL_SKILLS } from '../constants';

function SkillPiece({ skill, index }) {
  const pieceRef = useRef(null);

  useEffect(() => {
    // Floating/bobbing effect independent of scroll
    gsap.to(pieceRef.current, {
      y: `random(-8, 8)`,
      x: `random(-4, 4)`,
      rotation: `random(-2, 2)`,
      duration: `random(3, 5)`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.1,
    });
  }, [index]);

  const handleMouseMove = (e) => {
    if (!pieceRef.current) return;
    const rect = pieceRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(pieceRef.current, {
      rotateX: -y * 0.25,
      rotateY: x * 0.25,
      z: 30,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(pieceRef.current, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={pieceRef}
      className="skill-piece glass-cuboid"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span>{skill.name}</span>
      <div className="glass-highlight" />
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Entrance animation for skill groups
      gsap.from('.tech-skills .skill-piece', {
        opacity: 0,
        scale: 0.8,
        y: 40,
        rotationX: 45,
        stagger: { amount: 1, from: 'random' },
        duration: 0.8,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.tech-skills',
          start: 'top 80%',
        },
      });

      gsap.from('.non-tech-skills .skill-piece', {
        opacity: 0,
        scale: 0.8,
        y: 40,
        rotationX: 45,
        stagger: { amount: 1, from: 'random' },
        duration: 0.8,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.non-tech-skills',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="skills section" ref={sectionRef}>
      
      <div className="skills-container tech-skills">
        <h3>Technical Skills</h3>
        <div className="skills-cloud">
          {TECHNICAL_SKILLS.map((skill, i) => (
            <SkillPiece key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>

      <div className="skills-container non-tech-skills">
        <h3>Non-Technical Skills</h3>
        <div className="skills-cloud">
          {NON_TECHNICAL_SKILLS.map((skill, i) => (
            <SkillPiece key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>

    </section>
  );
}
