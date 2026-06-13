'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function MotionProvider() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal], .service-card, .process-card, .stat-card, .tech-pill').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 86%',
              once: true
            }
          }
        );
      });

      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 46, opacity: 0, scale: 0.985 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 84%',
              once: true
            }
          }
        );
      });

      gsap.utils.toArray('.project-image img').forEach((image) => {
        gsap.to(image, {
          yPercent: -5,
          ease: 'none',
          scrollTrigger: {
            trigger: image,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        });
      });

      gsap.utils.toArray('.magnetic').forEach((button) => {
        const move = (event) => {
          const rect = button.getBoundingClientRect();
          const x = event.clientX - rect.left - rect.width / 2;
          const y = event.clientY - rect.top - rect.height / 2;
          gsap.to(button, { x: x * 0.18, y: y * 0.22, duration: 0.32, ease: 'power3.out' });
        };

        const leave = () => gsap.to(button, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.45)' });

        button.addEventListener('mousemove', move);
        button.addEventListener('mouseleave', leave);
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
