import React from "react";
import { Metadata } from "next";
import { SubPageHero } from "@/components/sections/SubPageHero";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Spiritual Wisdom | Faith & Encouragement",
  description: "Bible-based devotionals and messages of faith to anchor your heart in the love of Christ. Find strength and peace for your journey.",
};

interface DevotionalProps {
  titleEn: string;
  titleAm: string;
  scripture: string;
  contentEn: string;
  contentAm: string;
}

function DevotionalCard({ titleEn, titleAm, scripture, contentEn, contentAm }: DevotionalProps) {
  return (
    <div className="bg-white dark:bg-white/5 p-12 lg:p-16 rounded-[3rem] border border-slate-100 dark:border-white/10 shadow-sm relative overflow-hidden group">
       <div className="absolute top-0 right-0 w-32 h-32 bg-wisdom-blue/5 rounded-full filter blur-3xl group-hover:bg-wisdom-blue/10 transition-colors"></div>
       <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
             <h3 className="font-heading font-extrabold text-3xl text-wisdom-text">{titleEn}</h3>
             <p className="font-amharic text-xl font-bold text-wisdom-blue">{titleAm}</p>
             <div className="inline-block py-2 px-6 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-sm font-bold text-wisdom-muted uppercase tracking-[0.2em] italic">
                {scripture}
             </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
             <div className="space-y-6">
                <p className="text-lg leading-relaxed text-wisdom-muted font-medium font-body italic border-l-4 border-wisdom-blue/10 pl-8">
                   {contentEn}
                </p>
             </div>
             <div className="space-y-6">
                <p className="text-lg leading-relaxed text-wisdom-muted font-medium font-amharic opacity-90 border-l-4 border-wisdom-orange/10 pl-8 italic">
                   {contentAm}
                </p>
             </div>
          </div>
       </div>
    </div>
  );
}

export default function SpiritualPage() {
  const devotionals: DevotionalProps[] = [
    {
      titleEn: "Strength in Weakness",
      titleAm: "በድካም ውስጥ ያለ ጥንካሬ",
      scripture: "Isaiah 40:29",
      contentEn: "He gives strength to the weary and increases the power of the weak. In the moments when our own hands feel heavy, we are reminded that our true source of power is not within us, but above us.",
      contentAm: "ለደከመው ኃይልን ይሰጣል፤ ጉልበት ለሌለውም ብርታትን ይጨምራል፡፡ የእኛ እጆች በከበዱበት ቅጽበት፣ የእውነተኛው የጥንካሬ ምንጫችን ከእኛ ውስጥ ሳይሆን ከላይ መሆኑን እናስታውሳለን፡፡"
    },
    {
      titleEn: "Peace Like a River",
      titleAm: "እንደ ወንዝ ያለ ሰላም",
      scripture: "Philippians 4:7",
      contentEn: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus. Peace is not the absence of trials, but the presence of the Father in the middle of them.",
      contentAm: "ከማስተዋልም ሁሉ በላይ የሆነው የእግዚአብሔር ሰላም ልባችሁንና አሳባችሁን በክርስቶስ ኢየሱስ ይጠብቃል፡፡ ሰላም ማለት የፈተናዎች አለመኖር ሳይሆን፣ በፈተናዎች መካከል የአባት መገኘት ነው፡፡"
    }
  ];

  return (
    <div className="min-h-screen bg-wisdom-bg">
      <SubPageHero 
        badgeEn="Spiritual Wisdom" 
        badgeAm="መንፈሳዊ ጥበብ" 
        titleEn="Encouragement for the Soul" 
        titleAm="ለነፍስ የሚሆን ማበረታቻ"
        descriptionEn="Bible-based devotionals and messages of faith to anchor your heart in the love of Christ."
        descriptionAm="ልብዎን በክርስቶስ ፍቅር ላይ ለመመሥረት የሚረዱ በመጽሐፍ ቅዱስ ላይ የተመሠረቱ አጫጭር ትምህርቶች እና የማበረታቻ መልእክቶች፡፡"
      />

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
         <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="w-16 h-1 bg-wisdom-blue rounded-full mx-auto"></div>
            <h2 className="font-heading font-extrabold text-3xl text-wisdom-text">Wisdom for the Day</h2>
            <p className="text-wisdom-muted font-medium text-lg italic uppercase tracking-widest opacity-60">Daily Bilingual Reflections</p>
         </div>

         <div className="space-y-16">
            {devotionals.map((dev, idx) => (
              <DevotionalCard key={idx} {...dev} />
            ))}
         </div>
      </section>

      <CTASection />
    </div>
  );
}
