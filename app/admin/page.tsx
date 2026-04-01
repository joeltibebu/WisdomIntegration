import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";

export default async function AdminDashboard() {
  // Fetch some basic stats for the dashboard
  const [eventCount, bookCount, galleryCount, featureCount] = await Promise.all([
    prisma.event.count(),
    prisma.book.count(),
    prisma.galleryImage.count(),
    prisma.homepageFeature.count(),
  ]);

  const stats = [
    { label: "upcoming Events", value: eventCount, href: "/admin/events", color: "bg-blue-500" },
    { label: "Active Books", value: bookCount, href: "/admin/book", color: "bg-green-500" },
    { label: "Gallery Media", value: galleryCount, href: "/admin/gallery", color: "bg-purple-500" },
    { label: "Home Features", value: featureCount, href: "/admin/home", color: "bg-orange-500" },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <section>
        <h2 className="text-3xl font-heading font-black text-slate-800 mb-2">
          Management Overview
        </h2>
        <p className="text-slate-500 max-w-2xl">
          Welcome to the Wisdom Integration Control Center. Here you can manage all dynamic content, 
          from the homepage hero section to the event calendar and bookshelf.
        </p>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="group">
            <Card className="p-6 border-slate-200 hover:border-wisdom-blue transition-all hover:shadow-xl relative overflow-hidden h-full">
              <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-5 -mr-10 -mt-10 rounded-full transition-transform group-hover:scale-150`} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                {stat.label}
              </p>
              <p className="text-4xl font-heading font-black text-slate-800">
                {stat.value}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-wisdom-blue opacity-0 group-hover:opacity-100 transition-opacity">
                Manage Section
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Links Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
          <svg className="w-64 h-64 text-wisdom-blue" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L1 21h22L12 2zm0 3.45l8.15 14.1H3.85L12 5.45zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
          </svg>
        </div>

        <h3 className="text-xl font-heading font-bold text-slate-800 mb-6">Common Tasks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          <QuickLink 
            title="Update Homepage Hero" 
            desc="Change the main title, description or background images on the home page."
            href="/admin/home"
          />
          <QuickLink 
            title="Schedule New Event" 
            desc="Add an upcoming workshop, community night, or family retreat."
            href="/admin/events"
          />
          <QuickLink 
            title="Add to Bookshelf" 
            desc="Manage the Wisdom Bookshelf with new publications and links."
            href="/admin/book"
          />
          <QuickLink 
            title="Gallery Upload" 
            desc="Upload new photos and media from recent ministry sessions."
            href="/admin/gallery"
          />
        </div>
      </section>
    </div>
  );
}

function QuickLink({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-wisdom-blue/20 hover:shadow-md transition-all group">
      <h4 className="font-bold text-slate-800 flex items-center gap-2">
        {title}
        <span className="w-1.5 h-1.5 rounded-full bg-wisdom-yellow" />
      </h4>
      <p className="text-sm text-slate-500 mt-1">{desc}</p>
    </Link>
  );
}
