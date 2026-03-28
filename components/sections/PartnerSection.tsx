import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function PartnerSection() {
  const waysToPartner = [
    {
      title: "Volunteer Your Time",
      desc: "Join our dedicated community of professionals and compassionate individuals serving these families.",
      cta: "Become a Volunteer",
      color: "bg-wisdom-blue border-wisdom-blue/20"
    },
    {
      title: "Support Financially",
      desc: "Your generous giving allows us to sponsor holistic therapy and spiritual care for families in need.",
      cta: "Donate Now",
      color: "bg-wisdom-green border-wisdom-green/20"
    },
    {
      title: "Pray With Us",
      desc: "Commit to standing in the gap, praying for the profound spiritual and physical healing of our children.",
      cta: "Join Prayer Team",
      color: "bg-wisdom-yellow border-wisdom-yellow/20"
    },
    {
      title: "Refer a Family",
      desc: "Know a family struggling in isolation? Lovingly connect them to our inclusive ministry community.",
      cta: "Refer a Family",
      color: "bg-wisdom-orange border-wisdom-orange/20"
    }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-20 overflow-hidden bg-wisdom-bg" aria-label="Partner With Us">
      {/* Premium Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-wisdom-blue rounded-full mix-blend-multiply dark:mix-blend-screen opacity-[0.03] filter blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-wisdom-green rounded-full mix-blend-multiply dark:mix-blend-screen opacity-[0.03] filter blur-[150px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
           <div>
              <span className="inline-block py-1.5 px-5 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-blue font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 shadow-sm">
                Partner With Us
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-wisdom-text mb-8 tracking-tight leading-tight">
                Support the Ministry.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-blue to-wisdom-green italic">Heal a Community.</span>
              </h2>
              <p className="font-body text-wisdom-muted text-lg sm:text-xl leading-relaxed font-medium mb-10 max-w-xl">
                Your generosity provides the specialized care and spiritual family children with developmental limitations deserve. Join us in breaking the cycle of isolation.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                 <Link href="/donate" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto rounded-full bg-wisdom-blue text-white hover:bg-blue-800 hover:scale-105 transition-all px-12 py-8 font-black text-lg shadow-2xl shadow-wisdom-blue/20">
                       Donate Now / አሁኑኑ ይለግሱ
                    </Button>
                 </Link>
                 <Link href="/contact" className="text-wisdom-muted font-bold hover:text-wisdom-blue transition-colors flex items-center gap-2">
                    Other Ways to Help
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                 </Link>
              </div>
           </div>

           <div className="relative">
              <div className="absolute -inset-10 bg-wisdom-blue/10 rounded-full filter blur-[100px] animate-pulse"></div>
              <div className="relative bg-white dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-10 lg:p-12 rounded-[3.5rem] shadow-xl overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-wisdom-green/20 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                 <h3 className="font-heading font-black text-2xl text-wisdom-text mb-6">Financial Impact</h3>
                 <ul className="space-y-6">
                    <li className="flex gap-4">
                       <div className="w-6 h-6 rounded-full bg-wisdom-green flex items-center justify-center shrink-0 mt-1">
                          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                       </div>
                       <p className="text-wisdom-muted text-sm leading-relaxed"><strong className="text-wisdom-text">Scholarships:</strong> Helping families who cannot afford the full cost of specialized therapy sessions.</p>
                    </li>
                    <li className="flex gap-4">
                       <div className="w-6 h-6 rounded-full bg-wisdom-blue flex items-center justify-center shrink-0 mt-1">
                          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                       </div>
                       <p className="text-wisdom-muted text-sm leading-relaxed"><strong className="text-wisdom-text">Education:</strong> Training specialized servants to provide holistic spiritual and earthly support.</p>
                    </li>
                 </ul>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-200 dark:border-white/10">
          {waysToPartner.filter(w => w.title !== "Support Financially").map((way, idx) => (
            <div key={idx} className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-8 rounded-[2rem] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col group">
              <div className={`w-12 h-12 rounded-2xl ${way.color} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                <svg className="w-6 h-6 outline-none" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-lg text-wisdom-text mb-2">{way.title}</h3>
              <p className="font-body text-wisdom-muted text-sm leading-relaxed mb-6 flex-1">{way.desc}</p>
              <Link href="/contact" className="text-xs font-black text-wisdom-blue uppercase tracking-widest hover:underline transition-colors">
                {way.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
