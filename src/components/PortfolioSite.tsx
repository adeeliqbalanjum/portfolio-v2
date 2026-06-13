'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import styles from './Portfolio.module.css';
import { processItems, projects, services, skills, type Project } from '@/data/portfolio';

const nav = ['Services', 'Work', 'Process', 'About', 'Contact'];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function PortfolioSite() {
  const root = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState('light');
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const searchItems = useMemo(() => [...projects.map(p => p.title), ...services.map(s => s.title)], []);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    const initial = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    const ctx = gsap.context(() => {
      gsap.to(`.${styles.progress}`, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true } });
      gsap.from(`.${styles.reveal}`, { y: 70, opacity: 0, duration: 1, ease: 'power3.out', stagger: .08, scrollTrigger: { trigger: `.${styles.hero}`, start: 'top 70%' } });
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
        gsap.from(el, { y: 56, opacity: 0, scale: .98, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%' } });
      });
      gsap.utils.toArray<HTMLElement>('[data-story]').forEach((el, i) => {
        gsap.fromTo(el.querySelector('img'), { scale: 1.12, rotate: i % 2 ? -3 : 3 }, { scale: 1, rotate: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom center', scrub: true } });
      });
      gsap.to(`.${styles.device}`, { rotateX: 0, rotateY: 0, scale: 1, scrollTrigger: { trigger: `.${styles.containerFeature}`, start: 'top bottom', end: 'center center', scrub: true } });
      gsap.utils.toArray<HTMLElement>('[data-rotate-project]').forEach((el, i) => {
        ScrollTrigger.create({ trigger: el, start: 'center center', onEnter: () => setActiveProject(projects[i]), onEnterBack: () => setActiveProject(projects[i]) });
      });
    }, root);
    return () => { ctx.revert(); lenis.destroy(); ScrollTrigger.killAll(); };
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Thanks — connect this form to your backend/Formspree before production.');
  };

  return <div ref={root} className={styles.shell}>
    <div className={styles.progress} />
    <div className={styles.blobOne} /><div className={styles.blobTwo} />

    <header className={styles.header}>
      <a className={styles.brand} href="#top">Adeel<span>.</span></a>
      <nav>{nav.map(n => <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>)}</nav>
      <div className={styles.actions}>
        <button onClick={() => setSearch(true)} aria-label="Search">⌕</button>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Theme">{theme === 'dark' ? '☀' : '☾'}</button>
        <a className={styles.primary} href="#contact">Start Project</a>
        <button className={styles.hamburger} onClick={() => setMenu(true)}>Menu</button>
      </div>
    </header>

    {menu && <div className={styles.overlay}><button onClick={() => setMenu(false)}>Close</button>{nav.map(n => <a onClick={() => setMenu(false)} key={n} href={`#${n.toLowerCase()}`}>{n}</a>)}</div>}
    {search && <div className={styles.overlay}><button onClick={() => setSearch(false)}>Close</button><h2>Search projects & services</h2><div className={styles.searchList}>{searchItems.map(i => <a key={i} href="#work" onClick={() => setSearch(false)}>{i}</a>)}</div></div>}

    <main id="top">
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={`${styles.kicker} ${styles.reveal}`}>Premium WordPress / WooCommerce Developer</p>
          <h1 className={styles.reveal}>Premium WordPress websites built to feel fast, polished, and ready to win clients.</h1>
          <p className={styles.reveal}>I turn Figma designs, approved references, and business ideas into fast, responsive, polished WordPress websites built for trust, leads, and conversion.</p>
          <div className={styles.ctas}><a className={styles.primary} href="#work">View Work</a><a className={styles.secondary} href="#contact">Start Project</a><a className={styles.ghost} href={`${basePath}/resume.html`}>Download Resume</a></div>
          <div className={styles.metrics}>{['50+ Projects','3+ Years','Fast Delivery'].map(m => <span key={m}>{m}</span>)}</div>
        </div>
        <div className={styles.mockup} data-reveal>
          <Image src="/screens/griffin-it.svg" alt="Project preview" width={900} height={580} priority />
          <span>Live Website</span><span>WordPress Build</span><span>Performance</span>
        </div>
      </section>

      <section id="work" className={styles.section}>
        <p className={styles.kicker}>Story scroll showcase</p><h2>Selected projects as premium case-study chapters.</h2>
        <div className={styles.storyGrid}>{projects.map(p => <article data-story data-reveal className={styles.story} key={p.title}><div><small>{p.number} / {p.category}</small><h3>{p.title}</h3><p>{p.summary}</p><div>{p.stack.map(s => <b key={s}>{s}</b>)}</div><a href={p.caseUrl}>View Case Study</a><a href={p.liveUrl}>Live Site</a></div><Image src={p.image} alt={p.title} width={900} height={580} loading="lazy" /></article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.rotateSection}`}>
        <div className={styles.stickyText}><p className={styles.kicker}>Text-rotate image scroll</p><h2>{activeProject.title}</h2><p>{activeProject.summary}</p><div>{activeProject.stack.map(s => <b key={s}>{s}</b>)}</div></div>
        <div className={styles.imageRail}>{projects.map(p => <figure data-rotate-project key={p.title}><Image src={p.image} alt={p.title} width={900} height={580} loading="lazy" /><figcaption>{p.number} {p.category}</figcaption></figure>)}</div>
      </section>

      <section className={`${styles.section} ${styles.containerFeature}`}><div className={styles.device}><Image src="/screens/desert-safari.svg" alt="Featured container scroll" width={1200} height={760} loading="lazy" /></div></section>

      <section id="services" className={`${styles.section} ${styles.services}`}><aside><strong>50+</strong><span>Projects delivered</span></aside><div><p className={styles.kicker}>Services</p><h2>Builds that look premium and work hard.</h2><div className={styles.cards}>{services.map(s => <article data-reveal key={s.title}><small>{s.metric}</small><h3>{s.title}</h3><p>{s.summary}</p></article>)}</div></div></section>

      <section id="process" className={styles.section}><p className={styles.kicker}>Process</p><h2>Simple process. Premium output.</h2><div className={styles.accordion}>{processItems.map((p,i) => <article className={i===0 ? styles.open : ''} key={p.title}><Image src={p.image} alt={p.title} fill sizes="(max-width: 800px) 100vw, 20vw" /><div><span>{p.number}</span><h3>{p.title}</h3><p>{p.summary}</p></div></article>)}</div></section>

      <section className={styles.section}><p className={styles.kicker}>Horizon index</p><div className={styles.horizon}>{projects.map(p => <article key={p.title}><Image src={p.image} alt={p.title} width={420} height={270} loading="lazy" /><small>{p.number}</small><h3>{p.title}</h3><p>{p.industry}</p></article>)}</div></section>

      <section className={styles.index}>{projects.map(p => <a key={p.title} href={p.caseUrl}><span>{p.number}</span><span>{p.category}</span><strong>{p.title}</strong><em>{p.industry}</em></a>)}</section>

      <section id="about" className={`${styles.section} ${styles.about}`}><div><p className={styles.kicker}>About</p><h2>I build clean, fast, polished WordPress and frontend experiences.</h2><p>I help businesses launch premium websites with strong visual hierarchy, responsive layouts, conversion-focused sections, and smooth animated interactions.</p><div>{skills.map(s => <b key={s}>{s}</b>)}</div></div><div className={styles.portrait}>3+ Years<br/>50+ Projects</div></section>

      <section id="contact" className={`${styles.section} ${styles.contact}`}><div><p className={styles.kicker}>Contact</p><h2>Let’s work together.</h2><p>Send the reference, goal, timeline, and budget range. I’ll help shape it into a polished web experience.</p><div className={styles.contactCard}><a href="https://wa.me/923054829714">WhatsApp: +923054829714</a><a href="mailto:adeeliqbalajum@gmail.com">adeeliqbalajum@gmail.com</a><a href="https://linkedin.com/in/adeelatwork/">linkedin.com/in/adeelatwork/</a></div></div><form onSubmit={submit}><input placeholder="Name" required/><input placeholder="Email" type="email" required/><select><option>Project Type</option><option>WordPress</option><option>WooCommerce</option><option>Frontend Motion</option></select><select><option>Budget Range</option><option>$500 - $1,000</option><option>$1,000 - $3,000</option><option>$3,000+</option></select><textarea placeholder="Message" rows={5}/><button className={styles.primary}>Submit Project</button></form></section>
    </main>
  </div>;
}
