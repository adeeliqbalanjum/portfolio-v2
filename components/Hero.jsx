'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroScene from '@/components/HeroScene';
import { asset, site } from '@/lib/site';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('[data-hero-reveal]', {
        y: 34,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.9,
        stagger: 0.08
      })
        .from(
          '.hero-word span',
          {
            yPercent: 112,
            rotate: 2,
            duration: 1.05,
            stagger: 0.06
          },
          0.08
        )
        .from(
          '.hero-orbit-panel',
          {
            y: 48,
            scale: 0.94,
            opacity: 0,
            duration: 1.15
          },
          0.34
        );

      gsap.to('.hero-orbit-panel', {
        y: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to('.hero-bg-ring', {
        rotate: 18,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section hero-rebuilt" id="hero" ref={heroRef}>
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-bg-ring" aria-hidden="true" />
      <div className="hero-soft hero-soft-one" aria-hidden="true" />
      <div className="hero-soft hero-soft-two" aria-hidden="true" />

      <div className="container hero-center">
        <div className="status-pill" data-hero-reveal>
          <span /> Available for freelance projects
        </div>

        <h1 className="hero-title" aria-label={site.headline}>
          <span className="hero-word"><span>Premium WordPress</span></span>
          <span className="hero-word"><span>websites, built</span></span>
          <span className="hero-word"><span>to convert.</span></span>
        </h1>

        <p className="hero-lead" data-hero-reveal>
          I turn Figma files, reference designs, and business ideas into fast, responsive WordPress experiences with clean UI, premium motion, and conversion-focused structure.
        </p>

        <div className="hero-actions" data-hero-reveal>
          <a className="btn btn-primary magnetic" href={asset('/#work')}>Explore work</a>
          <a className="btn btn-secondary magnetic" href={asset('/#contact')}>Start a project</a>
          <a className="btn btn-ghost magnetic" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>

        <div className="hero-orbit-panel" aria-hidden="true">
          <HeroScene />
          <div className="hero-glass-card hero-card-top">
            <small>Selected Stack</small>
            <strong>WordPress · WooCommerce · GSAP · Three.js</strong>
          </div>
          <div className="hero-glass-card hero-card-bottom">
            <small>Core Offer</small>
            <strong>Figma to WordPress, booking sites & speed optimization</strong>
          </div>
        </div>

        <div className="hero-metrics" data-hero-reveal>
          <span><strong>3+</strong> years experience</span>
          <span><strong>50+</strong> projects delivered</span>
          <span><strong>6s → &lt;2s</strong> speed improvements</span>
        </div>
      </div>
    </section>
  );
}
