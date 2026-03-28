"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/LanguageContext";

const heroImages = [
  "/images/events/event1.jpeg",
  "/images/events/event2.jpeg",
  "/images/events/event3.jpeg",
  "/images/events/event4.jpeg",
  "/images/events/event5.jpeg",
];

export function HomePageHero() {
  const { lang } = useLanguage();
  const am = lang === "am";
  
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Crossfade every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[82vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      
      {/* ── Slideshow Background Layer ── */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, idx) => (
          <div 
            key={src}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              idx === currentIdx ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={src}
              alt="Wisdom Ministry Event"
              fill
              className={`object-cover transition-transform duration-[10000ms] ease-out ${
                idx === currentIdx ? "scale-105" : "scale-100"
              }`}
            />
          </div>
        ))}

        {/* Cinematic Darkness Overlays for Reading Legibility */}
        <div className="absolute inset-0 bg-slate-900/60 z-20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-wisdom-bg via-transparent to-wisdom-bg/50 z-20"></div>
        <div className="absolute inset-0 bg-wisdom-blue/10 mix-blend-overlay z-20"></div>
      </div>

      <div className="relative z-30 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 py-1.5 px-5 rounded-full bg-white/10 border border-white/20 shadow-sm backdrop-blur-md mb-6">
          <span className="w-2 h-2 rounded-full bg-wisdom-yellow animate-pulse" />
          {am ? (
            <span className="font-amharic text-white font-bold text-sm tracking-wide drop-shadow-sm">
              ፍቅር &bull; እንክብካቤ &bull; ፈውስ
            </span>
          ) : (
            <span className="text-white font-bold text-sm tracking-[0.1em] drop-shadow-sm">
              Love &bull; Care &bull; Heal
            </span>
          )}
        </div>

        {/* Heading */}
        <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-[5rem] text-white mb-4 tracking-tight leading-[1.1] drop-shadow-lg">
          {am ? (
            <>
              <span className="text-wisdom-yellow drop-shadow-md">ፈውስ</span>
              {" "}ተስፋ እና ባለቤትነትን ማምጣት
            </>
          ) : (
            <>
              Bringing{" "}
              <span className="text-wisdom-yellow drop-shadow-md">Healing</span>
              , Hope, and Belonging
            </>
          )}
        </h1>

        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white/90 mb-6 tracking-tight drop-shadow-md">
          {am ? "ዛሬ አገልግሎታችንን ይደግፉ" : "Support Our Ministry Today"}
        </h2>

        <p className={`text-white/80 text-lg sm:text-xl leading-relaxed max-w-3xl mb-10 font-medium drop-shadow-sm ${am ? "font-amharic" : "font-body"}`}>
          {am
            ? "ዊዝደም ኢንቲግሬሽን ሚኒስትሪ ልዩ ፍላጎት ያላቸው ልጆችን ለሚያሳድጉ ቤተሰቦች ከጎናቸው ይቆማል — በእምነት፣ በሙያዊ እንክብካቤ እና ሙሉ ተቀባይነት።"
            : "Wisdom Integration Ministry walks alongside families navigating special needs — with faith, professional care, and radical belonging."
          }
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/donate">
            <Button className="px-10 py-6 rounded-full bg-wisdom-blue hover:bg-[#153a7e] text-white font-extrabold text-lg shadow-[0_10px_30px_rgba(30,75,155,0.4)] transition-all hover:-translate-y-1">
              {am ? "አሁን ይለግሱ" : "Donate Now"}
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" className="px-10 py-6 rounded-full bg-white/10 backdrop-blur-lg border border-white/30 hover:bg-white/20 text-white font-extrabold text-lg transition-all hover:-translate-y-1 shadow-sm">
              {am ? "ያግኙን" : "Get in Touch"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
