import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Philosophy', id: 'philosophy' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Radar', id: 'technologies' },
    { label: 'Process', id: 'process' },
    { label: 'FAQs', id: 'faq' },
  ];

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
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
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-4 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 shadow-md shadow-black/10'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo - Clean Minimal */}
        <button
          id="logo-brand-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col text-left group cursor-pointer"
        >
          <span className="font-display font-black text-2xl kerning-extra text-white transition-opacity group-hover:opacity-80">
            H.
          </span>
          <span className="text-[9px] kerning-wide text-white/40 uppercase mt-0.5 font-mono">
            STUDIO ©2026
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleScrollTo(item.id)}
                className={`px-4 py-1.5 rounded-full font-sans text-[11px] uppercase kerning-wide font-medium transition-all duration-300 relative cursor-pointer ${
                  isActive ? 'text-white font-semibold' : 'text-white/50 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button - White Minimalist Button */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="glass-card px-4 py-2 rounded-full hidden xl:block">
            <span className="text-[9px] kerning-wide text-white/70 uppercase">Available for hire</span>
          </div>
          <button
            id="nav-cta-contact-btn"
            onClick={() => handleScrollTo('contact')}
            className="flex items-center gap-1.5 px-6 py-3 rounded-xs font-display text-[11px] uppercase kerning-wide font-bold text-black bg-white hover:bg-white/90 transition-all duration-300 shadow-sm cursor-pointer"
          >
            Connect
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex lg:hidden">
          <button
            id="mobile-nav-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#050505]/95 backdrop-blur-md border-b border-white/5 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleScrollTo(item.id)}
                    className={`py-3 text-left font-display text-xs uppercase kerning-wide font-bold transition-all duration-300 flex items-center justify-between border-b border-white/5 ${
                      isActive ? 'text-white px-2 border-white/20' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] font-mono text-white/30">[{item.id}]</span>
                  </button>
                );
              })}
              <button
                id="mobile-nav-cta-btn"
                onClick={() => handleScrollTo('contact')}
                className="mt-4 flex items-center justify-center gap-2 w-full py-4 rounded-xs font-display text-xs uppercase kerning-wide font-bold text-black bg-white hover:bg-white/90 transition-all duration-300"
              >
                Connect
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
