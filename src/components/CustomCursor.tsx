'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring || window.matchMedia('(hover: none)').matches) return;

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let frame = 0;

    const move = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
    };

    const tick = () => {
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', move, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <><div ref={dotRef} className="cursor" /><div ref={ringRef} className="cursor-ring" /></>;
}
