import React from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SubPageHero } from "@/components/sections/SubPageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ContentCard } from "@/components/hub/ContentCard";
import { VideoCard } from "@/components/hub/VideoCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Education Hub | Empowering Through Knowledge",
  description:
    "Access our library of videos, articles, and practical guides designed for parents, educators, and community members.",
};

export default async function EducationHubPage() {
  let posts: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featured_image: string | null;
    content_type: string;
    publishedAt: Date | null;
  }[] = [];

  let videos: {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail_url: string | null;
    video_url: string;
    category: string;
    is_featured: boolean;
  }[] = [];

  try {
    posts = await prisma.contentPost.findMany({
      where: { published: true, category: "education-hub" },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featured_image: true,
        content_type: true,
        publishedAt: true,
      },
    });
  } catch {
    posts = [];
  }

  try {
    videos = await prisma.video.findMany({
      where: { is_published: true, category: "education-hub" },
      orderBy: { published_at: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        thumbnail_url: true,
        video_url: true,
        category: true,
        is_featured: true,
      },
    });
  } catch {
    videos = [];
  }

  const isEmpty = posts.length === 0 && videos.length === 0;

  return (
    <div className="min-h-screen bg-wisdom-bg">
      <SubPageHero
        badgeEn="Educational Content"
        badgeAm="የትምህርት ግብዓቶች"
        titleEn="Empowering Through Knowledge"
        titleAm="በእውቀት አቅምን መገንባት"
        descriptionEn="Access our library of videos, articles, and practical guides designed for parents, educators, and community members."
        descriptionAm="ለወላጆች፣ ለአስተማሪዎች እና ለማኅበረሰብ አባላት የተዘጋጁ ቪዲዮዎችን፣ ጽሑፎችን እና ተግባራዊ መመሪያዎችን እዚህ ያገኛሉ፡፡"
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {isEmpty ? (
          <div className="text-center py-20">
            <p className="text-wisdom-muted text-lg font-medium">
              Content coming soon — check back shortly.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {posts.length > 0 && (
              <div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-wisdom-text mb-8">
                  Articles &amp; Guides
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <ContentCard
                      key={post.id}
                      title={post.title}
                      slug={post.slug}
                      excerpt={post.excerpt}
                      featured_image={post.featured_image}
                      content_type={
                        post.content_type as "blog" | "devotional" | "guide"
                      }
                      published_at={post.publishedAt}
                    />
                  ))}
                </div>
              </div>
            )}

            {videos.length > 0 && (
              <div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-wisdom-text mb-8">
                  Videos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videos.map((video) => (
                    <VideoCard
                      key={video.id}
                      title={video.title}
                      description={video.description}
                      thumbnail_url={video.thumbnail_url}
                      video_url={video.video_url}
                      category={video.category}
                      is_featured={video.is_featured}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <CTASection />
    </div>
  );
}
