import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden" aria-label="Hero">
      
      {/* Premium Ambient Background Accents */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-wisdom-blue rounded-full mix-blend-multiply dark:mix-blend-screen opacity-10 dark:opacity-[0.05] filter blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse duration-[10000ms]"></div>
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-wisdom-green rounded-full mix-blend-multiply dark:mix-blend-screen opacity-[0.05] dark:opacity-[0.03] filter blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-wisdom-yellow rounded-full mix-blend-multiply dark:mix-blend-screen opacity-[0.05] dark:opacity-[0.03] filter blur-[150px] translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center mt-8 sm:mt-0">
        
        {/* Bilingual Badge */}
        <div className="inline-flex items-center gap-3 py-2 px-6 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md mb-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-300">
          <span className="w-2 h-2 rounded-full bg-wisdom-orange animate-pulse shadow-[0_0_8px_rgba(242,170,44,0.6)]"></span>
          <span className="text-wisdom-text font-bold text-sm sm:text-base tracking-[0.1em]">
            Love &bull; Care &bull; Heal <span className="text-wisdom-yellow mx-2 font-light hidden sm:inline">|</span> <span className="font-amharic text-wisdom-green hidden sm:inline">ፍቅር &bull; እንክብካቤ &bull; ፈውስ</span>
          </span>
        </div>
        
        <div className="sm:hidden mb-4 mt-[-1rem] text-wisdom-green font-amharic font-bold tracking-wide">
          ፍቅር &bull; እንክብካቤ &bull; ፈውስ
        </div>
        
        {/* Main Heading */}
        <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-[5rem] text-wisdom-text mb-2 tracking-tight leading-[1.1] max-w-4xl">
          Bringing <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-blue via-wisdom-green to-wisdom-yellow">Healing</span>, Hope, and Belonging
        </h1>
        
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-wisdom-muted mb-4 tracking-tight">
          to Every Child and Family
        </h2>
        
        {/* Subtext */}
        <p className="font-body text-wisdom-muted text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl mb-8 font-medium">
          Supporting families with love, guidance, and faith &mdash; helping them find healing, belonging, and purpose in their journey.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 items-center w-full sm:w-auto">
          <Link href="/donate" className="w-full sm:w-auto">
            <Button 
              className="w-full px-10 py-7 rounded-[2rem] bg-gradient-to-r from-wisdom-blue to-[#2B60C5] hover:from-[#2B60C5] hover:to-wisdom-blue border-transparent text-white font-bold text-lg shadow-[0_10px_30px_rgba(30,75,155,0.4)] transition-all hover:-translate-y-1"
            >
              Start Your Journey
            </Button>
          </Link>
          <Link href="/about" className="w-full sm:w-auto">
            <Button 
              size="lg"
              variant="outline" 
              className="w-full px-10 py-7 rounded-[2rem] bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border-slate-200 dark:border-white/20 text-wisdom-blue dark:text-white font-bold text-lg backdrop-blur-sm transition-all hover:-translate-y-1 shadow-sm"
            >
              Learn More
            </Button>
          </Link>
        </div>
        
      </div>
    </section>
  );
}
