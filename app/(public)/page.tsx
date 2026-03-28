import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";
import { HomePageHero } from "@/components/sections/HomePageHero";

const sections = [
  {
    href: "/about",
    badge: "Our Story",
    badgeAm: "ታሪካችን",
    title: "Our Heart & Roots",
    titleAm: "ልባችን እና መሠረታችን",
    desc: "Born from 20 years of lived experience raising a child with autism — learn who we are, what drives us, and the faith that anchors everything we do.",
    color: "from-wisdom-blue to-wisdom-green",
    accentColor: "bg-wisdom-blue",
    iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
  },
  {
    href: "/services",
    badge: "What We Offer",
    badgeAm: "አገልግሎታችን",
    title: "Our Services",
    titleAm: "የእኛ አገልግሎቶች",
    desc: "From parent counseling to spiritual care and inclusive learning — explore our holistic range of ministry services designed for your family.",
    color: "from-wisdom-green to-wisdom-yellow",
    accentColor: "bg-wisdom-green",
    iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
  },
  {
    href: "/programs",
    badge: "Join Us",
    badgeAm: "ይቀላቀሉን",
    title: "Programs & Events",
    titleAm: "ፕሮግራሞች እና ዝግጅቶች",
    desc: "Workshops, community nights, and family retreats — find an upcoming program designed to bring your family hope, healing, and belonging.",
    color: "from-wisdom-orange to-wisdom-yellow",
    accentColor: "bg-wisdom-orange",
    iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
  },
  {
    href: "/spiritual",
    badge: "Faith First",
    badgeAm: "እምነት ይቅደም",
    title: "Spiritual Care",
    titleAm: "መንፈሳዊ እንክብካቤ",
    desc: "Our faith is the anchor. Discover how the Gospel, prayer, and community sustain families through the hardest seasons of the journey.",
    color: "from-wisdom-yellow to-wisdom-orange",
    accentColor: "bg-wisdom-yellow",
    iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
  },
  {
    href: "/resources",
    badge: "Equipping Families",
    badgeAm: "ቤተሰቦችን ማዘጋጀት",
    title: "Resources & Articles",
    titleAm: "ግብዓቶች እና ጽሑፎች",
    desc: "Faith-filled articles, guides, and practical wisdom curated for parents, caregivers, and ministry leaders on the front lines.",
    color: "from-wisdom-blue to-sky-400",
    accentColor: "bg-sky-500",
    iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
  },
  {
    href: "/donate",
    badge: "Support the Ministry",
    badgeAm: "አገልግሎቱን ደግፉ",
    title: "Partner With Us",
    titleAm: "ከእኛ ጋር ይተባበሩ",
    desc: "Your generosity makes healing possible for more families. Become a partner in this kingdom work and help us reach every corner of the community.",
    color: "from-wisdom-green to-wisdom-blue",
    accentColor: "bg-wisdom-green",
    iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
  }
];

export default function HomePage() {
  return (
    <div className="bg-transparent w-full">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <HomePageHero />

      {/* ── SECTION CARDS GRID ───────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" aria-label="Explore Our Ministry">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((s, i) => (
              <Link
                key={i}
                href={s.href}
                className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[2rem] border border-white/20 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Color top accent bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${s.color}`} />

                <div className="p-8 flex flex-col flex-1">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl ${s.accentColor} flex items-center justify-center mb-5 text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.iconPath} />
                    </svg>
                  </div>

                  {/* Labels */}
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-wisdom-muted mb-3">
                    {s.badge}
                    <span className="text-slate-300 font-light">/</span>
                    <span className="font-amharic font-semibold">{s.badgeAm}</span>
                  </span>

                  {/* Title */}
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-wisdom-text mb-1 leading-tight">
                    {s.title}
                  </h3>
                  <p className="font-amharic text-wisdom-muted text-sm mb-4 opacity-70">{s.titleAm}</p>

                  {/* Desc */}
                  <p className="text-wisdom-muted text-sm leading-relaxed font-medium flex-1">
                    {s.desc}
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
            {[
              { title: "From Our Journey to Yours", am: "ከእኛ ጉዞ ወደ እርስዎ", img: "/images/book-cover.png", author: "Daniel Takele" },
              { title: "Walking with Grace", am: "በጸጋ መመላለስ", img: "/images/book1.jpeg", author: "Daniel Takele" },
              { title: "Family Faith Anchors", am: "የቤተሰብ እምነት መልሕቆች", img: "/images/book2.jpeg", author: "Yenenesh" }
            ].map((book, idx) => (
              <div key={idx} className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-white/5 p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative w-48 h-64 mb-8 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
                  <Image
                    src={book.img}
                    alt={book.title}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <h3 className="font-heading font-bold text-xl text-wisdom-text dark:text-white mb-2 leading-tight">
                  {book.title}
                </h3>
                <p className="font-amharic text-wisdom-muted dark:text-slate-400 text-sm mb-4 opacity-80">
                  {book.am}
                </p>
                <p className="text-xs font-bold text-wisdom-blue dark:text-wisdom-yellow uppercase tracking-widest mb-6">
                  By {book.author}
                </p>
                
                <div className="mt-auto flex gap-3 w-full">
                  <Link href="/contact?subject=Book%20Order" className="flex-1">
                    <Button className="w-full rounded-2xl py-5 bg-wisdom-blue hover:bg-wisdom-blue/90 text-white font-bold text-sm shadow-lg">
                      Order Now
                    </Button>
                  </Link>
                  <Link href="/about" className="flex-1">
                    <Button variant="outline" className="w-full rounded-2xl py-5 border-wisdom-blue/30 text-wisdom-blue dark:text-white hover:bg-wisdom-blue/5 font-bold text-sm">
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <CTASection />
    </div>
  );
}
