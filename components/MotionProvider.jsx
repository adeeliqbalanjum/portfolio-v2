'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function MotionProvider() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    const moveCursor = (event) => {
      gsap.to(cursorGlow, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.65,
        ease: 'power3.out'
      });
    };
    window.addEventListener('pointermove', moveCursor, { passive: true });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ambient',
        { y: 0, x: 0, scale: 0.92, opacity: 0 },
        { y: -34, x: 18, scale: 1, opacity: 1, duration: 1.4, stagger: 0.16, ease: 'power3.out' }
      );

      gsap.to('.ambient-one', {
        y: 72,
        x: 30,
        ease: 'none',
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 }
      });

      gsap.to('.ambient-two', {
        y: -58,
        x: -42,
        ease: 'none',
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 }
      });

      gsap.fromTo(
        '[data-reveal], .section-heading, .stat-card, .service-card, .process-card, .tech-pill, .contact-card, .contact-form',
        { y: 42, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.95,
          stagger: 0.055,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.utils.toArray('.section-heading').forEach((heading) => {
        const elements = heading.querySelectorAll('.eyebrow, h2, p');
        gsap.fromTo(
          elements,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: heading, start: 'top 82%', once: true }
          }
        );
      });

      gsap.utils.toArray('.motion-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 80, rotateX: -12, opacity: 0, scale: 0.95 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: index * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 83%', once: true }
          }
        );
      });

      gsap.utils.toArray('.project-card').forEach((card, index) => {
        const image = card.querySelector('.project-image img');
        const content = card.querySelector('.project-content');

        gsap.fromTo(
          card,
          { y: 70, opacity: 0, scale: 0.965, rotateX: -5 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.05,
            delay: (index % 2) * 0.07,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 82%', once: true }
          }
        );

        if (image) {
          gsap.to(image, {
            yPercent: -7,
            scale: 1.06,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
          });
        }

        if (content) {
          gsap.fromTo(
            content.children,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.055,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 76%', once: true }
            }
          );
        }
      });

      gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 ? -18 : 18,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.2 }
        });
      });

      gsap.utils.toArray('.process-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 52, rotate: index % 2 ? 2 : -2, opacity: 0 },
          {
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.85,
            delay: index * 0.05,
            ease: 'back.out(1.4)',
            scrollTrigger: { trigger: card, start: 'top 86%', once: true }
          }
        );
      });

      gsap.utils.toArray('.about-media, .contact-form').forEach((panel) => {
        gsap.to(panel, {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 1 }
        });
      });

      gsap.utils.toArray('.magnetic, .project-links a, .header-cta').forEach((button) => {
        const move = (event) => {
          const rect = button.getBoundingClientRect();
          const x = event.clientX - rect.left - rect.width / 2;
          const y = event.clientY - rect.top - rect.height / 2;
          gsap.to(button, { x: x * 0.14, y: y * 0.16, duration: 0.28, ease: 'power3.out' });
        };

        const leave = () => gsap.to(button, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.45)' });

        button.addEventListener('mousemove', move);
        button.addEventListener('mouseleave', leave);
      });

      gsap.utils.toArray('.project-card, .service-card, .motion-card').forEach((card) => {
        const enter = () => gsap.to(card, { rotateX: 0, rotateY: 0, y: -6, duration: 0.35, ease: 'power3.out' });
        const leave = () => gsap.to(card, { rotateX: 0, rotateY: 0, y: 0, duration: 0.55, ease: 'power3.out' });
        const move = (event) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const relX = x / rect.width - 0.5;
          const relY = y / rect.height - 0.5;
          card.style.setProperty('--mx', `${x}px`);
          card.style.setProperty('--my', `${y}px`);
          gsap.to(card, { rotateY: relX * 4, rotateX: -relY * 4, duration: 0.35, ease: 'power3.out' });
        };
        card.addEventListener('mouseenter', enter);
        card.addEventListener('mousemove', move);
        card.addEventListener('mouseleave', leave);
      });

      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
      window.removeEventListener('pointermove', moveCursor);
      cursorGlow.remove();
    };
  }, []);

  return null;
}
