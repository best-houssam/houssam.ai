import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data';

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <div id="testimonial-carousel-container" className="relative max-w-3xl mx-auto">
      {/* Background Subtle Quote Marker */}
      <div className="absolute -top-10 -left-6 md:-left-12 text-white/5 select-none pointer-events-none">
        <Quote className="w-24 h-24 rotate-180" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white/[0.01] border border-white/5 rounded-xs p-8 md:p-12 backdrop-blur-md relative"
        >
          {/* Rating */}
          <div className="flex gap-1 mb-6 justify-center md:justify-start">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
            ))}
          </div>

          {/* Quote Content */}
          <blockquote className="font-sans text-base md:text-lg font-medium text-white/80 leading-relaxed text-center md:text-left mb-8">
            "{current.content}"
          </blockquote>

          {/* Author info */}
          <div className="flex flex-col md:flex-row items-center gap-4 border-t border-white/5 pt-6">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-white/30 to-white/10 opacity-75 blur-xs" />
              <img
                src={current.avatar}
                alt={current.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover relative border-2 border-black"
              />
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-display text-sm font-bold text-white tracking-tight">
                {current.name}
              </h4>
              <p className="font-sans text-[11px] text-white/50 mt-0.5">
                {current.role} &mdash; <span className="text-white/80 font-semibold">{current.company}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Control Actions */}
      <div className="flex items-center justify-between mt-8 px-2">
        {/* Nav Indicators */}
        <div className="flex gap-2.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 transition-all duration-300 cursor-pointer rounded-full ${
                activeIndex === i ? 'w-6 bg-white' : 'w-1.5 bg-white/10 hover:bg-white/20'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            id="testimonial-prev-btn"
            onClick={handlePrev}
            className="w-10 h-10 rounded-xs bg-black border border-white/5 hover:border-white/20 flex items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            id="testimonial-next-btn"
            onClick={handleNext}
            className="w-10 h-10 rounded-xs bg-black border border-white/5 hover:border-white/20 flex items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
