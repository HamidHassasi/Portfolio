import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FiCheckCircle } from 'react-icons/fi';
import SplitHeading from './SplitHeading';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projectsList = [
  {
    title: 'End-to-End Shipment-Dwell & Logistics Analytics',
    category: 'Supply Chain & Operational Intelligence',
    desc: 'Architected an end-to-end intelligence suite tracking dwell anomalies across nationwide logistics pipelines, enabling operational leads to pinpoint First, Mid, and Last Mile bottlenecks in near real-time.',
    highlights: [
      'Developed dwell-detection logic across transit nodes running scheduled jobs every 2 hours',
      'Designed Kimball-based dimensional star schema and robust ETL pipelines',
      'Adopted by 40+ active enterprise users, including 20+ senior & middle management stakeholders',
      'Monitors node SLA risks, dwell durations, and geographic performance patterns',
    ],
    tech: ['SQL Server', 'Power BI', 'SSIS', 'Kimball Model', 'DAX', 'Logistics SLA'],
    gradient: 'from-blue-600/30 to-indigo-600/30',
    borderGlow: 'hover:border-blue-500/50',
  },
  {
    title: 'High-Scale Enterprise Data Warehouse & ETL Engine',
    category: 'Data Warehouse Architecture',
    desc: 'Consolidated distributed enterprise operations into a unified Kimball dimensional warehouse, handling massive daily ingestion from 5+ disparate enterprise source systems.',
    highlights: [
      'Modeled ~10 Fact, 15 Dimension, and 20+ Stage tables handling a 1 Billion record primary table',
      'Engineered 100+ SSIS packages with incremental staging and data cleansing routines',
      'Reliably loads and validates >1,000,000 records daily with zero downtime',
      'Unified data structures across logistics, revenue-cost, and operational ERP modules',
    ],
    tech: ['SSIS', 'T-SQL', 'Dimensional Modeling', 'ETL Architecture', 'Staging Design'],
    gradient: 'from-emerald-600/30 to-teal-600/30',
    borderGlow: 'hover:border-emerald-500/50',
  },
  {
    title: 'Mission-Critical Query Tuning & Performance Optimization',
    category: 'Database Engine Optimization',
    desc: 'Conducted comprehensive SQL Server engine diagnostics, index refactoring, and execution plan restructuring to drastically eliminate query latency across high-concurrency reporting tables.',
    highlights: [
      'Cut mission-critical operational query execution time from 15+ minutes to under 4 minutes (73% reduction)',
      'Conducted deep Execution Plan analysis, index defragmentation, and filtered index design',
      'Refactored sub-optimal T-SQL logic and CTEs to minimize tempdb spills and I/O bottlenecks',
    ],
    tech: ['Execution Plan Analysis', 'T-SQL Tuning', 'Indexing Strategy', 'SQL Server Profiler'],
    gradient: 'from-orange-600/30 to-red-600/30',
    borderGlow: 'hover:border-orange-500/50',
  },
  {
    title: 'Key & Enterprise Customer Performance Intelligence',
    category: 'Commercial BI & Revenue Analysis',
    desc: 'Designed and deployed an enterprise-wide commercial intelligence solution covering ~1,000 corporate clients, completely phasing out error-prone manual Excel workflows.',
    highlights: [
      'Delivered 20+ actionable KPIs tracking client churn, sales trends, discounts, and campaigns',
      'Empowered commercial directors with customer loyalty and account profitability segmentation',
      'Automated data refresh schedules, eliminating manual consolidation overhead entirely',
    ],
    tech: ['Power BI', 'DAX', 'SSAS', 'Customer Segmentation', 'Sales Analytics'],
    gradient: 'from-pink-600/30 to-purple-600/30',
    borderGlow: 'hover:border-pink-500/50',
  },
  {
    title: 'Automated Reporting Suite & Python Scripting Engine',
    category: 'Reporting & Process Automation',
    desc: 'Created an enterprise reporting and validation backbone to automate scheduled regulatory and management reporting with strict data fidelity guarantees.',
    highlights: [
      'Authored 50+ enterprise SSRS / Report Builder reports for scheduled distribution',
      'Engineered Python (pyodbc) automation scripts for batch cleansing and validation checks',
      'Provided code reviews, ETL standardizations, and mentorship for a 4-person BI engineering team',
    ],
    tech: ['SSRS', 'Report Builder', 'Python', 'pyodbc', 'Team Mentorship'],
    gradient: 'from-amber-500/30 to-yellow-600/30',
    borderGlow: 'hover:border-amber-500/50',
  },
  {
    title: 'Housing Economics & Vacant Property Tax Analytics',
    category: 'Research & Public Policy Analytics',
    desc: 'Contributed to a national research project commissioned by the State Tax Affairs Organization, analyzing the impact of vacant property taxation on Iran\'s housing economy through rigorous statistical methods and decision-support datasets.',
    highlights: [
      'Performed descriptive and inferential statistical analysis, data cleansing, and data quality assessment across large housing datasets',
      'Prepared, validated and interpreted analytical outputs for research stakeholders and policy decision-makers',
      'Delivered actionable insights supporting evidence-based housing and taxation policy design',
    ],
    tech: ['Statistical Analysis', 'Data Cleansing', 'SPSS', 'Research Analytics', 'Public Policy'],
    gradient: 'from-sky-600/30 to-blue-600/30',
    borderGlow: 'hover:border-sky-500/50',
  },
  {
    title: 'Enterprise ERP Design & Business Process Engineering',
    category: 'ERP Architecture & Business Analysis',
    desc: 'Designed, developed and operationalized core ERP modules for Hesab Rayan Pars covering accounting, budgeting, treasury, procurement, inventory, assets, organizational structure and CRM.',
    highlights: [
      'Modeled and optimized business processes, designed database structures and mapped accounting codes across budget, treasury and CRM modules',
      'Engineered FIFO/LIFO inventory valuation, cost allocation control, and receivable/payable reconciliation logic',
      'Designed and operationalized SLA-driven sales, tariff, incentive and penalty calculation engines in collaboration with domain experts — the first time this time-dependent logic was productized',
      'Deployed across municipalities, Azad University units, Tavanir Co., and Isfahan province municipalities, serving 10,000+ users',
    ],
    tech: ['ERP', 'Business Analysis', 'Process Modeling', 'Database Design', 'FIFO/LIFO', 'CRM', 'SLA Logic'],
    gradient: 'from-indigo-600/30 to-violet-600/30',
    borderGlow: 'hover:border-indigo-500/50',
  },
  {
    title: 'Insurance Product Requirements & Domain Modeling',
    category: 'Insurance Domain & Product Analysis',
    desc: 'Led product requirements analysis and process documentation for a nationwide insurance platform serving insurers and their branches, covering policy issuance, endorsements, franchise rules and life insurance risk logic.',
    highlights: [
      'Designed and documented policy registration, endorsement, franchise and life insurance logic mapped to identifiable risk categories',
      'Operationalized tariff calculation, incentive schemes and life insurance mathematical reserve models in collaboration with actuarial domain experts',
      'Replaced manual Excel reporting with an automated mathematical reserve calculation engine',
      'Managed a 5-person business analysis team — task allocation, reviews, mentoring and performance evaluation — with stakeholder demos and structured feedback loops',
      'Also delivered the Bazargan Free Trade Zone customs warehousing & transportation side project, serving 100+ users',
    ],
    tech: ['Insurance Domain', 'Product Analysis', 'Actuarial Modeling', 'Requirements Engineering', 'Stakeholder Management'],
    gradient: 'from-rose-600/30 to-orange-600/30',
    borderGlow: 'hover:border-rose-500/50',
  },
  {
    title: 'HR Workforce & Overtime Analytics Suite',
    category: 'HR Business Intelligence',
    desc: 'Designed and developed 10+ KPIs and analytical dashboards for quantitative and qualitative control of human capital, focused on employee punctuality, overtime patterns and departmental performance.',
    highlights: [
      'Built KPI framework covering employee lateness, periodic/annual overtime comparison, department-level benchmarking, management-level analysis and holiday/special-day overtime',
      'Delivered actionable human-resources dashboards enabling data-driven workforce planning and policy evaluation',
      'Focused on quantitative and qualitative control of human capital using consolidated HR data sources',
    ],
    tech: ['Power BI', 'DAX', 'HR Analytics', 'KPI Design', 'T-SQL'],
    gradient: 'from-teal-600/30 to-emerald-600/30',
    borderGlow: 'hover:border-teal-500/50',
  },
];

const techContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const techItem = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 20 } },
};

function ProjectCard({ project, idx }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [4, -4]), { stiffness: 160, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-4, 4]), { stiffness: 160, damping: 20 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: (idx % 2) * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
      className={`relative glass rounded-3xl p-8 lg:p-10 group flex flex-col h-full border border-slate-200/50 dark:border-white/10 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 transition-shadow duration-500 ${project.borderGlow}`}
    >
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div
          className={`absolute -right-32 -top-32 w-96 h-96 bg-gradient-to-br ${project.gradient} rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-700 opacity-40 dark:opacity-80`}
        />
        <span className="proj-num absolute -bottom-6 right-4 text-[7rem] leading-none font-black text-slate-900/[0.04] dark:text-white/[0.05] select-none">
          {String(idx + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="relative z-10 flex flex-col flex-grow" style={{ transform: 'translateZ(30px)' }}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 block">
              {project.category}
            </span>
            <h4 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white pr-4 leading-tight">
              {project.title}
            </h4>
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-base">{project.desc}</p>

        <ul className="mb-8 space-y-2 flex-grow">
          {project.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
              <FiCheckCircle className="mt-1 mr-3 flex-shrink-0 opacity-70" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <motion.div
          variants={techContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate-200/50 dark:border-white/10"
        >
          {project.tech.map((tech) => (
            <motion.span
              key={tech}
              variants={techItem}
              whileHover={{ y: -3, scale: 1.06 }}
              className="text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-md backdrop-blur-md border border-slate-200/60 dark:border-white/10"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.utils.toArray('.proj-num').forEach((el, i) => {
      gsap.fromTo(el,
        { yPercent: i % 2 ? 55 : 30 },
        {
          yPercent: i % 2 ? -55 : -30, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="projects" className="pt-20 pb-10 px-4 max-w-7xl mx-auto relative z-10">
      <SplitHeading
        gradient
        kicker="Featured Work"
        title="Key DWH & BI Initiatives"
        subtitle="End-to-end data warehousing, high-throughput ETL orchestration, and executive operational decision-support systems."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {projectsList.map((project, idx) => (
          <ProjectCard key={project.title} project={project} idx={idx} />
        ))}
      </div>
    </section>
  );
}
