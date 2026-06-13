'use client';

import { useEffect, useRef, useState } from 'react';

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHidden(true);
      return;
    }

    let start = 0;
    const duration = 1400;
    const step = (time: number) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (progress < 1) requestAnimationFrame(step);
      else {
        setCount(100);
        setTimeout(() => {
          setDone(true);
          setTimeout(() => setHidden(true), 520);
        }, 180);
      }
    };

    requestAnimationFrame(step);
  }, []);

  if (hidden) return null;

  return (
    <div className={`preloader${done ? ' preloader-done' : ''}`}>
      <div className="preloader-label">Loading Portfolio</div>
      <div className="preloader-count">{String(count).padStart(2, '0')}</div>
      <div className="preloader-bar-wrap"><div ref={barRef} className="preloader-bar" /></div>
    </div>
  );
}
