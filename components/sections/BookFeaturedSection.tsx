import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface BlogCardProps {
  titleEn: string;
  titleAm: string;
  summaryEn: string;
  summaryAm: string;
  href: string;
}

function BlogCard({ titleEn, titleAm, summaryEn, summaryAm, href }: BlogCardProps) {
  return (
    <Link href={href} className="group h-full">
      <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl p-6 h-full shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-lg text-wisdom-text group-hover:text-wisdom-blue transition-colors line-clamp-1">{titleEn}</h4>
            <span className="text-sm font-amharic text-wisdom-muted opacity-80">{titleAm}</span>
          </div>
          <p className="text-sm text-wisdom-muted line-clamp-2 leading-relaxed">{summaryEn}</p>
          <p className="text-xs font-amharic text-wisdom-muted/70 line-clamp-1 italic">{summaryAm}</p>
          <div className="pt-2 flex items-center gap-2 text-wisdom-blue font-bold text-xs uppercase tracking-widest">
            Read Story
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function BookFeaturedSection() {
  const blogs = [
    {
      titleEn: "The Power of Acceptance",
      titleAm: "የተቀባይነት ኃይል",
      summaryEn: "How letting go of 'perfection' opened doors to joy we never expected.",
      summaryAm: "ፍጹምነትን መፈለግን መተው ባልጠበቅነው መልኩ ለደስታ በር እንዴት እንደሚከፍት።",
      href: "/resources#acceptance"
    },
    {
      titleEn: "Navigating Isolation",
      titleAm: "ብቸኝነትን ማሸነፍ",
      summaryEn: "Finding community in the middle of a journey that feels solitary.",
      summaryAm: "ብቻነት በሚሰማው ጉዞ መካከል ማኅበረሰብን ስለማግኘት።",
      href: "/resources#community"
    },
    {
      titleEn: "Faith in the Dark",
      titleAm: "በጨለማ ውስጥ ያለ እምነት",
      summaryEn: "A testimony of spiritual strength when developmental paths aren't clear.",
      summaryAm: "የዕድገት መንገዶች ግልጽ ባልሆኑበት ጊዜ ስለ መንፈሳዊ ጥንካሬ ምስክርነት።",
      href: "/resources#faith"
    }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden bg-slate-50/50 dark:bg-transparent" aria-label="From Our Journey to Yours / ከእኛ ጉዞ ወደ እርስዎ">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-full bg-wisdom-blue/5 rounded-full filter blur-[120px] pointer-events-none opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center mb-24">
          
          {/* Left: Book Mockup */}
          <div className="lg:col-span-5 relative group">
             {/* Glow Accent */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-wisdom-blue rounded-full filter blur-[80px] opacity-20 animate-pulse"></div>
             
             <div className="relative transform group-hover:rotate-1 transition-transform duration-500">
                <Image 
                  src="/images/book-cover.png" 
                  alt="From Our Journey to Yours — Book Cover" 
                  width={400}
                  height={600}
                  priority
                  className="w-full h-auto max-w-[400px] mx-auto rounded-xl shadow-[0_30px_60px_-15px_rgba(30,75,155,0.3)] border border-white/20"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-3xl bg-wisdom-yellow flex flex-col items-center justify-center shadow-2xl rotate-12 group-hover:rotate-0 transition-transform">
                   <p className="text-sm font-black text-wisdom-text uppercase">Available</p>
                   <p className="text-xl font-bold text-wisdom-text">Now</p>
                </div>
             </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <span className="inline-block py-1.5 px-5 rounded-full bg-wisdom-blue/10 text-wisdom-blue font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 shadow-sm">
              The Visionary&apos;s Story / ባለራዕዩ ታሪክ
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-wisdom-text mb-8 tracking-tight leading-tight">
              From Our Journey <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-blue to-wisdom-green italic">to Yours.</span>
            </h2>
            
            <div className="space-y-6 mb-10">
              <p className="font-body text-wisdom-muted text-lg sm:text-xl leading-relaxed font-medium">
                Written from real-life experience, this book shares the journey, challenges, and wisdom gained through raising a child with special needs — offering hope and guidance to families walking a similar path.
              </p>
              <p className="font-body text-wisdom-muted text-lg leading-relaxed font-amharic font-medium border-l-4 border-wisdom-yellow/40 pl-6 py-2">
                ይህ መጽሐፍ ከእውነተኛ የሕይወት ተሞክሮ ተነስቶ፣ ልዩ ፍላጎት ያላቸውን ልጆች በማሳደግ ረገድ ያጋጠሙ ፈተናዎችን እና የተገኘውን ጥበብ ያካፍላል፤ ተመሳሳይ መንገድ ለሚጓዙ ቤተሰቦች ተስፋ እና መመሪያ ይሰጣል፡፡
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              <Button size="lg" className="rounded-full bg-wisdom-blue text-white hover:bg-blue-800 px-10 py-7 font-bold text-base shadow-xl shadow-wisdom-blue/20">
                Order Now / አሁኑኑ ይዘዙ
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-wisdom-blue text-wisdom-blue hover:bg-wisdom-blue/5 px-10 py-7 font-bold text-base">
                Learn More / ተጨማሪ ይወቁ
              </Button>
            </div>
          </div>
        </div>

        {/* Related Journey Blogs */}
        <div className="border-t border-slate-200 dark:border-white/10 pt-16">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                 <h3 className="font-heading font-bold text-2xl text-wisdom-text mb-2">Related Journey Blogs</h3>
                 <p className="text-wisdom-muted font-medium">Deepen your understanding through these shared stories.</p>
              </div>
              <Link href="/resources" className="text-wisdom-blue font-bold flex items-center gap-2 hover:underline">
                 View All Resources
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {blogs.map((blog, idx) => (
                <BlogCard key={idx} {...blog} />
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
