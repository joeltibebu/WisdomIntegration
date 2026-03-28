"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface GalleryItem {
  id: number;
  imagePath: string;
  title: string;
}

// Using the new /images/events directory as requested. Let's make sure files match these names!
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    imagePath: "/images/events/event1.jpeg",
    title: "Community Gathering",
  },
  {
    id: 2,
    imagePath: "/images/events/event2.jpeg",
    title: "Family Support Workshop",
  },
  {
    id: 3,
    imagePath: "/images/events/event3.jpeg",
    title: "Worship Night",
  },
  {
    id: 4,
    imagePath: "/images/events/event4.jpeg",
    title: "Children's Ministry",
  },
  {
    id: 5,
    imagePath: "/images/events/event5.jpeg",
    title: "Special Needs Walk",
  },
];

export function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const intervalId = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // Check if we hit the end of the scroll container
        // Adding a 50px buffer for sub-pixel accuracy
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 50) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll forward by approximately one card width
          scrollRef.current.scrollBy({ left: 450, behavior: "smooth" });
        }
      }
    }, 3500); // Rotates every 3.5 seconds

    return () => clearInterval(intervalId);
  }, [isPaused]);

  return (
    <section className="py-8 sm:py-16 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center sm:text-left z-20 relative">
        <span className="inline-block py-1 px-4 rounded-full bg-wisdom-blue/10 dark:bg-wisdom-surface border border-wisdom-blue/20 dark:border-white/10 text-wisdom-blue font-bold text-xs tracking-[0.2em] uppercase shadow-sm mb-4">
          Our Impact / ተጽዕኖአችን
        </span>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text leading-tight mb-2">
          Ministry in Action
        </h2>
        <p className="text-wisdom-muted font-medium text-lg max-w-2xl">
          Glimpses of God&apos;s grace at work within our community—from vibrant worship gatherings to specialized family support sessions.
        </p>
      </div>

      <div 
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Gallery Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 sm:px-6 lg:px-8 pb-12 pt-4 hide-scrollbar scroll-smooth"
        >
          {galleryItems.map((item) => (
           <div 
               key={item.id} 
               className="relative flex-none w-[85vw] sm:w-[400px] md:w-[450px] aspect-[4/3] snap-center rounded-[2.5rem] overflow-hidden group shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_20px_50px_-10px_rgba(30,75,155,0.4)] transition-all duration-700 cursor-pointer"
             >
               {/* Behind-card ambient glow */}
               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-wisdom-blue to-wisdom-green blur-3xl transition-opacity duration-[1.5s] -z-10"></div>
               
               {/* If no image exists yet, a smooth gray placeholder background will show */}
               <div className="w-full h-full bg-slate-100 dark:bg-wisdom-surface relative z-0">
                 <Image 
                   src={item.imagePath} 
                   alt={item.title} 
                   fill 
                   className="object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-[1.5s] ease-out" 
                   sizes="(max-width: 640px) 85vw, (max-width: 768px) 400px, 450px"
                 />
               </div>

               {/* Multi-layered luxury gradients overlay for depth (softened since no text) */}
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-multiply pointer-events-none"></div>
               <div className="absolute inset-0 bg-gradient-to-br from-wisdom-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay pointer-events-none"></div>
             </div>
          ))}
        </div>

        {/* CSS for hiding scrollbar uniquely across browsers */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
      </div>
    </section>
  );
}
