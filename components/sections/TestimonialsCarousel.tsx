"use client";

import React, { useState, useEffect } from "react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

// Fallback data used when no DB records exist yet
const fallbackTestimonials: Testimonial[] = [
  {
    quote: "Wisdom Integration changed everything for us. Before, we were hiding our son out of shame and simply didn't know how to cope. Now, we've found a community that embraces him as a true gift from God.",
    author: "Sarah & Daniel M.",
    role: "Parents of a child with Autism"
  },
  {
    quote: "The spiritual care and counseling mended our broken hearts. We came feeling profoundly exhausted and isolated, but we found true belonging and healing through their holistic ministry.",
    author: "James K.",
    role: "Father"
  },
  {
    quote: "They don't just provide therapy; they provide love. The team gives their time, knowledge, and faith unconditionally. For the first time, our family feels deeply valued and understood.",
    author: "Priya & Tomas L.",
    role: "Family Members"
  },
];

interface Props {
  items?: { content: string; name: string; role?: string | null }[];
}

export function TestimonialsCarousel({ items }: Props) {
  const testimonials: Testimonial[] =
    items && items.length > 0
      ? items.map((t) => ({ quote: t.content, author: t.name, role: t.role ?? "" }))
      : fallbackTestimonials;
  const [current, setCurrent] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section aria-labelledby="testimonials-heading" className="bg-wisdom-bg py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-wisdom-orange mix-blend-multiply dark:mix-blend-screen opacity-[0.03] dark:opacity-[0.02] filter blur-[120px] pointer-events-none"></div>

      <div className="text-center mb-10 relative z-10">
        <span className="inline-block py-1.5 px-5 rounded-full bg-slate-50 dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-orange font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 shadow-sm">
          Family Stories
        </span>
        <h2 id="testimonials-heading" className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text">
          Stories of Healing & Belonging
        </h2>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 sm:p-12 md:p-16 shadow-xl relative text-center">
          
          <svg className="w-16 h-16 text-wisdom-orange/20 mx-auto mb-6" fill="currentColor" viewBox="0 0 32 32">
            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-2.2 1.8-4 4-4V8zM28 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z"/>
          </svg>

          <div className="min-h-[140px] flex items-center justify-center transition-all duration-500 mb-8 w-full">
             <p className="font-heading text-xl sm:text-2xl font-medium text-wisdom-text leading-relaxed tracking-wide italic">
               &ldquo;{testimonials[current].quote}&rdquo;
             </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-1 bg-wisdom-orange mb-4 rounded-full opacity-50"></div>
            <h4 className="font-bold text-lg text-wisdom-text">{testimonials[current].author}</h4>
            <p className="text-wisdom-muted text-sm uppercase tracking-widest mt-1 font-medium">{testimonials[current].role}</p>
          </div>

        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={prev}
            aria-label="Previous story"
            className="w-12 h-12 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center text-wisdom-muted hover:text-wisdom-orange hover:border-wisdom-orange transition-all hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to story ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  current === idx ? "bg-wisdom-orange w-6" : "bg-slate-300 dark:bg-white/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next story"
            className="w-12 h-12 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center text-wisdom-muted hover:text-wisdom-orange hover:border-wisdom-orange transition-all hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      </div>
    </section>
  );
}
