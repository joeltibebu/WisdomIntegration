import React from "react";

interface SubPageHeroProps {
  badgeEn: string;
  badgeAm: string;
  titleEn: string;
  titleAm: string;
  descriptionEn?: string;
  descriptionAm?: string;
}

export function SubPageHero({
  badgeEn,
  badgeAm,
  titleEn,
  titleAm,
  descriptionEn,
  descriptionAm
}: SubPageHeroProps) {
  return (
    <section className="relative bg-[#0A1128] pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-wisdom-blue mix-blend-screen opacity-10 filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <span className="inline-block py-1.5 px-5 rounded-full bg-white/10 border border-white/10 text-wisdom-yellow font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-8 shadow-sm backdrop-blur-md">
          {badgeEn} / {badgeAm}
        </span>
        
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white mb-4 tracking-tight leading-tight">
          {titleEn}
        </h1>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-400 mb-8 font-amharic">
          {titleAm}
        </h2>

        {(descriptionEn || descriptionAm) && (
          <div className="max-w-3xl mx-auto space-y-4">
            {descriptionEn && (
              <p className="font-body text-slate-300 text-lg sm:text-xl leading-relaxed font-medium">
                {descriptionEn}
              </p>
            )}
            {descriptionAm && (
              <p className="font-body text-slate-400 text-lg sm:text-xl leading-relaxed font-amharic font-medium">
                {descriptionAm}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
