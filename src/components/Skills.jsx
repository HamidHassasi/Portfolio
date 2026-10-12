import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import SplitHeading from './SplitHeading';
import TechMarquee from './TechMarquee';

const skillCategories = [
  {
    title: 'Data Warehousing & Architecture',
    icon: '🏛️',
    tag: 'Core',
    skills: [
      'Kimball Dimensional Modeling',
      'Fact & Dimension Design',
      'Stage & Data Mart Design',
      'SLA & Dwell Metrics Architecture',
      'Data Cleansing & Validation',
    ],
  },
  {
    title: 'Database & SQL Engineering',
    icon: '⚡',
    tag: 'Performance',
    skills: [
      'SQL Server (Advanced)',
      'T-SQL Tuning & Rewriting',
      'Execution Plan Analysis',
      'Index Strategy & Partitioning',
      'PL-SQL & MongoDB Basics',
    ],
  },
  {
    title: 'ETL & Integration Pipelines',
    icon: '🔄',
    tag: 'Pipelines',
    skills: [
      'SSIS (100+ Packages)',
      'Python & pyodbc Automation',
      'REST API Data Extraction',
      'Multi-Source Data Ingestion',
      'Automated Batch Scheduling',
    ],
  },
  {
    title: 'BI, Analytics & Operations Research',
    icon: '📊',
    tag: 'Insights',
    skills: [
      'Power BI & DAX (Advanced)',
      'SSAS (Multidimensional / Tabular)',
      'SSRS & Report Builder (50+ Reports)',
      'MCDM & Fuzzy Logic Modeling',
      'SPSS Statistical Analysis',
    ],
  },
];

const pillContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};
const pillVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 320, damping: 20 },
  },
};

function SkillCard({ category, idx }) {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, rgba(139,92,246,0.15), transparent 68%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 44, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: (idx % 2) * 0.08, type: 'spring', stiffness: 90, damping: 16 }}
      whileHover={{ y: -8 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onMouseLeave={() => {
        mx.set(-400);
        my.set(-400);
      }}
      className="relative glass min-w-0 w-full rounded-3xl p-6 xl:p-7 group overflow-hidden h-full flex flex-col"
    >
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-900/[0.05] dark:ring-white/[0.06] group-hover:ring-violet-500/35 transition-all duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-grow min-w-0">
        <div className="flex items-start justify-between mb-5">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -6, 0], scale: 1.1 }}
            transition={{ duration: 0.55 }}
            className="text-3xl w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0
              bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10 dark:from-violet-500/25 dark:to-fuchsia-500/15
              border border-violet-500/20
              shadow-inner group-hover:shadow-lg group-hover:shadow-violet-500/25 transition-shadow duration-500"
          >
            {category.icon}
          </motion.div>
          <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full
            bg-violet-500/10 text-violet-600 dark:text-violet-300 border border-violet-500/20">
            {category.tag}
          </span>
        </div>

        <h4 className="text-base xl:text-lg font-bold mb-5 text-slate-800 dark:text-slate-100 leading-snug break-words">
          {category.title}
        </h4>

        <motion.div
          variants={pillContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap gap-1.5 mt-auto"
        >
          {category.skills.map((skill) => (
            <motion.span
              key={skill}
              variants={pillVariants}
              whileHover={{ scale: 1.08, y: -2 }}
              className="max-w-full truncate bg-slate-200/70 dark:bg-slate-800/50
                border border-slate-300/70 dark:border-slate-700/70
                text-slate-700 dark:text-slate-300
                text-[11px] px-2.5 py-1 rounded-full
                hover:bg-violet-500 hover:border-violet-500 hover:text-white
                dark:hover:bg-violet-500 dark:hover:border-violet-500
                transition-colors cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="pt-10 px-4 w-full max-w-6xl mx-auto">
      <div data-reveal>
        <SplitHeading
          spacing="mb-10 sm:mb-14 xl:mb-16"
          kicker="Competencies"
          title="Enterprise Data Arsenal"
          subtitle="A proven stack for high-volume dimensional modeling, multi-stage ETL pipelines, and executive BI dashboards."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
        {skillCategories.map((category, idx) => (
          <SkillCard key={category.title} category={category} idx={idx} />
        ))}
      </div>

      <div data-reveal>
        <TechMarquee />
      </div>
    </section>
  );
}