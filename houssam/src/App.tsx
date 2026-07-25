import { useState, useEffect } from 'react';
import { 
  ChevronDown, ArrowUpRight, Mail, MessageSquare, Github, Linkedin, 
  Sparkles, Cpu, Brain, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Subcomponents
import Header from './components/Header';
import CanvasBackground from './components/CanvasBackground';
import ProjectCard from './components/ProjectCard';
import TechRadar from './components/TechRadar';
import TestimonialCarousel from './components/TestimonialCarousel';
import ContactForm from './components/ContactForm';

// Data
import { projects, services, processSteps, faqs } from './data';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [activePhilosophy, setActivePhilosophy] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Intersection Observer for highlighting the active header section
  useEffect(() => {
    const sections = ['about', 'philosophy', 'services', 'projects', 'technologies', 'process', 'faq', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const philosophies = [
    {
      title: 'Architectural Integrity',
      subtitle: 'Performant, scalable system structures',
      desc: 'Coding is an exact science. I design typed, modular infrastructures with strict TypeScript parameters, zero duplicate structures, and optimized server execution routes. Every database query, API handshake, and state cycle is tuned to conserve raw computational resources.',
      icon: Cpu,
      stats: 'Strict Type System'
    },
    {
      title: 'Pixel-Perfect Visual Polish',
      subtitle: 'Creative design meets frontend fluidity',
      desc: 'A premium digital asset must command attention through execution. I translate sophisticated layout templates into fluid React interfaces styled with responsive, high-density Tailwind classes, custom scroll transitions, and subtle hover interactions that respond organically to touch.',
      icon: Sparkles,
      stats: 'Aesthetic Execution'
    },
    {
      title: 'Strategic Alignment',
      subtitle: 'Transparent processes, flawless outcomes',
      desc: 'The best engineering serves strategic business objectives. I maintain open channels and project timelines, utilizing clean development blueprints and progress metrics. Deliverables are verified, fully documented, and production-ready from day one.',
      icon: Brain,
      stats: '100% Quality Output'
    }
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-white/10 selection:text-white bg-[#050505]">
      {/* Floating Header Navigation */}
      <Header activeSection={activeSection} />

      {/* Global Ambient Interactive Canvas Background */}
      <div className="absolute inset-0 z-0 h-[100vh] pointer-events-none overflow-hidden">
        <CanvasBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505]" />
      </div>

      {/* 1. HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 md:px-12 z-10"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center relative">
          
          {/* Subtle minimal upper glow orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.015] blur-[140px] rounded-full pointer-events-none -z-10" />

          {/* Simple Clean Role Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-8 bg-white/5 px-5 py-2.5 rounded-full border border-white/5 backdrop-blur-md"
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/60">
              Web Developer &amp; Frontend Architect
            </span>
          </motion.div>

          {/* Large Hero Statement */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white max-w-5xl leading-[1.05] mb-8 uppercase text-glow-minimal"
          >
            Synthesizing <span className="bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">Engineering</span> with Clean Design
          </motion.h1>

          {/* Subtitle statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="font-sans text-xs sm:text-sm text-white/50 max-w-2xl leading-relaxed mb-12 uppercase tracking-wide"
          >
            I am <span className="text-white font-semibold">Houssam</span>. I craft bespoke, responsive full-stack applications that pair robust backend performance with highly polished digital interactive layouts.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo('projects')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xs font-display text-[10px] uppercase tracking-widest font-bold text-black bg-white hover:bg-white/90 transition-all duration-300 cursor-pointer"
            >
              Explore Portfolio
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xs font-display text-[10px] uppercase tracking-widest font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer backdrop-blur-md animate-none"
            >
              Initiate Project
            </button>
          </motion.div>

          {/* Bouncing Scroll Down Trigger */}
          <button
            onClick={() => handleScrollTo('about')}
            className="text-white/30 hover:text-white transition-colors animate-bounce cursor-pointer flex flex-col items-center gap-2"
            aria-label="Scroll to About Section"
          >
            <span className="font-mono text-[9px] tracking-widest uppercase">Explore Details</span>
            <ChevronDown className="w-4 h-4 text-white/50" />
          </button>

        </div>
      </section>

      {/* 2. ABOUT ME SECTION */}
      <section
        id="about"
        className="relative py-28 px-6 md:px-12 bg-[#070709] border-t border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text panel (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-white/40 font-mono text-[9px] tracking-widest uppercase">
              <span>01 / Profile</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight">
              Bridging raw technical performance with refined visual design.
            </h2>

            <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
              I am a professional Full-Stack Web Developer dedicated to exceeding standard web limitations. My goal is to engineer scalable server configurations, structure clean database schemas, and unify them with lightweight, highly polished frontends.
            </p>

            <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
              Every project represents a deep collaboration to capture brand aesthetics and architectural stability. I avoid heavy templates and generic builders, ensuring that every codebase is handcrafted with clean type declarations, optimized query execution, and pristine layout styling.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6">
              <div className="border-l border-white/25 pl-4">
                <span className="block font-display text-2xl font-black text-white">7+</span>
                <span className="block font-sans text-[9px] text-white/40 uppercase tracking-widest mt-1">Years Experience</span>
              </div>
              <div className="border-l border-white/15 pl-4">
                <span className="block font-display text-2xl font-black text-white">120+</span>
                <span className="block font-sans text-[9px] text-white/40 uppercase tracking-widest mt-1">Deployments</span>
              </div>
              <div className="border-l border-white/10 pl-4">
                <span className="block font-display text-2xl font-black text-white">100%</span>
                <span className="block font-sans text-[9px] text-white/40 uppercase tracking-widest mt-1">Client Success</span>
              </div>
            </div>
          </div>

          {/* Clean Capability List (Right) */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-white/[0.01] border border-white/5 rounded-xs p-8 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Operator Credentials</span>
                <span className="px-2.5 py-0.5 rounded-xs font-mono text-[8px] text-white bg-white/10 border border-white/20 uppercase">Core Stack</span>
              </div>

              <div className="font-mono text-[11px] text-white/70 space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-white/30 uppercase tracking-wider">Developer:</span>
                  <span className="text-white font-medium">Houssam</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-white/30 uppercase tracking-wider">Primary Focus:</span>
                  <span className="text-white font-medium">Full-Stack Web Architect</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-white/30 uppercase tracking-wider">Technologies:</span>
                  <span className="text-white font-medium">React, Node, Postgres</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-white/30 uppercase tracking-wider">Standards:</span>
                  <span className="text-white font-medium">REST, APIs, Serverless</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white/30 uppercase tracking-wider">Optimized:</span>
                  <span className="text-white font-medium">Scale-to-Zero Deployment</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. MY PHILOSOPHY SECTION */}
      <section
        id="philosophy"
        className="relative py-28 px-6 md:px-12 z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-3">02 / Philosophy</span>
            <h2 className="font-display text-3xl font-black text-white tracking-tight uppercase">Core Principles</h2>
            <p className="font-sans text-xs text-white/50 mt-2">How I align structural stability with premium digital execution.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Tab Trigger Buttons (Left) */}
            <div className="lg:col-span-5 flex flex-col gap-4 justify-center">
              {philosophies.map((item, index) => {
                const PhilIcon = item.icon;
                const isActive = activePhilosophy === index;
                return (
                  <button
                    key={index}
                    id={`philosophy-trigger-${index}`}
                    onClick={() => setActivePhilosophy(index)}
                    className={`p-6 rounded-xs text-left border transition-all duration-300 relative cursor-pointer flex items-start gap-4 ${
                      isActive
                        ? 'bg-white/5 border-white/20'
                        : 'bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.01]'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xs flex items-center justify-center border transition-colors shrink-0 ${
                      isActive ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-white/5 text-white/30'
                    }`}>
                      <PhilIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`font-display text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-white/40'}`}>
                        {item.title}
                      </h4>
                      <p className="font-sans text-[10px] text-white/30 uppercase tracking-wider mt-0.5">{item.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Display Screen Panel (Right) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="bg-white/[0.01] border border-white/5 rounded-xs p-8 backdrop-blur-md min-h-[320px] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhilosophy}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <span className="px-3 py-1 bg-white/5 text-white font-mono text-[9px] uppercase tracking-widest rounded-xs border border-white/10 inline-block">
                      {philosophies[activePhilosophy].stats}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight">
                      {philosophies[activePhilosophy].title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
                      {philosophies[activePhilosophy].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 border-t border-white/5 pt-6 flex justify-between items-center text-[10px] font-mono text-white/30">
                  <span>SYSTEM OVERVIEW</span>
                  <span className="text-white/60">0{activePhilosophy + 1} / 03</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section
        id="services"
        className="relative py-28 px-6 md:px-12 bg-[#070709] border-t border-b border-white/5 z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-3">03 / Services</span>
            <h2 className="font-display text-3xl font-black text-white tracking-tight uppercase">Technical Engagements</h2>
            <p className="font-sans text-xs text-white/50 mt-2">Bespoke development architectures crafted to meet key product goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((srv, idx) => {
              // Icon maps
              let Icon = Cpu;
              if (srv.iconName === 'Sparkles') Icon = Sparkles;
              if (srv.iconName === 'Brain') Icon = Brain;

              return (
                <motion.div
                  key={srv.id}
                  id={`service-card-${srv.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white/[0.01] border border-white/5 hover:border-white/20 rounded-xs p-8 backdrop-blur-md transition-all group duration-300 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xs bg-black border border-white/5 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/5 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-xs font-mono text-[9px] font-semibold text-white/40 bg-white/5 uppercase">
                      {srv.tier}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-2 transition-colors">
                    {srv.title}
                  </h3>
                  
                  <p className="font-sans text-xs text-white/60 leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  <ul className="space-y-3 border-t border-white/5 pt-6">
                    {srv.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-white/70 font-sans">
                        <ChevronRight className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS SECTION */}
      <section
        id="projects"
        className="relative py-28 px-6 md:px-12 z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <div>
              <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-3">04 / Projects</span>
              <h2 className="font-display text-3xl font-black text-white tracking-tight uppercase">Featured Portfolio</h2>
            </div>
            <p className="font-sans text-xs text-white/50 max-w-md leading-relaxed">
              Explore responsive applications developed with highly optimized React elements and strict backend architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj, idx) => (
              <ProjectCard key={proj.id} project={proj} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. TECHNOLOGIES / TECH RADAR SECTION */}
      <section
        id="technologies"
        className="relative py-28 px-6 md:px-12 bg-[#070709] border-t border-b border-white/5 z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-3">05 / Radar</span>
            <h2 className="font-display text-3xl font-black text-white tracking-tight uppercase">Active Technology Stack</h2>
            <p className="font-sans text-xs text-white/50 mt-2">Explore the frontend frameworks, backend runtimes, and libraries in use.</p>
          </div>

          <TechRadar />
        </div>
      </section>

      {/* 7. DEVELOPMENT PROCESS TIMELINE SECTION */}
      <section
        id="process"
        className="relative py-28 px-6 md:px-12 z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-3">06 / Process</span>
            <h2 className="font-display text-3xl font-black text-white tracking-tight uppercase">Development Blueprint</h2>
            <p className="font-sans text-xs text-white/50 mt-2">The structured roadmap that transitions projects from specification to production.</p>
          </div>

          <div className="relative border-l border-white/5 ml-4 md:ml-0 md:grid md:grid-cols-5 md:border-l-0 md:border-t md:pt-12 gap-6 space-y-12 md:space-y-0">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative pl-8 md:pl-0">
                {/* Visual crisp white node marker */}
                <div className="absolute top-1.5 left-0 -translate-x-1/2 md:top-0 md:-translate-y-1/2 md:left-0 md:translate-x-0 w-8 h-8 rounded-xs bg-black border border-white/20 flex items-center justify-center font-mono text-[9px] text-white font-bold shadow-md">
                  {step.step}
                </div>

                <div className="space-y-2 md:pt-6">
                  <span className="block font-mono text-[9px] text-white/40 uppercase tracking-widest">{step.subtitle}</span>
                  <h4 className="font-display text-base font-bold text-white tracking-tight uppercase">{step.title}</h4>
                  <p className="font-sans text-xs text-white/60 leading-relaxed">{step.description}</p>
                  
                  <div className="pt-2">
                    <span className="inline-block font-mono text-[9px] text-white bg-white/5 px-2.5 py-1 rounded-xs border border-white/10 uppercase tracking-wider">
                      {step.metrics}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CLIENT TESTIMONIALS SECTION */}
      <section
        id="testimonials"
        className="relative py-28 px-6 md:px-12 bg-[#070709] border-t border-b border-white/5 z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-3">07 / Feedback</span>
            <h2 className="font-display text-3xl font-black text-white tracking-tight uppercase">Testimonials</h2>
            <p className="font-sans text-xs text-white/50 mt-2">Professional reviews from venture architects and product leads.</p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section
        id="faq"
        className="relative py-28 px-6 md:px-12 z-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-3">08 / FAQ</span>
            <h2 className="font-display text-3xl font-black text-white tracking-tight uppercase">Common Questions</h2>
            <p className="font-sans text-xs text-white/50 mt-2">In-depth explanations regarding development, timeline expectations, and deliverables.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white/[0.01] border border-white/5 rounded-xs overflow-hidden backdrop-blur-md hover:border-white/15 transition-colors"
                >
                  <button
                    id={`faq-trigger-${idx}`}
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full flex justify-between items-center p-6 text-left font-display font-bold text-xs sm:text-sm text-white hover:text-white/80 transition-colors cursor-pointer uppercase tracking-wide"
                  >
                    <span>{faq.question}</span>
                    <span className="w-8 h-8 rounded-xs bg-black flex items-center justify-center text-white/50 transition-transform">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-white" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-white/30" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={`faq-content-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-6 pt-0 border-t border-white/5 font-sans text-xs text-white/60 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. CONTACT SECTION */}
      <section
        id="contact"
        className="relative py-28 px-6 md:px-12 bg-[#070709] border-t border-b border-white/5 z-10"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Information (Left) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">09 / Connection</span>
              <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                Let's scope a project.
              </h2>
              <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
                Reach out to discuss custom software development, frontend architecture, or strategic technical solutions. Contact me using the form, or via direct channels below.
              </p>
            </div>

            {/* Direct Connect Grid */}
            <div className="space-y-4 pt-6">
              <a
                href="mailto:houssamabdo51@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xs bg-black border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.02] group"
              >
                <div className="w-10 h-10 rounded-xs bg-white/5 flex items-center justify-center text-white/75 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-mono text-[8px] text-white/30 uppercase tracking-wider">Direct Email</span>
                  <span className="font-sans text-xs font-bold text-white">houssamabdo51@gmail.com</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/20 ml-auto group-hover:text-white transition-colors" />
              </a>

              <a
                href="https://wa.me/33600000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xs bg-black border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.02] group"
              >
                <div className="w-10 h-10 rounded-xs bg-white/5 flex items-center justify-center text-white/75 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-mono text-[8px] text-white/30 uppercase tracking-wider">Direct Chat</span>
                  <span className="font-sans text-xs font-bold text-white">WhatsApp Connection</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/20 ml-auto group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Social handles */}
            <div className="flex gap-4 pt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xs bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                aria-label="Visit GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xs bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                aria-label="Visit LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Premium Form (Right) */}
          <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 rounded-xs p-8 backdrop-blur-md relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-6 text-white/40 font-mono text-[9px] tracking-widest uppercase">
              <span>Message Console</span>
            </div>

            <ContactForm />
          </div>

        </div>
      </section>

      {/* 11. FOOTER SECTION */}
      <footer className="relative py-20 px-6 md:px-12 z-10 bg-[#050505] overflow-hidden">
        {/* Soft lower glow decorative element */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-white/[0.01] to-transparent blur-[80px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center space-y-10 relative">
          
          {/* Gigantic Creative letterforms backdrop */}
          <div className="font-display text-[15vw] font-black tracking-tighter text-white/[0.02] select-none pointer-events-none uppercase leading-none">
            HOUSSAM
          </div>

          {/* Navigation link array */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center text-[10px] font-sans uppercase tracking-widest text-white/40">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer">Top</button>
            <button onClick={() => handleScrollTo('about')} className="hover:text-white transition-colors cursor-pointer">About</button>
            <button onClick={() => handleScrollTo('services')} className="hover:text-white transition-colors cursor-pointer">Services</button>
            <button onClick={() => handleScrollTo('projects')} className="hover:text-white transition-colors cursor-pointer">Projects</button>
            <button onClick={() => handleScrollTo('technologies')} className="hover:text-white transition-colors cursor-pointer">Radar</button>
            <button onClick={() => handleScrollTo('contact')} className="hover:text-white transition-colors cursor-pointer">Contact</button>
          </div>

          <div className="w-full max-w-lg h-px bg-white/5" />

          {/* Copyright notice and disclaimer */}
          <div className="space-y-1 text-white/30 font-mono text-[9px] uppercase tracking-wider">
            <p>&copy; {new Date().getFullYear()} HOUSSAM. All design &amp; technical assets reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
