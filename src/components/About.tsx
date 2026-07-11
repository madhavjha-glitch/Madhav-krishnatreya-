import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Calendar, Heart, Languages, Award, Printer } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

export default function About() {
  const personalInfo = [
    { label: "Date of Birth", value: "12 July 2006", icon: Calendar },
    { label: "Languages Known", value: "Hindi, English (Fluent)", icon: Languages },
    { label: "Gender", value: "Male", icon: User },
    { label: "Nationality", value: "Indian", icon: Award },
    { label: "Marital Status", value: "Unmarried", icon: Heart },
  ];

  const handlePrint = () => {
    window.print();
  };

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
    hidden: { opacity: 0, y: 30 },
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
    <section id="about" className="py-20 bg-transparent border-b border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-1.5 px-4 py-1.5 border border-slate-800 bg-slate-900 text-slate-300 text-xs font-mono font-bold uppercase tracking-widest mb-3 rounded-full"
          >
            <span>About Me</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white font-sans tracking-tight transition-colors duration-300"
          >
            Professional Profile & Core Objective
          </motion.h2>
          <div className="w-16 h-[1px] bg-slate-850 mx-auto mt-4" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Objective Statement Card */}
          <motion.div
            variants={childVariants}
            className="lg:col-span-7"
          >
            <ThreeDCard>
              <div className="bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-850 shadow-md transition-colors duration-300">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center space-x-2 font-mono uppercase tracking-wider transition-colors duration-300">
                  <span className="w-1.5 h-1.5 bg-sky-500 inline-block rounded-full" />
                  <span>Career Vision</span>
                </h3>
                
                <p className="text-slate-400 text-base leading-relaxed mb-8 font-sans transition-colors duration-300">
                  A motivated and versatile BBA (Digital Marketing) student alongside being a passionate Full Stack Software Developer. Adept at engineering resilient web applications (TypeScript, React, Node.js) while driving high-impact digital marketing results through lead generation, advanced Excel & Google Sheets automation, and comprehensive social media management. Seeking to merge technology and marketing strategy to deliver end-to-end digital growth.
                </p>

                {/* Quick Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-950 p-6 border border-slate-850 rounded-2xl transition-colors duration-300">
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 border border-slate-800 bg-slate-900 flex items-center justify-center shrink-0 rounded-full text-sky-400 transition-colors duration-300">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest transition-colors duration-300">Phone</h4>
                      <a href="tel:9990715771" className="text-sm font-bold text-slate-200 hover:text-sky-400 transition-colors duration-300">
                        9990715771
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 border border-slate-800 bg-slate-900 flex items-center justify-center shrink-0 rounded-full text-sky-400 transition-colors duration-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest transition-colors duration-300">Email</h4>
                      <a href="mailto:madhavjha514@gmail.com" className="text-sm font-bold text-slate-200 hover:text-sky-400 transition-colors break-all duration-300">
                        madhavjha514@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5 sm:col-span-2">
                    <div className="w-10 h-10 border border-slate-800 bg-slate-900 flex items-center justify-center shrink-0 rounded-full text-sky-400 transition-colors duration-300">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest transition-colors duration-300">Location</h4>
                      <span className="text-sm font-bold text-slate-200 transition-colors duration-300">
                        Dheeraj Nagar, Faridabad, Haryana - 121003
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center space-x-2 px-5 py-3 border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white rounded-full transition-all duration-300 font-mono font-bold text-xs uppercase tracking-widest cursor-pointer shadow-md"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Resume / Save PDF</span>
                  </button>
                </div>
              </div>
            </ThreeDCard>
          </motion.div>

          {/* Personal Details Table Card */}
          <motion.div
            variants={childVariants}
            className="lg:col-span-5"
          >
            <ThreeDCard>
              <div className="bg-slate-900 border border-slate-850 rounded-3xl p-8 md:p-10 shadow-md relative transition-colors duration-300">
                <h3 className="text-lg font-bold mb-8 flex items-center space-x-2 font-mono uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-sky-500 inline-block rounded-full" />
                  <span className="text-white transition-colors duration-300">Personal Credentials</span>
                </h3>

                <div className="space-y-6">
                  {personalInfo.map((info, idx) => {
                    const Icon = info.icon;
                    return (
                      <div 
                        key={idx} 
                        className="flex items-center space-x-4 pb-4 border-b border-slate-800 last:border-0 last:pb-0 transition-colors duration-300"
                      >
                        <div className="w-9 h-9 border border-slate-800 bg-slate-950 flex items-center justify-center shrink-0 rounded-full text-sky-400 transition-colors duration-300">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest transition-colors duration-300">{info.label}</p>
                          <p className="text-base font-bold text-slate-200 transition-colors duration-300">{info.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ThreeDCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
