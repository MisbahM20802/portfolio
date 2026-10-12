import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Connect', href: '#connect' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleClick = () => setOpen(false);

  const toggleTheme = () => {
    const newMode = !isLightMode;
    setIsLightMode(newMode);
    if (newMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation">
        <a href="#home" className="logo" onClick={handleClick}>
          MISBAH
        </a>

        <button
          className={`nav-toggle${open ? ' active' : ''}`}
          onClick={() => setOpen((p) => !p)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>

        {/* Overlay for mobile */}
        {open && (
          <div className="nav-overlay" onClick={handleClick} aria-hidden="true" />
        )}

        <div className={`nav-links${open ? ' open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} onClick={handleClick}>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Glass Sliding Theme Switch - below navbar */}
      <div className="theme-switch-wrapper">
        <button className={`theme-slide-switch${isLightMode ? ' light-active' : ''}`} onClick={toggleTheme} aria-label="Toggle theme">
          <span className="theme-slide-label theme-slide-night">🌙 Night</span>
          <span className="theme-slide-label theme-slide-light">☀️ Light</span>
          <span className="theme-slide-knob" />
        </button>
      </div>
    </>
  );
}
