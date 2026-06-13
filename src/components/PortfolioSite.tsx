'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processItems, projects, services, skills } from '@/data/portfolio';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

function withBase(path: string) {
  if (!path.startsWith('/')) return path;
  return `${basePath}${path}`;
}

function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHidden(true);
      return;
    }

    let start: number | null = null;
    const duration = 1700;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (progress < 1) requestAnimationFrame(step);
      else {
        setCount(100);
        setTimeout(() => {
          setDone(true);
          setTimeout(() => setHidden(true), 600);
        }, 160);
      }
    };
    requestAnimationFrame(step);
  }, []);

  if (hidden) return null;

  return (
    <div className="preloader" style={{ opacity: done ? 0 : 1, transform: done ? 'translateY(-20px)' : 'translateY(0)', pointerEvents: done ? 'none' : 'all', transition: done ? 'opacity .6s var(--ease-out), transform .6s var(--ease-out)' : undefined }}>
      <div className="preloader-box">
        <div className="preloader-label">Loading Portfolio</div>
        <div className="preloader-count">{String(count).padStart(2, '0')}</div>
        <div className="preloader-bar-wrap"><div ref={barRef} className="preloader-bar" /></div>
      </div>
    </div>
  );
}

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring || window.matchMedia('(hover: none)').matches) return;

    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId = 0;

    const onMove = (event: MouseEvent) => {
      dotX = event.clientX;
      dotY = event.clientY;
    };
    const grow = () => {
      dot.classList.add('expanded');
      ring.classList.add('expanded');
    };
    const shrink = () => {
      dot.classList.remove('expanded');
      ring.classList.remove('expanded');
    };
    const tick = () => {
      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.querySelectorAll('a, button, [data-cursor-grow]').forEach((el) => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <><div ref={dotRef} className="cursor" /><div ref={ringRef} className="cursor-ring" /></>;
}

function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (fillRef.current) fillRef.current.style.width = `${progress}%`;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <div className="progress-bar"><div ref={fillRef} className="progress-fill" /></div>;
}

function GradientBlobs() {
  return <div className="blob-wrap" aria-hidden="true"><div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" /></div>;
}

