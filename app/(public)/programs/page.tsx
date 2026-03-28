import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empowering Programs",
  description: "From Awareness Seminars to inclusive Learning Hubs, discover the programs making a difference for children with special needs.",
};
import Link from "next/link";
import { SubPageHero } from "@/components/sections/SubPageHero";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

export default function ProgramsPage() {
  const programs = [
    {
      titleEn: "Early Intervention",
      titleAm: "የቅድመ ጣልቃ ገብነት",
      ageRange: "Ages 0–5",
      color: "bg-wisdom-yellow",
      descEn: "Intensive, play-based support for infants and toddlers showing signs of developmental delay, involving the whole family.",
      descAm: "የዕድገት መዘግየት ምልክቶች ለሚያሳዩ ሕፃናት እና ታዳጊዎች በጥልቅ ጨዋታ ላይ የተመሠረተ ድጋፍ፣ መላውን ቤተሰብ የሚያሳትፍ፡፡"
    },
    {
      titleEn: "School-Age Support",
      titleAm: "በትምህርት ዕድሜ ላይ ያለ ድጋፍ",
      ageRange: "Ages 6–12",
      color: "bg-wisdom-blue",
      descEn: "Academic and therapeutic support focusing on learning differences, executive function, and social confidence.",
      descAm: "ለትምህርት ልዩነቶች፣ ለሥራ አመራር ተግባር እና ለማኅበራዊ በራስ መተማመን ላይ ያተኮረ ትምህርታዊ እና ሕክምናዊ ድጋፍ፡፡"
    },
    {
      titleEn: "Family Partnership",
      titleAm: "የቤተሰብ አጋርነት",
      ageRange: "All ages",
      color: "bg-wisdom-green",
      descEn: "Long-term coaching and education for parents to reinforce therapeutic goals and build a resilient home environment.",
      descAm: "ወላጆች የሕክምና ግቦችን እንዲያጠናክሩ እና ጠንካራ የቤት ውስጥ ሁኔታን እንዲገነቡ የረጅም ጊዜ ስልጠና እና ትምህርት፡፡"
    }
  ];

  return (
    <div className="min-h-screen bg-wisdom-bg">
      <SubPageHero 
        badgeEn="Our Programs" 
        badgeAm="የእኛ ፕሮግራሞች" 
        titleEn="Structured Care Journeys" 
        titleAm="የተደራጁ የእንክብካቤ ጉዞዎች" 
        descriptionEn="Explore our tailored programs designed to meet families exactly where they are, from early diagnosis to thriving in adolescence."
        descriptionAm="ከመጀመሪያው ምርመራ ጀምሮ እስከ ጉርምስና ዕድሜ ድረስ ቤተሰቦችን ባሉበት ደረጃ ላይ ለመደገፍ የተዘጋጁ ፕሮግራሞቻችንን ይመርምሩ፡፡"
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, idx) => (
            <div key={idx} className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
               <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${program.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase py-1 px-3 bg-slate-100 dark:bg-white/10 rounded-full text-wisdom-muted">{program.ageRange}</span>
               </div>
               
               <h3 className="font-heading font-bold text-xl text-wisdom-text mb-1">{program.titleEn}</h3>
               <h4 className="font-heading font-bold text-lg text-wisdom-muted font-amharic mb-4">{program.titleAm}</h4>
               
               <div className="space-y-3 mb-8 flex-1">
                 <p className="text-sm text-wisdom-muted leading-relaxed font-medium">{program.descEn}</p>
                 <p className="font-amharic text-sm text-wisdom-muted leading-relaxed opacity-80">{program.descAm}</p>
               </div>

               <Link href="/contact" className="w-full">
                 <Button className="w-full rounded-full border-wisdom-blue/20 hover:bg-wisdom-blue/5 text-wisdom-blue font-bold" variant="outline">
                   Learn More
                 </Button>
               </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Message */}
      <section className="pb-20 px-4 text-center">
         <div className="max-w-2xl mx-auto bg-wisdom-blue/5 dark:bg-wisdom-blue/20 rounded-[3rem] p-12 border border-wisdom-blue/10">
            <h3 className="font-heading font-bold text-2xl text-wisdom-text mb-4">Not Sure Where to Start?</h3>
            <p className="text-wisdom-muted font-medium mb-8">Every child&apos;s journey is unique. Contact us today for a compassionate consultation to find the right fit for your family.</p>
            <Link href="/contact">
              <Button className="rounded-full bg-wisdom-blue hover:bg-blue-800 px-8 py-6 text-lg font-bold shadow-lg shadow-wisdom-blue/20">
                Get a Consultation
              </Button>
            </Link>
         </div>
      </section>

      <CTASection />
    </div>
  );
}
