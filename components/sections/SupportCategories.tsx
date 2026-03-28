import React from 'react';

export function SupportCategories() {
  const categories = [
    { name: "Autism Support", color: "bg-wisdom-blue" },
    { name: "Family Guidance", color: "bg-wisdom-green" },
    { name: "Spiritual Care", color: "bg-wisdom-orange" },
    { name: "Parent Counseling", color: "bg-wisdom-yellow" },
    { name: "Inclusive Learning", color: "bg-wisdom-blue" },
    { name: "Community Support", color: "bg-wisdom-green" }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-b border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-transparent" aria-label="Quick Support Categories">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md whitespace-nowrap text-wisdom-text font-medium text-sm sm:text-base cursor-pointer transition-all hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10"
            >
              <div className={`w-2.5 h-2.5 rounded-full ${cat.color} shadow-sm shrink-0`}></div>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
