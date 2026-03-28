"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function MinistryFocusHub() {
  const [activeTab, setActiveTab] = useState<"services" | "book">("services");

  const categories = [
    { name: "Autism Support", color: "bg-wisdom-blue" },
    { name: "Family Guidance", color: "bg-wisdom-green" },
    { name: "Spiritual Care", color: "bg-wisdom-orange" },
    { name: "Parent Counseling", color: "bg-wisdom-yellow" },
  ];

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
    <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-20 bg-wisdom-bg dark:bg-wisdom-bg overflow-hidden" aria-label="Our Ministry Focus">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-wisdom-blue rounded-full mix-blend-multiply dark:mix-blend-screen opacity-[0.02] filter blur-[150px] -translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header - Combined Styles */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12">
           <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-block py-1.5 px-5 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-blue font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 shadow-sm">
                What We Offer / የእኛ አገልግሎቶች
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-wisdom-text tracking-tight leading-tight">
                Practical Support & <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-blue via-wisdom-green to-wisdom-yellow">Spiritual Resilience.</span>
              </h2>
           </div>
           
           {/* Tab Navigation */}
           <div className="flex items-center justify-center lg:justify-end gap-2 p-1 bg-white dark:bg-wisdom-surface rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
              <button 
                onClick={() => setActiveTab("services")}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'services' ? 'bg-wisdom-blue text-white shadow-lg' : 'text-wisdom-muted hover:text-wisdom-blue'}`}
              >
                Our Services
              </button>
              <button 
                onClick={() => setActiveTab("book")}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'book' ? 'bg-wisdom-blue text-white shadow-lg' : 'text-wisdom-muted hover:text-wisdom-blue'}`}
              >
                The Book
              </button>
           </div>
        </div>

        {/* Tab Content Area */}
        <div className="relative min-h-[400px]">
           
           {/* TAB: SERVICES */}
           {activeTab === "services" && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
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
           )}

           {/* TAB: BOOK */}
           {activeTab === "book" && (
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center animate-in fade-in duration-500">
                <div className="lg:col-span-5 relative group flex justify-center">
                   <div className="absolute inset-0 bg-wisdom-blue/10 rounded-full blur-[80px] opacity-40"></div>
                   <Image 
                     src="/images/book-cover.png" 
                     alt="From Our Journey to Yours" 
                     width={350}
                     height={500}
                     className="relative z-10 w-full max-w-[320px] rounded-xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
                   />
                </div>
                <div className="lg:col-span-7 space-y-8">
                   <h3 className="font-heading font-extrabold text-3xl text-wisdom-text">From Our Journey to Yours</h3>
                   <div className="space-y-4">
                      <p className="font-body text-wisdom-muted text-lg leading-relaxed font-medium">
                        Written from real-life experience, this book shares the journey, challenges, and wisdom gained through raising a child with special needs.
                      </p>
                      <p className="font-amharic text-wisdom-muted text-lg leading-relaxed opacity-80 border-l-4 border-wisdom-yellow/40 pl-6 py-1 italic">
                        ተመሳሳይ መንገድ ለሚጓዙ ቤተሰቦች ተስፋ እና መመሪያ የሚሰጥ የግል ተሞክሮ ያካፈሉበት ልዩ መጽሐፍ፡፡
                      </p>
                   </div>
                   <div className="flex flex-wrap gap-4">
                      <Link href="/contact?subject=Book%20Order" className="flex-1 sm:flex-none">
                        <Button size="md" className="w-full rounded-full bg-wisdom-blue text-white px-8">Order Now</Button>
                      </Link>
                      <Link href="/about" className="flex-1 sm:flex-none">
                        <Button size="md" variant="outline" className="w-full rounded-full border-wisdom-blue text-wisdom-blue px-8">Learn More</Button>
                      </Link>
                   </div>
                </div>
             </div>
           )}
        </div>

        {/* Categories Bar - Uniform Background */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
           {categories.map((cat, i) => (
             <div key={i} className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest text-wisdom-muted">
                <div className={`w-2 h-2 rounded-full ${cat.color}`}></div>
                {cat.name}
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
