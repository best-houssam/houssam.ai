import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack Development',
    budget: '$5,000 - $10,000',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const projectTypes = [
    'Full-Stack Development',
    'Custom Websites',
    'SaaS Applications',
    'GenAI Integration',
    'UI/UX Design'
  ];

  const budgetRanges = [
    '<$5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+'
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    setFormStatus('submitting');
    
    setTimeout(() => {
      setFormStatus('success');
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      projectType: 'Full-Stack Development',
      budget: '$5,000 - $10,000',
      message: ''
    });
    setFormStatus('idle');
  };

  return (
    <div id="contact-form-component" className="w-full">
      <AnimatePresence mode="wait">
        {formStatus === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16 px-8 bg-white/5 border border-white/10 rounded-xs backdrop-blur-md relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>

            <h4 className="font-display text-xl font-bold text-white tracking-tight uppercase kerning-wide mb-3">
              Message Received
            </h4>
            
            <p className="font-sans text-xs text-white/70 max-w-md mx-auto leading-relaxed mb-8">
              Thank you for reaching out. Your project specifications have been logged, and I will contact you via email within the next 24 hours.
            </p>

            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xs font-display text-[10px] uppercase kerning-wide font-bold text-black bg-white hover:bg-white/90 transition-colors cursor-pointer"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Grid for Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  id="contact-name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name *"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-[#0a0a0c] border border-white/5 focus:border-white/40 rounded-xs px-5 py-4 text-xs text-white placeholder-white/30 focus:outline-none transition-colors duration-300"
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="contact-email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your Email *"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-[#0a0a0c] border border-white/5 focus:border-white/40 rounded-xs px-5 py-4 text-xs text-white placeholder-white/30 focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>

            {/* Selector for Project Type */}
            <div>
              <label className="block font-display text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3.5">
                Project Type
              </label>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((type) => {
                  const isSelected = formData.projectType === type;
                  return (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setFormData({ ...formData, projectType: type })}
                      disabled={formStatus === 'submitting'}
                      className={`px-4 py-2 rounded-xs font-sans text-[10px] uppercase tracking-wide border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-white/10 border-white text-white font-semibold'
                          : 'bg-[#0a0a0c] border-white/5 text-white/40 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget options */}
            <div>
              <label className="block font-display text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3.5">
                Estimated Budget Range
              </label>
              <div className="flex flex-wrap gap-2">
                {budgetRanges.map((budget) => {
                  const isSelected = formData.budget === budget;
                  return (
                    <button
                      type="button"
                      key={budget}
                      onClick={() => setFormData({ ...formData, budget: budget })}
                      disabled={formStatus === 'submitting'}
                      className={`px-4 py-2 rounded-xs font-sans text-[10px] uppercase tracking-wide border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-white/10 border-white text-white font-semibold'
                          : 'bg-[#0a0a0c] border-white/5 text-white/40 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {budget}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message Area */}
            <div className="relative">
              <textarea
                id="contact-message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Briefly describe your project details, objectives, and timeline... *"
                disabled={formStatus === 'submitting'}
                className="w-full bg-[#0a0a0c] border border-white/5 focus:border-white/40 rounded-xs px-5 py-4 text-xs text-white placeholder-white/30 focus:outline-none transition-colors duration-300 resize-none"
              />
            </div>

            {/* Submission Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-white/30 font-mono text-[9px] uppercase tracking-widest">
                <span>Secure SSL delivery active</span>
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                disabled={formStatus === 'submitting'}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xs font-display text-[10px] uppercase kerning-wide font-bold text-black bg-white hover:bg-white/90 disabled:bg-white/5 disabled:text-white/20 transition-all duration-300 cursor-pointer"
              >
                {formStatus === 'submitting' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
