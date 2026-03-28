import React from "react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1128] text-white border-t border-white/10 relative overflow-hidden mt-auto z-10" aria-label="Site footer">
      {/* Subtle Glow Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-wisdom-blue mix-blend-screen opacity-10 filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-16">
          
          {/* Brand Identity */}
          <div className="lg:pr-8">
            <h3 className="font-heading font-extrabold text-2xl text-white mb-6 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-blue via-wisdom-green to-wisdom-yellow">Wisdom</span> Integration
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8">
              A faith-based ministry bringing profound healing, hope, and belonging to families raising children with developmental limitations.
            </p>
            <div className="flex gap-4">
               {/* Social Icons Placeholder */}
               <a href="#" aria-label="Facebook URL" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-wisdom-blue transition-colors">
                 <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
               </a>
               <a href="#" aria-label="Instagram URL" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-wisdom-orange transition-colors">
                 <svg className="w-5 h-5 fill-none stroke-currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
               </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm text-wisdom-blue">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-medium">
               <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
               <li><Link href="/about" className="hover:text-white transition-colors">Who We Are</Link></li>
               <li><Link href="/services" className="hover:text-white transition-colors">Our Ministry Focus</Link></li>
               <li><Link href="/resources" className="hover:text-white transition-colors">Parent Resources</Link></li>
               <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Partnership */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm text-wisdom-green">Partner With Us</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-medium">
               <li><Link href="/donate" className="hover:text-white transition-colors">Support Financially</Link></li>
               <li><Link href="/volunteer" className="hover:text-white transition-colors">Volunteer Your Time</Link></li>
               <li><Link href="/prayer" className="hover:text-white transition-colors">Join Prayer Team</Link></li>
               <li><Link href="/refer" className="hover:text-white transition-colors">Refer a Family</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm text-wisdom-orange">Get In Touch</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-medium">
               <li className="flex gap-3 items-start">
                 <svg className="w-5 h-5 mt-0.5 text-wisdom-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                 <a href="mailto:hello@wisdomintegration.org" className="hover:text-white transition-colors leading-relaxed">hello@wisdomintegration.org</a>
               </li>
               <li className="flex gap-3 items-start">
                 <svg className="w-5 h-5 mt-0.5 text-wisdom-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                 <span>+251 911 000 000</span>
               </li>
               <li className="flex gap-3 items-start">
                 <svg className="w-5 h-5 mt-0.5 text-wisdom-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                 <address className="not-italic leading-relaxed">
                   <strong>Wisdom Integration</strong><br />
                   Addis Ababa, Ethiopia
                 </address>
               </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>&copy; {currentYear} Wisdom Integration Ministry. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
