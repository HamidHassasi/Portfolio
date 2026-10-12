import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SplitHeading({ kicker, title, subtitle, gradient = false, spacing = 'mb-20' }) {
    const ref = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: 'power4.out' },
            scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        });

        tl.from('.sh-kicker', { autoAlpha: 0, y: 16, duration: 0.5 });

        if (gradient) {
            tl.fromTo('.sh-title',
                { clipPath: 'inset(0 100% 0 0)', y: 28 },
                {
                    clipPath: 'inset(0 0% 0 0)', y: 0, duration: 1,
                    onComplete: () => gsap.set('.sh-title', { clearProps: 'all' })
                }, 0.08);
        } else {
            tl.from('.sh-char', {
                yPercent: 115, stagger: 0.018, duration: 0.65,
                onComplete: () => gsap.set('.sh-char', { clearProps: 'all' }),
            }, 0.08);
        }

        tl.from('.sh-sub', { autoAlpha: 0, y: 18, duration: 0.6 }, '-=0.4');
    }, { scope: ref });

    return (
        <div ref={ref} className={`${spacing} text-center px-2`}>
            <span className="sh-kicker block text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-blue-500 dark:text-blue-400 mb-3">
                {kicker}
            </span>

            <h3 aria-label={title}
                className={`sh-title text-4xl md:text-5xl font-extrabold tracking-tight ${gradient
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 mb-4'
                    : 'text-slate-900 dark:text-white mb-6'
                    }`}>
                {!gradient && (
                    <span aria-hidden="true">
                        {title.split(' ').map((word, wi, arr) => (
                            <span key={wi} className="inline-block overflow-hidden align-bottom pb-2 -mb-2">
                                {word.split('').map((c, ci) => (
                                    <span key={ci} className="sh-char inline-block will-change-transform">{c}</span>
                                ))}
                                {wi < arr.length - 1 && '\u00A0'}
                            </span>
                        ))}
                    </span>
                )}
                {gradient && title}
            </h3>

            {subtitle && (
                <p className="sh-sub text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                    {subtitle}
                </p>
            )}
        </div>
    );
}