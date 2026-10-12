import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ServerClient() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 6,
        rotateX: -y * 6,
        transformPerspective: 1000,
        ease: 'power2.out',
        duration: 0.5,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, ease: 'power2.out', duration: 0.7 });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    gsap.fromTo(
      card,
      { y: 35, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%', once: true },
      }
    );

    gsap.to('.ambient-blob-1', {
      scale: 1.25,
      opacity: 0.8,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    gsap.to('.ambient-blob-2', {
      scale: 1.2,
      opacity: 0.7,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    const pipelineTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    pipelineTl
      .fromTo(
        '.extract-packet',
        { attr: { cx: 75 }, opacity: 0 },
        { attr: { cx: 175 }, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.inOut' }
      )
      .to('.extract-packet', { opacity: 0, duration: 0.12 })
      .to('#staging-box', { stroke: '#a78bfa', duration: 0.25 })
      .fromTo(
        '#validator-check',
        { strokeDashoffset: 90 },
        { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out' }
      )
      .fromTo(
        '#dwh-packet',
        { attr: { cx: 295 }, opacity: 0 },
        { attr: { cx: 385 }, opacity: 1, duration: 0.6, ease: 'power1.inOut' }
      )
      .to('#dwh-packet', { opacity: 0, duration: 0.1 })
      .to('#dwh-core', {
        scale: 1.04,
        transformOrigin: 'center center',
        duration: 0.22,
        yoyo: true,
        repeat: 1,
        ease: 'back.out(2)',
      })
      .fromTo(
        ['.stream-bi', '.stream-ssrs'],
        { strokeDashoffset: 140 },
        { strokeDashoffset: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
      )
      .fromTo(
        '.output-badge',
        { scale: 0.95, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' },
        '-=0.2'
      )
      .to(['#validator-check', '.stream-bi', '.stream-ssrs'], {
        strokeDashoffset: 140,
        opacity: 0.4,
        duration: 0.4,
      })
      .to('#staging-box', { stroke: '#334155', duration: 0.3 });

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300">
      <div
        ref={cardRef}
        className="w-full rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-violet-700/40 shadow-[0_20px_50px_-15px_rgba(76,29,149,0.55)] backdrop-blur-2xl bg-gradient-to-br from-[#100a20]/95 via-[#0f0a1c]/90 to-[#0a0618]/95 relative overflow-hidden transition-all text-slate-100"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Ambient Glows */}
        <div className="ambient-blob-1 absolute -top-16 -left-16 w-56 h-56 bg-violet-500/20 rounded-full blur-[70px] pointer-events-none" />
        <div className="ambient-blob-2 absolute -bottom-16 -right-16 w-60 h-60 bg-fuchsia-500/20 rounded-full blur-[80px] pointer-events-none" />

        {/* Header Ribbon */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-violet-900/40 gap-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
            <span className="ml-2 font-mono text-[11px] sm:text-xs font-semibold text-slate-300 tracking-wide">
              ENTERPRISE DWH PIPELINE ARCHITECTURE
            </span>
          </div>

          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-950/60 text-violet-300 border border-violet-500/30 text-[10px] font-mono shadow-[0_0_10px_rgba(139,92,246,0.25)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            VALIDATED · 99.9% SLA
          </span>
        </div>

        {/* SVG Diagram */}
        <div className="w-full relative z-10">
          <svg
            viewBox="0 0 760 210"
            className="w-full h-auto max-h-[300px] select-none block"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <defs>
              <pattern id="grid-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="rgba(167, 139, 250, 0.10)" />
              </pattern>
              <linearGradient id="gradBi" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
              <linearGradient id="gradSsrs" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#e879f9" />
              </linearGradient>
            </defs>

            {/* Subtle Grid Background */}
            <rect width="760" height="210" fill="url(#grid-dots)" rx="12" />

            {/* Static Connector Paths */}
            <path d="M 75 45 L 175 90" stroke="rgba(139, 92, 246, 0.35)" strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M 75 105 L 175 105" stroke="rgba(139, 92, 246, 0.35)" strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M 75 165 L 175 120" stroke="rgba(139, 92, 246, 0.35)" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="295" y1="105" x2="385" y2="105" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 505 90 C 560 90, 565 55, 620 52" stroke="rgba(139, 92, 246, 0.35)" strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M 505 120 C 560 120, 565 155, 620 158" stroke="rgba(139, 92, 246, 0.35)" strokeWidth="1.2" strokeDasharray="3 3" />

            {/* Dynamic Animated Data Paths */}
            <path className="stream-bi" d="M 505 90 C 560 90, 565 55, 620 52" stroke="url(#gradBi)" strokeWidth="2" strokeDasharray="140" strokeDashoffset="140" />
            <path className="stream-ssrs" d="M 505 120 C 560 120, 565 155, 620 158" stroke="url(#gradSsrs)" strokeWidth="2" strokeDasharray="140" strokeDashoffset="140" />

            {/* Packets */}
            <circle className="extract-packet" cx="75" cy="45" r="3.5" fill="#a78bfa" />
            <circle className="extract-packet" cx="75" cy="105" r="3.5" fill="#a78bfa" />
            <circle className="extract-packet" cx="75" cy="165" r="3.5" fill="#a78bfa" />
            <circle id="dwh-packet" cx="295" cy="105" r="4.5" fill="#a78bfa" />

            {/* --- 1. SOURCES --- */}
            <g transform="translate(10, 22)">
              <rect x="0" y="0" width="65" height="42" rx="6" className="fill-slate-900/90 stroke-violet-800/60" strokeWidth="1.2" />
              <text x="32.5" y="19" textAnchor="middle" className="text-[9.5px] font-bold fill-slate-200">ERP</text>
              <text x="32.5" y="32" textAnchor="middle" className="text-[7.5px] font-mono fill-slate-400">SQL Server</text>

              <g transform="translate(0, 60)">
                <rect x="0" y="0" width="65" height="42" rx="6" className="fill-slate-900/90 stroke-violet-800/60" strokeWidth="1.2" />
                <text x="32.5" y="19" textAnchor="middle" className="text-[9.5px] font-bold fill-slate-200">Logistics</text>
                <text x="32.5" y="32" textAnchor="middle" className="text-[7.5px] font-mono fill-cyan-400">1B+ Records</text>
              </g>

              <g transform="translate(0, 120)">
                <rect x="0" y="0" width="65" height="42" rx="6" className="fill-slate-900/90 stroke-violet-800/60" strokeWidth="1.2" />
                <text x="32.5" y="19" textAnchor="middle" className="text-[9.5px] font-bold fill-slate-200">APIs / CRM</text>
                <text x="32.5" y="32" textAnchor="middle" className="text-[7.5px] font-mono fill-fuchsia-400">JSON Feeds</text>
              </g>
            </g>

            {/* --- 2. SSIS & STAGING --- */}
            <g transform="translate(175, 30)">
              <rect id="staging-box" width="120" height="150" rx="10" className="fill-slate-900/90 stroke-violet-700/50" strokeWidth="1.5" />
              <text x="60" y="24" textAnchor="middle" className="text-[10px] font-bold fill-violet-300">ETL / STAGING</text>
              <text x="60" y="38" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">100+ SSIS Packages</text>
              <line x1="12" y1="48" x2="108" y2="48" stroke="rgba(167, 139, 250, 0.25)" strokeWidth="1" />

              <rect x="14" y="56" width="92" height="22" rx="4" className="fill-slate-950 stroke-violet-900/60" strokeWidth="1" />
              <text x="20" y="70" className="text-[7.5px] font-mono fill-slate-300">Cleanse & Dedup</text>

              <rect x="14" y="84" width="92" height="22" rx="4" className="fill-slate-950 stroke-violet-900/60" strokeWidth="1" />
              <text x="20" y="98" className="text-[7.5px] font-mono fill-slate-300">SCD Type 2 Load</text>

              <g transform="translate(14, 114)">
                <rect width="92" height="22" rx="4" className="fill-cyan-950/40 stroke-cyan-500/30" strokeWidth="1" />
                <path id="validator-check" d="M 24 125 L 30 130 L 40 120" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeDasharray="90" strokeDashoffset="90" />
                <text x="46" y="127" className="text-[7.5px] font-mono fill-cyan-300 font-semibold">DQ VALIDATED</text>
              </g>
            </g>

            {/* --- 3. KIMBALL STAR SCHEMA DWH --- */}
            <g id="dwh-core" transform="translate(385, 25)">
              <rect width="120" height="160" rx="12" className="fill-slate-900/95 stroke-violet-500/70" strokeWidth="1.8" />
              <text x="60" y="24" textAnchor="middle" className="text-[11px] font-extrabold fill-violet-300">KIMBALL DWH</text>
              <text x="60" y="38" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">Star Schema Engine</text>
              <line x1="12" y1="48" x2="108" y2="48" stroke="rgba(139, 92, 246, 0.35)" strokeWidth="1" />

              <rect x="12" y="56" width="96" height="38" rx="5" className="fill-violet-950/60 stroke-violet-500/50" strokeWidth="1" />
              <text x="60" y="71" textAnchor="middle" className="text-[8.5px] font-bold fill-violet-200">Fact_Shipments</text>
              <text x="60" y="84" textAnchor="middle" className="text-[7px] font-mono fill-cyan-400">1B+ Records Partitioned</text>

              <g transform="translate(12, 102)">
                <rect width="45" height="20" rx="3" className="fill-slate-950 stroke-violet-900/60" strokeWidth="1" />
                <text x="22.5" y="115" textAnchor="middle" className="text-[7px] font-mono fill-slate-300">Dim_Date</text>

                <rect x="51" width="45" height="20" rx="3" className="fill-slate-950 stroke-violet-900/60" strokeWidth="1" />
                <text x="73.5" y="115" textAnchor="middle" className="text-[7px] font-mono fill-slate-300">Dim_Cust</text>

                <rect y="24" width="96" height="20" rx="3" className="fill-slate-950 stroke-violet-900/60" strokeWidth="1" />
                <text x="48" y="37" textAnchor="middle" className="text-[7px] font-mono fill-slate-300">15+ Dimensions</text>
              </g>
            </g>

            {/* --- 4. BI & REPORTING CONSUMPTION --- */}
            <g transform="translate(620, 25)">
              <g className="output-badge">
                <rect width="130" height="60" rx="8" className="fill-slate-900/95 stroke-cyan-500/50" strokeWidth="1.2" />
                <text x="65" y="22" textAnchor="middle" className="text-[10px] font-bold fill-cyan-300">POWER BI</text>
                <text x="65" y="36" textAnchor="middle" className="text-[8px] fill-slate-300">20+ Executive KPIs</text>
                <text x="65" y="49" textAnchor="middle" className="text-[7px] font-mono fill-slate-400">Shipment-Dwell Analysis</text>
              </g>

              <g transform="translate(0, 95)" className="output-badge">
                <rect width="130" height="60" rx="8" className="fill-slate-900/95 stroke-fuchsia-500/50" strokeWidth="1.2" />
                <text x="65" y="22" textAnchor="middle" className="text-[10px] font-bold fill-fuchsia-300">SSRS REPORTING</text>
                <text x="65" y="36" textAnchor="middle" className="text-[8px] fill-slate-300">50+ Paginated Reports</text>
                <text x="65" y="49" textAnchor="middle" className="text-[7px] font-mono fill-slate-400">Automated Subscriptions</text>
              </g>
            </g>
          </svg>
        </div>

        {/* Technical Metric Footer */}
        <div className="mt-4 pt-3 border-t border-violet-900/40 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
            <span className="text-slate-300 font-semibold">T-SQL Optimization:</span>
            <span className="text-cyan-300 font-semibold">73% Speedup (15m ➔ &lt;4m)</span>
          </div>

          <div className="text-[10px] text-slate-400">
            Kimball · SQL Server · SSIS · SSAS · Power BI · SSRS
          </div>
        </div>
      </div>
    </div>
  );
}