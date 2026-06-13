'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import { services, processSteps, techStack } from '@/data/services';
import { asset, site } from '@/lib/site';

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Cases', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' }
];

const serviceTags = ['Figma to WordPress', 'WooCommerce', 'Booking websites', 'Performance', 'Custom PHP', 'GSAP motion'];
const heroTitle = 'Premium WordPress websites built to feel fast, polished, and ready to win clients.';

function ProjectImage({ project, className = '', eager = false }) {
  const src = project?.thumb || project?.image;

  if (!src) {
    return (
      <div className={`dx-fallback ${className}`}>
        <span>{project?.title || 'Project preview'}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={asset(src)}
      alt={`${project.title} website preview`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}

function AmbientBlobs({ className = '' }) {
  return (
    <div className={`dx-ambient ${className}`} aria-hidden="true">
      <span className="dx-blob dx-blob-one" />
      <span className="dx-blob dx-blob-two" />
      <span className="dx-blob dx-blob-three" />
      <span className="dx-blob dx-blob-four" />
    </div>
  );
}

export default function DigitalistsPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  });
  const rootRef = useRef(null);
  const menuRef = useRef(null);
  const searchRef = useRef(null);

  const featured = useMemo(() => projects.filter((project) => project.featured).slice(0, 8), []);
  const heroProject = featured[0] || projects[0];
  const showcaseProjects = featured.length ? featured : projects.slice(0, 8);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    const projectSource = q
      ? projects.filter((project) =>
          [project.title, project.industry, project.category, project.role, project.summary, ...project.stack, ...project.highlights]
            .join(' ')
            .toLowerCase()
            .includes(q)
        )
      : projects;

    const serviceSource = q
      ? services.filter((service) =>
          [service.title, service.eyebrow, service.description, ...service.points].join(' ').toLowerCase().includes(q)
        )
      : services;

    return {
      projects: projectSource.slice(0, 6),
      services: serviceSource.slice(0, 4)
    };
  }, [query]);


  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextTheme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : (prefersDark ? 'dark' : 'light');

    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
    setTheme(nextTheme);
  }, []);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem('portfolio-theme', nextTheme);
    setTheme(nextTheme);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let lenis;
    let rafId;
    let cursorRaf;
    const cleanups = [];

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.dx-preloader', { display: 'none' });
        gsap.set('.dx-reveal, .dx-scroll-case, .dx-scroll-device, .dx-scroll-title, .dx-index-row', { opacity: 1, y: 0, clearProps: 'transform' });
        return;
      }

      lenis = new Lenis({
        duration: 1.08,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.92,
        touchMultiplier: 1.25
      });

      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      gsap.set('.dx-pre-logo, .dx-pre-word, .dx-pre-meta span', { y: 20, opacity: 0 });
      gsap.set('.dx-header', { y: -22, opacity: 0 });
      gsap.set('.dx-hero-kicker, .dx-hero-title, .dx-hero-copy p, .dx-hero-actions, .dx-hero-proof, .dx-hero-visual', {
        y: 34,
        opacity: 0
      });

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .to('.dx-pre-meta span', { y: 0, opacity: 1, duration: 0.36, stagger: 0.05 })
        .to('.dx-pre-logo', { y: 0, opacity: 1, duration: 0.45 }, '-=0.18')
        .to('.dx-pre-word', { y: 0, opacity: 1, duration: 0.42, stagger: 0.055 }, '-=0.15')
        .to('.dx-pre-bar span', { scaleX: 1, duration: 0.58, ease: 'power3.inOut' }, '-=0.16')
        .to('.dx-preloader', { yPercent: -102, duration: 0.82, ease: 'power4.inOut' })
        .to('.dx-header', { y: 0, opacity: 1, duration: 0.52 }, '-=0.38')
        .to('.dx-hero-kicker, .dx-hero-title, .dx-hero-copy p, .dx-hero-actions, .dx-hero-proof, .dx-hero-visual', {
          y: 0,
          opacity: 1,
          duration: 0.78,
          stagger: 0.075,
          ease: 'power4.out'
        }, '-=0.18');

      gsap.to('.dx-progress-bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: 0.2 }
      });

      gsap.to('.dx-marquee-track', { xPercent: -50, repeat: -1, duration: 30, ease: 'none' });

      gsap.to('.dx-hero-card', {
        y: -24,
        rotate: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.dx-hero', start: 'top top', end: 'bottom top', scrub: true }
      });

      gsap.utils.toArray('.dx-reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.78,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 86%', once: true }
          }
        );
      });

      gsap.utils.toArray('.dx-scroll-case').forEach((caseItem) => {
        const device = caseItem.querySelector('.dx-scroll-device');
        const copy = caseItem.querySelector('.dx-scroll-title');
        const screen = caseItem.querySelector('.dx-scroll-device-screen');
        const image = caseItem.querySelector('.dx-scroll-image');

        if (!device) return;

        gsap.set(device, {
          transformPerspective: 1500,
          transformOrigin: 'center top',
          willChange: 'transform'
        });

        gsap.fromTo(
          copy,
          { y: 34, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: caseItem, start: 'top 88%', end: 'top 42%', scrub: 0.7 }
          }
        );

        const containerScroll = gsap.timeline({
          scrollTrigger: {
            trigger: caseItem,
            start: 'top 88%',
            end: 'bottom 22%',
            scrub: 1
          }
        });

        containerScroll
          .fromTo(
            device,
            { y: 96, scale: 0.78, rotateX: 20, rotateZ: -1.2, opacity: 0.78 },
            { y: 0, scale: 1, rotateX: 0, rotateZ: 0, opacity: 1, ease: 'none', duration: 0.56 }
          )
          .to(device, { y: -34, scale: 0.965, rotateX: -5, ease: 'none', duration: 0.44 });

        if (screen) {
          gsap.fromTo(
            screen,
            { boxShadow: '0 34px 90px rgba(5,5,5,.16)' },
            {
              boxShadow: '0 52px 130px rgba(5,5,5,.28)',
              ease: 'none',
              scrollTrigger: { trigger: caseItem, start: 'top 80%', end: 'center 34%', scrub: true }
            }
          );
        }

        if (image) {
          gsap.to(image, {
            yPercent: -9,
            scale: 1.045,
            ease: 'none',
            scrollTrigger: { trigger: caseItem, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
          });
        }
      });

      gsap.utils.toArray('.dx-process-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.72,
            delay: index * 0.035,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true }
          }
        );
      });

      if (hasFinePointer) {
        const cursor = document.querySelector('.dx-cursor');
        const dot = document.querySelector('.dx-cursor-dot');
        let pointerX = window.innerWidth / 2;
        let pointerY = window.innerHeight / 2;
        let cursorX = pointerX;
        let cursorY = pointerY;

        const moveCursor = (event) => {
          pointerX = event.clientX;
          pointerY = event.clientY;
          gsap.set(dot, { x: pointerX, y: pointerY });
        };

        const followCursor = () => {
          cursorX += (pointerX - cursorX) * 0.16;
          cursorY += (pointerY - cursorY) * 0.16;
          gsap.set(cursor, { x: cursorX, y: cursorY });
          cursorRaf = requestAnimationFrame(followCursor);
        };

        window.addEventListener('mousemove', moveCursor, { passive: true });
        cursorRaf = requestAnimationFrame(followCursor);
        cleanups.push(() => window.removeEventListener('mousemove', moveCursor));

        gsap.utils.toArray('.magnetic').forEach((element) => {
          const onMove = (event) => {
            const rect = element.getBoundingClientRect();
            const x = (event.clientX - rect.left - rect.width / 2) * 0.14;
            const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
            gsap.to(element, { x, y, duration: 0.25, ease: 'power3.out' });
          };
          const onLeave = () => gsap.to(element, { x: 0, y: 0, duration: 0.52, ease: 'elastic.out(1, 0.45)' });

          element.addEventListener('mousemove', onMove);
          element.addEventListener('mouseleave', onLeave);
          cleanups.push(() => {
            element.removeEventListener('mousemove', onMove);
            element.removeEventListener('mouseleave', onLeave);
          });
        });
      }
    }, rootRef);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      if (rafId) cancelAnimationFrame(rafId);
      if (cursorRaf) cancelAnimationFrame(cursorRaf);
      if (lenis) lenis.destroy();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : '';

    if (menuOpen && menuRef.current) {
      gsap.fromTo(menuRef.current, { yPercent: -100 }, { yPercent: 0, duration: 0.72, ease: 'power4.out' });
      gsap.fromTo(
        menuRef.current.querySelectorAll('[data-menu]'),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.64, stagger: 0.045, delay: 0.13, ease: 'power3.out' }
      );
    }

    if (searchOpen && searchRef.current) {
      gsap.fromTo(searchRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.28, ease: 'power2.out' });
      gsap.fromTo(
        searchRef.current.querySelector('.dx-search-panel'),
        { y: 22, scale: 0.98, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.42, ease: 'power3.out' }
      );
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, searchOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <main className="dx-site" id="home" ref={rootRef}>
      <div className="dx-progress" aria-hidden="true"><span className="dx-progress-bar" /></div>
      <div className="dx-cursor" aria-hidden="true" />
      <div className="dx-cursor-dot" aria-hidden="true" />

      <div className="dx-preloader" aria-hidden="true">
        <div className="dx-pre-meta"><span>Portfolio system</span><span>2026</span></div>
        <div className="dx-pre-logo">AI</div>
        <div className="dx-pre-copy">
          {['Polished', 'before', 'it', 'goes', 'live.'].map((word) => <span className="dx-pre-word" key={word}>{word}</span>)}
        </div>
        <div className="dx-pre-bar"><span /></div>
      </div>

      <header className={`dx-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="dx-brand" href={asset('/')} aria-label="Muhammad Adeel Iqbal home">
          <span className="dx-brand-mark">AI</span>
          <strong>Muhammad Adeel Iqbal</strong>
        </a>
        <nav className="dx-nav" aria-label="Primary navigation">
          {navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <div className="dx-actions">
          <button
            className="dx-round dx-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={theme === 'dark'}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
          </button>
          <button className="dx-round" onClick={() => setSearchOpen(true)} aria-label="Search projects and services">
            <span aria-hidden="true">⌕</span>
          </button>
          <a className="dx-start magnetic" href="#contact">Start</a>
          <button className="dx-menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
            <span /><span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <section className="dx-menu" ref={menuRef} aria-label="Expanded menu">
          <div className="dx-menu-top" data-menu>
            <span>Menu / Muhammad Adeel Iqbal</span>
            <button onClick={() => setMenuOpen(false)}>Close ×</button>
          </div>
          <div className="dx-menu-grid">
            <nav className="dx-menu-primary" data-menu>
              <a href="#home" onClick={closeAll}>Home</a>
              {navItems.map((item) => <a href={item.href} key={item.href} onClick={closeAll}>{item.label}</a>)}
            </nav>
            <div className="dx-menu-col" data-menu>
              <p>Services</p>
              {services.map((service) => <a href="#services" key={service.title} onClick={closeAll}>→ {service.title}</a>)}
            </div>
            <div className="dx-menu-col" data-menu>
              <p>Selected cases</p>
              {showcaseProjects.slice(0, 6).map((project) => (
                <a href={asset(`/projects/${project.slug}/`)} key={project.slug} onClick={closeAll}>CS / {project.title}</a>
              ))}
            </div>
            <div className="dx-menu-col dx-menu-contact" data-menu>
              <p>Start a project</p>
              <strong>Available for WordPress, WooCommerce, booking, and motion-focused frontend builds.</strong>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp {site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn profile ↗</a>
            </div>
          </div>
        </section>
      )}

      {searchOpen && (
        <section className="dx-search" ref={searchRef} aria-label="Search overlay">
          <button className="dx-search-backdrop" onClick={closeAll} aria-label="Close search" />
          <div className="dx-search-panel">
            <button className="dx-search-close" onClick={closeAll}>Close ×</button>
            <label htmlFor="portfolio-search">Search projects / services / stack</label>
            <input
              id="portfolio-search"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try WordPress, booking, travel, WooCommerce..."
            />
            <div className="dx-search-tags">
              {['Figma to WordPress', 'WooCommerce', 'Travel', 'Healthcare', 'Performance', 'Booking'].map((tag) => (
                <button type="button" key={tag} onClick={() => setQuery(tag)}>{tag}</button>
              ))}
            </div>
            <div className="dx-search-results">
              {searchResults.projects.map((project) => (
                <a href={asset(`/projects/${project.slug}/`)} onClick={closeAll} key={project.slug}>
                  <span>{project.category}</span>
                  <strong>{project.title}</strong>
                  <small>{project.industry}</small>
                </a>
              ))}
              {searchResults.services.map((service) => (
                <a href="#services" onClick={closeAll} key={service.title}>
                  <span>Service</span>
                  <strong>{service.title}</strong>
                  <small>{service.eyebrow}</small>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="dx-hero">
        <AmbientBlobs />
        <div className="dx-container dx-hero-grid">
          <div className="dx-hero-copy">
            <span className="dx-hero-kicker">Premium WordPress / WooCommerce / Motion</span>
            <h1 className="dx-hero-title">{heroTitle}</h1>
            <p>I turn Figma designs, approved references, and business ideas into fast, responsive, polished WordPress websites built for trust, leads, and conversion.</p>
            <div className="dx-hero-actions">
              <a className="dx-btn dx-btn-dark magnetic" href="#work">View Work</a>
              <a className="dx-btn dx-btn-orange magnetic" href="#contact">Start Project</a>
              <a className="dx-btn dx-btn-glass magnetic" href={asset(site.resume)} target="_blank" rel="noreferrer">Download Resume</a>
            </div>
            <div className="dx-hero-proof" aria-label="Portfolio proof points">
              <span>3+ years</span>
              <span>50+ projects</span>
              <span>WordPress-first builds</span>
            </div>
          </div>

          <div className="dx-hero-visual">
            <div className="dx-hero-card">
              <div className="dx-browser-bar"><span /><span /><span /><em>{heroProject.title}</em></div>
              <ProjectImage project={heroProject} eager />
              <div className="dx-floating-label top"><span>Live Website</span><strong>{heroProject.title}</strong></div>
              <div className="dx-floating-label mid"><span>WordPress Build</span><strong>{heroProject.category}</strong></div>
              <div className="dx-floating-label bottom"><span>Performance</span><strong>Fast, stable, polished</strong></div>
            </div>
          </div>
        </div>
        <a href="#services" className="dx-scroll-cue">Scroll ↓</a>
      </section>

      <section className="dx-marquee" aria-label="Technology stack">
        <div className="dx-marquee-track">
          {[...techStack, ...techStack].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
        </div>
      </section>

      <section className="dx-services dx-section" id="services">
        <AmbientBlobs className="dx-ambient-soft" />
        <div className="dx-container dx-services-grid">
          <aside className="dx-service-sidebar dx-reveal">
            <span className="dx-eyebrow">Services</span>
            <div className="dx-side-links">
              {services.map((service) => <a href="#contact" key={service.title}>→ {service.title}</a>)}
            </div>
            <div className="dx-metric-card">
              <strong>50+</strong>
              <span>Projects across travel, healthcare, B2B, HR, local services, booking flows, and WooCommerce builds.</span>
            </div>
          </aside>

          <div className="dx-services-main">
            <div className="dx-section-head dx-reveal">
              <span className="dx-eyebrow">What I build</span>
              <h2>Clean WordPress systems that feel premium before a visitor reads a single line.</h2>
              <p>Structure, spacing, responsive behavior, speed, conversion hierarchy, and the small motion details that make a site feel expensive.</p>
            </div>
            <div className="dx-service-cards">
              {services.map((service, index) => (
                <article className="dx-service-card dx-glass dx-reveal" key={service.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div>{service.points.map((point) => <em key={point}>{point}</em>)}</div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="dx-work dx-section" id="work">
        <AmbientBlobs />
        <div className="dx-container">
          <div className="dx-section-head dx-work-head dx-reveal">
            <span className="dx-eyebrow">Selected work</span>
            <h2>Case-study cards with more presence, movement, and conversion context.</h2>
            <p>Eight selected builds presented as premium editorial case studies instead of flat portfolio tiles.</p>
          </div>
          <div className="dx-scroll-case-stack">
            {showcaseProjects.map((project, index) => (
              <article className="dx-scroll-case" key={project.slug}>
                <div className="dx-scroll-title">
                  <span>{String(index + 1).padStart(2, '0')} / {project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="dx-tags">{project.stack.slice(0, 4).map((item) => <em key={item}>{item}</em>)}</div>
                  <div className="dx-case-actions">
                    <a className="magnetic" href={asset(`/projects/${project.slug}/`)}>View Case Study</a>
                    <a className="magnetic" href={project.liveUrl} target="_blank" rel="noreferrer">Live Site ↗</a>
                  </div>
                </div>

                <div className="dx-scroll-stage" aria-hidden="false">
                  <div className="dx-scroll-device dx-glass">
                    <div className="dx-scroll-device-top">
                      <div className="dx-device-dots" aria-hidden="true"><span /><span /><span /></div>
                      <strong>{project.title}</strong>
                      <em>{project.industry}</em>
                    </div>
                    <a className="dx-scroll-device-screen" href={asset(`/projects/${project.slug}/`)} aria-label={`View ${project.title} case study`}>
                      <ProjectImage project={project} className="dx-scroll-image" />
                    </a>
                    <div className="dx-scroll-device-footer">
                      <span>Container scroll case study</span>
                      <small>{project.category} / Live website</small>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dx-index dx-section" aria-label="Project index">
        <div className="dx-container">
          <div className="dx-index-head dx-reveal">
            <span className="dx-eyebrow">All cases</span>
            <h2>Project index</h2>
            <p>Quick scan of industries, build types, and live work. Hover a row to preview the project.</p>
          </div>
          <div className="dx-index-list">
            {projects.slice(0, 8).map((project, index) => (
              <a className="dx-index-row dx-reveal" href={asset(`/projects/${project.slug}/`)} key={project.slug}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <em>{project.category}</em>
                <strong>{project.title}</strong>
                <small>{project.industry}</small>
                <div className="dx-index-preview"><ProjectImage project={project} /></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="dx-process dx-section" id="process">
        <AmbientBlobs className="dx-ambient-soft" />
        <div className="dx-container">
          <div className="dx-process-title dx-reveal">
            <span className="dx-eyebrow">Process</span>
            <h2>Polished before it goes live.</h2>
            <p>A practical workflow for turning rough content, references, or Figma designs into a clean business website.</p>
          </div>
          <div className="dx-process-grid">
            {processSteps.map((step) => (
              <article className="dx-process-card dx-glass" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dx-about dx-section" id="about">
        <AmbientBlobs />
        <div className="dx-container dx-about-grid">
          <div className="dx-about-copy dx-reveal">
            <span className="dx-eyebrow">About Adeel</span>
            <h2>WordPress performance and WooCommerce specialist with a business-first approach.</h2>
            <p>Muhammad Adeel Iqbal builds fast, responsive, conversion-focused WordPress and WooCommerce websites for businesses that care about trust, speed, and results. With 3+ years of experience and 50+ projects delivered, he turns Figma designs, references, and business ideas into polished web experiences.</p>
            <div className="dx-skill-cloud">
              {['WordPress', 'Elementor Pro', 'WooCommerce', 'PHP', 'ACF', 'Custom CSS', 'GSAP', 'Performance', 'Booking Websites', 'Responsive Design'].map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <div className="dx-about-card dx-glass dx-reveal">
            <img src={asset('/images/adeel-portrait.webp')} alt="Muhammad Adeel Iqbal" loading="lazy" decoding="async" />
            <div className="dx-about-stats">
              <strong>3+ years</strong>
              <span>50+ delivered projects</span>
            </div>
            <div className="dx-about-ribbon">
              {serviceTags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="dx-contact dx-section" id="contact">
        <AmbientBlobs className="dx-ambient-soft" />
        <div className="dx-container dx-contact-grid">
          <div className="dx-contact-title dx-reveal">
            <span className="dx-eyebrow">Project start</span>
            <h2>Let’s work together.</h2>
            <p>Share your idea, reference, Figma file, or current website. I’ll help structure the build into a polished WordPress experience.</p>
            <div className="dx-contact-card dx-dark-glass">
              <span>Direct contact</span>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp: {site.phone}</a>
              <a href={`mailto:${site.email}`}>Email: {site.email}</a>
              <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn: linkedin.com/in/adeelatwork/ ↗</a>
            </div>
          </div>

          <form className="dx-form dx-glass dx-reveal" action={site.formEndpoint} method="POST">
            <input type="hidden" name="_subject" value="New portfolio inquiry for Muhammad Adeel Iqbal" />
            <input type="hidden" name="_captcha" value="false" />
            <label>Name<input name="name" required /></label>
            <label>Email<input name="email" type="email" required /></label>
            <label>Project Type<select name="project_type" defaultValue="WordPress Website"><option>WordPress Website</option><option>WooCommerce Store</option><option>Booking & Travel Website</option><option>Speed Optimization</option><option>Custom WordPress Development</option><option>Frontend Motion</option></select></label>
            <label>Budget Range<select name="budget_range" defaultValue="Not sure yet"><option>Not sure yet</option><option>$500 - $1,000</option><option>$1,000 - $2,500</option><option>$2,500+</option></select></label>
            <label className="dx-full-field">Message<textarea name="message" rows="5" required /></label>
            <button className="dx-btn dx-btn-dark magnetic" type="submit">Send Inquiry</button>
          </form>
        </div>
      </section>

      <footer className="dx-footer">
        <div className="dx-footer-brand"><strong>Muhammad Adeel Iqbal</strong><p>Premium WordPress, WooCommerce, Elementor, PHP, performance, and conversion-focused web builds.</p></div>
        <nav><a href="#services">Services</a><a href="#work">Cases</a><a href="#process">Process</a><a href="#contact">Contact</a></nav>
        <p>© 2026 · Built to perform.</p>
      </footer>
    </main>
  );
}
