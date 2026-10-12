import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Background from "./components/Background";
import CursorGlow from "./components/CursorGlow";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Connect from "./components/Connect";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="portfolio">
      <CursorGlow />
      <Background />
      <Navigation />

      <main>
        <Hero />
        <div className="section-divider" aria-hidden="true" />
        
        <Projects />
        <div className="section-divider" aria-hidden="true" />
        
        <About />
        <div className="section-divider" aria-hidden="true" />
        
        <Connect />
      </main>

      <footer>
        <span className="footer-copyright">© 2026 Misbah</span>
        <span className="footer-tagline">Turning ideas into digital experiences.</span>
      </footer>
    </div>
  );
}

export default App;