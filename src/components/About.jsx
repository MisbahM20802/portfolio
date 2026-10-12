import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_PARAGRAPHS, TECHNICAL_SKILLS, NON_TECHNICAL_SKILLS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

function SkillPiece({ skill, index }) {
  const pieceRef = useRef(null);

  useEffect(() => {
    // Floating up and down (subtle)
    gsap.to(pieceRef.current, {
      y: -1.5,
      duration: 3 + Math.random() * 2,
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
      rotateX: -y * 0.15,
      rotateY: x * 0.15,
      z: 15,
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(pieceRef.current, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      scale: 1,
      duration: 0.6,
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

export default function About() {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Section header removed so it stays perfectly still




      // Glide description from bottom as we scroll
      gsap.from('.about-text p', {
        opacity: 0,
        y: 100,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: 'top 95%',
          end: 'top 50%',
          scrub: 1.5,
        }
      });
      
      // Skills entrance
      gsap.from('.skill-piece', {
        opacity: 0,
        scale: 0.9,
        y: 20,
        stagger: { amount: 1.5, from: 'random' },
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-skills-wrapper',
          start: 'top 80%',
        },
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about section" ref={sectionRef}>
      <div className="parallax-text parallax-text--about" aria-hidden="true">ABOUT & SKILLS</div>



      <div className="section-header about-header">
        <p className="small-text">03 — ABOUT & EXPERTISE</p>
        <h2>About Me</h2>
      </div>

      <div className="about-grid">
        {/* Left Side: About Text */}
        <div className="about-content">
          <div className="about-text" ref={textContainerRef}>
            {ABOUT_PARAGRAPHS.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>

        {/* Right Side: Skills */}
        <div className="about-skills-wrapper">
          <div className="skills-container tech-skills">
            <h3 className="skills-heading">Technical Focus</h3>
            <div className="skills-cloud">
              {TECHNICAL_SKILLS.map((skill, i) => (
                <SkillPiece key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>

          <div className="skills-container non-tech-skills">
            <h3 className="skills-heading">Non-Technical</h3>
            <div className="skills-cloud">
              {NON_TECHNICAL_SKILLS.map((skill, i) => (
                <SkillPiece key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
