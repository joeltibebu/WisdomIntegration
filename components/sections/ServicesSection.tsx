"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

export function ServicesSection() {
  const services = [
    {
      title: "Parent Counseling",
      description: "Compassionate guidance and emotional support for parents navigating unique developmental challenges.",
      color: "text-wisdom-orange",
      bg: "bg-wisdom-orange/10 border-wisdom-orange/20",
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
    },
    {
      title: "Spiritual Care",
      description: "Faith-based encouragement anchoring families in the truth of the Gospel and lasting peace.",
      color: "text-wisdom-yellow",
      bg: "bg-wisdom-yellow/10 border-wisdom-yellow/20",
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    },
    {
      title: "Inclusive Learning",
      description: "Tailored educational assistance designed to help children reach their full divine potential.",
      color: "text-wisdom-green",
      bg: "bg-wisdom-green/10 border-wisdom-green/20",
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
    },
    {
      title: "Community Integration",
      description: "Providing safe, inclusive environments where families belong and are truly valued.",
      color: "text-wisdom-blue",
      bg: "bg-wisdom-blue/10 border-wisdom-blue/20",
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-wisdom-bg dark:bg-wisdom-bg overflow-hidden" aria-label="Our Services">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header - Tightened */}
        <div className="max-w-3xl mb-12">
          <span className="inline-block py-1.5 px-5 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-blue font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 shadow-sm">
            What We Offer / የእኛ አገልግሎቶች
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-wisdom-text tracking-tight leading-tight">
            Practical Support & <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-blue via-wisdom-green to-wisdom-yellow">Spiritual Resilience.</span>
          </h2>
        </div>

        {/* Services Grid - Full Width Usage */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div key={i} className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${service.bg} ${service.color} group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="font-heading font-bold text-xl text-wisdom-text mb-4">{service.title}</h3>
              <p className="text-sm text-wisdom-muted leading-relaxed font-medium">{service.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
