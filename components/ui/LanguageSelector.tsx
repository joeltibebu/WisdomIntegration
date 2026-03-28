"use client";

import React, { useRef, useEffect } from "react";
import { useLanguage, Lang } from "@/lib/LanguageContext";

const languages: { code: Lang; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "am", name: "አማርኛ", flag: "🇪🇹" },
];

export function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = languages.find((l) => l.code === lang) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-wisdom-blue hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all focus:outline-none border border-transparent hover:border-slate-200/50"
        aria-label="Select Language"
      >
        <span className="text-base">{selected.flag}</span>
        <span className="uppercase tracking-wider text-xs font-bold">{selected.code}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-wisdom-surface border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl z-50 py-1.5 overflow-hidden">
          {languages.map((l) => (
            <button
              key={l.code}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                lang === l.code
                  ? "text-wisdom-blue font-bold bg-wisdom-blue/5"
                  : "text-wisdom-text hover:bg-slate-50 dark:hover:bg-white/5"
              }`}
              onClick={() => {
                setLang(l.code);
                setIsOpen(false);
              }}
            >
              <span className="text-base">{l.flag}</span>
              <span className="font-semibold">{l.name}</span>
              {lang === l.code && (
                <svg className="w-3.5 h-3.5 ml-auto text-wisdom-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
