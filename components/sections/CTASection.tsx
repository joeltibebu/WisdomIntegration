"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/LanguageContext";

export function CTASection() {
  const { lang } = useLanguage();
  const am = lang === "am";

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-12 bg-transparent overflow-hidden border-t border-slate-200/50 dark:border-white/5" aria-label="Stay Connected">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full bg-wisdom-blue mix-blend-multiply dark:mix-blend-screen opacity-[0.02] dark:opacity-[0.02] filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <span className="inline-block py-1.5 px-5 rounded-full bg-white/50 backdrop-blur-md dark:bg-wisdom-surface/50 border border-slate-200/50 dark:border-white/10 text-wisdom-blue font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 shadow-sm">
          {am ? "ከእኛ ጋር ይገናኙ" : "Stay Connected"}
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-wisdom-text mb-6 tracking-tight">
          {am ? "የአገልግሎት ማኅበረሰባችንን ይቀላቀሉ" : "Join Our Ministry Community"}
        </h2>
        <p className={`text-wisdom-muted text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-medium ${am ? 'font-amharic' : 'font-body'}`}>
          {am 
            ? "የአገልግሎት ዝማኔዎችን፣ ጥልቅ መንፈሳዊ ማበረታቻዎችን እና መለኮታዊ የፈውስ ታሪኮችን በቀጥታ ለቤተሰብዎ ይቀበሉ።" 
            : "Receive ministry updates, deeply encouraging spiritual resources, and stories of divine healing directly to your family."}
        </p>

        <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto w-full" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder={am ? "የኢሜል አድራሻዎን ያስገቡ..." : "Enter your email address..."}
            className="flex-1 px-6 py-4 rounded-full border border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 text-wisdom-text placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-wisdom-blue shadow-sm font-medium" 
            required 
            aria-label="Email Address"
          />
          <Button className="rounded-full px-8 py-4 bg-wisdom-blue hover:bg-[#2B60C5] text-white font-bold text-lg transition-transform hover:scale-105 shadow-[0_10px_20px_rgba(30,75,155,0.2)]">
            {am ? "ይመዝገቡ" : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
}
