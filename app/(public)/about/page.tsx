import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { SubPageHero } from "@/components/sections/SubPageHero";
import { CTASection } from "@/components/sections/CTASection";
import { BilingualScriptureSection } from "@/components/sections/BilingualScriptureSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "About Our Heart | Wisdom Integration",
  description: "Learn about the Wisdom Integration Ministry, founders Daniel Takele and Yenenesh, and the purpose behind our services.",
};

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  // Fetch all content for the about page
  const [hero, blocks] = await Promise.all([
    prisma.heroSection.findUnique({ where: { page: "about" } }),
    prisma.pageBlock.findMany({ 
      where: { page: "about" },
      orderBy: { order: "asc" }
    })
  ]);

  // Helper to find specific sections
  const getBlock = (section: string) => blocks.find(b => b.section === section);
  const outcomes = blocks.filter(b => b.section === "outcome");

  const storyFounders = getBlock("story-founders");
  const storyKaleb = getBlock("story-kaleb");
  const purposeMain = getBlock("purpose-main");

  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden">
      <SubPageHero 
        badgeEn={hero?.badge || "Our Emotional Journey"} 
        badgeAm={hero?.badgeAm || "ስሜታዊ ጉዞአችን"} 
        titleEn={hero?.title || "Wisdom Integration Ministry"} 
        titleAm={hero?.titleAm || "ዊዝደም ኢንቲግሬሽን ሚኒስትሪ"} 
        descriptionEn={hero?.description || ""}
        descriptionAm={hero?.descriptionAm || ""}
      />

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-32">
        
        {/* Section 1: Our Journey Begins (Image Left, Text Right) */}
        <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px] w-full border border-slate-200 dark:border-white/10 group bg-slate-100 dark:bg-white/5 flex flex-col justify-center items-center text-center">
                 {/* Temporary Fallback Placeholder */}
                 <div className="absolute inset-0 bg-gradient-to-t from-wisdom-blue/80 via-transparent to-transparent z-10 transition-opacity opacity-60 mix-blend-multiply"></div>
                 
                 {/* Founders / Journey Image */}
                 <Image 
                   src="/images/kaleb.jpeg"
                   alt="Brother Daniel and Sister Yenenesh"
                   fill
                   className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                 />
                 
                 <div className="absolute bottom-8 left-8 right-8 z-20 text-left">
                   <p className="text-white font-heading font-extrabold text-2xl drop-shadow-md">Brother Daniel & Sister Yenenesh</p>
                   <p className="text-white/80 font-amharic text-sm mt-1">ወንድም ዳንኤል ታከለ እና እህት የኔነሽ</p>
                 </div>
              </div>

              <div className="space-y-8">
                <span className="text-wisdom-blue font-bold tracking-[0.2em] uppercase text-sm border-l-4 border-wisdom-blue pl-4">The Journey Begins</span>
                <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-wisdom-text leading-tight tracking-tight">
                  {storyFounders?.title}
                </h2>
                <div className="space-y-6 text-wisdom-muted text-[1.1rem] leading-loose font-light">
                  <p>
                    {storyFounders?.content}
                  </p>
                  <p className="font-amharic opacity-90 leading-loose border-l-2 border-wisdom-green/30 pl-6 text-lg italic">
                    {storyFounders?.contentAm}
                  </p>
                </div>
              </div>
            </div>
        </ScrollReveal>

        {/* Section 2: Kaleb's Story (Text Left, Image Right) */}
        <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="order-2 lg:order-1 space-y-8">
                <span className="text-wisdom-green font-bold tracking-[0.2em] uppercase text-sm border-l-4 border-wisdom-green pl-4">A Turning Point</span>
                <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-wisdom-text leading-tight tracking-tight">
                  {storyKaleb?.title}
                </h2>
                <div className="space-y-6 text-wisdom-muted text-[1.1rem] leading-loose font-light">
                  <p>
                    {storyKaleb?.content}
                  </p>
                  <p className="font-amharic opacity-90 leading-loose border-l-2 border-wisdom-yellow/50 pl-6 text-lg italic">
                    {storyKaleb?.contentAm}
                  </p>
                </div>
              </div>

              <div className="order-1 lg:order-2 relative rounded-[3rem] overflow-hidden shadow-2xl h-[500px] w-full border border-slate-200 dark:border-white/10 group bg-slate-100 dark:bg-white/5 flex flex-col justify-center items-center">
                 {/* Decorative overlay */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-wisdom-green/60 via-transparent to-transparent z-10 mix-blend-multiply opacity-50"></div>
                 
                 {/* Kaleb's Family Image */}
                 <Image 
                   src="/images/kaleb2.jpeg"
                   alt="Kaleb and his Family"
                   fill
                   className="object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out"
                 />

                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center w-3/4 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-700">
                    <p className="text-white font-amharic font-bold text-xl leading-relaxed drop-shadow-sm">
                      &quot;ጥበብ ፍቅር ነው፡፡ ግዜንና እውቀትን መስጠት ነው፡፡&quot;
                    </p>
                 </div>
              </div>
            </div>
        </ScrollReveal>

        {/* Guiding Scripture Section */}
        <ScrollReveal delay={100}>
          <div className="relative py-8">
             <BilingualScriptureSection />
          </div>
        </ScrollReveal>

        {/* Purpose Section (2 Columns with Icons) */}
        <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div className="bg-gradient-to-br from-wisdom-orange/10 to-transparent dark:from-wisdom-orange/5 dark:to-transparent rounded-[3rem] p-10 sm:p-14 border border-wisdom-orange/20 dark:border-white/5 shadow-sm relative overflow-hidden group">
                 <div className="w-16 h-16 rounded-2xl bg-wisdom-orange flex items-center justify-center text-white mb-8 shadow-lg group-hover:-translate-y-2 transition-transform duration-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                 </div>
                 <h3 className="font-heading font-extrabold text-3xl text-wisdom-text mb-6">{purposeMain?.title}</h3>
                 <p className="text-wisdom-muted text-lg leading-loose font-light">
                   {purposeMain?.content}
                 </p>
              </div>

              <div className="bg-gradient-to-br from-wisdom-blue/10 to-transparent dark:from-wisdom-blue/5 dark:to-transparent rounded-[3rem] p-10 sm:p-14 border border-wisdom-blue/20 dark:border-white/5 shadow-sm relative overflow-hidden group">
                 <div className="w-16 h-16 rounded-2xl bg-wisdom-blue flex items-center justify-center text-white mb-8 shadow-lg group-hover:-translate-y-2 transition-transform duration-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                 </div>
                 <h3 className="font-amharic font-extrabold text-3xl text-wisdom-text mb-6 mt-1">{purposeMain?.titleAm}</h3>
                 <p className="font-amharic text-wisdom-text opacity-80 text-lg leading-[2.2]">
                   {purposeMain?.contentAm}
                 </p>
              </div>
            </div>
        </ScrollReveal>

        {/* Expected Outcomes (Redesigned into smaller modular cards) */}
        <ScrollReveal delay={300}>
           <div className="space-y-16 py-12">
             <div className="text-center space-y-6 max-w-3xl mx-auto">
               <span className="inline-block py-1.5 px-5 rounded-full bg-wisdom-green/10 text-wisdom-green font-bold text-xs tracking-[0.2em] uppercase mb-2">Our Vision Realized</span>
               <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-wisdom-text tracking-tight">Expected Outcomes</h2>
               <p className="font-amharic text-2xl font-bold text-wisdom-muted">እኛ ከአገልግሎቱ የምንጠብቀው ውጤት ምንድነው?</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {outcomes.map((outcome, idx) => (
                  <div key={outcome.id} className="bg-white/60 dark:bg-wisdom-surface/40 backdrop-blur-2xl p-10 rounded-[2rem] border border-slate-100/50 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between">
                     <div className="absolute -top-10 -right-10 w-32 h-32 bg-wisdom-blue mix-blend-multiply dark:mix-blend-screen opacity-0 group-hover:opacity-10 blur-2xl transition-opacity"></div>
                     
                     <div className="mb-8">
                       <span className="text-5xl font-heading text-wisdom-blue/20 font-black italic">{idx + 1}</span>
                     </div>
                     <p className="text-lg text-wisdom-muted font-light leading-relaxed mb-8 flex-grow pr-4">
                       {outcome.content}
                     </p>
                     
                     <div className="pt-6 border-t border-slate-100 dark:border-white/10 font-amharic text-[1.1rem] opacity-75 leading-[1.8] text-wisdom-text">
                       {outcome.contentAm}
                     </div>
                  </div>
                ))}
             </div>
           </div>
        </ScrollReveal>

      </section>

      <CTASection />
    </div>
  );
}

