import React from 'react';
import useHoverSound from '../hooks/useHoverSound';

export default function ProjectCard({ project, index, isFlipped, onHover, onLeave }) {
  const playClinkSound = useHoverSound();

  const handleMouseEnter = () => {
    playClinkSound();
    onHover();
  };

  const handleClick = (e) => {
    if (e.target.closest('.project-live-link')) return;
    playClinkSound();
    if (isFlipped) {
      onLeave();
    } else {
      onHover();
    }
  };

  return (
    <div 
      className="project-card-wrapper" 
      data-index={index}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave}
      onClick={handleClick}
    >
      <div className={`project-card-inner ${isFlipped ? 'flipped' : ''}`}>
        
        {/* FRONT FACE */}
        <div className="project-card-face project-card-front glass-cuboid">
          <span className="project-number">{project.number}</span>
          <h3>{project.name}</h3>
          <p className="project-category">{project.category}</p>
          <div className="project-front-desc">
            <p>{project.frontDescription}</p>
          </div>
          <div className="project-link-indicator">
            Explore Project <span>→</span>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="project-card-face project-card-back glass-cuboid">
          <div className="project-back-content">
            <h3>{project.name}</h3>
            <p className="project-description-full">{project.description}</p>
          </div>
          <a href={project.link} className="button project-live-link glass-cuboid" target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>

        {/* 3D THICKNESS SIDES */}
        <div className="project-card-edge edge-left glass-cuboid" />
        <div className="project-card-edge edge-right glass-cuboid" />
        <div className="project-card-edge edge-top glass-cuboid" />
        <div className="project-card-edge edge-bottom glass-cuboid" />
        
      </div>
    </div>
  );
}
