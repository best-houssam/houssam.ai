import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, Code, Wind, Flame, Terminal, Database, 
  Zap, GitBranch, Server, Cloud, Sparkles, Cpu, CpuIcon 
} from 'lucide-react';
import { Skill } from '../types';
import { skills } from '../data';

const iconMap: Record<string, any> = {
  Layers, Code, Wind, Flame, Terminal, Database, 
  Zap, GitBranch, Server, Cloud, Sparkles, Cpu
};

export default function TechRadar() {
  const categories = ['Frontend', 'Backend', 'DevOps & AI'] as const;
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('Frontend');

  const filteredSkills = skills.filter((s) => s.category === activeCategory);

  return (
    <div id="tech-radar-interactive" className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2.5 justify-center mb-12">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              id={`tech-tab-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xs font-display text-[10px] uppercase tracking-widest font-bold transition-all duration-300 relative cursor-pointer border ${
                isActive
                  ? 'text-black bg-white border-white'
                  : 'text-white/50 bg-[#0a0a0c] border-white/5 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute -inset-px rounded-xs bg-white/5 blur-sm -z-10"
                />
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Skills Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="wait">
          {filteredSkills.map((skill, index) => {
            const IconComponent = iconMap[skill.iconName] || CpuIcon;
            return (
              <motion.div
                key={skill.name}
                id={`skill-card-${skill.name.replace(/\s+/g, '-').toLowerCase()}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white/[0.02] border border-white/5 hover:border-white/20 backdrop-blur-md rounded-xs p-6 hover:shadow-xl hover:shadow-white/[0.01] transition-all group duration-300 flex items-start gap-5 relative overflow-hidden"
              >
                {/* Visual hover background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Glowing Icon Container */}
                <div className="w-12 h-12 rounded-xs bg-black flex items-center justify-center border border-white/5 group-hover:border-white/20 group-hover:bg-white/10 text-white/50 group-hover:text-white transition-all shrink-0">
                  <IconComponent className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
                </div>

                {/* Info and Level Progress */}
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-display text-sm font-bold text-white transition-colors">
                      {skill.name}
                    </h4>
                    <span className="font-mono text-[11px] font-semibold text-white/70">
                      {skill.level}%
                    </span>
                  </div>

                  <p className="font-sans text-xs text-white/60 leading-relaxed mb-4">
                    {skill.description}
                  </p>

                  {/* Progressive Meter */}
                  <div className="w-full h-1 bg-black rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-white/30 to-white rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
