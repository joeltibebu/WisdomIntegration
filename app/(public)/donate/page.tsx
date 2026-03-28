import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner With Us",
  description: "Invest in the lives of children with developmental limitations. Your support provides therapy, education, and spiritual care for families in need.",
};
import { SubPageHero } from "@/components/sections/SubPageHero";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

export default function DonatePage() {
  const tiers = [
    {
      amount: "$25",
      titleEn: "Supporter",
      titleAm: "ደጋፊ",
      descEn: "Helps cover the cost of therapy materials and sensory tools used in sessions.",
      descAm: "ለሕክምና ቁሳቁሶች እና በክፍለ-ጊዜዎች ውስጥ ለሚጠቀሙባቸው የስሜት ግብአቶች ወጪን ለመሸፈን ይረዳል፡፡",
      color: "bg-wisdom-yellow"
    },
    {
      amount: "$50",
      titleEn: "Champion",
      titleAm: "አሸናፊ",
      descEn: "Funds a subsidized therapy session for a family in need of financial support.",
      descAm: "የገንዘብ ድጋፍ ለሚያስፈልገው ቤተሰብ በድጎማ የሚደረግ የሕክምና ክፍለ ጊዜን ይደግፋል፡፡",
      color: "bg-wisdom-blue",
      featured: true
    },
    {
      amount: "$100",
      titleEn: "Guardian",
      titleAm: "ጠባቂ",
      descEn: "Supports family education workshops and intensive parent coaching programs.",
      descAm: "የቤተሰብ ትምህርት ወርክሾፖችን እና ጥልቅ የወላጅ ስልጠና ፕሮግራሞችን ይደግፋል፡፡",
      color: "bg-wisdom-green"
    }
  ];

  return (
    <div className="min-h-screen bg-wisdom-bg">
      <SubPageHero 
        badgeEn="Support Our Mission" 
        badgeAm="ተልዕኮአችንን ይደግፉ" 
        titleEn="Invest in Healing & Hope" 
        titleAm="በፈውስ እና በተስፋ ላይ ኢንቨስት ያድርጉ" 
        descriptionEn="Every contribution directly impacts families raising children with special needs, bringing them out of isolation and into a community of care."
        descriptionAm="እያንዳንዱ መዋጮ ልዩ ፍላጎት ያላቸውን ልጆች በሚያሳድጉ ቤተሰቦች ላይ በቀጥታ ተጽእኖ ይኖረዋል፤ ይህም ከብቸኝነት አውጥቶ ወደ እንክብካቤ ማኅበረሰብ ያመጣቸዋል፡፡"
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-wisdom-blue font-bold tracking-[0.2em] uppercase text-sm border-l-4 border-wisdom-blue pl-4 mb-6 block">Why Your Support Matters</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text leading-tight mb-8">
              Turning Seeds of Kindness into <span className="text-wisdom-blue">Lifelong Impact.</span>
            </h2>
            <div className="space-y-6 text-wisdom-muted text-lg leading-relaxed font-medium">
               <p>
                 Wisdom Integration operates on the principle that no child should be left behind due to financial barriers. Our ministry bridges the gap for families who face high costs of specialized care and isolation.
               </p>
               <p className="font-amharic text-wisdom-text opacity-90 border-l-4 border-wisdom-orange/30 pl-6 py-2">
                 ዊዝደም ኢንቲግሬሽን የሚሠራው በገንዘብ ምክንያት ምንም ዓይነት ልጅ ወደኋላ መቅረት የለበትም በሚል መርህ ነው፡፡ አገልግሎታችን ከፍተኛ የልዩ እንክብካቤ ወጪ እና ብቸኝነት ለሚያጋጥማቸው ቤተሰቦች ድልድይ ሆኖ ያገለግላል፡፡
               </p>
               <p>
                 Your gift provides more than just therapy; it provides a sense of belonging, a spiritual family, and the practical tools needed for a child to reach their God-given potential.
               </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
             {tiers.map((tier, idx) => (
               <div key={idx} className={`relative p-8 rounded-[2.5rem] border-2 transition-all duration-300 ${tier.featured ? 'border-wisdom-blue bg-wisdom-blue/5 shadow-xl scale-105' : 'border-slate-100 dark:border-white/5 bg-white dark:bg-white/5 shadow-sm'}`}>
                  {tier.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-wisdom-blue text-white text-[10px] font-black tracking-widest uppercase py-1 px-4 rounded-full">Most Impactful</span>}
                  <div className="flex justify-between items-center">
                     <div className="flex flex-col">
                        <span className="text-3xl font-black text-wisdom-text">{tier.amount}</span>
                        <span className="font-bold text-wisdom-muted uppercase tracking-wider text-xs">{tier.titleEn} / {tier.titleAm}</span>
                     </div>
                     <div className={`w-12 h-12 rounded-xl ${tier.color} flex items-center justify-center text-white shadow-lg`}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/></svg>
                     </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                     <p className="text-sm text-wisdom-muted font-medium mb-1">{tier.descEn}</p>
                     <p className="font-amharic text-sm text-wisdom-muted opacity-80">{tier.descAm}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Bank Details section */}
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-[3rem] p-8 sm:p-16 text-center shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-wisdom-blue rounded-full filter blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
           <h3 className="font-heading font-bold text-2xl text-white mb-4">How to Give</h3>
           <p className="text-slate-400 mb-12 max-w-xl mx-auto">We currently accept donations through bank transfers and in-person contributions. Online giving is coming soon.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                 <h4 className="text-wisdom-yellow font-bold uppercase tracking-widest text-xs">Bank Transfer</h4>
                 <div className="space-y-1 text-sm text-slate-300">
                    <p><span className="text-slate-500 font-medium">Bank:</span> Commercial Bank of Ethiopia</p>
                    <p><span className="text-slate-500 font-medium">Account Name:</span> Wisdom Integration</p>
                    <p><span className="text-slate-500 font-medium">Account No:</span> 1000***********</p>
                 </div>
              </div>
              <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                 <h4 className="text-wisdom-green font-bold uppercase tracking-widest text-xs">In-Person</h4>
                 <div className="space-y-1 text-sm text-slate-300">
                    <p>Visit our office in Addis Ababa to drop off your contribution and meet the team.</p>
                 </div>
              </div>
           </div>

           <div className="mt-12">
              <Button className="rounded-full bg-white text-slate-900 hover:bg-slate-200 px-10 py-6 font-bold">
                 I Have a Question About Giving
              </Button>
           </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
