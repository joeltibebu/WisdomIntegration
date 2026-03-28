"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/LanguageContext";

export function ImpactAndCommunityHub() {
  const { lang } = useLanguage();
  const am = lang === "am";

  const [activeTab, setActiveTab] = useState<"vision" | "outcome" | "events">("vision");

  const tabs: { id: "vision" | "outcome" | "events"; labelEn: string; labelAm: string }[] = [
    { id: "vision", labelEn: "Why It Matters", labelAm: "ለምን አስፈለገ?" },
    { id: "outcome", labelEn: "Expected Results", labelAm: "የሚገኝ ውጤት" },
    { id: "events", labelEn: "Upcoming Events", labelAm: "መጪ ኩነቶች" },
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 overflow-hidden bg-wisdom-bg dark:bg-wisdom-bg border-y border-slate-100 dark:border-white/5" aria-label="Impact & Community Hub">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wisdom-orange rounded-full mix-blend-multiply dark:mix-blend-screen opacity-[0.02] filter blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block py-1 px-4 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-orange font-bold text-xs tracking-[0.2em] uppercase mb-4 shadow-sm">
            {am ? "ተፅዕኖ እና ማኅበረሰብ" : "Impact & Community"}
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-wisdom-text tracking-tight leading-tight">
            {am ? (
              <>
                ልብን መፈወስ እና <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-orange to-wisdom-yellow">ቤተሰብን ማብቃት።</span>
              </>
            ) : (
              <>
                Healing Hearts & <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-orange to-wisdom-yellow">Empowering Families.</span>
              </>
            )}
          </h2>
        </div>

        {/* Custom Tab Navigation - Tightened */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-3 rounded-2xl font-heading font-bold text-sm sm:text-base transition-all duration-500 overflow-hidden ${
                activeTab === tab.id 
                  ? "text-white shadow-xl shadow-wisdom-orange/20" 
                  : "text-wisdom-muted hover:text-wisdom-orange bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10"
              }`}
            >
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-wisdom-orange to-wisdom-yellow animate-in fade-in duration-500"></div>
              )}
              <div className="relative z-10 flex flex-col items-center">
                <span className={am ? "font-amharic" : ""}>{am ? tab.labelAm : tab.labelEn}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content Area - Improved Alignment */}
        <div className="relative min-h-[500px] transition-all duration-700">
          
          {/* TAB: VISION (Why It Matters) */}
          {activeTab === "vision" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start animate-in fade-in scale-[0.98] duration-700">
              <div className="space-y-6 pt-2">
                <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text">{am ? "ቤተሰብን መመለስ እና ልብን መፈወስ" : "Restoring Families & Healing Hearts"}</h3>
                <p className={`text-wisdom-muted text-lg leading-relaxed font-medium ${am ? 'font-amharic' : 'font-body'}`}>
                  {am 
                    ? "የዕድገት ውስንነት ምርመራ ማለት ብቻዎን መጓዝ ማለት አይደለም። ለቤተሰቦች በከፍተኛ ሁኔታ የሚያስፈልጋቸውን መንፈሳዊ እና ተግባራዊ የድጋፍ መሠረት ለመስጠት ክፍተቶቹን እንሞላለን።" 
                    : "A developmental diagnosis shouldn't mean a journey walked alone. We step into the gap to provide the spiritual and practical anchor families desperately need."}
                </p>
                <div className="grid grid-cols-1 gap-3">
                   {[
                     { title: "Overcoming Isolation", titleAm: "ብቸኝነትን ማሸነፍ", desc: "Breaking the silence and shame surrounding developmental challenges.", descAm: "በዕድገት ውስንነት ዙሪያ ያለውን ዝምታ እና ሀፍረት መስበር።" },
                     { title: "Finding Belonging", titleAm: "ቦታን ማግኘት", desc: "Creating inclusive environments where every child feels valued.", descAm: "እያንዳንዱ ልጅ ክብር የሚሰማበት አካታች ቦታን መፍጠር።" }
                   ].map((item, i) => (
                     <div key={i} className="p-5 rounded-2xl bg-white dark:bg-wisdom-surface border border-slate-100 dark:border-white/10 shadow-sm">
                        <h4 className="font-heading font-bold text-lg text-wisdom-text mb-1">{am ? item.titleAm : item.title}</h4>
                        <p className={`text-sm text-wisdom-muted leading-relaxed ${am ? 'font-amharic' : ''}`}>{am ? item.descAm : item.desc}</p>
                     </div>
                   ))}
                </div>
              </div>
              <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl self-start">
                <Image 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200" 
                  alt="Community of families" 
                  width={800}
                  height={600}
                  className="w-full h-[450px] object-cover"
                />
              </div>
            </div>
          )}

          {/* TAB: OUTCOME */}
          {activeTab === "outcome" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start animate-in fade-in scale-[0.98] duration-700">
              <div className="order-2 lg:order-1 relative rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl self-start">
                <Image 
                  src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1200" 
                  alt="Expected Results" 
                  width={800}
                  height={600}
                  className="w-full h-[450px] object-cover"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-6 pt-2">
                <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text">{am ? "በእምነት የሚመራ ዕድገት" : "Faith-Led Progress"}</h3>
                <p className={`text-wisdom-muted text-lg leading-relaxed font-medium ${am ? 'font-amharic' : 'font-body'}`}>
                  {am 
                    ? "ቤተሰቦች በፍቅር እና በጥበብ ሲደገፉ፣ የሚገኘው ውጤት ህይወትን የሚቀይር እና ዘላለማዊ ነው።" 
                    : "When families are supported with love and wisdom, the results are transformative and eternal."}
                </p>
                <div className="grid grid-cols-1 gap-3">
                   {[
                     { titleEn: "Renewed Strength", titleAm: "አዲስ ጥንካሬ", desc: "Families rediscover the joy and resilience needed for the journey.", descAm: "ቤተሰቦች ለጉዞው የሚያስፈልጋቸውን ደስታ እና ጥንካሬ መልሰው ያገኛሉ።" },
                     { titleEn: "Inclusive Community", titleAm: "አካታች ማኅበረሰብ", desc: "Breaking barriers of shame and isolation across church and home.", descAm: "በቤተክርስቲያን እና በቤት ውስጥ ያለውን የሀፍረት እና የብቸኝነት ግድግዳ መስበር።" }
                   ].map((item, i) => (
                     <div key={i} className="p-5 rounded-2xl bg-white dark:bg-wisdom-surface border border-slate-100 dark:border-white/10 shadow-sm transition-transform hover:-translate-y-1">
                        <div className="flex justify-between items-center mb-2">
                           <span className={`font-bold text-sm text-wisdom-text ${am ? 'font-amharic' : ''}`}>{am ? item.titleAm : item.titleEn}</span>
                        </div>
                        <p className={`text-sm text-wisdom-muted leading-relaxed ${am ? 'font-amharic' : ''}`}>{am ? item.descAm : item.desc}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: EVENTS */}
          {activeTab === "events" && (
            <div className="animate-in fade-in scale-[0.98] duration-700">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                  <div className="max-w-xl">
                     <h3 className="font-heading font-extrabold text-3xl text-wisdom-text mb-3">{am ? "የቅርብ ጊዜ ክስተቶች" : "Upcoming Opportunities"}</h3>
                     <p className="text-wisdom-muted font-medium">{am ? "ድጋፍን፣ ጥበብን እና ዘላቂ ግንኙነቶችን ለማግኘት መሰብሰቢያችንን ይቀላቀሉ።" : "Join our gatherings to find support, wisdom, and lasting connections."}</p>
                  </div>
                  <Link href="/contact" className="text-wisdom-orange font-bold text-sm hover:underline flex items-center gap-2">
                     {am ? "ለዝማኔዎች ይመዝገቡ" : "Subscribe to Updates"}
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {[
                    { title: "Family Hope Workshop", titleAm: "የቤተሰብ ተስፋ አውደ ጥናት", date: "April 15, 2024", type: "Upcoming", typeAm: "መጪ" },
                    { title: "Community Prayer Night", titleAm: "የማኅበረሰብ ጸሎት ምሽት", date: "March 10, 2024", type: "Past", typeAm: "ያለፈ" },
                    { title: "Inclusion Seminar", titleAm: "የማካተት ሴሚናር", date: "Feb 22, 2024", type: "Past", typeAm: "ያለፈ" }
                  ].map((event, i) => (
                    <div key={i} className={`p-8 rounded-[2.5rem] border transition-all duration-300 ${event.type === 'Upcoming' ? 'bg-white border-wisdom-orange/20 shadow-xl shadow-wisdom-orange/5' : 'bg-slate-50 border-slate-100 dark:bg-wisdom-surface dark:border-white/5 opacity-70'}`}>
                       <div className="flex justify-between items-start mb-6">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${event.type === 'Upcoming' ? 'bg-wisdom-orange text-white' : 'bg-slate-200 text-slate-500'}`}>
                             {am ? event.typeAm : event.type}
                          </span>
                          <span className="text-sm font-bold text-wisdom-muted uppercase tracking-wider">{event.date}</span>
                       </div>
                       <h4 className="font-heading font-extrabold text-xl text-wisdom-text mb-4">{am ? event.titleAm : event.title}</h4>
                       <Link href={event.type === 'Upcoming' ? '/contact?subject=Registration' : '/about'} className="w-full">
                         <Button size="sm" variant={event.type === 'Upcoming' ? 'primary' : 'outline'} className={`w-full rounded-2xl text-[10px] font-black uppercase tracking-widest ${event.type === 'Upcoming' ? 'bg-wisdom-orange hover:bg-orange-600' : ''}`}>
                            {am ? (event.type === 'Upcoming' ? 'አሁን ይመዝገቡ' : 'ዝርዝሮችን ይመልከቱ') : (event.type === 'Upcoming' ? 'Register Now' : 'View Details')}
                         </Button>
                       </Link>
                    </div>
                  ))}
               </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
