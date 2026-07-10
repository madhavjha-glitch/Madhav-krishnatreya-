import { motion } from 'motion/react';
import { Briefcase, Calendar, CheckCircle2, TrendingUp, Cpu, Award } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

export default function Experience() {
  const experiences = [
    {
      role: "Digital Marketing Intern",
      company: "Agski 360",
      duration: "Completed",
      highlights: [
        "Assisted in planning and executing high-impact digital marketing campaigns across key social media platforms.",
        "Supported creative content creation, detailed audience research, and multi-channel performance tracking of marketing activities.",
        "Gained comprehensive practical exposure to digital marketing suites and advanced AI-assisted content workflows."
      ],
      skillsLearned: ["Social Media Marketing", "Audience Research", "Performance Analytics", "AI Content Workflows"],
      icon: TrendingUp,
      color: "bg-indigo-50 border-indigo-200 text-indigo-700"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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
    <section id="experience" className="py-20 bg-transparent border-b border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-1.5 px-4 py-1.5 border border-slate-800 bg-slate-900 text-slate-300 text-xs font-mono font-bold uppercase tracking-widest mb-3 rounded-full shadow-md"
          >
            <span>Professional Journey</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white font-sans tracking-tight transition-colors duration-300"
          >
            Work Experience & Internships
          </motion.h2>
          <div className="w-16 h-[1px] bg-slate-850 mx-auto mt-4" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          {experiences.map((exp, idx) => {
            return (
              <motion.div
                key={idx}
                variants={childVariants}
                className="w-full h-full mb-8 last:mb-0"
              >
                <ThreeDCard className="w-full h-full">
                  <div className="relative bg-slate-900 border border-slate-850 rounded-3xl p-8 md:p-10 shadow-md hover:shadow-lg transition-colors duration-300 w-full h-full">
                    {/* Timeline badge banner */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800 transition-colors duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 border border-slate-800 bg-slate-950 flex items-center justify-center text-sky-400 shrink-0 rounded-full transition-colors duration-300">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-extrabold text-white transition-colors duration-300">{exp.role}</h3>
                          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest mt-1 transition-colors duration-300">{exp.company}</p>
                        </div>
                      </div>
                      <div className="inline-flex items-center space-x-1.5 px-4 py-1.5 border border-slate-800 bg-slate-950 text-slate-300 text-xs font-mono font-bold uppercase tracking-widest rounded-full shadow-md">
                        <Calendar className="w-4 h-4 text-sky-400" />
                        <span>Internship Completed</span>
                      </div>
                    </div>

                    {/* Objective responsibilities list */}
                    <div className="space-y-4 mb-8">
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3 transition-colors duration-300">Key Responsibilities & Deliverables:</h4>
                      {exp.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start space-x-3.5">
                          <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5 transition-colors" />
                          <p className="text-slate-300 text-sm md:text-base leading-relaxed transition-colors duration-300">{highlight}</p>
                        </div>
                      ))}
                    </div>

                    {/* Gained exposure section */}
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4 transition-colors duration-300">Gained Practical Tools & Methods:</h4>
                      <div className="flex flex-wrap gap-2.5">
                        {exp.skillsLearned.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 border border-slate-800 bg-slate-950 text-slate-300 rounded-full text-xs font-mono uppercase tracking-wider transition-colors duration-300"
                          >
                            <Award className="w-3.5 h-3.5 text-sky-400" />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
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
