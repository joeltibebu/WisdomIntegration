import React from "react";
import Image from "next/image";

export function BilingualOutcomeSection() {
  const cards = [
    {
      titleEn: "Community Acceptance",
      titleAm: "የማኅበረሰብ ተቀባይነት",
      descEn: "Families should come out of isolation and be celebrated as children are accepted as precious gifts from God.",
      descAm: "ቤተሰቦች ከብቸኝነት ወጥተው ልጆች ከእግዚአብሔር የተሰጡ ውድ ስጦታዎች መሆናቸው ታምኖ ደስታ እንዲሰፍን እንጠብቃለን፡፡",
      color: "bg-wisdom-blue"
    },
    {
      titleEn: "Ministry of Help",
      titleAm: "የእርዳታ አገልግሎት",
      descEn: "Prepared servants of God needed to provide holistic support for both spiritual and earthly family life.",
      descAm: "ለቤተሰቡ መንፈሳዊ እና ምድራዊ ሕይወት አጠቃላይ ድጋፍ ለመስጠት የተዘጋጁ የእግዚአብሔር አገልጋዮች ማስነሳት፡፡",
      color: "bg-wisdom-green"
    },
    {
      titleEn: "Lasting Recognition",
      titleAm: "ዘላቂ ዕውቅና",
      descEn: "Wisdom Integration becoming an unforgettable friend and anchor to families in our nation.",
      descAm: "ዊዝደም ኢንቲግሬሽን ለአገራችን ቤተሰቦች የማይረሳ ወዳጅ እና መሠረት ሆኖ እንዲገኝ እንሠራለን፡፡",
      color: "bg-wisdom-yellow"
    }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden border-t border-slate-200/50 dark:border-white/5" aria-label="Expected Outcome / የምንጠብቀው ውጤት">
       {/* Top Accents */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-wisdom-yellow/5 filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Column (Headline & Cards) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          <div className="text-center lg:text-left">
            <span className="inline-block py-1.5 px-5 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-orange dark:text-orange-400 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 shadow-sm">
              Expected Outcome / የምንጠብቀው ውጤት
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-wisdom-text mb-6 tracking-tight leading-tight">
              What Results Do <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-orange to-wisdom-yellow text-shadow-sm">We Hope to See?</span>
            </h2>
          </div>

          <div className="space-y-6">
            {cards.map((card, idx) => (
              <div key={idx} className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-[0_10px_30px_rgba(242,170,44,0.04)] hover:-translate-x-2 transition-all duration-300 relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-2 h-full ${card.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <h4 className="font-heading font-bold text-xl text-wisdom-text">{card.titleEn}</h4>
                    <span className="text-wisdom-muted/30 hidden sm:inline">|</span>
                    <h4 className="font-heading font-bold text-xl text-wisdom-text font-amharic pt-0.5">{card.titleAm}</h4>
                  </div>
                  <p className="font-body text-wisdom-muted text-base leading-relaxed">{card.descEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Community Image) */}
        <div className="lg:col-span-5 relative group">
           <div className="absolute -inset-4 bg-wisdom-yellow/5 rounded-[3rem] blur-2xl group-hover:bg-wisdom-yellow/10 transition-colors"></div>
           <div className="relative h-[600px] rounded-[3rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200" 
                alt="Community of families smiling together" 
                width={1200}
                height={800}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wisdom-orange/40 via-transparent to-transparent"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white animate-pulse">
                 <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
              </div>
           </div>
        </div>
        
      </div>
    </section>
  );
}
