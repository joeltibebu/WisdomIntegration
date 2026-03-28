"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

export function HeartAndRootsHub() {
  const { lang } = useLanguage();
  const am = lang === "am";

  const [activeTab, setActiveTab] = useState<"story" | "purpose" | "scripture">("story");

  const tabs = [
    { id: "story", labelEn: "Our Story", labelAm: "ታሪካችን" },
    { id: "purpose", labelEn: "Our Purpose", labelAm: "ዓላማችን" },
    { id: "scripture", labelEn: "Our Foundation", labelAm: "መሠረታችን" },
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden bg-wisdom-bg dark:bg-wisdom-bg" aria-label="Our Heart & Roots Hub">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wisdom-blue rounded-full mix-blend-multiply dark:mix-blend-screen opacity-[0.03] filter blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-wisdom-green rounded-full mix-blend-multiply dark:mix-blend-screen opacity-[0.03] filter blur-[150px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <span className="inline-block py-1 px-4 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-blue font-bold text-xs tracking-[0.2em] uppercase mb-4 shadow-sm">
            {am ? "የእኛ ልብ እና መሠረት" : "Our Heart & Roots"}
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-wisdom-text tracking-tight leading-tight">
            {am ? (
              <>
                በጥበብ <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-blue via-wisdom-green to-wisdom-yellow">መፈወስ እና መገንባት.</span>
              </>
            ) : (
              <>
                Consistently Healing & <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-blue via-wisdom-green to-wisdom-yellow">Building with Wisdom.</span>
              </>
            )}
          </h2>
        </div>

        {/* Custom Tab Navigation - Tightened */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative px-6 py-3 rounded-2xl font-heading font-bold text-sm sm:text-base transition-all duration-500 overflow-hidden ${
                activeTab === tab.id 
                  ? "text-white shadow-xl shadow-wisdom-blue/20" 
                  : "text-wisdom-muted hover:text-wisdom-blue bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10"
              }`}
            >
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-wisdom-blue to-wisdom-green animate-in fade-in duration-500"></div>
              )}
              <div className="relative z-10 flex flex-col items-center">
                <span className={am ? "font-amharic" : ""}>{am ? tab.labelAm : tab.labelEn}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content Area - 2 Column Alignment */}
        <div className="relative min-h-[500px] transition-all duration-700">
          
          {/* TAB: OUR STORY */}
          {activeTab === "story" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="space-y-6 pt-2">
                <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text">{am ? "ከፍቅር እና ከልምድ የተወለደ" : "Born from Love & Experience"}</h3>
                <div className="relative pl-6 border-l-4 border-wisdom-blue/30 space-y-4">
                  {am ? (
                    <p className="font-amharic text-wisdom-text text-lg leading-relaxed font-medium">
                      ዊዝደም ኢንቲግሬሽን ሚኒስትሪ የተመሠረተው ልጃቸው ካሌብን ከኦቲዝም ጋር በማሳደግ በዳንኤል እና የኔነሽ የ20 ዓመታት ጉዞ ውስጥ በተገኘው ልምድ ነው፡፡
                    </p>
                  ) : (
                    <p className="font-body text-wisdom-text text-lg leading-relaxed font-medium">
                      Wisdom Integration Ministry was born from the 20-year journey of Brother Daniel and Sister Yenenesh, raising their son Kaleb with autism.
                    </p>
                  )}
                </div>
                <p className={`text-wisdom-muted text-base leading-relaxed font-medium ${am ? 'font-amharic' : 'font-body'}`}>
                  {am 
                    ? "እንደ ግል ትግል የጀመረው ነገር ወደ ጥልቅ ተልዕኮ ተቀይሯል፡ በተመሳሳይ መንገድ ለሚጓዙ ልጆች እና ቤተሰቦች ፈውሰ፣ ዓላማ እና ማኅበረሰብን ማግኘት።" 
                    : "What began as a personal struggle has transformed into a profound mission: to find healing, purpose, and community for children and families walking the same path."}
                </p>
              </div>
              <div className="relative group self-start">
                <div className="absolute -inset-2 bg-wisdom-blue/5 rounded-[2rem] blur-xl"></div>
                <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl">
                  <Image 
                    src="https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=1200" 
                    alt="Kaleb and his family" 
                    width={800}
                    height={600}
                    className="w-full h-[450px] object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 p-4 backdrop-blur-md bg-white/10 rounded-xl border border-white/20">
                     <p className={`text-white text-[10px] font-black uppercase mb-0.5 tracking-wider ${am ? 'font-amharic' : 'tracking-[0.2em]'}`}>
                       {am ? "የካሌብ ጉዞ — የእኛ መነሻ" : "Who We Are"}
                     </p>
                     {!am && <p className="text-white/70 text-[10px] font-amharic">የካሌብ ጉዞ — የእኛ መነሻ</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: OUR PURPOSE */}
          {activeTab === "purpose" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="space-y-6 pt-2">
                <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text">
                  {am ? "እምነት፣ ጥበብ እና እውነተኛ ፍቅር" : "Faith, Wisdom, and True Love"}
                </h3>
                <p className={`text-wisdom-muted text-lg leading-relaxed font-medium italic border-l-4 border-wisdom-green/30 pl-6 py-2 ${am ? 'font-amharic' : 'font-body'}`}>
                  {am ? '"ለድሆች የምሥራችን እሰብክ ዘንድ፣ ልባቸው የተሰበረውን እጠግን ዘንድ..."' : '"For I have come to bring good news to the poor and bind up the brokenhearted."'}
                </p>
                <div className="grid grid-cols-1 gap-3">
                   {[
                     { en: "True Love", am: "እውነተኛ ፍቅር", color: "bg-wisdom-orange" },
                     { en: "The Gospel", am: "ወንጌል", color: "bg-wisdom-blue" },
                     { en: "Divine Wisdom", am: "መለኮታዊ ጥበብ", color: "bg-wisdom-green" }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-wisdom-surface border border-slate-100 dark:border-white/10 shadow-sm">
                       <div className={`w-2.5 h-2.5 rounded-full ${item.color}`}></div>
                       <div className="flex flex-wrap items-center gap-2">
                         <span className={`font-bold text-sm text-wisdom-text ${am ? 'font-amharic' : ''}`}>{am ? item.am : item.en}</span>
                       </div>
                     </div>
                   ))}
                </div>
              </div>
              <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl self-start">
                <Image 
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=1200" 
                  alt="Our Purpose" 
                  width={800}
                  height={600}
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-wisdom-green/10 mix-blend-overlay"></div>
              </div>
            </div>
          )}

          {/* TAB: SCRIPTURE */}
          {activeTab === "scripture" && (
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="w-20 h-20 rounded-full bg-wisdom-yellow/10 flex items-center justify-center text-wisdom-yellow mb-10 shadow-inner">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
               </div>
               <div className="space-y-12">
                  <div className="space-y-4">
                     <h4 className="font-heading text-2xl font-bold text-wisdom-blue">{am ? "ኢሳይያስ 61፥1" : "Isaiah 61:1"}</h4>
                     <p className={`text-xl text-wisdom-text leading-relaxed italic max-w-3xl mx-auto ${am ? 'font-amharic' : 'font-body'}`}>
                        {am 
                          ? <>“የጌታ የእግዚአብሔር መንፈስ በእኔ ላይ ነው፤ ለድሆች የምሥራችን እሰብክ ዘንድ እግዚአብሔር ቀብቶኛል፤ ልባቸው <span className="text-wisdom-orange font-bold">የተሰበረውን</span> እጠግን ዘንድ... ላከኝ።”</>
                          : <>&ldquo;The Spirit of the Lord God is upon me, because the Lord has anointed me to bring good news to the poor; He has sent me to bind up the <span className="text-wisdom-orange font-bold">brokenhearted</span>...&rdquo;</>
                        }
                     </p>
                  </div>
               </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
