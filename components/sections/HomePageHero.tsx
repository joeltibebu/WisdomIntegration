"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/LanguageContext";

export function HomePageHero() {
  const { lang } = useLanguage();
  const am = lang === "am";

  return (
    <section className="relative min-h-[82vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-wisdom-blue rounded-full opacity-10 filter blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-wisdom-green rounded-full opacity-[0.05] filter blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 py-1.5 px-5 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md mb-5">
          <span className="w-2 h-2 rounded-full bg-wisdom-orange animate-pulse" />
          {am ? (
            <span className="font-amharic text-wisdom-text font-bold text-sm tracking-wide">
              ፍቅር &bull; እንክብካቤ &bull; ፈውስ
            </span>
          ) : (
            <span className="text-wisdom-text font-bold text-sm tracking-[0.1em]">
              Love &bull; Care &bull; Heal
            </span>
          )}
        </div>

        {/* Heading */}
        <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-[5rem] text-wisdom-text mb-2 tracking-tight leading-[1.1]">
          {am ? (
            <>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-blue via-wisdom-green to-wisdom-yellow">ፈውስ</span>
              {" "}ተስፋ እና ባለቤትነትን ማምጣት
            </>
          ) : (
            <>
              Bringing{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-blue via-wisdom-green to-wisdom-yellow">Healing</span>
              , Hope, and Belonging
            </>
          )}
        </h1>

        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-wisdom-muted mb-4 tracking-tight">
          {am ? "ዛሬ አገልግሎታችንን ይደግፉ" : "Support Our Ministry Today"}
        </h2>

        <p className={`text-wisdom-muted text-lg sm:text-xl leading-relaxed max-w-3xl mb-8 font-medium ${am ? "font-amharic" : "font-body"}`}>
          {am
            ? "ዊዝደም ኢንቲግሬሽን ሚኒስትሪ ልዩ ፍላጎት ያላቸው ልጆችን ለሚያሳድጉ ቤተሰቦች ከጎናቸው ይቆማል — በእምነት፣ በሙያዊ እንክብካቤ እና ሙሉ ተቀባይነት።"
            : "Wisdom Integration Ministry walks alongside families navigating special needs — with faith, professional care, and radical belonging."
          }
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/donate">
            <Button className="px-10 py-6 rounded-[2rem] bg-gradient-to-r from-wisdom-blue to-[#2B60C5] hover:from-[#2B60C5] hover:to-wisdom-blue text-white font-bold text-lg shadow-[0_10px_30px_rgba(30,75,155,0.4)] transition-all hover:-translate-y-1">
              {am ? "አሁን ይለግሱ" : "Donate Now"}
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="px-10 py-6 rounded-[2rem] bg-white dark:bg-white/5 border-slate-200 dark:border-white/20 text-wisdom-blue dark:text-white font-bold text-lg transition-all hover:-translate-y-1 shadow-sm">
              {am ? "ያግኙን" : "Get in Touch"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
