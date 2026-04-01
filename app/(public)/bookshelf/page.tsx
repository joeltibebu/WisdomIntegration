import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { CTASection } from "@/components/sections/CTASection";
import { SubPageHero } from "@/components/sections/SubPageHero";

export const metadata: Metadata = {
  title: "Bookshelf",
  description: "Browse books by Wisdom Integration — personal accounts of faith, resilience, and wisdom gained through raising children with special needs.",
};

export const dynamic = "force-dynamic";

export default async function BookshelfPage() {
  const books = await prisma.book.findMany({
    where: { active: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="min-h-screen bg-wisdom-bg">
      <SubPageHero
        badgeEn="Our Publications"
        badgeAm="የእኛ መጻሕፍት"
        titleEn="Wisdom Bookshelf"
        titleAm="የጥበብ መጻሕፍት"
        descriptionEn="Deeply personal accounts of faith, resilience, and the wisdom gained through raising children with special needs."
        descriptionAm="ልዩ ፍላጎት ያላቸው ልጆችን በማሳደግ ሂደት ውስጥ ያገኙትን እምነት፣ ጽናት እና ጥበብ የሚያሳዩ ጥልቅ ታሪኮች።"
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {books.length === 0 ? (
          <p className="text-center text-wisdom-muted text-lg">No books available yet. Check back soon.</p>
        ) : (
          <div className="flex flex-col gap-10">
            {books.map((book, idx) => (
              <article
                key={book.id}
                className="group bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-white/30 dark:border-white/5 rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className={`flex flex-col ${idx % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} gap-0`}>

                  {/* Cover */}
                  <div className="sm:w-56 shrink-0 flex items-center justify-center bg-gradient-to-br from-wisdom-blue/10 to-wisdom-green/10 p-8">
                    <div className="relative w-36 h-48 shadow-2xl rounded-xl overflow-hidden group-hover:scale-105 group-hover:rotate-1 transition-transform duration-500">
                      <Image
                        src={book.coverImageUrl || "/images/book-placeholder.png"}
                        alt={`Cover of ${book.title}`}
                        fill
                        className="object-cover"
                        sizes="144px"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-wisdom-blue mb-2">
                        By {book.author}
                      </p>
                      <h2 className="font-heading font-bold text-2xl text-wisdom-text mb-1 leading-tight">
                        {book.title}
                      </h2>
                      <p className="font-amharic text-wisdom-muted text-sm mb-4 opacity-80">{book.titleAm}</p>

                      {/* Description — show more lines */}
                      <p className="text-wisdom-muted text-base leading-relaxed line-clamp-5 mb-2">
                        {book.description}
                      </p>
                      {book.descriptionAm && (
                        <p className="font-amharic text-wisdom-muted text-sm leading-loose opacity-75 line-clamp-3 mt-2">
                          {book.descriptionAm}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      <Link
                        href={`/bookshelf/${book.id}`}
                        className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 border border-wisdom-blue/30 text-wisdom-blue font-bold text-sm hover:bg-wisdom-blue/5 transition-colors focus:outline-none focus:ring-2 focus:ring-wisdom-blue"
                      >
                        Read More
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                      <Link
                        href={book.purchaseLink || "/contact?subject=Book%20Order"}
                        className="inline-flex items-center justify-center rounded-2xl px-6 py-3 bg-wisdom-blue text-white font-bold text-sm hover:bg-blue-800 transition-colors shadow-lg shadow-wisdom-blue/20 focus:outline-none focus:ring-2 focus:ring-wisdom-blue"
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>

                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <CTASection />
    </div>
  );
}
