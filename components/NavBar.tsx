"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ThemeToggle } from "./ui/ThemeToggle";
import { LanguageSelector } from "./ui/LanguageSelector";

const navLinks = [
  { href: "/", label: "Home", labelAm: "ቤት" },
  { href: "/about", label: "About", labelAm: "ስለ እኛ" },
  { 
    label: "Focused Support", 
    labelAm: "ልዩ ድጋፍ",
    children: [
      { href: "/for-parents", label: "For Parents", labelAm: "ለወላጆች" },
      { href: "/education-hub", label: "Education Hub", labelAm: "የትምህርት ማዕከል" },
      { href: "/spiritual-food", label: "Spiritual Food", labelAm: "መንፈሳዊ ምግብ" },
    ]
  },
  {
    label: "Our Ministry",
    labelAm: "የእኛ አገልግሎት",
    children: [
      { href: "/services", label: "Services", labelAm: "አገልግሎቶች" },
      { href: "/programs", label: "Programs", labelAm: "ፕሮግራሞች" },
    ]
  },
  { href: "/resources", label: "Resources", labelAm: "ግብአቶች" },
  { href: "/bookshelf", label: "Bookshelf", labelAm: "መጻሕፍት" },
  { href: "/contact", label: "Contact", labelAm: "ያግኙን" },
];

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/95 dark:bg-wisdom-bg/95 backdrop-blur-2xl border-b border-slate-200/60 dark:border-white/10 py-3 shadow-xl shadow-slate-200/20" 
          : "bg-white/85 dark:bg-wisdom-bg/90 backdrop-blur-xl border-b border-slate-200/40 py-5"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center"
      >
        {/* LEFT: Logo */}
        <div className="flex-1 flex items-center justify-start">
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="Wisdom Integration — Home"
          >
            <div className="relative">
              <Image src="/logo.png" alt="Logo" width={100} height={44} className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105" priority />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-lg leading-none tracking-tight text-wisdom-text">
                Wisdom
              </span>
              <span className="font-heading font-medium text-[9px] tracking-[0.25em] uppercase text-wisdom-blue">
                Integration
              </span>
            </div>
          </Link>
        </div>

        {/* CENTER: Navigation Links */}
        <div className="hidden lg:flex flex-[2] justify-center">
          <ul className="flex items-center gap-1 list-none m-0 p-0" role="list">
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <li key={link.label} className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
                    <button
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 transition-all ${activeDropdown === link.label ? 'text-wisdom-blue bg-slate-50' : 'text-slate-600 hover:text-wisdom-blue hover:bg-slate-50'}`}
                    >
                      {link.label}
                      <svg className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 w-64 pt-4 transition-all duration-300 ${activeDropdown === link.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                      <div className="bg-white dark:bg-wisdom-bg border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl p-4 flex flex-col gap-1.5 overflow-hidden">
                         {link.children.map((child) => (
                           <Link
                             key={child.href}
                             href={child.href}
                             className="flex flex-col p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/child"
                           >
                              <span className="text-sm font-bold text-wisdom-text group-hover/child:text-wisdom-blue">{child.label}</span>
                              <span className="text-[10px] font-amharic text-wisdom-muted tracking-wide">{child.labelAm}</span>
                           </Link>
                         ))}
                      </div>
                    </div>
                  </li>
                );
              }

              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                     href={link.href}
                     className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                       ${isActive 
                         ? "text-wisdom-blue bg-wisdom-blue/10 border border-wisdom-blue/20 shadow-sm shadow-wisdom-blue/5" 
                         : "text-slate-600 hover:text-wisdom-blue hover:bg-slate-50"
                       }`}
                  >
                     {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT: Toggles & CTA */}
        <div className="flex-1 flex items-center justify-end gap-3 sm:gap-6">
          <div className="hidden sm:flex items-center gap-1.5">
            <LanguageSelector />
            <ThemeToggle className="text-slate-500 hover:text-wisdom-blue" />
          </div>

          <Link
            href="/donate"
            className="inline-flex items-center justify-center rounded-full font-heading font-black bg-wisdom-blue text-white hover:bg-blue-800 transition-all duration-300 px-7 py-3 text-sm shadow-lg shadow-wisdom-blue/25 hover:-translate-y-0.5"
          >
            Donate
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-wisdom-bg border-b border-slate-200 dark:border-white/10 p-6 shadow-2xl overflow-y-auto max-h-[80vh]">
          <ul className="flex flex-col gap-2 list-none m-0 p-0">
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <li key={link.label} className="border-b border-slate-100 dark:border-white/5 pb-2">
                    <p className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-wisdom-muted">{link.label} / {link.labelAm}</p>
                    <div className="flex flex-col gap-1 pl-4">
                       {link.children.map((child) => (
                         <Link
                           key={child.href}
                           href={child.href}
                           className={`flex flex-col px-4 py-3 rounded-2xl ${pathname === child.href ? 'text-wisdom-blue bg-wisdom-blue/5' : 'text-wisdom-text'}`}
                           onClick={() => setMenuOpen(false)}
                         >
                            <span className="font-bold">{child.label}</span>
                            <span className="text-xs font-amharic opacity-60">{child.labelAm}</span>
                         </Link>
                       ))}
                    </div>
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex flex-col px-4 py-3 rounded-2xl font-bold ${pathname === link.href ? 'bg-wisdom-blue/5 text-wisdom-blue' : 'text-wisdom-text'}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-amharic opacity-60">{link.labelAm}</span>
                  </Link>
                </li>
              );
            })}
            <li className="pt-4">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="w-full inline-flex items-center justify-center rounded-2xl font-heading font-black bg-wisdom-blue text-white py-4 text-base shadow-lg shadow-wisdom-blue/20"
              >
                Start Journey / ጉዞ ይጀምሩ
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
