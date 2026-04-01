"use client";

import React, { useState } from "react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface HeroSectionData {
  badge: string; badgeAm: string; title: string; titleAm: string;
  description: string; descriptionAm: string; ctaText: string | null; ctaLink: string | null;
}
interface FeatureData {
  id: string; title: string; titleAm: string; badge: string; badgeAm: string;
  description: string; descriptionAm: string; href: string;
  color: string; accentColor: string; iconPath: string;
}
interface HomeContentEditorProps {
  initialHero: HeroSectionData | null;
  initialFeatures: FeatureData[];
}

export function HomeContentEditor({ initialHero, initialFeatures }: HomeContentEditorProps) {
  const [hero, setHero] = useState<HeroSectionData>(initialHero || {
    badge: "", badgeAm: "", title: "", titleAm: "",
    description: "", descriptionAm: "", ctaText: "", ctaLink: ""  
  });
  const [features, setFeatures] = useState<FeatureData[]>(initialFeatures);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHero((prev: HeroSectionData) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (id: string, field: string, value: string) => {
    setFeatures((prev: FeatureData[]) => prev.map((f) => f.id === id ? { ...f, [field]: value } : f));
  };

  const saveHero = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "hero", data: hero }),
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error.message);
      setMessage({ type: "success", text: "Hero section saved successfully!" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessage({ type: "error", text: "Error saving hero: " + msg });
    } finally {
      setSaving(false);
    }
  };

  const saveFeatures = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "features", data: features }),
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error.message);
      setMessage({ type: "success", text: "Features updated successfully!" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessage({ type: "error", text: "Error saving features: " + msg });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
      <div className="xl:col-span-2 space-y-10">
        {/* Persistence Status Toast-like Notification */}
        {message && (
          <div className={`p-4 rounded-xl border ${
            message.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
          } font-bold text-sm shadow-sm animate-in fade-in slide-in-from-top-4`}>
            {message.type === "success" ? "✓" : "!"} {message.text}
          </div>
        )}

        {/* Hero Form Section */}
        <Card className="p-8 border-slate-200 overflow-visible relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-wisdom-blue rounded-t-xl" />
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-heading font-black text-slate-800">
              Hero Section Editor
            </h3>
            <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              Main Landing
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <FormField id="badge" label="Badge (English)" value={hero.badge} onChange={handleHeroChange} placeholder="e.g. Love • Care • Heal" />
            <FormField id="badgeAm" label="Badge (Amharic)" value={hero.badgeAm} onChange={handleHeroChange} placeholder="ፍቅር • እንክብካቤ • ፈውስ" className="font-amharic" />
            <div className="md:col-span-2 space-y-6">
              <FormField id="title" label="Main Title (English)" value={hero.title} onChange={handleHeroChange} />
              <FormField id="titleAm" label="Main Title (Amharic)" value={hero.titleAm} onChange={handleHeroChange} className="font-amharic" />
              <FormField id="description" label="Description (English)" value={hero.description} onChange={handleHeroChange} fieldType="textarea" rows={3} />
              <FormField id="descriptionAm" label="Description (Amharic)" value={hero.descriptionAm} onChange={handleHeroChange} fieldType="textarea" rows={3} className="font-amharic" />
            </div>
            <FormField id="ctaText" label="Button Text (EN/AM Handled Automatically)" value={hero.ctaText ?? ""} onChange={handleHeroChange} placeholder="e.g. Donate Now" />
            <FormField id="ctaLink" label="Button Link Target" value={hero.ctaLink ?? ""} onChange={handleHeroChange} placeholder="e.g. /donate" />
          </div>

          <div className="mt-10 flex justify-end">
            <Button onClick={saveHero} disabled={saving} className="bg-wisdom-blue hover:bg-[#153a7e] px-10 rounded-full font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95">
              {saving ? "Saving Changes..." : "Publish Hero Updates"}
            </Button>
          </div>
        </Card>

        {/* Feature List Component */}
        <Card className="p-8 border-slate-200 pb-2 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-wisdom-green rounded-t-xl" />
          <h3 className="text-xl font-heading font-black text-slate-800 mb-8">
            Homepage Feature Slots
          </h3>

          <div className="space-y-6">
            {features.map((feature, idx) => (
              <div key={feature.id} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl group transition-all hover:bg-white hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-slate-400 text-sm shadow-sm shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField id={`f-title-${feature.id}`} label="Label (English)" value={feature.title} onChange={(e) => handleFeatureChange(feature.id, "title", e.target.value)} className="text-xs" />
                    <FormField id={`f-titleAm-${feature.id}`} label="Label (Amharic)" value={feature.titleAm} onChange={(e) => handleFeatureChange(feature.id, "titleAm", e.target.value)} className="text-xs font-amharic" />
                    <div className="md:col-span-2">
                      <FormField id={`f-desc-${feature.id}`} label="Description (English)" value={feature.description} onChange={(e) => handleFeatureChange(feature.id, "description", e.target.value)} fieldType="textarea" rows={2} className="text-xs" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 mb-6 flex justify-end">
            <Button onClick={saveFeatures} disabled={saving} className="bg-wisdom-green hover:bg-green-700 px-10 rounded-full font-black text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95">
              {saving ? "Processing..." : "Sync Feature Modules"}
            </Button>
          </div>
        </Card>
      </div>

      {/* Sidebar Utilities / Hints */}
      <aside className="space-y-6">
        <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
          <h4 className="text-sm font-black uppercase tracking-widest text-wisdom-blue mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-wisdom-yellow" />
            Live Preview Tip
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Changes saved here update the public database instantly. To see your changes, 
            simply open the public homepage in a new tab. 
          </p>
          <hr className="my-4 border-slate-100" />
          <Button variant="outline" className="w-full text-xs font-bold py-2 h-auto rounded-xl">
            View Live Home Page
          </Button>
        </div>

        <div className="p-6 bg-wisdom-blue rounded-3xl shadow-xl text-white">
          <h4 className="text-sm font-black uppercase tracking-widest text-wisdom-yellow mb-4">
            Editor Guidelines
          </h4>
          <ul className="space-y-3 text-[11px] font-medium opacity-90 leading-normal">
            <li className="flex gap-2">
              <span className="text-wisdom-yellow">•</span> 
              Titles should be punchy and fit on one line for Hero.
            </li>
            <li className="flex gap-2">
              <span className="text-wisdom-yellow">•</span> 
              Ensure Amharic translation matched the context accurately.
            </li>
            <li className="flex gap-2">
              <span className="text-wisdom-yellow">•</span> 
              Images must be uploaded separately (coming soon).
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
