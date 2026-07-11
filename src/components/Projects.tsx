import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Code, ExternalLink, Sparkles, Server, Laptop, Database, Terminal, Shield } from 'lucide-react';
import { Project } from '../types';
import ThreeDCard from './ThreeDCard';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'fullstack' | 'frontend' | 'backend' | 'devops'>('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to load projects from server:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { label: 'All Systems', value: 'all', icon: Terminal },
    { label: 'Full Stack', value: 'fullstack', icon: Laptop },
    { label: 'Frontend', value: 'frontend', icon: Code },
    { label: 'Backend', value: 'backend', icon: Server },
    { label: 'DevOps / Infra', value: 'devops', icon: Shield }
  ];

  // Filtering + Real-time Searching
  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' || 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.techStack.some(tech => tech.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 15,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id="projects" className="py-24 bg-transparent border-b border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-1.5 px-4 py-1.5 border border-slate-800 bg-slate-900 text-slate-300 text-xs font-mono font-bold uppercase tracking-widest mb-3 rounded-full shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>Interactive Software Repositories</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight"
          >
            Personal Production-Ready Projects
          </motion.h2>
          <div className="w-16 h-[1px] bg-slate-850 mx-auto mt-4" />
          <p className="text-slate-400 mt-4 text-sm max-w-xl mx-auto">
            Explore live production microservices, interactive systems, and APIs. Fully structured with relational schemas and robust test suites.
          </p>
        </div>

        {/* Dynamic Controls: Search + Categories */}
        <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          
          {/* Real-time search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects by title, stack (e.g., Redis)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-full focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none text-slate-100 text-sm placeholder:text-slate-500 font-medium transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-[10px] font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded-full transition-all duration-300"
              >
                Clear
              </button>
            )}
          </div>

          {/* Categories Tab Pill Controls */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value as any)}
                  className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-sky-600 text-white border-sky-600 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white shadow-md'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Projects Grid Display */}
        {isLoading ? (
          <div className="text-center py-24">
            <span className="inline-block w-10 h-10 border-4 border-slate-800 border-t-sky-500 rounded-full animate-spin" />
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mt-4">Connecting to full stack repo database...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 p-12 bg-slate-900 shadow-md rounded-3xl">
            <Code className="w-12 h-12 mx-auto mb-4 text-slate-500" />
            <h3 className="font-extrabold text-white text-base uppercase tracking-wider font-mono">No Repositories Found</h3>
            <p className="text-xs text-slate-400 mt-2">No projects match the query "{searchQuery || activeCategory}" in our catalog.</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => {
              
              return (
                <motion.div
                  key={project.id}
                  variants={childVariants}
                  className="w-full h-full"
                >
                    <ThreeDCard className="w-full h-full">
                      <div className="project-card-interactive bg-slate-900 border border-slate-850 rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full hover:border-slate-800 transition-colors duration-300 shadow-md">
                        
                        <div>
                          {/* Card Category tag + Feature star */}
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-full">
                              {project.category}
                            </span>
                            {project.featured && (
                              <span className="flex items-center space-x-1 text-[9px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-900 px-2.5 py-1 rounded-full">
                                <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                                <span>Featured Project</span>
                              </span>
                            )}
                          </div>

                          {/* Project Title */}
                          <h3 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">
                            {project.title}
                          </h3>

                          {/* Project Description */}
                          <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-6">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech Stack Pills */}
                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.techStack.map((tech) => (
                              <span 
                                key={tech} 
                                className="text-[10px] font-mono font-semibold bg-slate-950 text-slate-300 px-2.5 py-1 rounded-full border border-slate-800"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Actions links footer */}
                          <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1.5 text-xs font-mono font-bold uppercase text-slate-400 hover:text-sky-400 transition-colors"
                              >
                                <Code className="w-3.5 h-3.5" />
                                <span>Source Repo</span>
                              </a>
                            )}
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1.5 text-xs font-mono font-bold uppercase text-sky-400 hover:text-sky-300 transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Live Demo</span>
                              </a>
                            )}
                          </div>
                        </div>

                      </div>
                    </ThreeDCard>
                  </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
}
