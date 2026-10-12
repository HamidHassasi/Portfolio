import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FiHome, FiCode, FiBriefcase, FiMail, FiMoon, FiSun } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navItems = [
  { id: 'home', icon: <FiHome />, label: 'Home' },
  { id: 'skills', icon: <FiCode />, label: 'Skills' },
  { id: 'projects', icon: <FiBriefcase />, label: 'Projects' },
  { id: 'contact', icon: <FiMail />, label: 'Contact' },
];

function Tooltip({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs py-1.5 px-3 rounded-lg font-semibold shadow-lg whitespace-nowrap pointer-events-none"
    >
      {label}
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-100 rotate-45" />
    </motion.div>
  );
}

/* Magnetic wrapper — the inner content follows cursor a bit */
function Magnetic({ children, strength = 8 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.5, ease: 'power3.out' });
  };
  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="will-change-transform">
      {children}
    </div>
  );
}

export default function Navbar({ theme, setTheme }) {
  const isDarkMode = theme === 'dark';
  const setDarkMode = (v) => setTheme(v ? 'dark' : 'light');

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isThemeHovered, setIsThemeHovered] = useState(false);
  const [active, setActive] = useState('home');
  const navRef = useRef(null);

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: -50 });
    ScrollTrigger.create({
      start: 160,
      end: 'max',
      onUpdate: (self) => {
        const hide = self.direction === 1 && self.scroll() > 220;
        gsap.to(navRef.current, {
          yPercent: hide ? 26 : 0,
          scale: hide ? 0.9 : 1,
          opacity: hide ? 0 : 1,
          pointerEvents: hide ? 'none' : 'auto',
          duration: 0.45,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      },
    });
  }, { scope: navRef });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -55% 0px' }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={navRef} className="fixed left-1/2 pwa-nav-bottom z-50 will-change-transform">
      <motion.nav
        initial={{ y: 120, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.3 }}
        className="glass rounded-full px-4 py-2.5 flex items-center gap-1.5 shadow-[0_18px_50px_-10px_rgba(76,29,149,0.35)] dark:shadow-[0_18px_50px_-10px_rgba(0,0,0,0.75)]"
      >
        {navItems.map((item, index) => {
          const isActive = active === item.id;
          return (
            <Magnetic key={item.id} strength={6}>
              <motion.a
                href={`#${item.id}`}
                aria-label={item.label}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.14, y: -6 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                className={`relative p-3 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isActive
                    ? 'text-violet-600 dark:text-violet-300'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-violet-500/12 dark:bg-violet-400/15 ring-1 ring-violet-500/40 dark:ring-violet-400/40"
                  />
                )}
                <motion.span
                  animate={{ scale: isActive ? 1.12 : 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="relative z-10 text-xl"
                >
                  {item.icon}
                </motion.span>

                <AnimatePresence>
                  {hoveredIndex === index && <Tooltip key="tip" label={item.label} />}
                </AnimatePresence>
              </motion.a>
            </Magnetic>
          );
        })}

        <div className="w-px h-7 bg-slate-200 dark:bg-slate-700 mx-1.5 rounded-full" />

        <Magnetic strength={6}>
          <motion.button
            onClick={() => setDarkMode(!isDarkMode)}
            onMouseEnter={() => setIsThemeHovered(true)}
            onMouseLeave={() => setIsThemeHovered(false)}
            whileHover={{ scale: 1.15, y: -6, rotate: 10 }}
            whileTap={{ scale: 0.88, rotate: -10 }}
            transition={{ type: 'spring', stiffness: 420, damping: 18 }}
            aria-label="Toggle theme"
            className="relative p-3 rounded-full text-slate-500 dark:text-slate-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 transition-colors flex items-center justify-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDarkMode ? 'sun' : 'moon'}
                initial={{ rotate: -120, opacity: 0, scale: 0.4 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 120, opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl"
              >
                {isDarkMode ? <FiSun /> : <FiMoon />}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence>
              {isThemeHovered && <Tooltip key="tip" label={isDarkMode ? 'Light Mode' : 'Dark Mode'} />}
            </AnimatePresence>
          </motion.button>
        </Magnetic>
      </motion.nav>
    </div>
  );
}