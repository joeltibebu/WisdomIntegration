import React from "react";
import Image from "next/image";

export function BilingualPurposeSection() {
  const cards = [
    {
      titleEn: "True Love",
      titleAm: "እውነተኛ ፍቅር",
      descEn: "This wisdom is love; it is the selfless giving of time and knowledge to those in need.",
      descAm: "ይህ ጥበብ ፍቅር ነው፤ ጊዜንና እውቀትን መስጠት ነው፡፡",
      color: "bg-wisdom-orange",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      titleEn: "The Gospel",
      titleAm: "ወንጌል",
      descEn: "Above all, it is preaching the Gospel that reconciles man to God, telling us the meaning of life.",
      descAm: "ከሁሉም በላይ ሰውንና እግዚአብሔርን የሚያስታርቀውን፣ የመኖርን መንገድና ትርጉም የሚነግረንን ወንጌል መስበክ ነው፡፡",
      color: "bg-wisdom-blue",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      titleEn: "Divine Wisdom",
      titleAm: "መለኮታዊ ጥበብ",
      descEn: "Rooted in spiritual guidance, we offer specialized care that addresses both earthly and eternal life.",
      descAm: "በመንፈሳዊ መመሪያ ላይ በመመሥረት፣ ምድራዊውንም ሆነ ዘላለማዊውን ሕይወት የሚያካትት ልዩ እንክብካቤ እናቀርባለን፡፡",
      color: "bg-wisdom-green",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden bg-white/30 dark:bg-transparent" aria-label="Our Purpose / ዓላማችን">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-wisdom-green rounded-full mix-blend-multiply dark:mix-blend-screen opacity-[0.03] dark:opacity-[0.02] filter blur-[150px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center lg:items-start">
        
        {/* Left Column (Headline & Symbolic Image) */}
        <div className="flex flex-col gap-10">
          <div className="text-center lg:text-left">
            <span className="inline-block py-1.5 px-5 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-green font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 shadow-sm">
              Our Purpose / ዓላማችን
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-wisdom-text mb-6 tracking-tight leading-tight">
              Faith, Wisdom,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-green to-wisdom-blue">and True Love.</span>
            </h2>
            <p className="font-body text-wisdom-muted text-lg sm:text-xl leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0 italic border-l-4 border-wisdom-green/30 pl-6 py-2">
              &quot;For I have come to bring good news to the poor and bind up the brokenhearted.&quot;
            </p>
          </div>

          <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl group">
             <Image 
               src="https://images.unsplash.com/photo-1532731939063-70db6465715a?auto=format&fit=crop&q=80&w=1200" 
               alt="Symbolic light representing spiritual guidance" 
               width={1200}
               height={600}
               className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-wisdom-green/10 mix-blend-overlay"></div>
          </div>
        </div>

        {/* Right Column (Cards) */}
        <div className="w-full max-w-2xl mx-auto space-y-6">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-[0_10px_30px_rgba(61,174,73,0.04)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-2 h-full ${card.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="flex items-start gap-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${card.color} text-white shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h4 className="font-heading font-bold text-xl text-wisdom-text">{card.titleEn}</h4>
                    <span className="text-wisdom-muted/30 hidden sm:inline">/</span>
                    <h4 className="font-heading font-bold text-xl text-wisdom-text font-amharic pt-0.5">{card.titleAm}</h4>
                  </div>
                  <div className="space-y-2">
                    <p className="font-body text-wisdom-muted text-base leading-relaxed">{card.descEn}</p>
                    <p className="font-body text-wisdom-muted text-base leading-relaxed font-amharic">{card.descAm}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
