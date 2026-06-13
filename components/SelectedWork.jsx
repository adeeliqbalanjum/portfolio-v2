'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import { asset } from '@/lib/site';

export default function SelectedWork() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const countRef = useRef(null);
  const featured = projects.filter((project) => project.featured);
  const additional = projects.filter((project) => !project.featured);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let mm;
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();

      mm.add('(min-width: 901px)', () => {
        const cards = gsap.utils.toArray('.horizontal-card');

        gsap.set(cards, { transformPerspective: 1100, transformStyle: 'preserve-3d' });
        gsap.from(cards, {
          y: 82,
          opacity: 0,
          rotateY: -8,
          scale: 0.94,
          stagger: 0.07,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 72%', once: true }
        });

        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 120);

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.15,
            start: 'top top',
            end: () => `+=${getDistance() + window.innerHeight * 0.6}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) progressRef.current.style.width = `${self.progress * 100}%`;
              if (countRef.current) {
                const index = Math.min(featured.length, Math.max(1, Math.ceil(self.progress * featured.length)));
                countRef.current.textContent = `${String(index).padStart(2, '0')} / ${String(featured.length).padStart(2, '0')}`;
              }
            }
          }
        });

        const cleanupTilt = [];
        cards.forEach((card) => {
          const move = (event) => {
            const rect = card.getBoundingClientRect();
            const relX = (event.clientX - rect.left) / rect.width - 0.5;
            const relY = (event.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, {
              rotateY: relX * 9,
              rotateX: -relY * 7,
              y: -8,
              scale: 1.025,
              duration: 0.32,
              ease: 'power3.out'
            });
          };
          const leave = () => {
            gsap.to(card, {
              rotateY: 0,
              rotateX: 0,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: 'elastic.out(1, 0.5)'
            });
          };
          card.addEventListener('mousemove', move);
          card.addEventListener('mouseleave', leave);
          cleanupTilt.push(() => {
            card.removeEventListener('mousemove', move);
            card.removeEventListener('mouseleave', leave);
          });
        });

        return () => {
          cleanupTilt.forEach((cleanup) => cleanup());
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      mm.add('(max-width: 900px)', () => {
        gsap.from('.horizontal-card', {
          y: 42,
          opacity: 0,
          scale: 0.96,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 82%', once: true }
        });
      });

    }, sectionRef);

    return () => {
      mm?.revert();
      ctx.revert();
    };
  }, [featured.length]);

  return (
    <section className="work-horizontal-section" id="work" ref={sectionRef}>
      <div className="work-horizontal-head">
        <div>
          <span className="eyebrow">Selected work</span>
          <h2>Projects that move like a premium studio reel.</h2>
        </div>
        <p>
          Scroll through Figma-to-WordPress and reference-based builds with a pinned horizontal showcase, animated cards, and detailed case-study paths.
        </p>
      </div>

      <div className="horizontal-track" ref={trackRef}>
        {featured.map((project, index) => (
          <article className="horizontal-card" id={`project-${project.slug}`} key={project.slug}>
            <span className="horizontal-number">{String(index + 1).padStart(2, '0')}</span>
            <a className="horizontal-image" href={asset(`/projects/${project.slug}/`)}>
              {project.thumb ? (
                <img src={asset(project.thumb)} alt={`${project.title} website preview`} />
              ) : (
                <div className="project-placeholder">{project.title}</div>
              )}
            </a>
            <div className="horizontal-body">
              <span className="horizontal-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="horizontal-tags">
                <span>{project.industry}</span>
                {project.stack.slice(0, 2).map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="horizontal-actions">
                <a href={asset(`/projects/${project.slug}/`)}>View case study</a>
                <a href={project.liveUrl} target="_blank" rel="noreferrer">Live site ↗</a>
              </div>
            </div>
          </article>
        ))}
        <article className="horizontal-card horizontal-card-end" aria-label="Start a project call to action">
          <span className="horizontal-category">Your project</span>
          <h3>Ready to build something premium?</h3>
          <p>Send your brief, Figma file, reference website, or current WordPress problem. I’ll help you turn it into a clean, fast, client-winning experience.</p>
          <div className="horizontal-actions">
            <a href={asset('/#contact')}>Start a project</a>
          </div>
        </article>
      </div>

      <div className="work-progress" aria-hidden="true">
        <div className="work-progress-track"><span ref={progressRef} /></div>
        <div className="work-progress-labels">
          <span>Scroll to explore</span>
          <span ref={countRef}>01 / {String(featured.length).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="container additional-work horizontal-additional">
        <span className="eyebrow">More projects</span>
        <div className="mini-project-grid">
          {additional.map((project) => (
            <a href={asset(`/projects/${project.slug}/`)} key={project.slug}>
              <strong>{project.title}</strong>
              <span>{project.category} · {project.industry}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
