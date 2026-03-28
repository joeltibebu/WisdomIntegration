"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function BookSection() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-wisdom-blue/[0.03] dark:bg-wisdom-blue/[0.02] overflow-hidden" aria-label="Featured Book">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Book Visual - Enhanced Shadow & Alignment */}
          <div className="lg:col-span-12 xl:col-span-5 relative group flex justify-center lg:justify-start">
            <div className="absolute inset-0 bg-wisdom-blue/10 rounded-full blur-[80px] opacity-40 -translate-x-10"></div>
            <div className="relative z-10 w-full max-w-[320px] lg:max-w-[380px]">
              <Image 
                src="/images/book-cover.png" 
                alt="From Our Journey to Yours" 
                width={400}
                height={550}
                className="w-full rounded-xl shadow-[0_20px_50px_rgba(30,75,155,0.3)] rotate-2 hover:rotate-0 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-wisdom-yellow rounded-full flex items-center justify-center text-wisdom-text font-black text-xs uppercase tracking-widest p-4 text-center shadow-lg border-4 border-white dark:border-wisdom-bg -rotate-12 group-hover:rotate-0 transition-transform">
                Real Life Journey
              </div>
            </div>
          </div>

          {/* Book Content - Stronger Typography & Rhythm */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-8">
            <div>
              <span className="inline-block py-1.5 px-5 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-orange font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 shadow-sm">
                Visionary Insights / ራዕይ እና ግንዛቤ
              </span>
              <h3 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-wisdom-text tracking-tight leading-tight">
                From Our Journey <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-blue to-wisdom-green">to Yours.</span>
              </h3>
            </div>

            <div className="space-y-6">
              <p className="font-body text-wisdom-muted text-lg sm:text-xl leading-relaxed font-medium max-w-2xl">
                Written from real-life experience, this book shares the journey, challenges, and wisdom gained through raising a child with special needs &mdash; offering hope and guidance to families walking a similar path.
              </p>
              <div className="font-amharic text-wisdom-muted text-lg sm:text-xl leading-relaxed opacity-80 border-l-4 border-wisdom-yellow/40 pl-6 py-2 italic max-w-2xl">
                ተመሳሳይ መንገድ ለሚጓዙ ቤተሰቦች ተስፋ እና መመሪያ የሚሰጥ የግል ተሞክሮ ያካፈሉበት ልዩ መጽሐፍ፡፡
              </div>
            </div>

            <div className="flex flex-wrap gap-5 pt-4">
              <Link href="/contact?subject=Book%20Order" className="flex-1 sm:flex-none">
                <Button size="lg" className="w-full px-10 py-7 rounded-[2rem] bg-wisdom-blue text-white font-bold text-lg shadow-lg hover:-translate-y-1 transition-all">
                  Order Now
                </Button>
              </Link>
              <Link href="/about" className="flex-1 sm:flex-none">
                <Button size="lg" variant="outline" className="w-full px-10 py-7 rounded-[2rem] border-wisdom-blue text-wisdom-blue font-bold text-lg hover:bg-wisdom-blue/5 hover:-translate-y-1 transition-all">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
