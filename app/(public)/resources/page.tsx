import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SubPageHero } from "@/components/sections/SubPageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "The Book — From Our Journey to Yours",
  description: "Discover the story behind Wisdom Integration Ministry written in a deeply personal book about faith, resilience, and raising a child with special needs.",
};

const chapters = [
  {
    num: "01",
    titleEn: "The Beginning of the Journey",
    titleAm: "የጉዞው መጀመሪያ",
    descEn: "The raw, honest account of the early days — the diagnosis, the confusion, and the first steps of faith that changed everything.",
    color: "text-wisdom-blue",
    border: "border-wisdom-blue/20"
  },
  {
    num: "02",
    titleEn: "Finding Strength in the Valley",
    titleAm: "በሸለቆው ውስጥ ጥንካሬ ማግኘት",
    descEn: "How a family found spiritual resilience when every door seemed closed — and what God revealed in the darkest seasons.",
    color: "text-wisdom-green",
    border: "border-wisdom-green/20"
  },
  {
    num: "03",
    titleEn: "The Power of Community",
    titleAm: "የማኅበረሰብ ኃይል",
    descEn: "Why belonging matters deeply, and how building an inclusive community became the foundation of the entire ministry.",
    color: "text-wisdom-orange",
    border: "border-wisdom-orange/20"
  },
  {
    num: "04",
    titleEn: "From Pain to Purpose",
    titleAm: "ከሥቃይ ወደ ዓላማ",
    descEn: "The turning point that transformed a family's private struggle into a nationwide call to serve, heal, and love.",
    color: "text-wisdom-yellow",
    border: "border-wisdom-yellow/20"
  },
];

