import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface EventCardProps {
  titleEn: string;
  titleAm: string;
  date: string;
  descEn: string;
  descAm: string;
  isPast?: boolean;
}

function EventCard({ titleEn, titleAm, date, descEn, descAm, isPast }: EventCardProps) {
  return (
    <div className={`p-8 rounded-[2rem] border transition-all duration-300 ${isPast ? 'bg-slate-50/50 border-slate-100 dark:bg-white/5 dark:border-white/10 opacity-80' : 'bg-white border-wisdom-blue/20 shadow-xl shadow-wisdom-blue/5 hover:-translate-y-1'}`}>
       <div className="flex flex-col gap-6">
          <div className="flex justify-between items-start">
             <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${isPast ? 'bg-slate-200 text-slate-500 line-through decoration-slate-400' : 'bg-wisdom-blue text-white animate-pulse'}`}>
                {isPast ? 'Past Event' : 'Upcoming'}
             </span>
             <span className="text-sm font-bold text-wisdom-muted uppercase tracking-wider">{date}</span>
          </div>
          
          <div className="space-y-1">
             <h4 className="font-heading font-extrabold text-xl text-wisdom-text">{titleEn}</h4>
             <p className="font-amharic text-sm font-bold text-wisdom-muted">{titleAm}</p>
          </div>

          <div className="space-y-3">
             <p className="text-sm text-wisdom-muted leading-relaxed line-clamp-2">{descEn}</p>
             <p className="text-[13px] font-amharic text-wisdom-muted/70 leading-relaxed line-clamp-2">{descAm}</p>
          </div>

          {!isPast && (
            <div className="pt-4 flex items-center gap-4">
               <Button className="rounded-full bg-wisdom-blue text-white px-8 h-10 text-xs font-black uppercase tracking-widest">
                  Register / ይመዝገቡ
               </Button>
               <Link href="/contact" className="text-xs font-bold text-wisdom-muted hover:text-wisdom-blue transition-colors uppercase tracking-widest">
                  Inquire
               </Link>
            </div>
          )}
       </div>
    </div>
  );
}

export function EventsSection() {
  const upcomingEvents = [
    {
      titleEn: "Family Hope Workshop",
      titleAm: "የቤተሰብ ተስፋ ወርክሾፕ",
      date: "April 15, 2024",
      descEn: "Join us for a specialized workshop focusing on mental health and spiritual resilience for parents of children with special needs.",
      descAm: "ልዩ ፍላጎት ያላቸውን ልጆች በሚያሳድጉ ወላጆች የአእምሮ ጤና እና መንፈሳዊ ጥንካሬ ላይ ትኩረት በሚያደርግ ልዩ ስልጠና ላይ ይሳተፉ፡፡"
    }
  ];

  const pastEvents = [
    {
      titleEn: "Community Prayer Night",
      titleAm: "የማኅበረሰብ የጸሎት ምሽት",
      date: "March 10, 2024",
      descEn: "A beautiful gathering of families coming together to support one another in faith and mutual understanding.",
      descAm: "ቤተሰቦች እርስ በእርሳቸው በእምነት እና በመረዳዳት የሚደጋገፉበት ውብ የማኅበረሰብ የጸሎት ምሽት፡፡",
      isPast: true
    },
    {
      titleEn: "Inclusion Seminar",
      titleAm: "የአካታችነት ሴሚናር",
      date: "February 22, 2024",
      descEn: "Exploring practical ways to create inclusive spaces for children in our local schools and churches.",
      descAm: "በትምህርት ቤቶች እና አብያተ ክርስቲያናት ውስጥ ለልጆች ምቹ እና አካታች የሆኑ ቦታዎችን መፍጠር በሚቻልባቸው መንገዶች ላይ ያተኮረ ሴሚናር፡፡",
      isPast: true
    },
    {
      titleEn: "Parent Support Group Launch",
      titleAm: "የወላጆች ድጋፍ ቡድን ምረቃ",
      date: "January 15, 2024",
      descEn: "The official launch of our permanent support network for families navigating developmental unique paths.",
      descAm: "ልዩ የዕድገት ጉዞ ለሚጓዙ ቤተሰቦች የተዘጋጀው ቋሚ የድጋፍ መረብ ይፋዊ የምረቃ ሥነ-ሥርዓት፡፡",
      isPast: true
    }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32 overflow-hidden" aria-label="Events / ኩነቶች">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
           
           {/* Left: Sticky Header/Info */}
           <div className="lg:col-span-5 lg:sticky lg:top-32">
              <span className="inline-block py-1.5 px-5 rounded-full bg-wisdom-orange/10 text-wisdom-orange font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-6 shadow-sm">
                 Events / ኩነቶች
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-wisdom-text mb-8 tracking-tight leading-tight">
                 Community & <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-orange to-wisdom-yellow">Connection.</span>
              </h2>
              <p className="font-body text-wisdom-muted text-lg sm:text-xl leading-relaxed font-medium mb-8">
                 We believe in the power of gathering. From prayer nights to educational workshops, our events are designed to bring families out of isolation and into a community of support.
              </p>
              
              <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                 <div className="w-12 h-12 rounded-2xl bg-wisdom-yellow flex items-center justify-center text-wisdom-text shadow-lg">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/></svg>
                 </div>
                 <div>
                    <p className="text-sm font-black text-wisdom-text uppercase tracking-widest">Never Miss a Moment</p>
                    <Link href="/contact" className="text-wisdom-blue font-bold text-xs hover:underline uppercase tracking-wide">Subscribe to Updates</Link>
                 </div>
              </div>
           </div>

           {/* Right: Lists */}
           <div className="lg:col-span-7 space-y-16">
              
              {/* Upcoming */}
              <div>
                 <h3 className="font-heading font-black text-xl text-wisdom-text mb-8 flex items-center gap-4">
                    <span className="w-8 h-1 bg-wisdom-blue rounded-full"></span>
                    Upcoming Opportunities / መጪ እድሎች
                 </h3>
                 <div className="space-y-6">
                    {upcomingEvents.map((event, idx) => (
                      <EventCard key={idx} {...event} />
                    ))}
                 </div>
              </div>

              {/* Past */}
              <div>
                 <h3 className="font-heading font-black text-xl text-wisdom-text mb-8 flex items-center gap-4 opacity-70">
                    <span className="w-8 h-1 bg-slate-300 rounded-full"></span>
                    Past Gatherings / ያለፉ ስብሰባዎች
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pastEvents.map((event, idx) => (
                      <EventCard key={idx} {...event} />
                    ))}
                 </div>
                 <div className="mt-8 text-center md:text-left">
                    <Link href="#" className="font-bold text-sm text-wisdom-muted hover:text-wisdom-blue transition-colors flex items-center gap-2 justify-center md:justify-start">
                       View Event Archives
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                 </div>
              </div>

           </div>
        </div>
      </div>
    </section>
  );
}
