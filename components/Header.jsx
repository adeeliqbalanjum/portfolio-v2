'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { asset, site } from '@/lib/site';

const navItems = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        menuRef.current,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.75, ease: 'power4.out' }
      );
      gsap.fromTo(
        menuRef.current.querySelectorAll('[data-menu-item]'),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.045, delay: 0.16, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects.slice(0, 5);

    return projects
      .filter((project) =>
        [project.title, project.industry, project.category, project.role, ...project.stack, ...project.highlights]
          .join(' ')
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 6);
  }, [query]);

  const closeAll = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a href={asset('/')} className="brand-mark" aria-label="Go to home">
          <span className="brand-symbol">AI</span>
          <span className="brand-copy">
            <strong>Muhammad Adeel Iqbal</strong>
            <small>WordPress / WooCommerce</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a href={asset(item.href)} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-button" onClick={() => setSearchOpen(true)} aria-label="Search">
            <span></span>
          </button>
          <a className="header-cta" href={asset('/#contact')}>
            Start a Project
          </a>
          <button
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <section className="mega-menu" ref={menuRef} aria-label="Expanded menu">
          <div className="mega-menu-top">
            <div className="menu-label" data-menu-item>
              Premium Portfolio Navigation
            </div>
            <button className="menu-close" onClick={() => setMenuOpen(false)} data-menu-item>
              Close
            </button>
          </div>

          <div className="mega-grid">
            <div className="mega-primary" data-menu-item>
              {navItems.map((item) => (
                <a href={asset(item.href)} key={item.href} onClick={closeAll}>
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mega-column" data-menu-item>
              <span className="mega-title">Services</span>
              {services.slice(0, 6).map((service) => (
                <a href={asset('/#services')} key={service.title} onClick={closeAll}>
                  {service.title}
                </a>
              ))}
            </div>

            <div className="mega-column" data-menu-item>
              <span className="mega-title">Case studies</span>
              {projects.slice(0, 6).map((project) => (
                <a href={asset(`/projects/${project.slug}/`)} key={project.slug} onClick={closeAll}>
                  {project.title}
                </a>
              ))}
            </div>

            <div className="mega-contact" data-menu-item>
              <span className="mega-title">Available for freelance work</span>
              <p>
                Premium WordPress websites, WooCommerce stores, booking systems, performance fixes,
                and conversion-focused redesigns.
              </p>
              <div className="mega-contact-actions">
                <a href={`mailto:${site.email}`}>Email</a>
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
                <a href={site.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href={site.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {searchOpen && (
        <section className="search-layer" aria-label="Search projects and services">
          <button className="search-backdrop" onClick={closeAll} aria-label="Close search"></button>
          <div className="search-panel">
            <div className="search-head">
              <span>Search</span>
              <button onClick={closeAll}>Close</button>
            </div>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search WordPress, WooCommerce, booking, healthcare, travel..."
            />
            <div className="search-tags">
              {['WordPress', 'WooCommerce', 'Figma', 'Booking', 'Healthcare', 'Travel', 'Speed'].map(
                (tag) => (
                  <button key={tag} onClick={() => setQuery(tag)}>
                    {tag}
                  </button>
                )
              )}
            </div>
            <div className="search-results">
              {searchResults.map((project) => (
                <a href={asset(`/projects/${project.slug}/`)} onClick={closeAll} key={project.slug}>
                  <strong>{project.title}</strong>
                  <span>{project.category} · {project.industry}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
