import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import GraphBackground from './components/GraphBackground';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function SectionDivider({ flip = false }) {
  return (
    <div className={`relative h-24 overflow-hidden pointer-events-none ${flip ? 'rotate-180' : ''}`}>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-violet-400/50 dark:via-violet-500/40 to-transparent opacity-70" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-500/70 blur-[1px]" />
    </div>
  );
}

export default function App() {
  const rootRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('theme') || 'dark';
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#050614' : '#f6f4ff');
  }, [theme]);

  // Scroll progress
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      bar.style.width = `${p}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mouse glow
  useEffect(() => {
    const glow = document.getElementById('mouse-glow');
    if (!glow || window.matchMedia('(pointer: coarse)').matches) return;
    const onMove = (e) => {
      glow.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
      glow.style.opacity = '1';
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* Global GSAP reveals for any [data-reveal] element */
  useGSAP(
    () => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        const y = parseFloat(el.dataset.revealY) || 42;
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });

      /* Section dividers pulse in */
      gsap.utils.toArray('.section-divider-dot').forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: dot, start: 'top 92%', once: true },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen bg-[#f6f4ff] dark:bg-[#050614] text-slate-800 dark:text-slate-100 transition-colors duration-500 selection:bg-violet-500 selection:text-white overflow-x-hidden font-sans"
    >
      {/* Scroll progress */}
      <div
        id="scroll-progress"
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 z-50 transition-[width] duration-75"
        style={{ width: '0%' }}
      />

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <GraphBackground />
        <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-70" />
        <div className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-violet-500/10 dark:bg-violet-600/15 blur-[130px]" />
        <div className="absolute top-1/2 -right-40 w-[620px] h-[620px] rounded-full bg-fuchsia-500/10 dark:bg-fuchsia-600/12 blur-[150px]" />
        <div className="absolute -bottom-40 left-1/3 w-[520px] h-[520px] rounded-full bg-cyan-500/10 dark:bg-cyan-600/10 blur-[140px]" />
        <div
          id="mouse-glow"
          className="w-[500px] h-[500px] rounded-full bg-violet-500/10 dark:bg-violet-500/12 blur-[110px] opacity-0 transition-opacity duration-500 will-change-transform"
        />
      </div>

      <Navbar theme={theme} setTheme={setTheme} />

      <main className="relative z-10 pt-20 sm:pt-24">
        <Hero />
        <Stats />
        <SectionDivider />
        <Skills />
        <SectionDivider flip />
        <Projects />
        <SectionDivider />
        <Contact />
      </main>

      <footer className="relative z-10 py-10 px-4 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-white/5">
        <p>© {new Date().getFullYear()} Hamid Hassasi — Crafted with data in mind.</p>
      </footer>
    </div>
  );
}