export default function PortfolioSite() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeProcess, setActiveProcess] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (stored) setTheme(stored);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', () => ScrollTrigger.update());

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.1 });
      tl.from('.hero-kicker', { opacity: 0, y: 20, duration: .6, ease: 'power3.out' })
        .from('.hero-headline .line-inner', { y: '100%', duration: .9, stagger: .08, ease: 'power4.out' }, '-=.3')
        .from('.hero-sub, .hero-ctas, .hero-trust', { opacity: 0, y: 18, duration: .65, stagger: .08, ease: 'power3.out' }, '-=.35')
        .from('.hero-card', { opacity: 0, y: 40, scale: .95, duration: 1, ease: 'power3.out' }, '-=.75')
        .from('.hero-badge', { opacity: 0, scale: .86, duration: .5, stagger: .1, ease: 'back.out(2)' }, '-=.5');

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 46, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%' } });
      });

      gsap.utils.toArray<HTMLElement>('.story-visual').forEach((el, index) => {
        gsap.fromTo(el, { scale: .9, rotate: index % 2 ? -4 : 4 }, { scale: 1, rotate: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom center', scrub: true } });
      });

      gsap.from('.horizon-card', { opacity: 0, y: 50, rotateY: -12, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: '.horizon-track', start: 'top 75%' } });
    }, rootRef);

    setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      ctx.revert();
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  const navTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Thanks — connect this form to Formspree, Netlify Forms, or your WordPress backend before production.');
  };

  return (
    <div ref={rootRef}>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <GradientBlobs />

      <header className="header-wrap" style={{ opacity: 0, animation: 'fadeInDown .8s 2.2s var(--ease-out) forwards' }}>
        <div className={`header-pill${scrolled ? ' scrolled' : ''}`}>
          <a href="#hero" className="header-brand" onClick={(e) => { e.preventDefault(); navTo('#hero'); }}>Adeel.</a>
          <nav className="header-nav" aria-label="Main navigation">
            {navLinks.map((link) => <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); navTo(link.href); }}>{link.label}</a>)}
          </nav>
          <div className="header-actions">
            <button className="header-icon-btn" aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? '☀' : '☾'}</button>
            <a href="#contact" className="btn btn-primary btn-sm header-start-btn" onClick={(e) => { e.preventDefault(); navTo('#contact'); }}>Start Project</a>
            <button className={`hamburger-btn${menuOpen ? ' open' : ''}`} aria-label="Open menu" onClick={() => setMenuOpen((value) => !value)}><span /><span /><span /></button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navLinks.map((link, index) => <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); navTo(link.href); }}><span className="menu-num">{String(index + 1).padStart(2, '0')}</span>{link.label}</a>)}
      </div>

      <main>
        <section className="hero" id="hero">
          <div className="hero-inner">
            <div className="hero-left">
              <div className="hero-kicker"><span className="hero-kicker-dot" /><span className="label text-orange">WordPress & WooCommerce Developer</span></div>
              <h1 className="hero-headline display-xl">
                <div className="line"><span className="line-inner">Premium WordPress</span></div>
                <div className="line"><span className="line-inner text-orange">built to win</span></div>
                <div className="line"><span className="line-inner">clients.</span></div>
              </h1>
              <p className="body-lg hero-sub">I turn Figma designs, approved references, and business ideas into fast, responsive, polished WordPress websites built for trust, leads, and conversion.</p>
              <div className="hero-ctas">
                <a href="#work" className="btn btn-primary" onClick={(e) => { e.preventDefault(); navTo('#work'); }}>View Work ↗</a>
                <a href="#contact" className="btn btn-ghost" onClick={(e) => { e.preventDefault(); navTo('#contact'); }}>Start Project</a>
                <a href={withBase('/resume.html')} className="btn btn-glass">Resume ↓</a>
              </div>
              <div className="hero-trust">
                {[{ num: '50+', desc: 'Projects Delivered' }, { num: '3+', desc: 'Years Experience' }, { num: '100%', desc: 'Client Satisfaction' }].map((metric) => <div key={metric.num} className="trust-metric"><span className="num">{metric.num}</span><span className="desc">{metric.desc}</span></div>)}
              </div>
            </div>

            <div className="hero-card-wrap" data-cursor-grow>
              <div className="hero-card">
                <div className="hero-chrome"><span style={{ background: '#FF5F56' }} /><span style={{ background: '#FEBC2E' }} /><span style={{ background: '#27C840' }} /><div className="hero-url">desertsafaridubai.com</div></div>
                <div className="hero-card-screen">
                  <div className="hero-card-screen-bg" />
                  <div className="screen-ui">
                    <div className="screen-nav"><div className="screen-logo" /><div className="screen-lines"><i style={{ width: 60 }} /><i style={{ width: 50 }} /><i style={{ width: 45 }} /></div></div>
                    <div className="screen-hero"><div className="screen-copy"><i style={{ width: '80%' }} /><i /><div style={{ display: 'flex', gap: 8 }}><span className="btn btn-primary btn-sm">Book Now</span><span className="btn btn-glass btn-sm">Learn More</span></div></div><div className="screen-visual" /></div>
                    <div className="screen-grid"><i /><i style={{ background: 'rgba(124,58,237,.22)' }} /><i style={{ background: 'rgba(59,130,246,.22)' }} /></div>
                  </div>
                </div>
                <div className="hero-card-info"><div><div className="hero-card-title">Desert Safari Dubai</div><div className="hero-card-sub">Live Website • WooCommerce Build</div></div><div className="live-pill"><i />Live</div></div>
              </div>
              <div className="hero-badge hero-badge-1">Fast Delivery</div>
              <div className="hero-badge hero-badge-2">50+ Projects Done</div>
              <div className="hero-badge hero-badge-3">WordPress Expert</div>
            </div>
          </div>
        </section>

        <section className="story-scroll" id="work">
          <div className="section-header" data-reveal><span className="tag tag-orange">Selected Work</span><h2 className="display-lg">Project stories built for trust and conversion.</h2></div>
          {projects.map((project) => (
            <article className="story-project" key={project.slug}>
              <div className="story-project-inner">
                <div className="story-project-info" data-reveal>
                  <span className="story-num">{project.number}</span><span className="story-category">{project.category} • {project.year}</span>
                  <h3 className="story-title">{project.title}</h3><p className="story-summary">{project.summary}</p>
                  <div className="story-stack">{project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
                  <div className="story-ctas"><a href={project.caseUrl} className="btn btn-primary btn-sm">View Case Study</a><a href={project.liveUrl} className="btn btn-ghost btn-sm">Live Site</a></div>
                </div>
                <div className="story-project-visual"><div className="story-visual" style={{ '--project-bg': `linear-gradient(135deg, ${project.bgFrom}, ${project.bgTo})`, '--project-accent': project.accent } as React.CSSProperties}><div className="story-visual-grid" /><div className="story-visual-inner"><span className="story-visual-label">{project.title}</span><div className="story-visual-accent" /></div></div></div>
              </div>
            </article>
          ))}
        </section>

        <section className="services" id="services">
          <div className="services-inner">
            <aside className="services-sticky" data-reveal><div className="services-big-num">50+</div><div className="services-big-label">Projects delivered across tourism, healthcare, technology, e-commerce, and booking systems.</div></aside>
            <div className="services-right"><div className="services-heading" data-reveal><span className="tag tag-orange">Services</span><h2 className="display-lg">Builds that look premium and work hard.</h2></div><div className="services-grid">{services.map((service) => <article className="service-card" data-reveal key={service.title}><div className="service-icon">{service.icon}</div><h3 className="service-title">{service.title}</h3><p className="service-desc">{service.summary}</p></article>)}</div></div>
          </div>
        </section>

        <section className="process" id="process">
          <div className="process-inner"><div className="section-header" data-reveal><span className="tag tag-orange">Process</span><h2 className="display-lg">Simple process. Premium output.</h2></div><div className="process-accordion" data-reveal>{processItems.map((item, index) => <article className={`process-item${activeProcess === index ? ' active' : ''}`} key={item.title}><button className="process-item-header" onClick={() => setActiveProcess(index)}><span className="process-num">{item.number}</span><span className="process-item-title">{item.title}</span><span className="process-item-indicator"><span className="process-plus" /></span></button><div className="process-item-body"><div className="process-body-inner"><p className="process-desc">{item.summary}</p><div className="process-image"><img src={withBase(item.image)} alt={item.title} loading="lazy" /></div></div></div></article>)}</div></div>
        </section>

        <section className="horizon"><div className="horizon-header" data-reveal><span className="tag tag-orange">Horizon Index</span><h2 className="display-lg">A cinematic scan of selected projects.</h2></div><div className="horizon-track">{projects.map((project) => <article className="horizon-card" key={project.slug} style={{ '--project-bg': `linear-gradient(135deg, ${project.bgFrom}, ${project.bgTo})` } as React.CSSProperties}><div className="horizon-card-bg" /><div className="horizon-card-overlay" /><div className="horizon-card-content"><div className="horizon-card-num">{project.number}</div><h3 className="horizon-card-title">{project.title}</h3><p className="horizon-card-cat">{project.industry}</p></div></article>)}</div></section>

        <section className="project-index"><div className="project-index-inner"><div className="project-index-header" data-reveal><div><span className="tag tag-orange">Project Index</span><h2 className="display-md">Clean project directory.</h2></div><a href="#contact" className="btn btn-ghost btn-sm" onClick={(e) => { e.preventDefault(); navTo('#contact'); }}>Start a build</a></div><div className="project-table-head"><span>No.</span><span>Project</span><span>Category</span><span>Industry</span><span /></div>{projects.map((project) => <a className="project-row" href={project.caseUrl} key={project.slug}><span className="project-row-num">{project.number}</span><span className="project-row-title">{project.title}</span><span className="project-row-cat">{project.category}</span><span className="project-row-industry">{project.industry}</span><span className="project-row-arrow">↗</span></a>)}</div></section>

        <section className="about" id="about"><div className="about-inner"><div className="about-portrait" data-reveal><div className="about-portrait-bg" /><div className="about-portrait-orb" /><div className="about-portrait-initials">AI</div><div className="about-portrait-badge"><div className="label text-orange">Available for premium builds</div><p className="text-muted">WordPress, WooCommerce, frontend motion, booking systems.</p></div></div><div className="about-right" data-reveal><span className="tag tag-orange">About</span><h2 className="display-lg">I build clean, fast, polished WordPress and frontend experiences.</h2><p className="about-bio">I help businesses launch premium websites with strong visual hierarchy, responsive layouts, conversion-focused sections, smooth animation, and reliable WordPress/WooCommerce implementation.</p><div className="about-skills">{skills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div><div className="about-stats"><div><div className="about-stat-num">3<span>+</span></div><div className="about-stat-label">Years experience</div></div><div><div className="about-stat-num">50<span>+</span></div><div className="about-stat-label">Projects delivered</div></div><div><div className="about-stat-num">8</div><div className="about-stat-label">Featured projects</div></div></div></div></div></section>

        <section className="contact" id="contact"><div className="contact-inner"><div className="contact-left" data-reveal><span className="tag tag-orange">Contact</span><h2 className="display-lg">Let’s work together.</h2><p className="body-lg text-muted">Send the reference, goal, timeline, and budget range. I’ll help shape it into a polished web experience.</p><div className="contact-card"><a href="https://wa.me/923054829714">WhatsApp: +923054829714</a><a href="mailto:adeeliqbalajum@gmail.com">adeeliqbalajum@gmail.com</a><a href="https://linkedin.com/in/adeelatwork/">linkedin.com/in/adeelatwork/</a></div></div><form className="contact-form" onSubmit={handleSubmit} data-reveal><div className="form-grid"><div className="field"><label>Name</label><input required placeholder="Your name" /></div><div className="field"><label>Email</label><input required type="email" placeholder="you@email.com" /></div></div><div className="form-grid"><div className="field"><label>Project Type</label><select defaultValue=""><option value="" disabled>Select type</option><option>WordPress Website</option><option>WooCommerce Store</option><option>Booking Website</option><option>Frontend Motion</option></select></div><div className="field"><label>Budget Range</label><select defaultValue=""><option value="" disabled>Select range</option><option>$500 - $1,000</option><option>$1,000 - $3,000</option><option>$3,000+</option></select></div></div><div className="field"><label>Message</label><textarea placeholder="Tell me about your website, reference links, timeline, and goals." /></div><button className="btn btn-primary" type="submit">Submit Project</button></form></div></section>
      </main>

      <footer className="footer"><span>© {currentYear} Adeel Iqbal. Premium WordPress Portfolio.</span><span>Built with Next.js, GSAP, Lenis, and static export.</span></footer>
    </div>
  );
}
