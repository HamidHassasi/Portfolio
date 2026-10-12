import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const TECH = [
  'SQL Server', 'T-SQL', 'Power BI', 'SSIS', 'SSAS', 'SSRS',
  'Kimball Modeling', 'DAX & MDX', 'Execution Plan Optimization',
  'Python (pyodbc)', 'REST API', 'MCDM & Fuzzy Logic',
  'Git', 'PL-SQL', 'MongoDB', 'Advanced Excel',
];

export default function TechMarquee() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useGSAP(() => {
    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50, duration: 24, ease: 'none', repeat: -1,
    });
  });

  const slow = () => gsap.to(tweenRef.current, { timeScale: 0.25, duration: 0.4 });
  const normal = () => gsap.to(tweenRef.current, { timeScale: 1, duration: 0.4 });

  return (
    <div
      className="mt-10 sm:mt-16 overflow-hidden py-2 mask-fade-x -mx-4 px-4"
      onMouseEnter={slow} onMouseLeave={normal}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {TECH.map((t) => (
              <span
                key={`${half}-${t}`}
                className="mx-1.5 sm:mx-2.5 whitespace-nowrap rounded-full
                  border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60
                  px-3.5 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold
                  text-slate-500 dark:text-slate-400 hover:text-violet-500 hover:border-violet-500/40 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}