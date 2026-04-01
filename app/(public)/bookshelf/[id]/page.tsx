import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const book = await prisma.book.findUnique({ where: { id: params.id } });
  if (!book) return { title: "Book Not Found" };
  return {
    title: book.title,
    description: book.description,
  };
}

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  const [book, relatedPosts] = await Promise.all([
    prisma.book.findUnique({ where: { id: params.id, active: true } }),
    prisma.contentPost.findMany({ where: { published: true }, take: 3, orderBy: { publishedAt: "desc" } }),
  ]);

  if (!book) notFound();

  return (
    <div className="min-h-screen bg-wisdom-bg pt-28">

      {/* Hero / Detail Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Book Cover */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-64 h-[22rem] sm:w-72 sm:h-96 shadow-[0_30px_80px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden">
              <Image
                src={book.coverImageUrl || "/images/book-placeholder.png"}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 256px, 288px"
              />
            </div>
          </div>

          {/* Book Info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block py-1 px-4 rounded-full bg-wisdom-blue/10 text-wisdom-blue font-bold text-xs tracking-[0.2em] uppercase mb-4">
                Our Publications / የእኛ መጻሕፍት
              </span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-wisdom-text leading-tight mb-2">
                {book.title}
              </h1>
              <p className="font-amharic text-2xl font-bold text-wisdom-muted mb-3">{book.titleAm}</p>
              <p className="text-sm font-bold text-wisdom-blue uppercase tracking-widest">
                By {book.author}
              </p>
            </div>

            <div className="h-px bg-wisdom-border" />

            <div className="space-y-4">
              <p className="text-wisdom-muted text-lg leading-relaxed">{book.description}</p>
              <p className="font-amharic text-wisdom-muted leading-loose opacity-80">{book.descriptionAm}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href={book.purchaseLink || "/contact?subject=Book%20Order"}
                className="inline-flex items-center justify-center rounded-2xl px-8 py-4 bg-wisdom-blue text-white font-bold text-base hover:bg-blue-800 transition-colors shadow-lg shadow-wisdom-blue/25 focus:outline-none focus:ring-2 focus:ring-wisdom-blue"
              >
                Order Now
              </Link>
              <Link
                href="/contact?subject=Book%20Inquiry"
                className="inline-flex items-center justify-center rounded-2xl px-8 py-4 border border-wisdom-blue/30 text-wisdom-blue font-bold text-base hover:bg-wisdom-blue/5 transition-colors focus:outline-none focus:ring-2 focus:ring-wisdom-blue"
              >
                Ask a Question
              </Link>
            </div>

            <Link
              href="/bookshelf"
              className="inline-flex items-center gap-2 text-sm text-wisdom-muted hover:text-wisdom-blue transition-colors mt-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Bookshelf
            </Link>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-wisdom-border">
          <h2 className="font-heading font-bold text-2xl text-wisdom-text mb-8">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/resources/${post.slug}`}
                className="block bg-white dark:bg-white/5 border border-wisdom-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-wisdom-blue"
              >
                <h3 className="font-heading font-semibold text-wisdom-text mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-wisdom-muted line-clamp-3">{post.body.slice(0, 120)}…</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CTASection />
    </div>
  );
}
