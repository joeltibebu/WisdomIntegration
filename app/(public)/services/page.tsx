import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Services",
  description: "Explore our specialized guidance, holistic therapy sponsorship, and spiritual support services for families in Addis Ababa.",
};
import { SubPageHero } from "@/components/sections/SubPageHero";
import { CTASection } from "@/components/sections/CTASection";

export default function ServicesPage() {
  const serviceDetails = [
    {
      titleEn: "Family Guidance & Counseling",
      titleAm: "የቤተሰብ ግንኙነት እና የምክር አገልግሎት",
      descEn: "We provide specialized counseling for parents and siblings, helping them navigate the emotional and spiritual complexities of raising a child with developmental needs.",
      descAm: "ለወላጆች እና ለወንድሞች/እህቶች ልዩ የምክር አገልግሎት እንሰጣለን፤ ይህም ልዩ ፍላጎት ያላቸውን ልጆች በማሳደግ ረገድ የሚያጋጥሙትን መንፈሳዊ እና ስሜታዊ ችግሮች እንዲወጡ ይረዳቸዋል፡፡",
      pointsEn: ["Parent Support Groups", "Sibling Resilience Training", "Spiritual Counseling", "Crisis Guidance"],
      pointsAm: ["የወላጆች የድጋፍ ቡድኖች", "የወንድሞች እና እህቶች የመቋቋም ስልጠና", "መንፈሳዊ የምክር አገልግሎት", "የችግር ጊዜ መመሪያ"],
      color: "bg-wisdom-blue"
    },
    {
      titleEn: "Inclusive Learning Support",
      titleAm: "የተካተተ የትምህርት ድጋፍ",
      descEn: "Our ministry partners with educators and parents to create custom learning paths that respect every child's unique developmental pace and potential.",
      descAm: "የእያንዳንዱን ልጅ ልዩ የዕድገት ፍጥነት እና አቅም የሚያከብሩ የትምህርት መንገዶችን ለመፍጠር ከትምህርት ባለሙያዎች እና ወላጆች ጋር በጋራ እንሠራለን፡፡",
      pointsEn: ["Custom Learning Plans", "Sensory-Friendly Resources", "Educational Advocacy", "Behavioral Guidance"],
      pointsAm: ["ልዩ የትምህርት ዕቅዶች", "ለስሜት ምቹ የሆኑ ግብአቶች", "የትምህርት አሰባሳቢነት", "የባህሪ መመሪያ"],
      color: "bg-wisdom-green"
    },
    {
      titleEn: "Spiritual Care & Community",
      titleAm: "መንፈሳዊ እንክብካቤ እና ማኅበረሰብ",
      descEn: "We believe healing starts in the soul. Our community provides a safe place for families to pray, share testimonies, and find spiritual belonging.",
      descAm: "ፈውስ ከነፍስ ይጀምራል ብለን እናምናለን፡፡ ማኅበረሰባችን ቤተሰቦች የሚጸልዩበት፣ የምስክርነት ቃላቸውን የሚያካፍሉበት እና መንፈሳዊ ባለቤትነትን የሚያገኙበት አስተማማኝ ቦታ ይሰጣል፡፡",
      pointsEn: ["Family Prayer Teams", "Gospel-Centered Support", "Inclusive Worship Resources", "Faith Partnerships"],
      pointsAm: ["የቤተሰብ የጸሎት ቡድኖች", "በወንጌል ላይ የተመሠረተ ድጋፍ", "አጠቃላይ የአምልኮ ግብአቶች", "የእምነት ሽርክናዎች"],
      color: "bg-wisdom-orange"
    }
  ];

  return (
    <div className="min-h-screen bg-wisdom-bg">
      <SubPageHero 
        badgeEn="Our Services" 
        badgeAm="የእኛ አገልግሎቶች" 
        titleEn="Holistic Ministry Focus" 
        titleAm="አጠቃላይ የአገልግሎት ትኩረት" 
        descriptionEn="We offer a comprehensive blend of spiritual care and practical guidance to ensure no family walks the journey of special needs alone."
        descriptionAm="ምንም ዓይነት ቤተሰብ የልዩ ፍላጎት ጉዞውን ብቻውን እንዳይጓዝ ለማድረግ መንፈሳዊ እንክብካቤን እና ተግባራዊ መመሪያን አቀናጅተን እናቀርባለን፡፡"
      />

      <div className="py-20 space-y-32">
        {serviceDetails.map((service, idx) => (
          <section key={idx} className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              
              <div className={idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}>
                <div className={`w-16 h-1 w-24 ${service.color} mb-8 rounded-full opacity-60`}></div>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text mb-4 leading-tight">
                  {service.titleEn}
                </h2>
                <h3 className="font-heading font-bold text-2xl text-wisdom-muted mb-8 font-amharic leading-snug">
                  {service.titleAm}
                </h3>
                <div className="space-y-6">
                  <p className="font-body text-wisdom-muted text-lg leading-relaxed font-medium">
                    {service.descEn}
                  </p>
                  <p className="font-body text-wisdom-muted text-lg leading-relaxed font-amharic font-medium opacity-80 border-l-4 border-slate-200 pl-6">
                    {service.descAm}
                  </p>
                </div>
              </div>

              <div className={`${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-all duration-500">
                   <h4 className="font-heading font-bold text-xl text-wisdom-text mb-8">What We Provide:</h4>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.pointsEn.map((point, pIdx) => (
                        <div key={pIdx} className="flex flex-col gap-1 p-4 rounded-2xl bg-slate-50 dark:bg-wisdom-surface/50 border border-slate-100 dark:border-white/5">
                           <span className="font-bold text-wisdom-text text-sm">{point}</span>
                           <span className="font-amharic text-wisdom-muted text-xs font-semibold">{service.pointsAm[pIdx]}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

            </div>
          </section>
        ))}
      </div>

      <CTASection />
    </div>
  );
}