const testimonials = [
  {
    quote: "This book gave us the language to describe our pain — and the hope to keep going. We read it as a family.",
    author: "Miriam & Samuel T.",
    role: "Parents of a child with Autism"
  },
  {
    quote: "I felt seen for the first time. The honesty in every page ministered to my soul like nothing else.",
    author: "Pastor Bekele A.",
    role: "Community Minister"
  },
  {
    quote: "A must-read for every family, counselor, and church leader walking alongside special needs families.",
    author: "Dr. Hannah K.",
    role: "Family Therapist"
  }
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-wisdom-bg">
      <SubPageHero
        badgeEn="The Book"
        badgeAm="መጽሐፉ"
        titleEn="From Our Journey to Yours"
        titleAm="ከእኛ ጉዞ ወደ ዎኝ"
        descriptionEn="A deeply personal account of faith, resilience, and the wisdom discovered while raising a child with special needs — offering hope, guidance, and belonging to every family on the same road."
        descriptionAm="ልዩ ፍላጎት ያለው ልጅን ሲያሳድጉ የተገኘ የእምነት፣ ጽናት እና ጥበብ ጥልቅ ታሪክ — ለተመሳሳይ ጉዞ ለሚጓዙ ቤተሰቦች ሁሉ ተስፋ፣ መመሪያ እና ባለቤትነትን ይሰጣል፡፡"
      />

      {/* ── BOOK SHOWCASE ─────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Book Visual */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start relative">
              <div className="absolute inset-0 bg-wisdom-blue/10 rounded-full blur-[100px] opacity-50 -translate-x-10" />
              <div className="relative z-10 w-full max-w-[320px]">
                <Image
                  src="/images/book-cover.png"
                  alt="From Our Journey to Yours"
                  width={400}
                  height={560}
                  className="w-full rounded-2xl shadow-[0_30px_70px_rgba(30,75,155,0.3)] rotate-1 hover:rotate-0 transition-transform duration-500"
                  priority
                />
                {/* Badge */}
                <div className="absolute -bottom-5 -right-5 w-28 h-28 bg-wisdom-yellow rounded-full flex items-center justify-center text-center text-[10px] font-black uppercase tracking-wider text-wisdom-text p-3 shadow-xl border-4 border-white dark:border-wisdom-bg -rotate-12">
                  Real Life <br /> Story
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="inline-block py-1 px-4 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-orange font-bold text-xs tracking-[0.2em] uppercase mb-4 shadow-sm">
                  Featured Publication / ዋና ጽሑፍ
                </span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-wisdom-text leading-tight tracking-tight mb-2">
                  From Our Journey <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-blue to-wisdom-green">to Yours.</span>
                </h2>
                <p className="font-amharic text-wisdom-muted text-xl opacity-80">ከእኛ ጉዞ ወደ ዎኝ</p>
              </div>

              <div className="space-y-4 text-wisdom-muted text-lg leading-relaxed font-medium">
                <p>
                  Written by <span className="text-wisdom-text font-bold">Brother Daniel and Sister Yenenesh Takele</span>, founders of Wisdom Integration Ministry, this book is a raw and honest account of what it truly means to raise a child with autism — through exhaustion, doubt, faith, and ultimately, breakthrough.
                </p>
                <p className="font-amharic text-base opacity-80 border-l-4 border-wisdom-yellow/40 pl-5 py-1">
                  ዊዝደም ኢንቲግሬሽን ሚኒስትሪ መስራቾች ዳንኤል እና የኔነሽ ታከለ በጻፉት ይህ መጽሐፍ፣ ኦቲዝም ያለው ልጅን ማሳደግ ምን ማለት እንደሆነ — ድካምን፣ ጥርጣሬን፣ እምነትን እና በመጨረሻም ድልን — ይናገራል፡፡
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-2">
                {[
                  { num: "20+", label: "Years of\nExperience" },
                  { num: "200+", label: "Families\nImpacted" },
                  { num: "3", label: "Languages\nAvailable" }
                ].map((s, i) => (
                  <div key={i} className="bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-center shadow-sm">
                    <div className="font-heading font-black text-2xl text-wisdom-blue">{s.num}</div>
                    <div className="text-xs text-wisdom-muted font-medium leading-tight whitespace-pre-line mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/contact?subject=Book%20Order">
                  <Button className="px-10 py-6 rounded-[2rem] bg-wisdom-blue text-white font-bold text-lg shadow-[0_10px_30px_rgba(30,75,155,0.3)] hover:-translate-y-1 transition-all">
                    Order Your Copy
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="px-10 py-6 rounded-[2rem] border-wisdom-blue text-wisdom-blue font-bold text-lg hover:bg-wisdom-blue/5 hover:-translate-y-1 transition-all">
                    Enquire Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTERS PREVIEW ──────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-wisdom-surface/10 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-4 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-blue font-bold text-xs tracking-[0.2em] uppercase mb-4 shadow-sm">
              Inside the Book
            </span>
            <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text tracking-tight">
              A Glimpse of the Journey
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chapters.map((ch, i) => (
              <div key={i} className={`bg-white dark:bg-wisdom-surface border ${ch.border} rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                <div className={`font-heading font-black text-5xl ${ch.color} opacity-15 mb-3 leading-none`}>{ch.num}</div>
                <h4 className="font-heading font-bold text-xl text-wisdom-text mb-1 leading-tight">{ch.titleEn}</h4>
                <p className={`font-amharic text-sm mb-4 ${ch.color} opacity-70`}>{ch.titleAm}</p>
                <p className="text-wisdom-muted text-sm leading-relaxed">{ch.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-4 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-orange font-bold text-xs tracking-[0.2em] uppercase mb-4 shadow-sm">
              Reader Stories
            </span>
            <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text tracking-tight">
              What Readers Are Saying
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 shadow-sm flex flex-col">
                <svg className="w-10 h-10 text-wisdom-orange/20 mb-4" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-2.2 1.8-4 4-4V8zM28 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z"/>
                </svg>
                <p className="text-wisdom-muted text-base leading-relaxed italic flex-1 mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-bold text-wisdom-text text-sm">{t.author}</p>
                  <p className="text-wisdom-muted text-xs uppercase tracking-widest mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORDER BANNER ──────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-wisdom-blue/[0.04] border-t border-slate-200 dark:border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text">
            Ready to Order Your Copy?
          </h3>
          <p className="text-wisdom-muted text-lg font-medium leading-relaxed">
            Available in English and Amharic. Contact us to place your order and we will deliver directly to you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact?subject=Book%20Order">
              <Button className="px-10 py-6 rounded-[2rem] bg-wisdom-blue text-white font-bold text-lg shadow-lg hover:-translate-y-1 transition-all">
                Order Now
              </Button>
            </Link>
            <Link href="/donate">
              <Button variant="outline" className="px-10 py-6 rounded-[2rem] border-wisdom-blue text-wisdom-blue font-bold text-lg hover:bg-wisdom-blue/5 hover:-translate-y-1 transition-all">
                Support the Ministry
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
