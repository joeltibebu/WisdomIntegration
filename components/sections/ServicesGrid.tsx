import React from "react";

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
}

const services: Service[] = [
  {
    title: "Parent Counseling",
    description: "Compassionate guidance and emotional support for parents navigating the unique challenges of raising a child with developmental needs.",
    colorClass: "text-wisdom-orange",
    bgClass: "bg-wisdom-orange/10 border-wisdom-orange/20",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Spiritual Care",
    description: "Faith-based encouragement anchoring families in the truth of the Gospel, offering deep emotional reconciliation and lasting peace.",
    colorClass: "text-wisdom-yellow",
    bgClass: "bg-wisdom-yellow/10 border-wisdom-yellow/20",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Inclusive Learning",
    description: "Tailored educational assistance designed to help children with unique limitations discover and reach their full divine potential.",
    colorClass: "text-wisdom-green",
    bgClass: "bg-wisdom-green/10 border-wisdom-green/20",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Community Integration",
    description: "Helping families step out of isolation by providing safe, inclusive environments where they belong and are truly valued.",
    colorClass: "text-wisdom-blue",
    bgClass: "bg-wisdom-blue/10 border-wisdom-blue/20",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Holistic Therapy",
    description: "Practical therapies encompassing speech, occupational, and behavioral support tailored to nurture earthly and spiritual life.",
    colorClass: "text-emerald-500",
    bgClass: "bg-emerald-500/10 border-emerald-500/20",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Family Care & Respite",
    description: "Offering practical assistance and dedicated rest periods for parents so they can recharge and continue loving their families deeply.",
    colorClass: "text-rose-500",
    bgClass: "bg-rose-500/10 border-rose-500/20",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

export function ServicesGrid() {
  return (
    <section aria-labelledby="services-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="inline-block py-1.5 px-5 rounded-full bg-slate-50 dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-blue font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 shadow-sm">
          What We Offer
        </span>
        <h2 id="services-heading" className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text mb-4">
          Practical & Spiritual Support
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-transparent via-wisdom-blue to-transparent mx-auto rounded-full mt-4 opacity-80"></div>
      </div>

      <ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center"
        role="list"
      >
        {services.map((service, i) => (
          <li key={i} className="w-full">
            <div className="bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 h-full flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${service.bgClass} ${service.colorClass} group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="font-heading font-bold text-xl text-wisdom-text mb-3">
                {service.title}
              </h3>
              <p className="text-wisdom-muted text-base leading-relaxed flex-1">
                {service.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
