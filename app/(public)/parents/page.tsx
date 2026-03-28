import React from "react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Parents | Strength & Support",
  description: "A dedicated space for parents raising children with special needs. Find emotional encouragement, practical tips, and a community that understands.",
};
import { SubPageHero } from "@/components/sections/SubPageHero";
import { CTASection } from "@/components/sections/CTASection";

export default function ParentsPage() {
  const tips = [
    {
      titleEn: "Create Predictable Routines",
      titleAm: "የሚታወቁ ዕለታዊ ልምዶችን መፍጠር",
      descEn: "Children feel safest when they know what to expect. Use visual schedules to help your child navigate the day with confidence.",
      descAm: "ልጆች ምን እንደሚጠብቁ ካወቁ የበለጠ ደህንነት ይሰማቸዋል፡፡ ቀኑን በልበ ሙሉነት እንዲመሩ የእይታ መርሃ ግብሮችን ይጠቀሙ፡፡",
      icon: "📅"
    },
    {
      titleEn: "Sensory-Friendly Spaces",
      titleAm: "ምቹ የመኖሪያ አካባቢ",
      descEn: "Design small 'quiet corners' in your home where your child can retreat if they feel overwhelmed by lights or noise.",
      descAm: "ልጅዎ በብርሃን ወይም በድምጽ ሲታወክ የሚያርፍበት ትንሽ 'ጸጥተኛ ጥግ' በቤትዎ ውስጥ ያዘጋጁ፡፡",
      icon: "🧘"
    },
    {
      titleEn: "Celebrate Small Wins",
      titleAm: "ትንንሽ ስኬቶችን ማክበር",
      descEn: "Every milestone, no matter how small, is a victory. Focus on the progress made today, not just the goals for tomorrow.",
      descAm: "እያንዳንዱ እርምጃ ምንም ያህል ትንሽ ቢሆን ስኬት ነው፡፡ የነገው ግብ ላይ ብቻ ሳይሆን ዛሬ በተደረገው ለውጥ ላይ ያተኩሩ፡፡",
      icon: "✨"
    }
  ];

  return (
    <div className="min-h-screen bg-wisdom-bg">
      <SubPageHero 
        badgeEn="For Parents" 
        badgeAm="ለወላጆች" 
        titleEn="You are Not Walking Alone" 
        titleAm="ብቻዎን አይደሉም"
        descriptionEn="Finding strength, reassurance, and practical wisdom for the journey of raising a child with special needs."
        descriptionAm="ልዩ ፍላጎት ያላቸውን ልጆች በሚያሳድጉበት ጉዞ ውስጥ ጥንካሬን፣ መረጋጋትን እና ተግባራዊ ጥበብን እዚህ ያገኛሉ፡፡"
      />

      {/* Message from Yenenesh */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative group">
               <div className="absolute -inset-4 bg-wisdom-blue/5 rounded-[4rem] blur-2xl transition-all"></div>
               <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/20 aspect-square max-w-md mx-auto lg:mx-0">
                  <Image 
                    src="https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=1200" 
                    alt="Founders' perspective on parenting" 
                    width={800}
                    height={800}
                    priority
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wisdom-blue/40 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-center">
                     <p className="text-white text-sm font-black uppercase tracking-widest">A Heart to Heart Message</p>
                  </div>
               </div>
            </div>

            <div className="space-y-8">
               <div className="space-y-4">
                  <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text leading-tight">
                    From a Mother&apos;s Heart to Yours
                  </h2>
                  <p className="font-amharic text-lg font-bold text-wisdom-blue">ከእናት ልብ ወደ እርስዎ</p>
               </div>
               
               <div className="space-y-6 text-wisdom-muted text-lg leading-relaxed font-medium">
                  <p>
                    &quot;I remember the early days—the questions, the isolation, and the weight of the unknown. But I also remember the moment I realized that my child was not a burden, but a divine masterpiece.&quot;
                  </p>
                  <p className="font-amharic opacity-90 border-l-4 border-wisdom-yellow/30 pl-6 py-2">
                    &quot;ያለፈውን ጊዜ አስታውሳለሁ — ጥያቄዎቹን፣ ብቸኝነቱን እና ያልታወቁ ነገሮች ጫናን፡፡ ነገር ግን ልጄ ሸክም ሳይሆን መለኮታዊ ሥራ መሆኑን የተረዳሁበትንም ቅጽበት አስታውሳለሁ፡፡&quot;
                  </p>
                  <p>
                    Wisdom Integration is here to tell you that your story matters, your struggles are seen, and there is hope in every small step forward.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Practical Tips Grid */}
      <section className="py-20 bg-slate-50 dark:bg-transparent border-y border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-extrabold text-3xl text-wisdom-text mb-4">Practical Tips for the Journey</h2>
            <p className="text-wisdom-muted font-medium">Simple, effective strategies to help your family thrive at home.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {tips.map((tip, idx) => (
               <div key={idx} className="bg-white dark:bg-white/5 p-10 rounded-[2.5rem] border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-xl transition-all group">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{tip.icon}</div>
                  <h3 className="font-heading font-black text-xl text-wisdom-text mb-4">{tip.titleEn}</h3>
                  <div className="space-y-4">
                     <p className="text-sm text-wisdom-muted leading-relaxed">{tip.descEn}</p>
                     <p className="text-[13px] font-amharic text-wisdom-muted/70 leading-relaxed italic">{tip.descAm}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
