import React from 'react';

export function WhyItMattersSection() {
  const points = [
    {
      title: "Overcoming Isolation",
      desc: "Many families with children facing developmental challenges stay hidden in shame and sorrow. We exist to break this isolation, pulling families out of the darkness and into a community that understands.",
      color: "bg-wisdom-blue",
      shadow: "shadow-[0_10px_30px_rgba(30,75,155,0.08)] dark:shadow-[0_10px_30px_rgba(30,75,155,0.03)]"
    },
    {
      title: "Healing Brokenness",
      desc: "The emotional toll on parents and siblings can lead to deep spiritual and emotional exhaustion. We provide the compassionate, faith-centered support needed to restore joy and mend broken hearts.",
      color: "bg-wisdom-green",
      shadow: "shadow-[0_10px_30px_rgba(61,174,73,0.08)] dark:shadow-[0_10px_30px_rgba(61,174,73,0.03)]"
    },
    {
      title: "Finding Belonging",
      desc: "Every child is a precious gift from God deserving of love. We create a safe, fiercely inclusive environment where every family member feels they truly belong and are deeply valued.",
      color: "bg-wisdom-yellow",
      shadow: "shadow-[0_10px_30px_rgba(242,170,44,0.08)] dark:shadow-[0_10px_30px_rgba(242,170,44,0.03)]"
    }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden bg-slate-50/50 dark:bg-transparent border-y border-slate-200/50 dark:border-white/5" aria-label="Why This Matters">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wisdom-blue rounded-full mix-blend-multiply dark:mix-blend-screen opacity-[0.03] dark:opacity-[0.02] filter blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center lg:items-start">
        
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-block py-1.5 px-5 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-orange dark:text-orange-400 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 shadow-sm">
            Why This Matters
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-wisdom-text mb-6 tracking-tight leading-tight">
            Restoring Families,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-blue to-wisdom-green">Healing Hearts.</span>
          </h2>
          <p className="font-body text-wisdom-muted text-lg sm:text-xl leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
            A developmental diagnosis shouldn&apos;t mean a journey walked entirely alone. We step into the gap to provide the spiritual and practical emotional anchor families desperately need to rediscover hope.
          </p>
        </div>

        {/* Right Cards */}
        <div className="flex-1 w-full max-w-2xl mx-auto space-y-5">
          {points.map((pt, i) => (
            <div key={i} className={`bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200/60 dark:border-white/10 p-6 sm:p-8 rounded-[2rem] ${pt.shadow} hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group`}>
              <div className={`absolute top-0 left-0 w-2 h-full ${pt.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-wisdom-text mb-3 pl-4">
                {pt.title}
              </h3>
              <p className="font-body text-wisdom-muted text-base sm:text-lg leading-relaxed pl-4">
                {pt.desc}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
