import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiArrowDown, FiDownload } from 'react-icons/fi';
import ServerClient from './ServerClient';

const ROLES = [
  'Data Warehouse Specialist',
  'Project Manager & Business Analyst',
  'Data Analyst',
  'ERP Software Designer & Business Analyst',
  'Project-Based BI Specialist',
];

export default function Hero({ theme }) {
  const rootRef = useRef(null);
  const [roleIndex, setRoleIndex] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setRoleIndex((p) => (p + 1) % ROLES.length), 3200);
    return () => clearInterval(t);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-avatar', { opacity: 0, scale: 0.82, duration: 0.9 })
        .from('.hero-badge', { opacity: 0, y: 18, duration: 0.55 }, '-=0.55')
        .from(
          '.hero-title .word',
          { opacity: 0, y: 34, duration: 0.9, stagger: 0.06 },
          '-=0.4'
        )
        .from('.hero-role', { opacity: 0, y: 18, duration: 0.55 }, '-=0.5')
        .from('.hero-desc', { opacity: 0, y: 18, duration: 0.55 }, '-=0.4')
        .from('.hero-cta > *', { opacity: 0, y: 18, duration: 0.45, stagger: 0.09 }, '-=0.35')
        .from('.hero-scroll', { opacity: 0, y: 10, duration: 0.5 }, '-=0.2')
        .from('.hero-diagram', { opacity: 0, y: 60, duration: 1 }, '-=0.7');

      // Gentle floating for scroll indicator
      gsap.to('.hero-scroll-inner', {
        y: 8,
        duration: 1.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 md:px-8 text-center overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="hero-avatar relative mb-6 group cursor-pointer"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-violet-500 via-fuchsia-400 to-cyan-300 opacity-70 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full p-[3px] bg-slate-900 border border-violet-500/30 overflow-hidden shadow-2xl shadow-violet-950/50">
            <img
              src="1000009159.jpg"
              alt="Profile"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
              }}
              className="w-full h-full object-cover rounded-full"
            />
            <div className="hidden w-full h-full rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-violet-950 items-center justify-center font-mono font-bold text-xl text-violet-300">
              HH
            </div>
          </div>
          <div className="absolute bottom-1 right-2 flex items-center justify-center w-5 h-5 bg-slate-900 rounded-full border-2 border-slate-950">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Status */}
        <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/10 text-violet-600 dark:text-violet-300 text-xs font-mono mb-7 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
          </span>
          Open for High-Impact Projects
        </div>

        {/* Title */}
        <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-5 text-slate-900 dark:text-white leading-[1.05]">
          <span className="word inline-block mr-3">Hi,</span>
          <span className="word inline-block mr-3">I'm</span>
          <span className="word inline-block text-aurora">Hamid Hassasi</span>
        </h1>

        {/* Role rotator */}
        <div className="hero-role h-9 md:h-11 mb-7 flex items-center justify-center">
          <motion.span
            key={roleIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="text-lg md:text-2xl font-semibold font-mono bg-gradient-to-r from-violet-500 to-fuchsia-500 dark:from-violet-300 dark:to-cyan-300 bg-clip-text text-transparent"
          >
            {ROLES[roleIndex]}
          </motion.span>
        </div>

        {/* Description */}
        <p className="hero-desc max-w-2xl text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-9">
          Architecting resilient BI ecosystems, Kimball dimensional warehouses at billion-row scale,
          and automated ETL pipelines engineered for strict SLA and fault tolerance.
        </p>

        {/* CTA */}
        <div className="hero-cta flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 transition-all shadow-lg shadow-violet-500/30 active:scale-95 hover:shadow-xl hover:shadow-fuchsia-500/30"
          >
            Explore Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl font-medium text-sm border border-slate-300 dark:border-slate-800 hover:border-violet-500/60 dark:hover:border-violet-500/60 bg-white/40 dark:bg-white/5 backdrop-blur-sm transition-all active:scale-95 flex items-center gap-2"
          >
            <FiDownload size={14} /> Get In Touch
          </a>
        </div>
      </div>

      {/* Diagram */}
      <div className="hero-diagram w-full max-w-5xl">
        <ServerClient theme={theme} />
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
        <span>Scroll</span>
        <div className="hero-scroll-inner w-6 h-9 rounded-full border border-slate-300 dark:border-slate-700 flex items-start justify-center pt-1.5">
          <FiArrowDown size={12} />
        </div>
      </div>
    </section>
  );
}