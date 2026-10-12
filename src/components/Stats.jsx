import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATS = [
    { value: 1, suffix: 'B+', label: 'Max Table Records', decimals: 0, accent: 'from-blue-500 to-cyan-400' },
    { value: 100, suffix: '+', label: 'SSIS Packages Deployed', decimals: 0, accent: 'from-violet-500 to-fuchsia-400' },
    { value: 1, suffix: 'M+', label: 'Daily Processed Records', decimals: 0, accent: 'from-emerald-500 to-teal-400' },
    { value: 73, suffix: '%', label: 'Query Latency Reduction', decimals: 0, accent: 'from-amber-500 to-orange-400' },
];

export default function Stats() {
    const scope = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: { trigger: scope.current, start: 'top 85%', once: true },
        });

        tl.from('.stat-card', { y: 44, opacity: 0, scale: 0.94, stagger: 0.12, duration: 0.7 });

        gsap.utils.toArray('.stat-num').forEach((el, i) => {
            const s = STATS[i];
            const obj = { v: 0 };
            tl.to(obj, {
                v: s.value, duration: 1.6, ease: 'power2.out',
                onUpdate: () => { el.textContent = obj.v.toFixed(s.decimals); },
            }, 0.25 + i * 0.12);
        });
    }, { scope });

    return (
        <section id="stats" ref={scope} className="px-4 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {STATS.map((s) => (
                    <div key={s.label} className="stat-card relative glass rounded-3xl p-6 text-center
            overflow-hidden transition-transform duration-300 hover:-translate-y-1.5">
                        <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${s.accent} opacity-60`} />
                        <p className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${s.accent}`}>
                                <span className="stat-num">0</span>{s.suffix}
                            </span>
                        </p>
                        <p className="mt-2 text-xs md:text-sm font-medium uppercase tracking-wider
              text-slate-500 dark:text-slate-400">{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
