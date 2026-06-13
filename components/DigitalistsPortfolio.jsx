'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import { services, processSteps, techStack } from '@/data/services';
import { asset, site } from '@/lib/site';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Cases', href: '#cases' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' }
];

const menuColumns = [
  {
    title: 'Solutions',
    links: ['Figma to WordPress', 'WooCommerce Websites', 'Booking Websites', 'Performance Optimization', 'Custom WordPress', 'Premium Motion']
  },
  {
    title: 'Expertise',
    links: ['Elementor Pro', 'ACF / CPT', 'PHP', 'GSAP', 'Responsive Design', 'Core Web Vitals']
  }
];

function ProjectImage({ project, className = '' }) {
  const src = project.thumb || project.image;
  if (!src) {
    return (
      <div className={`dx-fallback ${className}`}>
        <span>{project.title}</span>
      </div>
    );
  }
  return <img className={className} src={asset(src)} alt={`${project.title} website preview`} loading="lazy" />;
}

function SplitWords({ words }) {
  return words.map((word, index) => (
    <span className="dx-hero-word" key={`${word}-${index}`}>
      <span>{word}</span>
    </span>
  ));
}

export default function DigitalistsPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef(null);
  const menuRef = useRef(null);

  const featured = projects.filter((project) => project.featured).slice(0, 7);
  const heroProject = featured[0] || projects[0];
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    const source = q
      ? projects.filter((project) =>
          [project.title, project.industry, project.category, project.role, project.summary, ...project.stack]
            .join(' ')
            .toLowerCase()
            .includes(q)
        )
      : projects;
    return source.slice(0, 8);
  }, [query]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cursor = document.querySelector('.dx-cursor');
    const cursorDot = document.querySelector('.dx-cursor-dot');

    if (!reduced && cursor && cursorDot && window.matchMedia('(hover: hover)').matches) {
      let mouseX = 0;
      let mouseY = 0;
      let cursorX = 0;
      let cursorY = 0;
      const move = (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        gsap.set(cursorDot, { x: mouseX, y: mouseY });
      };
      const tick = () => {
        cursorX += (mouseX - cursorX) * 0.16;
        cursorY += (mouseY - cursorY) * 0.16;
        gsap.set(cursor, { x: cursorX, y: cursorY });
        requestAnimationFrame(tick);
      };
      window.addEventListener('mousemove', move);
      tick();
    }

    if (reduced) {
      gsap.set('.dx-preloader', { display: 'none' });
      gsap.set('.dx-hero-word span, .dx-reveal, .dx-header, .dx-hero-side, .dx-mini-nav', { clearProps: 'all', opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set('.dx-header', { y: -26, opacity: 0 });
      gsap.set('.dx-pre-logo', { scale: 0.82, opacity: 0 });
      gsap.set('.dx-pre-copy span', { yPercent: 115 });
      gsap.set('.dx-hero-word span', { yPercent: 116 });
      gsap.set('.dx-hero-note, .dx-hero-actions, .dx-hero-side, .dx-mini-nav', { y: 24, opacity: 0 });

      const intro = gsap.timeline();
      intro
        .to('.dx-pre-logo', { opacity: 1, scale: 1, duration: 0.48, ease: 'back.out(1.7)' })
        .to('.dx-pre-copy span', { yPercent: 0, stagger: 0.055, duration: 0.65, ease: 'power4.out' }, '-=0.18')
        .to('.dx-pre-bar span', { scaleX: 1, duration: 0.65, ease: 'power3.inOut' }, '-=0.25')
        .to('.dx-preloader', { yPercent: -101, duration: 0.9, delay: 0.08, ease: 'power4.inOut' })
        .to('.dx-header', { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.35')
        .to('.dx-hero-word span', { yPercent: 0, stagger: 0.055, duration: 1.04, ease: 'power4.out' }, '-=0.15')
        .to('.dx-hero-note, .dx-hero-actions, .dx-hero-side, .dx-mini-nav', { y: 0, opacity: 1, duration: 0.75, stagger: 0.07, ease: 'power3.out' }, '-=0.65');

      gsap.to('.dx-progress-bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: 0.15 }
      });

      gsap.to('.dx-hero-card', {
        yPercent: -18,
        rotate: -3,
        ease: 'none',
        scrollTrigger: { trigger: '.dx-hero', start: 'top top', end: 'bottom top', scrub: 1 }
      });

      gsap.to('.dx-hero-bg-word', {
        xPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: '.dx-hero', start: 'top top', end: 'bottom top', scrub: 1 }
      });

      gsap.utils.toArray('.dx-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 56, opacity: 0, clipPath: 'inset(18% 0% 0% 0%)' },
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 84%', once: true }
          }
        );
      });

      gsap.to('.dx-marquee-track', { xPercent: -50, duration: 32, repeat: -1, ease: 'none' });

      gsap.matchMedia().add('(min-width: 961px)', () => {
        const track = document.querySelector('.dx-case-track');
        const scene = document.querySelector('.dx-case-scene');
        if (!track || !scene) return;

        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 96),
          ease: 'none',
          scrollTrigger: {
            trigger: scene,
            start: 'top top',
            end: () => `+=${Math.max(track.scrollWidth - window.innerWidth + 1100, 1600)}`,
            pin: '.dx-case-sticky',
            scrub: 1.05,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set('.dx-case-meter span', { scaleX: self.progress })
          }
        });

        gsap.utils.toArray('.dx-case-card').forEach((card, index) => {
          const image = card.querySelector('.dx-case-image');
          gsap.fromTo(
            card,
            { rotate: index % 2 ? 2.8 : -2.8, y: index % 2 ? 34 : -22 },
            {
              rotate: 0,
              y: 0,
              ease: 'none',
              scrollTrigger: { trigger: scene, start: 'top top', end: 'bottom top', scrub: 1 }
            }
          );
          if (image) {
            gsap.to(image, {
              scale: 1.09,
              yPercent: -6,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'left right', end: 'right left', scrub: 1, containerAnimation: null }
            });
          }
        });
      });

      gsap.utils.toArray('.dx-index-row').forEach((row) => {
        const img = row.querySelector('.dx-row-preview');
        if (!img) return;
        const enter = () => gsap.to(img, { opacity: 1, scale: 1, rotate: -2, y: 0, duration: 0.28, ease: 'power3.out' });
        const leave = () => gsap.to(img, { opacity: 0, scale: 0.88, rotate: 0, y: 18, duration: 0.28, ease: 'power3.out' });
        row.addEventListener('mouseenter', enter);
        row.addEventListener('mouseleave', leave);
      });

      gsap.utils.toArray('.magnetic').forEach((el) => {
        const onMove = (event) => {
          const rect = el.getBoundingClientRect();
          gsap.to(el, {
            x: (event.clientX - rect.left - rect.width / 2) * 0.18,
            y: (event.clientY - rect.top - rect.height / 2) * 0.18,
            duration: 0.28,
            ease: 'power3.out'
          });
        };
        const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.45)' });
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : '';
    if (menuOpen && menuRef.current) {
      gsap.fromTo(menuRef.current, { yPercent: -100 }, { yPercent: 0, duration: 0.82, ease: 'power4.out' });
      gsap.fromTo(
        menuRef.current.querySelectorAll('[data-menu]'),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.68, stagger: 0.045, delay: 0.15, ease: 'power3.out' }
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
    <main className="dx-site" ref={rootRef} id="home">
      <div className="dx-progress" aria-hidden="true"><span className="dx-progress-bar" /></div>
      <div className="dx-cursor" aria-hidden="true" />
      <div className="dx-cursor-dot" aria-hidden="true" />

      <div className="dx-preloader" aria-hidden="true">
        <div className="dx-pre-top"><span>Loading cases</span><span>2026</span></div>
        <div className="dx-pre-logo">AI</div>
        <div className="dx-pre-copy">
          {['WordPress', 'made', 'visible.'].map((word) => <span key={word}>{word}</span>)}
        </div>
        <div className="dx-pre-bar"><span /></div>
      </div>

      <header className="dx-header">
        <a className="dx-brand" href={asset('/')} aria-label="Muhammad Adeel Iqbal home">
          <span>Muhammad Adeel Iqbal</span>
          <small>WP / WooCommerce</small>
        </a>
        <nav className="dx-nav" aria-label="Primary navigation">
          {navItems.slice(1).map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <div className="dx-actions">
          <button className="dx-round" onClick={() => setSearchOpen(true)} aria-label="Search projects">⌕</button>
          <a className="dx-start magnetic" href="#contact">Start</a>
          <button className="dx-menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu"><span /><span /></button>
        </div>
      </header>

      {menuOpen && (
        <section className="dx-menu" ref={menuRef} aria-label="Expanded menu">
          <div className="dx-menu-top" data-menu>
            <span>Menu / Adeel</span>
            <button onClick={() => setMenuOpen(false)}>Close ×</button>
          </div>
          <div className="dx-menu-grid">
            <nav className="dx-menu-primary" data-menu>
              {navItems.map((item) => <a key={item.href} href={item.href} onClick={closeAll}>{item.label}</a>)}
            </nav>
            {menuColumns.map((column) => (
              <div className="dx-menu-col" data-menu key={column.title}>
                <p>{column.title}</p>
                {column.links.map((link) => <a key={link} href="#services" onClick={closeAll}>→ {link}</a>)}
              </div>
            ))}
            <div className="dx-menu-col dx-menu-contact" data-menu>
              <p>Current cases</p>
              {featured.slice(0, 5).map((project) => (
                <a href={asset(`/projects/${project.slug}/`)} onClick={closeAll} key={project.slug}>CS / {project.title}</a>
              ))}
              <strong>Available for selected freelance projects.</strong>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp {site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
        </section>
      )}

      {searchOpen && (
        <section className="dx-search" aria-label="Search overlay">
          <button className="dx-search-backdrop" onClick={closeAll} aria-label="Close search" />
          <div className="dx-search-panel">
            <button className="dx-search-close" onClick={closeAll}>Close ×</button>
            <label>Search projects / services / stack</label>
            <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try WordPress, booking, travel, WooCommerce..." />
            <div className="dx-search-tags">
              {['Figma to WordPress', 'WooCommerce', 'Travel', 'Healthcare', 'Performance', 'Booking'].map((tag) => (
                <button type="button" key={tag} onClick={() => setQuery(tag)}>{tag}</button>
              ))}
            </div>
            <div className="dx-search-results">
              {searchResults.map((project) => (
                <a href={asset(`/projects/${project.slug}/`)} onClick={closeAll} key={project.slug}>
                  <span>{project.category}</span>
                  <strong>{project.title}</strong>
                  <small>{project.industry}</small>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="dx-hero">
        <div className="dx-hero-bg-word" aria-hidden="true">VISIBLE</div>
        <aside className="dx-mini-nav">
          {services.slice(0, 6).map((service) => <a key={service.title} href="#services">→ {service.title}</a>)}
        </aside>
        <div className="dx-hero-copy">
          <span className="dx-kicker"># WordPress systems for serious businesses</span>
          <h1 aria-label="I make WordPress websites visible, fast, profitable and worth trusting.">
            <SplitWords words={['I make', 'WordPress', 'websites', 'visible,', 'fast,', 'profitable', 'and worth', 'trusting.']} />
          </h1>
          <p className="dx-hero-note">I turn Figma designs, approved references and business ideas into fast, responsive, polished WordPress websites built for trust, leads and conversion.</p>
          <div className="dx-hero-actions">
            <a className="dx-btn dx-btn-dark magnetic" href="#cases">View work</a>
            <a className="dx-btn dx-btn-line magnetic" href="#contact">Start project</a>
            <a className="dx-text-link" href={asset(site.resume)} target="_blank" rel="noreferrer">Download resume ↗</a>
          </div>
        </div>
        <div className="dx-hero-side">
          <div className="dx-hero-card">
            <ProjectImage project={heroProject} />
            <div className="dx-floating-label top"><span>Live website</span><strong>{heroProject.title}</strong></div>
            <div className="dx-floating-label bottom"><span>Performance mindset</span><strong>6s → under 2s</strong></div>
          </div>
          <a className="dx-black-pill magnetic" href="#cases">Current cases →</a>
        </div>
        <a href="#services" className="dx-scroll-cue">Scroll<br />↓</a>
      </section>

      <section className="dx-marquee" aria-label="Technology stack">
        <div className="dx-marquee-track">
          {[...techStack, ...techStack].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
        </div>
      </section>

      <section className="dx-services" id="services">
        <div className="dx-services-grid">
          <aside className="dx-side-links dx-reveal">
            <span>Services</span>
            {services.map((service) => <a href="#contact" key={service.title}>→ {service.title}</a>)}
          </aside>
          <div className="dx-services-main">
            <div className="dx-services-top">
              <div className="dx-count dx-reveal">50+<span>Projects</span></div>
              <div className="dx-services-title dx-reveal">
                <span>What makes it premium</span>
                <h2>is what makes your website easier to trust, faster to use and better at converting.</h2>
                <p>Strategy, careful spacing, responsive implementation, clean WordPress structure, performance polish and conversion-focused handover.</p>
              </div>
            </div>
            <div className="dx-service-cards">
              {services.map((service, index) => (
                <article className="dx-service-card dx-reveal" key={service.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href="#contact">More about this service →</a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="dx-case-scene" id="cases">
        <div className="dx-case-sticky">
          <div className="dx-case-head">
            <span>Case or it did not happen</span>
            <h2>Creative WordPress solutions</h2>
            <p>Scroll through selected websites converted from Figma, approved references and real business goals.</p>
          </div>
          <div className="dx-case-track">
            {featured.map((project, index) => (
              <article className="dx-case-card" key={project.slug}>
                <div className="dx-case-code">CS {String((index + 1) * 111).padStart(3, '0')}</div>
                <div className="dx-case-media"><ProjectImage project={project} className="dx-case-image" /></div>
                <div className="dx-case-copy">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div>
                    <a href={asset(`/projects/${project.slug}/`)}>View case study</a>
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">Live site ↗</a>
                  </div>
                </div>
              </article>
            ))}
            <article className="dx-case-card dx-case-final">
              <div className="dx-case-copy">
                <span>Next case</span>
                <h3>Ready to turn your reference into something premium?</h3>
                <p>Bring a Figma file, reference website or business idea. I will build the WordPress experience around it.</p>
                <a className="dx-btn dx-btn-dark" href="#contact">Start project</a>
              </div>
            </article>
          </div>
          <div className="dx-case-meter"><span /></div>
        </div>
      </section>

      <section className="dx-index">
        <div className="dx-index-head dx-reveal">
          <span>Current cases</span>
          <h2>Project index</h2>
        </div>
        <div className="dx-index-list">
          {projects.slice(0, 8).map((project, index) => (
            <a className="dx-index-row dx-reveal" href={asset(`/projects/${project.slug}/`)} key={project.slug}>
              <span>{String(index + 1).padStart(2, '0')} / {project.category}</span>
              <strong>{project.title}</strong>
              <em>{project.industry}</em>
              <ProjectImage project={project} className="dx-row-preview" />
            </a>
          ))}
        </div>
      </section>

      <section className="dx-process" id="process">
        <div className="dx-process-title dx-reveal">
          <span>How I work</span>
          <h2>Polished before it goes live.</h2>
        </div>
        <div className="dx-process-grid">
          {processSteps.map((step) => (
            <article className="dx-process-card dx-reveal" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dx-about">
        <div className="dx-about-copy dx-reveal">
          <span>About Adeel</span>
          <h2>WordPress performance and WooCommerce specialist with a business-first approach.</h2>
          <p>I have 3+ years of experience delivering WordPress, WooCommerce, Elementor, ACF, PHP, custom plugin, CPT, migration and performance work for businesses across travel, healthcare, technology, HR and local services.</p>
          <div className="dx-about-stats">
            <strong>3+<span>Years</span></strong>
            <strong>50+<span>Projects</span></strong>
            <strong>WP + PHP<span>Stack</span></strong>
          </div>
        </div>
        <div className="dx-about-card dx-reveal">
          <img src={asset('/images/adeel-portrait.webp')} alt="Muhammad Adeel Iqbal" />
        </div>
      </section>

      <section className="dx-contact" id="contact">
        <div className="dx-contact-title dx-reveal">
          <span>Project start</span>
          <h2>Let’s work together!</h2>
          <p>A short conversation is enough to define your pages, direction, build scope, timeline and next steps.</p>
        </div>
        <div className="dx-contact-grid">
          <div className="dx-contact-card dx-reveal">
            <span>Prefer direct contact?</span>
            <a href={`tel:${site.phone}`}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn profile ↗</a>
            <a href={site.github} target="_blank" rel="noreferrer">GitHub profile ↗</a>
          </div>
          <form className="dx-form dx-reveal" action={site.formEndpoint} method="POST">
            <input type="hidden" name="_subject" value="New portfolio inquiry for Muhammad Adeel Iqbal" />
            <input type="hidden" name="_captcha" value="false" />
            <label>Name*<input name="name" required /></label>
            <label>Email*<input name="email" type="email" required /></label>
            <label>Project type<select name="project_type" defaultValue="WordPress Website"><option>WordPress Website</option><option>WooCommerce Store</option><option>Booking Website</option><option>Speed Optimization</option><option>Custom Development</option></select></label>
            <label>Message*<textarea name="message" rows="5" required /></label>
            <button className="dx-btn dx-btn-dark magnetic" type="submit">Send inquiry</button>
          </form>
        </div>
      </section>

      <footer className="dx-footer">
        <div><strong>Muhammad Adeel Iqbal</strong><p>WordPress Performance & WooCommerce Specialist</p></div>
        <nav><a href="#services">Services</a><a href="#cases">Cases</a><a href="#process">Process</a><a href="#contact">Contact</a></nav>
        <p>© 2026 · Built to perform.</p>
      </footer>
    </main>
  );
}
