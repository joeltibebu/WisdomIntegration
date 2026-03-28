import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Heart",
  description: "Learn about the foundational story of Daniel, Yenenesh, and their son Kaleb—the faith and resilience behind Wisdom Integration Ministry.",
};
import { SubPageHero } from "@/components/sections/SubPageHero";
import { CTASection } from "@/components/sections/CTASection";

export default function AboutPage() {
  const values = [
    {
      titleEn: "Compassionate Love",
      titleAm: "የርኅራኄ ፍቅር",
      descEn: "We meet every child and family with warmth, patience, and genuine care, rooted in the love of Christ.",
      descAm: "በክርስቶስ ፍቅር ላይ በመመስረት፣ እያንዳንዱን ልጅ እና ቤተሰብ በሙቀት፣ በትዕግስት እና በእውነተኛ እንክብካቤ እንቀበላለን፡፡",
      color: "bg-wisdom-orange"
    },
    {
      titleEn: "Ministry Excellence",
      titleAm: "የአገልግሎት ብቃት",
      descEn: "We hold ourselves to the highest standards, integrating professional wisdom with spiritual guidance.",
      descAm: "ሙያዊ ጥበብን ከመንፈሳዊ መመሪያ ጋር በማቀናጀት ለታላቅ አገልግሎት ራሳችንን እናዘጋጃለን፡፡",
      color: "bg-wisdom-blue"
    },
    {
      titleEn: "Healing Belonging",
      titleAm: "የፈውስ ባለቤትነት",
      descEn: "Every child is a precious gift. We create a safe environment where families find total acceptance.",
      descAm: "እያንዳንዱ ልጅ ውድ ስጦታ ነው፡፡ ቤተሰቦች ሙሉ ተቀባይነት የሚያገኙበት አስተማማኝ ሁኔታ እንፈጥራለን፡፡",
      color: "bg-wisdom-green"
    }
  ];

  return (
    <div className="min-h-screen bg-wisdom-bg">
      <SubPageHero 
        badgeEn="Who We Are" 
        badgeAm="ስለ እኛ" 
        titleEn="Our Heart & Mission" 
        titleAm="የእኛ ልብ እና ተልዕኮ" 
        descriptionEn="Wisdom Integration is born from a personal journey of faith, resilience, and the belief that every family deserves to be seen and supported."
        descriptionAm="ዊዝደም ኢንቲግሬሽን የተወለደው ከግል እምነት፣ ጽናት እና እያንዳንዱ ቤተሰብ መታየት እና መደገፍ አለበት ከሚል እምነት ነው፡፡"
      />

      {/* The Founders' Journey Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <span className="text-wisdom-blue font-bold tracking-[0.2em] uppercase text-sm border-l-4 border-wisdom-blue pl-4">The Story Behind the Ministry</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text leading-tight">
              From a Family&apos;s Heart to a <span className="text-wisdom-blue">Nationwide Hope.</span>
            </h2>
            <div className="space-y-6 text-wisdom-muted text-lg leading-relaxed font-medium">
              <p>
                Daniel Takele and Yenenesh didn&apos;t just start a ministry; they answered a calling that grew directly from their own home. Raising their son Kaleb, who has lived with autism for 20 years, they felt the weight of exhaustion, the sting of isolation, and the deep need for a spiritual anchor.
              </p>
              <p className="font-amharic text-wisdom-text opacity-90 border-l-4 border-wisdom-green/30 pl-6">
                ዳንኤል ታከለ እና የኔነሽ አገልግሎቱን ብቻ አልጀመሩም፤ በቀጥታ ከቤታቸው የበቀለውን ጥሪ መለሱ፡፡ ላለፉት 20 ዓመታት ከኦቲዝም ጋር የኖረውን ልጃቸውን ካሌብን ሲያሳድጉ፣ የድካምን ክብደት፣ የብቸኝነትን ስቃይ እና ጥልቅ የመንፈሳዊ መሠረት አስፈላጊነት ተረድተዋል፡፡
              </p>
              <p>
                Through their journey, they discovered that wisdom is more than knowledge—it is the integration of faith and care that brings families back into the community. Today, Wisdom Integration stands as a testament to that wisdom, offering life-changing support to families across the nation.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-white/5 rounded-[3rem] p-8 sm:p-12 border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-wisdom-blue rounded-full filter blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
             <h3 className="font-heading font-bold text-2xl text-wisdom-text mb-8">Guided by Core Values</h3>
             <div className="space-y-8">
               {values.map((v, i) => (
                 <div key={i} className="flex gap-6 items-start group">
                   <div className={`w-12 h-12 rounded-2xl ${v.color} flex items-center justify-center shrink-0 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                   </div>
                   <div className="space-y-1">
                     <h4 className="font-bold text-lg text-wisdom-text leading-tight">{v.titleEn} / <span className="font-amharic font-bold">{v.titleAm}</span></h4>
                     <p className="text-wisdom-muted text-sm leading-relaxed">{v.descEn}</p>
                     <p className="font-amharic text-wisdom-muted text-sm leading-relaxed opacity-80">{v.descAm}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Integration Vision Section */}
      <section className="py-20 bg-white/40 dark:bg-wisdom-surface/20 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <h3 className="font-heading font-bold text-3xl text-wisdom-text mb-6 italic opacity-80">&quot;Integration is not just a goal; it is an act of love.&quot;</h3>
           <p className="text-xl text-wisdom-muted font-medium leading-relaxed mb-8">
             We believe that children with special needs and their families shouldn&apos;t live in the margins. Our vision is to integrate them back into the heart of the community through divine wisdom and professional care.
           </p>
           <div className="h-1 w-24 bg-wisdom-blue mx-auto rounded-full"></div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
