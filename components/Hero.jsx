'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import HeroScene from '@/components/HeroScene';
import { asset, site } from '@/lib/site';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-reveal]', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out'
      });
      gsap.from('.hero-visual-wrap', {
        y: 38,
        opacity: 0,
        scale: 0.97,
        duration: 1.05,
        delay: 0.18,
        ease: 'power3.out'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" id="hero" ref={heroRef}>
      <div className="hero-noise" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="status-pill" data-hero-reveal>
            <span></span> Available for freelance projects
          </div>
          <h1 data-hero-reveal>{site.headline}</h1>
          <p className="hero-lead" data-hero-reveal>
            {site.subheadline}
          </p>

          <div className="hero-actions" data-hero-reveal>
            <a className="btn btn-primary magnetic" href={asset('/#work')}>
              View selected work
            </a>
            <a className="btn btn-secondary magnetic" href={asset('/#contact')}>
              Start a project
            </a>
          </div>

          <div className="hero-mini-proof" data-hero-reveal>
            <span>3+ years experience</span>
            <span>50+ projects delivered</span>
            <span>6s → under 2s optimization</span>
          </div>
        </div>

        <div className="hero-visual-wrap">
          <HeroScene />
          <div className="hero-glass-card hero-card-top">
            <small>Selected stack</small>
            <strong>WordPress · WooCommerce · Next.js · GSAP</strong>
          </div>
          <div className="hero-glass-card hero-card-bottom">
            <small>Specialized in</small>
            <strong>Figma to WordPress & performance fixes</strong>
          </div>
        </div>
      </div>

      <div className="client-strip container" data-hero-reveal>
        <span>Featured builds</span>
        <a href="https://griffin-it.com/" target="_blank" rel="noreferrer">Griffin IT</a>
        <a href="https://dasertsafaridubai.com/" target="_blank" rel="noreferrer">Desert Safari Dubai</a>
        <a href="https://artisantechnologies.com/" target="_blank" rel="noreferrer">Artisan Technologies</a>
        <a href="https://Fastdocnow.com/" target="_blank" rel="noreferrer">FastDocNow</a>
      </div>
    </section>
  );
}
