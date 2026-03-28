import React from "react";
import Link from "next/link";
import Image from "next/image";

export function SocialFeed() {
  const socials = [
    {
      platform: "Facebook",
      handle: "@WisdomIntegration",
      href: "https://facebook.com",
      color: "bg-[#1877F2]",
      description: "Join our growing community for daily updates and shared stories."
    },
    {
      platform: "Telegram",
      handle: "t.me/WisdomIntegration",
      href: "https://telegram.org",
      color: "bg-[#0088CC]",
      description: "Get instant notifications and spiritual devotionals directly to your phone."
    }
  ];

  const snapshots = [
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
           
           {/* Left: Info */}
           <div className="lg:col-span-5 space-y-8">
              <div>
                 <span className="inline-block py-1.5 px-5 rounded-full bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 text-wisdom-blue font-bold text-sm tracking-widest uppercase mb-4 shadow-sm">
                    Connect With Us
                 </span>
                 <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-wisdom-text leading-tight mb-4">
                    Beyond the Website
                 </h2>
                 <p className="text-wisdom-muted text-lg font-medium leading-relaxed">
                    Follow us on social media for a deeper look at our daily ministry work, community stories, and instant spiritual encouragement.
                 </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {socials.map((social, idx) => (
                   <Link key={idx} href={social.href} className="group p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className={`w-10 h-10 rounded-xl ${social.color} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            {social.platform === "Facebook" ? (
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            ) : (
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.52-.46-.01-1.33-.26-1.98-.48-.8-.27-1.43-.42-1.37-.89.03-.25.38-.51 1.03-.78 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.88 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.04.22z"/>
                            )}
                         </svg>
                      </div>
                      <h4 className="font-bold text-wisdom-text mb-1">{social.platform}</h4>
                      <p className="text-xs text-wisdom-blue font-black tracking-widest uppercase mb-2">{social.handle}</p>
                      <p className="text-xs text-wisdom-muted leading-relaxed line-clamp-2">{social.description}</p>
                   </Link>
                 ))}
              </div>
           </div>

           {/* Right: Snapshot Grid */}
           <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 {snapshots.map((img, idx) => (
                   <div key={idx} className={`relative rounded-[2.5rem] overflow-hidden group shadow-lg ${idx === 1 ? 'sm:translate-y-8' : ''}`}>
                      <Image 
                        src={img} 
                        alt={`Social Snapshot ${idx + 1}`} 
                        width={800}
                        height={1000}
                        className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-wisdom-blue/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                         <p className="text-white text-xs font-bold uppercase tracking-widest">View on Instagram</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

        </div>
      </div>
    </section>
  );
}
