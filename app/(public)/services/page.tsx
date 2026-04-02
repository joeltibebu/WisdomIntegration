import React from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SubPageHero } from "@/components/sections/SubPageHero";
import { CTASection } from "@/components/sections/CTASection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore our specialized guidance, holistic therapy, and spiritual support services for families.",
};

const colors = ["bg-wisdom-blue", "bg-wisdom-green", "bg-wisdom-orange", "bg-wisdom-yellow", "bg-emerald-500", "bg-rose-500"];

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="min-h-screen bg-transparent">
      <SubPageHero
        badgeEn="Our Services"
        badgeAm="የእኛ አገልግሎቶች"
        titleEn="Holistic Ministry Focus"
        titleAm="አጠቃላይ የአገልግሎት ትኩረት"
        descriptionEn="We offer a comprehensive blend of spiritual care and practical guidance to ensure no family walks the journey of special needs alone."
        descriptionAm="ምንም ዓይነት ቤተሰብ የልዩ ፍላጎት ጉዞውን ብቻውን እንዳይጓዝ ለማድረግ መንፈሳዊ እንክብካቤን እና ተግባራዊ መመሪያን አቀናጅተን እናቀርባለን፡፡"
      />

      <div className="py-20 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {services.map((service, idx) => (
          <section key={service.id} className="relative overflow-hidden">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>

              <div className={idx % 2 === 1 ? "lg:order-2" : "lg:order-1"}>
                <div className={`w-16 h-1 ${colors[idx % colors.length]} mb-8 rounded-full opacity-60`} />
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text mb-6 leading-tight">
                  {service.name}
                </h2>
                <p className="font-body text-wisdom-muted text-lg leading-relaxed font-medium">
                  {service.description}
                </p>
              </div>

              <div className={idx % 2 === 1 ? "lg:order-1" : "lg:order-2"}>
                <div className="bg-white/60 dark:bg-wisdom-surface/40 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 rounded-[2.5rem] p-10 sm:p-14 shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center min-h-[200px]">
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-2xl ${colors[idx % colors.length]} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <p className="font-heading font-bold text-wisdom-text text-lg">{service.name}</p>
                    <p className="text-wisdom-muted text-sm mt-1">Wisdom Integration Ministry</p>
                  </div>
                </div>
              </div>

            </div>
          </section>
        ))}

        {services.length === 0 && (
          <p className="text-center text-wisdom-muted text-lg py-20">Services coming soon.</p>
        )}
      </div>

      <CTASection />
    </div>
  );
}
