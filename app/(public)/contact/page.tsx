import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect With Us",
  description: "Get in touch with Wisdom Integration Ministry. Whether you need support, guidance, or want to partner with us, we are here to listen.",
};
import { SubPageHero } from "@/components/sections/SubPageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SocialFeed } from "@/components/sections/SocialFeed";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-wisdom-bg">
      <SubPageHero 
        badgeEn="Get in Touch" 
        badgeAm="ያግኙን" 
        titleEn="We are Here to Listen" 
        titleAm="እርስዎን ለመስማት ዝግጁ ነን"
        descriptionEn="Whether you have a question, need support, or want to partner with our ministry, we'd love to hear from you."
        descriptionAm="ጥያቄ ካለዎት፣ ድጋፍ ከፈለጉ ወይም ከአገልግሎታችን ጋር አብረው ለመሥራት ከፈለጉ እርስዎን ለማነጋገር ደስተኞች ነን፡፡"
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Contact Info Column */}
          <div className="space-y-12">
            <div>
              <h2 className="font-heading font-extrabold text-3xl text-wisdom-text mb-6">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-wisdom-blue/10 flex items-center justify-center text-wisdom-blue shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-black text-wisdom-blue uppercase tracking-widest mb-1">Email Us</p>
                    <p className="text-lg font-medium text-wisdom-muted">info@wisdom-integration.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-wisdom-green/10 flex items-center justify-center text-wisdom-green shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-black text-wisdom-green uppercase tracking-widest mb-1">Call Us</p>
                    <p className="text-lg font-medium text-wisdom-muted">+251 911 234 567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-wisdom-orange/10 flex items-center justify-center text-wisdom-orange shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-black text-wisdom-orange uppercase tracking-widest mb-1">Location</p>
                    <p className="text-lg font-medium text-wisdom-muted">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
              <h3 className="font-heading font-bold text-xl text-wisdom-text mb-4">Office Hours</h3>
              <ul className="space-y-3 text-wisdom-muted font-medium">
                <li className="flex justify-between"><span>Monday - Friday</span> <span>9:00 AM - 5:00 PM</span></li>
                <li className="flex justify-between"><span>Saturday</span> <span>10:00 AM - 2:00 PM</span></li>
                <li className="flex justify-between"><span>Sunday</span> <span>Closed</span></li>
              </ul>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="bg-white dark:bg-white/5 p-8 sm:p-12 rounded-[3.5rem] border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-wisdom-blue/5 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             
             <h2 className="font-heading font-extrabold text-3xl text-wisdom-text mb-8">Send a Message</h2>
             <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-black text-wisdom-muted uppercase tracking-widest ml-4">Full Name</label>
                      <input type="text" className="w-full h-14 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 px-8 focus:ring-2 focus:ring-wisdom-blue outline-none transition-all" placeholder="John Doe" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black text-wisdom-muted uppercase tracking-widest ml-4">Email Address</label>
                      <input type="email" className="w-full h-14 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 px-8 focus:ring-2 focus:ring-wisdom-blue outline-none transition-all" placeholder="john@example.com" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-black text-wisdom-muted uppercase tracking-widest ml-4">Subject</label>
                   <input type="text" className="w-full h-14 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 px-8 focus:ring-2 focus:ring-wisdom-blue outline-none transition-all" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-black text-wisdom-muted uppercase tracking-widest ml-4">Your Message</label>
                   <textarea rows={4} className="w-full rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 p-8 focus:ring-2 focus:ring-wisdom-blue outline-none transition-all resize-none" placeholder="Write your message here..." />
                </div>
                <button type="submit" className="w-full py-5 rounded-full bg-wisdom-blue text-white font-black uppercase tracking-widest shadow-xl shadow-wisdom-blue/20 hover:scale-[1.02] transition-all">
                  Send Message / መልእክት ይላኩ
                </button>
             </form>
          </div>

        </div>
      </section>

      {/* Social Feed Section */}
      <SocialFeed />

      <CTASection />
    </div>
  );
}
