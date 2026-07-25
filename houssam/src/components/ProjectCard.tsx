import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Github, ExternalLink, X, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  key?: string | number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCodeNotice, setShowCodeNotice] = useState(false);

  return (
    <>
      <motion.div
        id={`project-card-${project.id}`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
        whileHover={{ y: -6 }}
        className="group relative bg-white/[0.02] border border-white/5 rounded-xs overflow-hidden backdrop-blur-md hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-white/[0.01]"
      >
        {/* Card Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Project Image Panel */}
        <div className="relative aspect-video w-full overflow-hidden border-b border-white/5 bg-black">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 ease-out"
          />
          {/* Category Pill */}
          <span className="absolute top-4 left-4 px-3 py-1.5 rounded-xs font-mono text-[9px] uppercase tracking-widest text-white bg-black/90 backdrop-blur-md border border-white/10 shadow-lg">
            {project.category}
          </span>
        </div>

        {/* Card Metadata Content */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-display text-xl font-bold tracking-tight text-white transition-colors duration-300">
                {project.title}
              </h3>
              <p className="font-sans text-[11px] font-medium text-white/50 mt-1 uppercase tracking-wide">
                {project.subtitle}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-10 h-10 rounded-xs bg-white/5 hover:bg-white hover:text-black flex items-center justify-center text-white/70 transition-all duration-300 cursor-pointer"
              aria-label="Open project details"
            >
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>

          <p className="font-sans text-xs text-white/70 leading-relaxed line-clamp-3 mb-6">
            {project.description}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-black/40 rounded-xs border border-white/5 mb-6 transition-colors">
            {project.stats.map((st, i) => (
              <div key={i} className="text-center border-r last:border-0 border-white/5">
                <span className="block font-mono text-[9px] text-white/40 uppercase tracking-widest">{st.label}</span>
                <span className="block font-display text-xs font-bold text-white mt-0.5">{st.value}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-xs font-mono text-[9px] text-white/50 bg-white/5 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Cinematic Details Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            id={`project-modal-overlay-${project.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
          >
            {/* Modal Box */}
            <motion.div
              id={`project-modal-container-${project.id}`}
              initial={{ scale: 0.98, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative w-full max-w-4xl bg-[#09090b] border border-white/10 rounded-xs overflow-hidden shadow-2xl flex flex-col md:flex-row my-8"
            >
              {/* Image side */}
              <div className="relative md:w-1/2 aspect-video md:aspect-auto bg-black border-r border-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 to-transparent" />
                
                {/* Stats in Modal Cover */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1.5 rounded-xs font-mono text-[9px] uppercase tracking-widest text-white bg-black/90 border border-white/10 mb-4 inline-block">
                    {project.category}
                  </span>
                  <h4 className="font-display text-2xl font-bold text-white tracking-tight leading-tight">
                    {project.title}
                  </h4>
                  <p className="font-sans text-[11px] text-white/55 uppercase mt-1 tracking-wide">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Text details side */}
              <div className="p-8 md:w-1/2 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setShowCodeNotice(false);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-xs bg-black/60 border border-white/5 hover:bg-white/10 hover:border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-white/40 font-mono text-[9px] tracking-widest uppercase">
                    <span>Project Case Study</span>
                  </div>
                  
                  <p className="font-sans text-xs text-white/70 leading-relaxed">
                    {project.longDescription || project.description}
                  </p>

                  <h5 className="font-display text-xs uppercase tracking-widest font-bold text-white">
                    Metrics &amp; Benchmarks
                  </h5>

                  <ul className="space-y-1">
                    {project.stats.map((st, i) => (
                      <li key={i} className="flex items-center justify-between py-2 border-b border-white/5 text-[11px] font-mono">
                        <span className="text-white/40 uppercase tracking-wider">{st.label}</span>
                        <span className="text-white font-bold">{st.value}</span>
                      </li>
                    ))}
                  </ul>

                  <h5 className="font-display text-xs uppercase tracking-widest font-bold text-white">Integrated Stack</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-xs font-mono text-[9px] text-white bg-white/5 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {showCodeNotice && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-white/5 border border-white/10 text-[10px] font-mono text-white/80"
                    >
                      Repository available on request for confidentiality. Contact Houssam to request access.
                    </motion.div>
                  )}
                </div>

                <div className="flex gap-4 pt-6 mt-6 border-t border-white/5">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xs font-display text-[10px] uppercase tracking-wide font-bold bg-white text-black hover:bg-white/90 transition-colors"
                  >
                    <span>Launch App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xs font-display text-[10px] uppercase tracking-wide font-bold bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                    onClick={() => {
                      setShowCodeNotice(true);
                    }}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Source</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
