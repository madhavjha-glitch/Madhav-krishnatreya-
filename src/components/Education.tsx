import { motion } from 'motion/react';
import { GraduationCap, Calendar, Award, School, Sparkles, Trophy } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

export default function Education() {
  const educationList = [
    {
      qualification: "BBA (Digital Marketing) — Pursuing",
      institution: "Aravali College of Engineering and Management",
      year: "2025 - 2028",
      score: "Ongoing Study",
      isCurrent: true,
      details: "Pursuing specialized commerce and marketing foundations. Mastering Lead Generation funnels, Advanced Excel & Google Sheets automation, organic SEO ranking audits, and cross-platform Social Media management.",
      icon: Trophy
    },
    {
      qualification: "Full Stack Software Engineering — Specialized Track",
      institution: "Self-Directed Advanced Engineering Study",
      year: "2024 - Present",
      score: "Ongoing Practice",
      isCurrent: true,
      details: "Comprehensive training in modern frontend architectures (React/Vite), database modeling (MongoDB/PostgreSQL), secure API design (Express/Node.js), and container orchestration (Docker/Nginx).",
      icon: Award
    },
    {
      qualification: "Senior Secondary (Class 12)",
      institution: "M.V.M Sr. Sec. School | HBSE Board",
      year: "Completed: 2025",
      score: "50%",
      isCurrent: false,
      details: "Focused on core business studies, commerce streams, communication techniques, and computer systems.",
      icon: School
    },
    {
      qualification: "Secondary (Class 10)",
      institution: "M.V.M Sr. Sec. School | HBSE Board",
      year: "Completed: 2023",
      score: "63%",
      isCurrent: false,
      details: "General secondary education with distinction in mathematics, science, and computer concepts.",
      icon: School
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <section id="education" className="py-20 bg-transparent border-b border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-1.5 px-4 py-1.5 border border-slate-800 bg-slate-900 text-slate-300 text-xs font-mono font-bold uppercase tracking-widest mb-3 rounded-full transition-colors duration-300 shadow-md"
          >
            <span>Academic Profile</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white font-sans tracking-tight transition-colors duration-300"
          >
            Education & Certifications
          </motion.h2>
          <div className="w-16 h-[1px] bg-slate-850 mx-auto mt-4" />
        </div>

        {/* Education Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {educationList.map((edu, idx) => {
            const Icon = edu.icon;

            return (
              <motion.div
                key={idx}
                variants={childVariants}
                className="w-full h-full"
              >
                <ThreeDCard className="w-full h-full">
                  <div
                    className={`relative rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between w-full h-full ${
                      edu.isCurrent
                        ? 'bg-slate-900 border-sky-900/60 text-slate-200 shadow-lg z-10'
                        : 'bg-slate-900/50 border-slate-850 text-slate-300 shadow-sm hover:border-slate-800'
                    }`}
                  >
                    <div>
                      {/* Visual badge/indicator for current studies */}
                      {edu.isCurrent && (
                        <span className="absolute top-6 right-6 inline-flex items-center space-x-1 px-3 py-1.5 border border-sky-950 bg-sky-950/40 text-sky-400 text-[10px] font-mono font-bold uppercase tracking-widest animate-pulse rounded-full shadow-sm">
                          <Sparkles className="w-3 h-3 text-sky-400" />
                          <span>In Progress</span>
                        </span>
                      )}

                      {/* Card Icon */}
                      <div className={`w-12 h-12 flex items-center justify-center mb-6 rounded-full border transition-colors duration-300 ${
                        edu.isCurrent
                          ? 'border-sky-900 bg-sky-950/40 text-sky-400'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Qualification & Year */}
                      <div className="mb-4 font-sans">
                        <span className={`inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-widest mb-2 transition-colors duration-300 ${
                          edu.isCurrent ? 'text-sky-400' : 'text-slate-500'
                        }`}>
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{edu.year}</span>
                        </span>
                        <h3 className="text-lg md:text-xl font-extrabold leading-tight mb-2 text-white font-sans transition-colors duration-300">
                          {edu.qualification}
                        </h3>
                        <p className={`text-xs font-mono font-bold uppercase tracking-widest transition-colors duration-300 ${edu.isCurrent ? 'text-slate-300' : 'text-slate-400'}`}>
                          {edu.institution}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className={`w-full h-px my-6 transition-colors duration-300 ${edu.isCurrent ? 'bg-slate-800' : 'bg-slate-800/60'}`} />

                      {/* Details Description */}
                      <p className="text-xs md:text-sm leading-relaxed mb-6 text-slate-400 font-sans transition-colors duration-300">
                        {edu.details}
                      </p>
                    </div>

                    {/* Score Indicator */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest transition-colors duration-300">
                        ACADEMIC SCORE
                      </span>
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 border rounded-full transition-colors duration-300 ${
                        edu.isCurrent
                          ? 'border-sky-900 bg-sky-950/40 text-sky-400'
                          : 'border-slate-800 bg-slate-950 text-slate-300'
                      }`}>
                        {edu.score}
                      </span>
                    </div>
                  </div>
                </ThreeDCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
