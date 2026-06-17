'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import { services, processSteps, techStack } from '@/data/services';
import { asset, site } from '@/lib/site';

const nav = [
  { label: 'Work', href: '#work' },
  { label: 'System', href: '#system' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' }
];

const story = [
  {
    eyebrow: '01 / Design Translation',
    title: 'Figma becomes WordPress without losing the premium feel.',
    body:
      'I keep spacing, hierarchy, responsiveness and interactions clean so the final WordPress build feels close to the approved design, not like a broken template.'
  },
  {
    eyebrow: '02 / Conversion Flow',
    title: 'Every section has a job: trust, clarity, action.',
    body:
      'Project pages, booking flows, product layouts, lead forms and CTAs are structured so visitors understand the offer and know exactly what to do next.'
  },
  {
    eyebrow: '03 / Performance Layer',
    title: 'The website has to look sharp and load fast.',
    body:
      'I work with caching, image optimization, plugin auditing and Core Web Vitals improvements to turn heavy WordPress sites into faster business assets.'
  },
  {
    eyebrow: '04 / Launch Confidence',
    title: 'Polished before it goes live.',
    body:
      'Responsive testing, bug fixes, migration checks, forms, links, speed basics and post-launch stability are part of the way I ship work.'
  }
];

function ProjectImage({ project, className = '' }) {
  const source = project.image || project.thumb;
  if (!source) {
    return (
      <div className={`oz-shot-fallback ${className}`}>
        <span>{project.title.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>
      </div>
    );
  }
  return <img className={className} src={asset(source)} alt={`${project.title} project screenshot`} loading="lazy" />;
}

function LinkButton({ href, children, className = '' }) {
  return (
    <a className={`oz-btn magnetic ${className}`} href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
      <span>{children}</span>
      <i>↗</i>
    </a>
  );
}

export default function OryzoInspiredPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState('');
  const root = useRef(null);
  const workProgress = useRef(null);
  const featured = projects.filter((item) => item.featured).slice(0, 8);
  const allProjects = projects.slice(0, 10);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return allProjects.slice(0, 6);
    return projects
      .filter((project) => [project.title, project.category, project.industry, project.role, project.summary, ...(project.stack || [])].join(' ').toLowerCase().includes(query))
      .slice(0, 8);
  }, [q, allProjects]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('[data-oz-reveal], .oz-hero-line span, .oz-hero-kicker, .oz-hero-actions, .oz-hero-lab', { clearProps: 'all', opacity: 1 });
        return;
      }

      gsap.set('.oz-preloader-mark', { scale: 0.6, rotate: -40, opacity: 0 });
      gsap.set('.oz-hero-line span', { yPercent: 112, rotate: 4 });
      gsap.set('.oz-hero-kicker, .oz-hero-actions, .oz-hero-lab, .oz-header', { opacity: 0, y: 18 });
      gsap.set('.oz-ring-object', { scale: 0.72, rotateX: -10, rotateY: 18, opacity: 0 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .to('.oz-preloader-mark', { opacity: 1, scale: 1, rotate: 0, duration: 0.65, ease: 'back.out(1.7)' })
        .to('.oz-preloader-line', { scaleX: 1, duration: 0.75, ease: 'power3.inOut' }, '<0.08')
        .to('.oz-preloader', { yPercent: -102, duration: 0.9, ease: 'power4.inOut', delay: 0.15 })
        .to('.oz-header', { opacity: 1, y: 0, duration: 0.55 }, '-=0.32')
        .to('.oz-hero-line span', { yPercent: 0, rotate: 0, duration: 1.08, stagger: 0.055 }, '-=0.16')
        .to('.oz-ring-object', { opacity: 1, scale: 1, rotateX: 0, rotateY: 0, duration: 1.25 }, '<0.2')
        .to('.oz-hero-kicker, .oz-hero-actions, .oz-hero-lab', { opacity: 1, y: 0, duration: 0.72, stagger: 0.08 }, '<0.2');

      gsap.to('.oz-scroll-progress span', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: 0.2 }
      });

      gsap.to('.oz-hero', {
        '--heroBlur': '70px',
        scrollTrigger: { trigger: '.oz-hero', start: 'top top', end: 'bottom top', scrub: 1 }
      });

      gsap.to('.oz-ring-object', {
        yPercent: 40,
        rotateZ: 22,
        scale: 0.78,
        ease: 'none',
        scrollTrigger: { trigger: '.oz-hero', start: 'top top', end: 'bottom top', scrub: 1 }
      });

      gsap.to('.oz-hero-line:nth-child(1)', {
        xPercent: -11,
        ease: 'none',
        scrollTrigger: { trigger: '.oz-hero', start: 'top top', end: 'bottom top', scrub: 1 }
      });

      gsap.to('.oz-hero-line:nth-child(3)', {
        xPercent: 9,
        ease: 'none',
        scrollTrigger: { trigger: '.oz-hero', start: 'top top', end: 'bottom top', scrub: 1 }
      });

      gsap.utils.toArray('[data-oz-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 58, clipPath: 'inset(20% 0 0 0)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', once: true }
          }
        );
      });

      gsap.to('.oz-marquee-track', { xPercent: -50, duration: 26, repeat: -1, ease: 'none' });

      gsap.matchMedia().add('(min-width: 961px)', () => {
        const panels = gsap.utils.toArray('.oz-story-card');
        gsap.set(panels.slice(1), { autoAlpha: 0, y: 70, scale: 0.94 });
        const storyTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.oz-story-scene',
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${panels.length * 760}`,
            invalidateOnRefresh: true
          }
        });
        panels.forEach((panel, i) => {
          if (i === 0) {
            storyTl.to(panel, { y: -38, scale: 0.96, autoAlpha: 0.25, duration: 1 }, 0.92);
          } else {
            storyTl.to(panel, { y: 0, scale: 1, autoAlpha: 1, duration: 1 }, i)
              .to(panel, { y: -38, scale: 0.96, autoAlpha: i === panels.length - 1 ? 1 : 0.25, duration: 1 }, i + 0.92);
          }
        });

        const track = document.querySelector('.oz-work-track');
        const section = document.querySelector('.oz-work-pin');
        const cards = gsap.utils.toArray('.oz-work-card');
        if (track && section) {
          const getDistance = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.17;
          gsap.to(track, {
            x: () => -getDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1.25,
              start: 'top top',
              end: () => `+=${getDistance()}`,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (workProgress.current) workProgress.current.style.transform = `scaleX(${self.progress})`;
              }
            }
          });

          cards.forEach((card, i) => {
            gsap.fromTo(
              card.querySelector('.oz-work-shot'),
              { scale: 1.16, rotate: i % 2 ? 2 : -2 },
              {
                scale: 1,
                rotate: 0,
                ease: 'none',
                scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 1 }
              }
            );
          });
        }
      });

      gsap.utils.toArray('.oz-tilt').forEach((card) => {
        const move = (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, { rotateY: x * 9, rotateX: y * -9, y: -8, duration: 0.35, ease: 'power3.out', transformPerspective: 900 });
        };
        const leave = () => gsap.to(card, { rotateY: 0, rotateX: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, .55)' });
        card.addEventListener('mousemove', move);
        card.addEventListener('mouseleave', leave);
      });

      gsap.utils.toArray('.magnetic').forEach((button) => {
        const move = (e) => {
          const rect = button.getBoundingClientRect();
          gsap.to(button, {
            x: (e.clientX - rect.left - rect.width / 2) * 0.22,
            y: (e.clientY - rect.top - rect.height / 2) * 0.22,
            duration: 0.35,
            ease: 'power3.out'
          });
        };
        const leave = () => gsap.to(button, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, .45)' });
        button.addEventListener('mousemove', move);
        button.addEventListener('mouseleave', leave);
      });

      const cursor = document.querySelector('.oz-cursor');
      const dot = document.querySelector('.oz-cursor-dot');
      if (cursor && dot && window.matchMedia('(hover:hover)').matches) {
        let mx = 0;
        let my = 0;
        let cx = 0;
        let cy = 0;
        const onMove = (e) => {
          mx = e.clientX;
          my = e.clientY;
          dot.style.transform = `translate(${mx}px, ${my}px)`;
        };
        const loop = () => {
          cx += (mx - cx) * 0.14;
          cy += (my - cy) * 0.14;
          cursor.style.transform = `translate(${cx}px, ${cy}px)`;
          requestAnimationFrame(loop);
        };
        document.addEventListener('mousemove', onMove);
        loop();
        document.querySelectorAll('a,button,.oz-work-card').forEach((el) => {
          el.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
          el.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, searchOpen]);

  const closeOverlay = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setQ('');
  };

  return (
    <main className="oz-site" ref={root}>
      <div className="oz-cursor" aria-hidden="true" />
      <div className="oz-cursor-dot" aria-hidden="true" />
      <div className="oz-scroll-progress"><span /></div>
      <div className="oz-preloader" aria-hidden="true">
        <div className="oz-preloader-mark">AI</div>
        <div className="oz-preloader-copy">Engineering premium WordPress experiences</div>
        <div className="oz-preloader-line" />
      </div>

      <header className="oz-header">
        <a className="oz-logo" href={asset('/')} aria-label="Muhammad Adeel Iqbal portfolio home">
          <b>MAI</b><span>WordPress Performance</span>
        </a>
        <nav className="oz-nav" aria-label="Main navigation">
          {nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="oz-actions">
          <button className="oz-icon" type="button" onClick={() => setSearchOpen(true)} aria-label="Search projects">⌕</button>
          <a className="oz-start magnetic" href="#contact">Start project</a>
          <button className="oz-menu-toggle" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><span /><span /></button>
        </div>
      </header>

      {menuOpen && (
        <section className="oz-overlay oz-menu-panel">
          <div className="oz-overlay-top"><span>Navigation</span><button onClick={closeOverlay}>Close</button></div>
          <div className="oz-menu-grid">
            <div className="oz-menu-main">
              {nav.map((item, index) => <a key={item.href} href={item.href} onClick={closeOverlay}><em>{String(index + 1).padStart(2, '0')}</em>{item.label}</a>)}
            </div>
            <div className="oz-menu-side">
              <h3>Selected projects</h3>
              {featured.slice(0, 5).map((project) => <a key={project.slug} href={asset(`/projects/${project.slug}/`)}>{project.title}<span>{project.category}</span></a>)}
            </div>
            <div className="oz-menu-side">
              <h3>Contact</h3>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp: {site.phone}</a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </section>
      )}

      {searchOpen && (
        <section className="oz-overlay oz-search-panel">
          <div className="oz-overlay-top"><span>Search work</span><button onClick={closeOverlay}>Close</button></div>
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search WordPress, booking, WooCommerce, healthcare..." />
          <div className="oz-search-results">
            {filtered.map((project) => <a key={project.slug} href={asset(`/projects/${project.slug}/`)} onClick={closeOverlay}><strong>{project.title}</strong><span>{project.category} — {project.industry}</span></a>)}
          </div>
        </section>
      )}

      <section className="oz-hero" id="home">
        <div className="oz-noise" aria-hidden="true" />
        <div className="oz-hero-grid" aria-hidden="true" />
        <div className="oz-hero-copy">
          <p className="oz-hero-kicker"><span />Available for freelance websites</p>
          <h1 aria-label="Premium WordPress websites built to perform">
            <span className="oz-hero-line"><span>Premium</span></span>
            <span className="oz-hero-line"><span>WordPress</span></span>
            <span className="oz-hero-line"><span>websites</span></span>
            <span className="oz-hero-line"><span>built to</span></span>
            <span className="oz-hero-line"><span>perform.</span></span>
          </h1>
          <p className="oz-hero-sub oz-hero-kicker">I turn Figma designs, reference websites, and business ideas into fast, responsive, conversion-focused WordPress experiences.</p>
          <div className="oz-hero-actions">
            <LinkButton href="#work" className="is-filled">Explore work</LinkButton>
            <LinkButton href={`https://wa.me/${site.whatsapp}`}>WhatsApp</LinkButton>
          </div>
        </div>

        <div className="oz-hero-lab">
          <div className="oz-ring-object">
            <div className="oz-ring-core" />
            <div className="oz-orbit one"><ProjectImage project={featured[0]} /></div>
            <div className="oz-orbit two"><ProjectImage project={featured[1]} /></div>
            <div className="oz-orbit three"><ProjectImage project={featured[2]} /></div>
            <div className="oz-orbit-label"><b>50+</b><span>Projects delivered</span></div>
          </div>
          <div className="oz-lab-card left">WordPress / WooCommerce / PHP</div>
          <div className="oz-lab-card right">Load time improved: 6s → under 2s</div>
        </div>

        <div className="oz-scroll-cue">Scroll to experience <span /></div>
      </section>

      <section className="oz-stats" id="stats">
        <div className="oz-stat" data-oz-reveal><b>3+</b><span>Years experience</span></div>
        <div className="oz-stat" data-oz-reveal><b>50+</b><span>Projects delivered</span></div>
        <div className="oz-stat" data-oz-reveal><b>6s → &lt;2s</b><span>Performance improvements</span></div>
        <div className="oz-stat" data-oz-reveal><b>WP + PHP</b><span>Custom development</span></div>
      </section>

      <div className="oz-marquee" aria-hidden="true">
        <div className="oz-marquee-track">
          <span>Figma to WordPress · WooCommerce · Booking websites · Elementor Pro · Custom PHP · Core Web Vitals · Premium motion · </span>
          <span>Figma to WordPress · WooCommerce · Booking websites · Elementor Pro · Custom PHP · Core Web Vitals · Premium motion · </span>
        </div>
      </div>

      <section className="oz-story-scene" id="system">
        <div className="oz-story-sticky">
          <div className="oz-section-label">Website system</div>
          <h2 data-oz-reveal>Not just pages. A business experience engineered around trust.</h2>
          <div className="oz-story-stack">
            {story.map((item, index) => (
              <article className="oz-story-card" key={item.title}>
                <small>{item.eyebrow}</small>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span>{String(index + 1).padStart(2, '0')}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="oz-work-pin" id="work">
        <div className="oz-work-head">
          <p className="oz-section-label">Selected work</p>
          <h2>Scroll through real websites built for real businesses.</h2>
          <div className="oz-work-progress"><span ref={workProgress} /></div>
        </div>
        <div className="oz-work-track">
          {featured.map((project, index) => (
            <article className="oz-work-card oz-tilt" key={project.slug}>
              <div className="oz-work-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="oz-work-shot-wrap"><ProjectImage project={project} className="oz-work-shot" /></div>
              <div className="oz-work-body">
                <p>{project.category}</p>
                <h3>{project.title}</h3>
                <span>{project.summary}</span>
                <div className="oz-card-actions">
                  <a href={asset(`/projects/${project.slug}/`)}>Case study</a>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live site</a>
                </div>
              </div>
            </article>
          ))}
          <article className="oz-work-card oz-final-card">
            <h3>Want your site to feel this polished?</h3>
            <p>Let’s turn your website idea, Figma file, or reference design into a premium WordPress build.</p>
            <LinkButton href="#contact" className="is-filled">Start a project</LinkButton>
          </article>
        </div>
      </section>

      <section className="oz-index-section">
        <p className="oz-section-label" data-oz-reveal>Project index</p>
        <div className="oz-index-grid">
          <h2 data-oz-reveal>Live websites across travel, healthcare, HR, IT, local business, and eCommerce.</h2>
          <div className="oz-index-list">
            {allProjects.map((project, index) => (
              <a key={project.slug} href={asset(`/projects/${project.slug}/`)} data-oz-reveal>
                <em>{String(index + 1).padStart(2, '0')}</em>
                <strong>{project.title}</strong>
                <span>{project.industry}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="oz-services" id="services">
        <div className="oz-split">
          <div>
            <p className="oz-section-label" data-oz-reveal>Capabilities</p>
            <h2 data-oz-reveal>What I build when businesses need a serious web presence.</h2>
          </div>
          <p data-oz-reveal>Premium WordPress implementation, conversion structure, speed improvements, custom PHP work, and polished frontend interactions.</p>
        </div>
        <div className="oz-service-grid">
          {services.map((service, index) => (
            <article className="oz-service-card" key={service.title} data-oz-reveal>
              <small>{String(index + 1).padStart(2, '0')}</small>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>{service.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="oz-process" id="process">
        <p className="oz-section-label" data-oz-reveal>Process</p>
        <h2 data-oz-reveal>From rough idea to polished launch.</h2>
        <div className="oz-process-row">
          {processSteps.map((step, index) => (
            <article key={step.title} data-oz-reveal>
              <small>{String(index + 1).padStart(2, '0')}</small>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="oz-about">
        <div className="oz-about-photo" data-oz-reveal><img src={asset('/images/adeel-portrait.webp')} alt="Muhammad Adeel Iqbal" /></div>
        <div className="oz-about-copy">
          <p className="oz-section-label" data-oz-reveal>About</p>
          <h2 data-oz-reveal>WordPress Performance & WooCommerce specialist with a business-first approach.</h2>
          <p data-oz-reveal>I help businesses replace slow, outdated, or unfinished websites with fast, responsive, conversion-focused WordPress experiences. My work covers Figma to WordPress, WooCommerce, Elementor Pro, ACF, custom PHP/CPT work, booking websites, migrations, and speed optimization.</p>
          <div className="oz-tech-cloud" data-oz-reveal>{techStack.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </section>

      <section className="oz-contact" id="contact">
        <div className="oz-contact-copy">
          <p className="oz-section-label" data-oz-reveal>Start a project</p>
          <h2 data-oz-reveal>Have a serious website project? Let’s build something premium.</h2>
          <div className="oz-direct" data-oz-reveal>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp: {site.phone}</a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn profile</a>
          </div>
        </div>
        <form className="oz-form" action={site.formEndpoint} method="POST" data-oz-reveal>
          <input type="hidden" name="_subject" value="New portfolio inquiry" />
          <input type="hidden" name="_captcha" value="false" />
          <label>Name<input name="name" type="text" required /></label>
          <label>Email<input name="email" type="email" required /></label>
          <label>Project type<select name="project_type" defaultValue=""><option value="" disabled>Select one</option><option>Figma to WordPress</option><option>WooCommerce website</option><option>Booking website</option><option>Website redesign</option><option>Speed optimization</option></select></label>
          <label>Budget<select name="budget" defaultValue=""><option value="" disabled>Select range</option><option>$300 – $700</option><option>$700 – $1,500</option><option>$1,500 – $3,000</option><option>$3,000+</option></select></label>
          <label className="oz-message">Message<textarea name="message" rows="5" required /></label>
          <button className="oz-submit magnetic" type="submit">Send project inquiry</button>
        </form>
      </section>

      <footer className="oz-footer">
        <div><strong>Muhammad Adeel Iqbal</strong><span>Premium WordPress & WooCommerce Developer</span></div>
        <div><a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a><a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><a href={asset(site.resume)} target="_blank" rel="noopener noreferrer">Resume</a></div>
        <p>© 2026 — Built for freelance client acquisition.</p>
      </footer>
    </main>
  );
}
