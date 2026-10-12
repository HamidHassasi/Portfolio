import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/* GSAP quickTo cursor: snappy dot + trailing ring.
   Ring expands over interactive elements, squishes on click. */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const dx = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    let shown = false;
    const move = (e) => {
      if (!shown) { shown = true; gsap.to([dot, ring], { opacity: 1, duration: 0.3 }); }
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    };
    const over = (e) => {
      const hot = e.target.closest('a, button, input, textarea');
      gsap.to(ring, { scale: hot ? 2.3 : 1, duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(dot,  { scale: hot ? 0.4 : 1, duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
    };
    const down = () => gsap.to(ring, { scale: 0.75, duration: 0.15, overwrite: 'auto' });
    const up   = () => gsap.to(ring, { scale: 1, duration: 0.3, overwrite: 'auto' });
    const out  = () => { shown = false; gsap.to([dot, ring], { opacity: 0, duration: 0.3 }); };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.documentElement.addEventListener('mouseleave', out);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.documentElement.removeEventListener('mouseleave', out);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div ref={ringRef} className="absolute left-0 top-0 h-9 w-9 rounded-full
        border-[1.5px] border-blue-500/70 opacity-0 will-change-transform" />
      <div ref={dotRef} className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full
        bg-blue-500 opacity-0 will-change-transform" />
    </div>
  );
}