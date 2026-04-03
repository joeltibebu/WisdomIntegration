import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CTASection } from "@/components/sections/CTASection";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
}

export default async function ResourcePostPage({ params }: Props) {
  const post = await prisma.contentPost.findFirst({
    where: { slug: params.slug, published: true },
  });

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-wisdom-bg">
      {/* Hero */}
      <div className="relative bg-wisdom-blue/5 border-b border-slate-100">
        {post.featured_image && (
          <div className="relative h-72 sm:h-96 w-full overflow-hidden">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-bold text-wisdom-blue hover:underline mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Resources
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-wisdom-blue/10 text-wisdom-blue">
              {post.content_type === "devotional" ? "Devotional" : post.content_type === "guide" ? "Guide" : "Article"}
            </span>
            {post.publishedAt && (
              <time className="text-xs text-wisdom-muted font-medium">
                {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(post.publishedAt)}
              </time>
            )}
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-lg text-wisdom-muted font-medium leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className={`prose prose-slate max-w-none ${
            post.content_type === "devotional" ? "border-l-4 border-wisdom-blue/20 pl-6" : ""
          }`}
        >
          {post.body.split("\n").map((para, i) =>
            para.trim() ? (
              <p key={i} className="mb-4 text-wisdom-text leading-relaxed">
                {para}
              </p>
            ) : (
              <br key={i} />
            )
          )}
        </div>
      </article>

      <CTASection />
    </div>
  );
}
