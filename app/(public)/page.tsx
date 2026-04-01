import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";
import { HomePageHero } from "@/components/sections/HomePageHero";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [hero, features, books] = await Promise.all([
    prisma.heroSection.findUnique({ where: { page: "home" } }),
    prisma.homepageFeature.findMany({ orderBy: { order: "asc" } }),
    prisma.book.findMany({ where: { active: true }, take: 3, orderBy: { createdAt: "desc" } }),
  ]);
  return (
    <div className="bg-transparent w-full">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <HomePageHero hero={hero} />

      {/* ── SECTION CARDS GRID ───────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" aria-label="Explore Our Ministry">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.id}
                href={feature.href}
                className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[2rem] border border-white/20 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Color top accent bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${feature.color}`} />

                <div className="p-8 flex flex-col flex-1">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl ${feature.accentColor} flex items-center justify-center mb-5 text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.iconPath} />
                    </svg>
                  </div>

                  {/* Labels */}
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-wisdom-muted mb-3">
                    {feature.badge}
                    <span className="text-slate-300 font-light">/</span>
                    <span className="font-amharic font-semibold">{feature.badgeAm}</span>
                  </span>

                  {/* Title */}
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-wisdom-text mb-1 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="font-amharic text-wisdom-muted text-sm mb-4 opacity-70">{feature.titleAm}</p>

                  {/* Desc */}
                  <p className="text-wisdom-muted text-sm leading-relaxed font-medium flex-1">
                    {feature.description}
                  </p>

                  {/* CTA arrow */}
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-wisdom-blue group-hover:gap-3 transition-all">
                    Learn More
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED BOOKS SECTION ──────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block py-1 px-4 rounded-full bg-wisdom-blue/10 dark:bg-wisdom-surface/50 border border-wisdom-blue/20 dark:border-white/10 text-wisdom-blue dark:text-wisdom-yellow font-bold text-xs tracking-[0.2em] uppercase shadow-sm">
              Our Publications / የእኛ መጻሕፍት
            </span>
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-wisdom-text dark:text-white leading-tight">
              Wisdom <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-blue to-wisdom-green dark:from-wisdom-blue dark:to-wisdom-green">Bookshelf</span>
            </h2>
            <p className="text-wisdom-muted dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium">
              Deeply personal accounts of faith, resilience, and the wisdom gained through raising children with special needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div key={book.id} className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-white/5 p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative w-48 h-64 mb-8 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
                  <Image
                    src={book.coverImageUrl || "/images/book-placeholder.png"}
                    alt={book.title}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <h3 className="font-heading font-bold text-xl text-wisdom-text dark:text-white mb-2 leading-tight">
                  {book.title}
                </h3>
                <p className="font-amharic text-wisdom-muted dark:text-slate-400 text-sm mb-4 opacity-80">
                  {book.titleAm}
                </p>
                <p className="text-xs font-bold text-wisdom-blue dark:text-wisdom-yellow uppercase tracking-widest mb-6">
                  By {book.author}
                </p>

                <div className="mt-auto flex gap-3 w-full">
                  <Link href={book.purchaseLink || "/contact?subject=Book%20Order"} className="flex-1">
                    <Button className="w-full rounded-2xl py-5 bg-wisdom-blue hover:bg-wisdom-blue/90 text-white font-bold text-sm shadow-lg">
                      Order Now
                    </Button>
                  </Link>
                  <Link href={`/bookshelf/${book.id}`} className="flex-1">
                    <Button variant="outline" className="w-full rounded-2xl py-5 border-wisdom-blue/30 text-wisdom-blue dark:text-white hover:bg-wisdom-blue/5 font-bold text-sm">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View all books CTA */}
          <div className="text-center mt-12">
            <Link
              href="/resources#book"
              className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 border border-wisdom-blue/30 text-wisdom-blue font-bold hover:bg-wisdom-blue/5 transition-colors focus:outline-none focus:ring-2 focus:ring-wisdom-blue"
            >
              View All Books & Resources
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <CTASection />
    </div>
  );
}
