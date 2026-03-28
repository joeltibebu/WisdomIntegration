import React from "react";
import Image from "next/image";

export function BilingualAboutSection() {
  const cards = [
    {
      titleEn: "Kaleb's Journey",
      titleAm: "የካሌብ ጉዞ",
      descEn: "Their son Kaleb has lived with autism for 20 years. This personal lived experience is the bedrock of the ministry's deep empathy.",
      descAm: "ልጃቸው ካሌብ ላለፉት 20 ዓመታት ከኦቲዝም ጋር ኖሯል፡፡ ይህ የግል ተሞክሮ የአገልግሎቱ ጥልቅ የመረዳት መሠረት ነው፡፡",
      color: "bg-wisdom-blue"
    },
    {
      titleEn: "Shared Wisdom",
      titleAm: "የተጋራ ጥበብ",
      descEn: "Motivated by their journey, Daniel and Yenenesh decided to share the wisdom and understanding they gained to uplift others.",
      descAm: "ዳንኤል እና የኔነሽ ያገኙትን ጥበብ እና ግንዛቤ ሌሎችን ለማንቀሳቀስ እና ለመደገፍ ወሰኑ፡፡",
      color: "bg-wisdom-green"
    },
    {
      titleEn: "Community Action",
      titleAm: "የማኅበረሰብ ተግባር",
      descEn: "Together with friends, they established this service to provide guidance and hope to families walking similar paths.",
      descAm: "ከጓደኞቻቸው ጋር በመሆን፣ ተመሳሳይ መንገድ ለሚጓዙ ቤተሰቦች መመሪያ እና ተስፋ ለመስጠት ይህንን አገልግሎት አቋቋሙ፡፡",
      color: "bg-wisdom-orange"
    }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden" aria-label="Who We Are / ስለ እኛ">
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wisdom-blue rounded-full mix-blend-multiply dark:mix-blend-screen opacity-[0.03] dark:opacity-[0.02] filter blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Column: Authentic Family Photography */}
        <div className="lg:col-span-5 relative group order-2 lg:order-1">
          <div className="absolute -inset-4 bg-wisdom-blue/5 rounded-[3rem] blur-2xl group-hover:bg-wisdom-blue/10 transition-colors"></div>
          <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl transition-all duration-500 group-hover:shadow-wisdom-blue/10">
            <Image 
              src="https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=1200" 
              alt="Kaleb and his family — a symbol of hope and belonging" 
              width={1200}
              height={800}
              className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Caption Card */}
            <div className="absolute bottom-8 left-8 right-8 p-6 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-wisdom-blue flex items-center justify-center text-white shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/></svg>
                  </div>
                  <div>
                    <p className="text-white text-xs font-black tracking-[0.2em] uppercase mb-0.5">Kaleb & Family</p>
                    <p className="text-white/70 text-[11px] font-amharic">ካሌብ እና ቤተሰቡ — የተስፋ ምልክት</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Story & Mission */}
        <div className="lg:col-span-7 text-center lg:text-left order-1 lg:order-2">
          <span className="inline-block py-1.5 px-5 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-blue font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 shadow-sm">
            Our Heart & Mission / የእኛ ልብ እና ተልዕኮ
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-wisdom-text mb-8 tracking-tight leading-tight">
            A Journey Defined by<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-blue via-wisdom-green to-wisdom-yellow">Faith and Resilience.</span>
          </h2>
          
          <div className="space-y-8 mb-12">
            <div className="relative pl-8 border-l-4 border-wisdom-blue/30">
              <p className="font-body text-wisdom-text text-lg sm:text-xl leading-relaxed font-medium mb-4">
                Wisdom Integration Ministry was born from the 20-year journey of Brother Daniel and Sister Yenenesh, raising their son Kaleb with autism.
              </p>
              <p className="font-body text-wisdom-muted text-base sm:text-lg leading-relaxed font-amharic opacity-90 italic">
                ዊዝደም ኢንቲግሬሽን ሚኒስትሪ የተመሠረተው ልጃቸው ካሌብን ከኦቲዝም ጋር በማሳደግ በዳንኤል እና የኔነሽ የ20 ዓመታት ጉዞ ውስጥ በተገኘው ልምድ ነው፡፡
              </p>
            </div>
            
            <p className="font-body text-wisdom-muted text-lg sm:text-xl leading-relaxed font-medium">
              What began as a personal struggle has transformed into a profound mission: to find healing, purpose, and community for children and families walking the same path.
            </p>
          </div>

          {/* Mini Thematic Cards for visual rhythm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {cards.slice(1).map((card, idx) => (
               <div key={idx} className="p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 group hover:border-wisdom-blue/30 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-2 h-6 rounded-full ${card.color}`}></div>
                    <h4 className="font-heading font-bold text-sm text-wisdom-text tracking-wide uppercase">{card.titleEn}</h4>
                  </div>
                  <p className="text-sm text-wisdom-muted font-amharic line-clamp-2">{card.descAm}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
