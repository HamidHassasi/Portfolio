import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  FiMail,
  FiLinkedin,
  FiSend,
  FiCheckCircle,
  FiArrowUpRight,
} from 'react-icons/fi';
import SplitHeading from './SplitHeading';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const channels = [
  {
    icon: FiMail,
    label: 'Direct Email',
    value: 'Hamid Hassasi',
    href: 'mailto:hamidhassasii@gmail.com',
    color: 'from-violet-500 to-fuchsia-400',
    description: 'Direct communication for BI consultancy, contract & full-time roles',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'Hamid Hassasi',
    href: 'https://linkedin.com/in/hamid-hassasi-0b9346b6',
    color: 'from-sky-500 to-cyan-400',
    description: 'Connect for enterprise data engineering & BI discussions',
  },
];

function DrawnBorder() {
  const lineRef = useRef(null);

  useGSAP(() => {
    if (!lineRef.current) return;
    const len = lineRef.current.getTotalLength();
    gsap.set(lineRef.current, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(lineRef.current, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: lineRef.current, start: 'top 85%', once: true },
    });
  });

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl" fill="none">
      <rect
        ref={lineRef}
        x="1" y="1"
        width="calc(100% - 2px)" height="calc(100% - 2px)"
        rx="23"
        stroke="url(#contact-border-grad)"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient id="contact-border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#d946ef" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.75" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      const mailto = `mailto:hamidhassasii@gmail.com?subject=${encodeURIComponent(
        form.subject || 'Enterprise BI Inquiry'
      )}&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      )}`;
      window.location.href = mailto;
      setTimeout(() => setStatus('idle'), 4000);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-4 max-w-6xl mx-auto relative z-10">
      <div data-reveal>
        <SplitHeading
          gradient
          kicker="Contact"
          title="Let's touch with me"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Channels */}
        <div className="lg:col-span-2 space-y-4" data-reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 mb-2">
            Available Channels
          </p>

          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <motion.a
                key={ch.label}
                href={ch.href}
                target={ch.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative glass rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300 block overflow-hidden"
              >
                <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${ch.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${ch.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon size={18} />
                  </div>
                  <FiArrowUpRight
                    size={16}
                    className="text-slate-400 group-hover:text-violet-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {ch.label}
                  </div>
                  <div className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-violet-500 transition-colors">
                    {ch.value}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {ch.description}
                  </p>
                </div>
              </motion.a>
            );
          })}

          <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-500/[0.06] to-fuchsia-500/[0.04] border border-violet-500/20 text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
            <span className="font-bold text-violet-500 block mb-1">Expertise Coverage:</span>
            End-to-end Kimball dimensional modeling, 100+ SSIS package migrations, billion-row table optimization, and Power BI DAX performance tuning.
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3 relative glass rounded-3xl p-8 sm:p-10" data-reveal>
          <DrawnBorder />

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Send a Project Brief
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            Fill in the details below, and I will get back to you with architectural recommendations and timeline estimates.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Your Name
                </label>
                <input
                  type="text" required placeholder="e.g. John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email" required placeholder="john@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Subject / Scope
              </label>
              <input
                type="text" required placeholder="e.g. Data Warehouse Modernization / Dwell Dashboard"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Project Details & Data Volume
              </label>
              <textarea
                rows={5} required
                placeholder="Tell me about your data volume, sources, SLA needs, and target timelines…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status !== 'idle'}
              whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
              whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 animate-aurora text-white font-semibold text-sm shadow-lg shadow-violet-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-75"
            >
              {status === 'idle' && (<><FiSend /> Send Message</>)}
              {status === 'sending' && <span>Opening Client…</span>}
              {status === 'sent' && (<><FiCheckCircle /> Transmitted!</>)}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}