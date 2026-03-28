import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ResourcesSection() {
  const articles = [
    {
      category: "Parent Guidance",
      title: "Understanding Sensory Processing at Home",
      excerpt: "Practical, loving strategies to create a calm and responsive environment for your child's sensory needs.",
      date: "Oct 12, 2023",
      color: "text-wisdom-blue",
      bg: "bg-wisdom-blue/10"
    },
    {
      category: "Faith & Encouragement",
      title: "Finding God's Purpose in the Diagnosis",
      excerpt: "A deeply spiritual reflection on trusting God's intricate plan when the journey feels impossibly hard.",
      date: "Nov 04, 2023",
      color: "text-wisdom-green",
      bg: "bg-wisdom-green/10"
    },
    {
      category: "Ministry Updates",
      title: "New Inclusive Learning Programs Launching",
      excerpt: "We are expanding our educational outreach to accommodate more families into our Sunday and weekday services.",
      date: "Dec 18, 2023",
      color: "text-wisdom-orange",
      bg: "bg-wisdom-orange/10"
    }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-slate-50 dark:bg-wisdom-bg" aria-label="Ministry Resources">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block py-1.5 px-5 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-text font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 shadow-sm">
              Resources & Updates
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text">
              Equipping Families
            </h2>
          </div>
          <Button variant="outline" className="rounded-full px-6 py-6 border-slate-200 dark:border-white/10 text-wisdom-text hover:bg-white dark:hover:bg-white/5">
            View All Resources
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art, i) => (
            <article key={i} className="bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/5 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
              <div className="h-48 bg-slate-100 dark:bg-white/5 w-full relative overflow-hidden">
                {/* Placeholder Image Graphic */}
                <div className={`absolute inset-0 ${art.bg} opacity-50 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
                  <svg className={`w-12 h-12 ${art.color} opacity-40`} fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/></svg>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-xs font-bold tracking-wider uppercase ${art.color}`}>{art.category}</span>
                  <span className="text-xs text-wisdom-muted font-medium">{art.date}</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-wisdom-text mb-3 line-clamp-2">
                  <Link href="#" className="hover:underline">{art.title}</Link>
                </h3>
                <p className="text-wisdom-muted text-sm leading-relaxed flex-1 line-clamp-3">
                  {art.excerpt}
                </p>
                <Link href="#" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-wisdom-text hover:text-wisdom-blue transition-colors group/link">
                  Read Article
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
