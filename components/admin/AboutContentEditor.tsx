"use client";

import React, { useState } from "react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface HeroData {
  badge: string; badgeAm: string; title: string; titleAm: string;
  description: string; descriptionAm: string;
}
interface BlockData {
  id: string; section: string; title?: string | null; titleAm?: string | null;
  content?: string | null; contentAm?: string | null; order: number;
}

interface AboutContentEditorProps {
  initialHero: HeroData | null;
  initialBlocks: BlockData[];
}

export function AboutContentEditor({ initialHero, initialBlocks }: AboutContentEditorProps) {
  const [activeTab, setActiveTab] = useState<"hero" | "story" | "purpose" | "outcomes">("hero");
  const [hero, setHero] = useState<HeroData>(initialHero || {
    badge: "", badgeAm: "", title: "", titleAm: "", description: "", descriptionAm: ""
  });
  const [blocks, setBlocks] = useState<BlockData[]>(initialBlocks);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHero((prev: HeroData) => ({ ...prev, [name]: value }));
  };

  const updateBlock = (id: string, field: string, value: string) => {
    setBlocks((prev: BlockData[]) => 
      prev.map((b: BlockData) => b.id === id ? { ...b, [field]: value } : b)
    );
  };

  const saveHero = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "hero", data: hero }),
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error.message);
      setMessage({ type: "success", text: "About hero section saved!" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessage({ type: "error", text: "Error: " + msg });
    } finally {
      setSaving(false);
    }
  };

  const saveBlocks = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "blocks", data: blocks }),
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error.message);
      setMessage({ type: "success", text: "Page blocks updated!" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessage({ type: "error", text: "Error saving blocks: " + msg });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
      {/* Navigation Sidebar */}
      <div className="xl:col-span-1 space-y-2">
        <TabButton active={activeTab === "hero"} onClick={() => setActiveTab("hero")} label="Hero Metadata" />
        <TabButton active={activeTab === "story"} onClick={() => setActiveTab("story")} label="Founder & Kaleb Stories" />
        <TabButton active={activeTab === "purpose"} onClick={() => setActiveTab("purpose")} label="Ministry Purpose" />
        <TabButton active={activeTab === "outcomes"} onClick={() => setActiveTab("outcomes")} label="Expected Outcomes" />
      </div>

      {/* Main Content Area */}
      <div className="xl:col-span-3 space-y-10">
        {message && (
          <div className={`p-4 rounded-xl border ${
            message.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
          } font-bold text-sm shadow-sm`}>
            {message.text}
          </div>
        )}

        {activeTab === "hero" && (
          <Card className="p-8 border-slate-200">
            <h3 className="text-xl font-heading font-black text-slate-800 mb-8">About Page Hero</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField id="badge" label="Badge (EN)" value={hero.badge} onChange={handleHeroChange} />
                <FormField id="badgeAm" label="Badge (AM)" value={hero.badgeAm} onChange={handleHeroChange} className="font-amharic" />
              </div>
              <FormField id="title" label="Main Title (EN)" value={hero.title} onChange={handleHeroChange} />
              <FormField id="titleAm" label="Main Title (AM)" value={hero.titleAm} onChange={handleHeroChange} className="font-amharic" />
              <FormField id="description" label="Subtext (EN)" value={hero.description} onChange={handleHeroChange} fieldType="textarea" rows={2} />
              <FormField id="descriptionAm" label="Subtext (AM)" value={hero.descriptionAm} onChange={handleHeroChange} fieldType="textarea" rows={2} className="font-amharic" />
            </div>
            <div className="mt-8 flex justify-end">
              <Button onClick={saveHero} disabled={saving} className="bg-wisdom-blue rounded-full px-8 uppercase font-black text-xs">
                {saving ? "Saving..." : "Update Hero"}
              </Button>
            </div>
          </Card>
        )}

        {activeTab === "story" && (
          <div className="space-y-8">
            {blocks.filter(b => b.section.startsWith("story-")).map((block) => (
              <Card key={block.id} className="p-8 border-slate-200 relative">
                 <h4 className="text-sm font-black text-wisdom-blue uppercase tracking-widest mb-6">
                    {block.section === "story-founders" ? "Founder Story Section" : "Kaleb's Testimony Section"}
                 </h4>
                 <div className="space-y-4">
                    <FormField id={`t-${block.id}`} label="Title (EN)" value={block.title || ""} onChange={(e) => updateBlock(block.id, "title", e.target.value)} />
                    <FormField id={`tam-${block.id}`} label="Title (AM)" value={block.titleAm || ""} onChange={(e) => updateBlock(block.id, "titleAm", e.target.value)} className="font-amharic" />
                    <FormField id={`c-${block.id}`} label="Content (EN)" value={block.content || ""} onChange={(e) => updateBlock(block.id, "content", e.target.value)} fieldType="textarea" rows={4} />
                    <FormField id={`cam-${block.id}`} label="Content (AM)" value={block.contentAm || ""} onChange={(e) => updateBlock(block.id, "contentAm", e.target.value)} fieldType="textarea" rows={4} className="font-amharic" />
                 </div>
              </Card>
            ))}
            <div className="flex justify-end">
              <Button onClick={saveBlocks} disabled={saving} className="bg-wisdom-green rounded-full px-8 uppercase font-black text-xs">
                Sync Story Modules
              </Button>
            </div>
          </div>
        )}

        {activeTab === "purpose" && (
          <div className="space-y-8">
            {blocks.filter(b => b.section === "purpose-main").map((block) => (
              <Card key={block.id} className="p-8 border-slate-200">
                 <h4 className="text-sm font-black text-wisdom-orange uppercase tracking-widest mb-6">Core Ministry Purpose</h4>
                 <div className="space-y-4">
                    <FormField id={`t-${block.id}`} label="Title (EN)" value={block.title || ""} onChange={(e) => updateBlock(block.id, "title", e.target.value)} />
                    <FormField id={`tam-${block.id}`} label="Title (AM)" value={block.titleAm || ""} onChange={(e) => updateBlock(block.id, "titleAm", e.target.value)} className="font-amharic" />
                    <FormField id={`c-${block.id}`} label="Content (EN)" value={block.content || ""} onChange={(e) => updateBlock(block.id, "content", e.target.value)} fieldType="textarea" rows={4} />
                    <FormField id={`cam-${block.id}`} label="Content (AM)" value={block.contentAm || ""} onChange={(e) => updateBlock(block.id, "contentAm", e.target.value)} fieldType="textarea" rows={4} className="font-amharic" />
                 </div>
              </Card>
            ))}
            <div className="flex justify-end">
              <Button onClick={saveBlocks} disabled={saving} className="bg-wisdom-orange rounded-full px-8 uppercase font-black text-xs">
                Sync Purpose Data
              </Button>
            </div>
          </div>
        )}

        {activeTab === "outcomes" && (
          <div className="space-y-6">
            <Card className="p-8 border-slate-200">
              <h3 className="text-xl font-heading font-black text-slate-800 mb-8">Expected Outcomes</h3>
              <div className="space-y-6">
                {blocks.filter(b => b.section === "outcome").map((outcome, idx) => (
                  <div key={outcome.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-black text-xs text-slate-400">
                      {idx + 1}
                    </div>
                    <div className="flex-1 space-y-4">
                      <FormField id={`o-en-${outcome.id}`} label="Outcome (English)" value={outcome.content || ""} onChange={(e) => updateBlock(outcome.id, "content", e.target.value)} fieldType="textarea" rows={2} />
                      <FormField id={`o-am-${outcome.id}`} label="Outcome (Amharic)" value={outcome.contentAm || ""} onChange={(e) => updateBlock(outcome.id, "contentAm", e.target.value)} fieldType="textarea" rows={2} className="font-amharic" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <Button onClick={saveBlocks} disabled={saving} className="bg-slate-800 text-white rounded-full px-8 uppercase font-black text-xs">
                  Update Outcome Grid
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-6 py-4 rounded-xl font-bold text-sm transition-all ${
        active 
          ? "bg-wisdom-blue text-white shadow-lg translate-x-2" 
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
      }`}
    >
      {label}
    </button>
  );
}
