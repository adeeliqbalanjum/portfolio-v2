'use client';

import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (stored) setTheme(stored);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const goTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="header-wrap">
        <div className={`header-pill${scrolled ? ' scrolled' : ''}`}>
          <button className="header-brand" onClick={() => goTo('#hero')}>Adeel.</button>
          <nav className="header-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => goTo(link.href)}>{link.label}</button>
            ))}
          </nav>
          <div className="header-actions">
            <button className="header-icon-btn" onClick={toggleTheme} aria-label="Toggle theme">{theme === 'dark' ? '☀' : '☾'}</button>
            <button className="btn btn-primary btn-sm header-start-btn" onClick={() => goTo('#contact')}>Start Project</button>
            <button className={`hamburger-btn${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu"><span /><span /><span /></button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navLinks.map((link, index) => (
          <button key={link.href} onClick={() => goTo(link.href)}><span className="menu-num">0{index + 1}</span>{link.label}</button>
        ))}
      </div>
    </>
  );
}
