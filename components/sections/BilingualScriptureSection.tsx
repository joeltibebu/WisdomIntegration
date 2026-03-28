import React from "react";

export function BilingualScriptureSection() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-hidden" aria-label="Our Guiding Scripture / መሪ ጥቅሳችን">
      
      {/* Premium Ambient Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wisdom-blue rounded-full mix-blend-multiply dark:mix-blend-screen opacity-10 dark:opacity-[0.05] filter blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-wisdom-green rounded-full mix-blend-multiply dark:mix-blend-screen opacity-[0.05] dark:opacity-[0.03] filter blur-[150px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-block py-1.5 px-5 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-orange dark:text-wisdom-yellow font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 shadow-sm backdrop-blur-sm">
            Our Foundation / መሠረታችን
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-wisdom-text mb-4 tracking-tight">
            Guiding Scripture
          </h2>
          <h3 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-wisdom-muted mb-2 font-amharic">
            መሪ ጥቅሳችን
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-wisdom-yellow to-wisdom-green mx-auto rounded-full mt-8 opacity-80"></div>
        </div>

        {/* Layout Split Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full text-left relative items-stretch">
          
          {/* Vertical Divider (Desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-white/10 to-transparent -translate-x-1/2"></div>
          
          {/* ========================================================== */}
          {/* English Side */}
          {/* ========================================================== */}
          <div className="flex flex-col space-y-6">
            
            {/* Context & Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-wisdom-blue/10 dark:bg-wisdom-blue/20 border border-wisdom-blue/20 dark:border-wisdom-blue/30 flex items-center justify-center text-wisdom-blue font-bold text-sm shrink-0 shadow-sm">
                  EN
                </div>
                <h4 className="font-heading text-lg sm:text-xl font-bold text-wisdom-text tracking-wide pt-1">
                  Isaiah 61:1
                </h4>
              </div>
            </div>
            
            <p className="font-body text-[1.1rem] sm:text-[1.2rem] text-wisdom-muted leading-relaxed font-medium">
              Our guiding scripture is rooted in the mission of Jesus &mdash; &ldquo;I have come...&rdquo;
            </p>

            {/* Glassmorphism Scripture Card */}
            <div className="h-full bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[32px] p-8 sm:p-10 shadow-xl hover:bg-white/80 dark:hover:bg-white/[0.07] transition-colors duration-500 relative group overflow-hidden">
              {/* Card Inner Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-wisdom-yellow rounded-full mix-blend-multiply dark:mix-blend-screen opacity-0 group-hover:opacity-20 dark:group-hover:opacity-10 filter blur-[60px] transition-opacity duration-700 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
              
              <blockquote className="font-heading text-xl sm:text-2xl text-wisdom-text leading-[1.8] italic relative z-10 font-bold opacity-90">
                &ldquo;The Spirit of the Lord God is upon me,<br />
                because the Lord has anointed me<br />
                to bring good news to the poor;<br />
                He has sent me to bind up the <span className="text-wisdom-orange dark:text-yellow-400 font-bold px-1 not-italic border-b border-wisdom-orange/30 dark:border-yellow-400/30">brokenhearted</span>,<br />
                to proclaim freedom for the captives<br />
                and release from darkness for the prisoners.&rdquo;
              </blockquote>
            </div>
          </div>


          {/* ========================================================== */}
          {/* Amharic Side */}
          {/* ========================================================== */}
          <div className="flex flex-col space-y-6 pt-12 lg:pt-0 border-t border-slate-200 dark:border-white/10 lg:border-none relative">
            
            {/* Context & Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-wisdom-green/10 dark:bg-wisdom-green/20 border border-wisdom-green/20 dark:border-wisdom-green/30 flex items-center justify-center text-wisdom-green font-bold text-sm shrink-0 shadow-sm">
                  AM
                </div>
                <h4 className="font-heading text-lg sm:text-xl font-bold text-wisdom-text font-amharic tracking-wide pt-1">
                  ኢሳይያስ 61፥1
                </h4>
              </div>
            </div>
            
            <p className="font-body text-[1.1rem] sm:text-[1.2rem] text-wisdom-muted leading-relaxed font-amharic font-medium">
              መሪ ጥቅሳችን ኢየሱስ &ldquo;መጣሁ&rdquo; ያለውን መሰረት ያደረገ ነው።
            </p>

            {/* Glassmorphism Scripture Card */}
            <div className="h-full bg-white/20 dark:bg-white/[0.02] backdrop-blur-xl border border-slate-200/50 dark:border-white/5 rounded-[32px] p-8 sm:p-10 shadow-lg hover:bg-white/40 dark:hover:bg-white/[0.04] transition-colors duration-500 relative group overflow-hidden">
              {/* Card Inner Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-wisdom-green rounded-full mix-blend-multiply dark:mix-blend-screen opacity-0 group-hover:opacity-20 dark:group-hover:opacity-10 filter blur-[60px] transition-opacity duration-700 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
              
              <blockquote className="font-heading text-xl sm:text-2xl text-wisdom-text leading-[2] italic font-amharic relative z-10 font-bold opacity-90">
                &ldquo;የጌታ የእግዚአብሔር መንፈስ በእኔ ላይ ነው፤<br />
                ለድሆች የምሥራችን እሰብክ ዘንድ እግዚአብሔር ቀብቶኛል፤<br />
                ልባቸው <span className="text-wisdom-orange dark:text-yellow-400 font-bold px-1 not-italic border-b border-wisdom-orange/30 dark:border-yellow-400/30">የተሰበረውን</span> እጠግን ዘንድ፣<br />
                ለተማረኩት ነጻነትን፣<br />
                ለታሰሩትም መፈታትን እናገር ዘንድ ልኮኛል።&rdquo;
              </blockquote>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
