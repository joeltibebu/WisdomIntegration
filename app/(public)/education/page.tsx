import React from "react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inclusive Education | Learning Hub",
  description: "Explore our collection of educational videos and articles designed to build inclusive learning environments for all children.",
};
import { SubPageHero } from "@/components/sections/SubPageHero";
import { CTASection } from "@/components/sections/CTASection";

interface ResourceCardProps {
  type: "video" | "article";
  title: string;
  titleAm: string;
  description: string;
  image: string;
}

function ResourceCard({ type, title, titleAm, description, image }: ResourceCardProps) {
  return (
    <div className="group bg-white dark:bg-white/5 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
       <div className="relative h-48 overflow-hidden">
          <Image 
            src={image} 
            alt={title} 
            width={800}
            height={600}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-wisdom-text">
             {type}
          </div>
          {type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-12 h-12 rounded-full bg-wisdom-blue/90 text-white flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
                  <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4.5 3.5v13L16.5 10l-12-6.5z"/></svg>
               </div>
            </div>
          )}
       </div>
       <div className="p-8">
          <h3 className="font-heading font-extrabold text-xl text-wisdom-text mb-1 group-hover:text-wisdom-blue transition-colors">{title}</h3>
          <p className="font-amharic text-sm font-bold text-wisdom-muted mb-4">{titleAm}</p>
          <p className="text-sm text-wisdom-muted leading-relaxed line-clamp-3 mb-6">{description}</p>
          <button className="text-xs font-black text-wisdom-blue uppercase tracking-[0.2em] border-b-2 border-wisdom-blue/20 group-hover:border-wisdom-blue transition-colors pb-1">
             Learn More
          </button>
       </div>
    </div>
  );
}

export default function EducationPage() {
  const resources: ResourceCardProps[] = [
    {
      type: "video",
      title: "Understanding Sensory Processing",
      titleAm: "የስሜት ህዋሳትን ሂደት መረዳት",
      description: "A deep dive into how children perceive surroundings and simple at-home strategies to support them.",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800"
    },
    {
      type: "article",
      title: "Building Daily Routines",
      titleAm: "ዕለታዊ ልምዶችን መገንባት",
      description: "Why structure matters and how to create a predictable environment for children with autism.",
      image: "https://images.unsplash.com/photo-1484662020986-75935d2ebc66?auto=format&fit=crop&q=80&w=800"
    },
    {
      type: "article",
      title: "Communication Strategies",
      titleAm: "የመገናኛ ዘዴዎች",
      description: "Non-verbal communication tools and techniques for the early years of development.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
    },
    {
      type: "video",
      title: "Inclusion in the Classroom",
      titleAm: "አካታችነት በትምህርት ቤት",
      description: "How educators can make simple changes to embrace every child's unique way of learning.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
    }
  ];

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
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div className="max-w-xl">
               <h2 className="font-heading font-extrabold text-3xl text-wisdom-text mb-4">Latest Resources</h2>
               <p className="text-wisdom-muted font-medium">Curated content to support every step of your development journey.</p>
            </div>
            <div className="flex bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl">
               <button className="px-6 py-2.5 rounded-xl bg-white dark:bg-wisdom-blue text-wisdom-text dark:text-white font-bold text-sm shadow-sm">All</button>
               <button className="px-6 py-2.5 rounded-xl text-wisdom-muted font-bold text-sm hover:text-wisdom-blue transition-colors">Videos</button>
               <button className="px-6 py-2.5 rounded-xl text-wisdom-muted font-bold text-sm hover:text-wisdom-blue transition-colors">Articles</button>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {resources.map((resource, idx) => (
              <ResourceCard key={idx} {...resource} />
            ))}
         </div>
      </section>

      <CTASection />
    </div>
  );
}
