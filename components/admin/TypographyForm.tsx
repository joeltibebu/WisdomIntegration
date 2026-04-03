"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

const HEADING_FONTS = ["Poppins", "Montserrat", "Lora", "Inter", "Open Sans", "Source Sans 3"];
const BODY_FONTS = ["Inter", "Open Sans", "Source Sans 3", "Poppins", "Montserrat", "Lora"];
const FONT_SCALES = [
  { value: "sm", label: "Small (90%)" },
  { value: "md", label: "Medium (100%) — Default" },
  { value: "lg", label: "Large (110%)" },
  { value: "xl", label: "Extra Large (120%)" },
];
const HEADING_WEIGHTS = [
  { value: "400", label: "Regular (400)" },
  { value: "600", label: "Semi-Bold (600)" },
  { value: "700", label: "Bold (700)" },
  { value: "800", label: "Extra Bold (800)" },
  { value: "900", label: "Black (900)" },
];
const LINE_HEIGHTS = [
  { value: "tight", label: "Tight (1.3)" },
  { value: "normal", label: "Normal (1.6) — Default" },
  { value: "relaxed", label: "Relaxed (1.8)" },
];

// Google Fonts import URL for preview
const FONT_IMPORT_MAP: Record<string, string> = {
  Poppins: "Poppins:wght@400;600;700;800;900",
  Montserrat: "Montserrat:wght@400;600;700;800;900",
  Lora: "Lora:wght@400;600;700",
  Inter: "Inter:wght@400;500;600;700",
  "Open Sans": "Open+Sans:wght@400;600;700",
  "Source Sans 3": "Source+Sans+3:wght@400;600;700",
};

const SCALE_MAP: Record<string, string> = { sm: "0.9", md: "1", lg: "1.1", xl: "1.2" };
const LINE_HEIGHT_MAP: Record<string, string> = { tight: "1.3", normal: "1.6", relaxed: "1.8" };

interface Props {
  defaultValues: {
    headingFont: string;
    bodyFont: string;
    fontScale: string;
    headingWeight: string;
    lineHeight: string;
  };
}

export function TypographyForm({ defaultValues }: Props) {
  const [values, setValues] = useState(defaultValues);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(key: string, val: string) {
    setValues((v) => ({ ...v, [key]: val }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/cms/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "typography", value: values }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error?.message ?? "Save failed");
      setSaved(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  // Build Google Fonts URL for preview
  const families = Array.from(new Set([values.headingFont, values.bodyFont]))
    .map((f) => FONT_IMPORT_MAP[f])
    .filter(Boolean)
    .join("&family=");
  const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;

  const previewHeadingStyle: React.CSSProperties = {
    fontFamily: `'${values.headingFont}', sans-serif`,
    fontWeight: values.headingWeight,
    fontSize: `calc(1.75rem * ${SCALE_MAP[values.fontScale] ?? "1"})`,
  };
  const previewBodyStyle: React.CSSProperties = {
    fontFamily: `'${values.bodyFont}', sans-serif`,
    fontSize: `calc(1rem * ${SCALE_MAP[values.fontScale] ?? "1"})`,
    lineHeight: LINE_HEIGHT_MAP[values.lineHeight] ?? "1.6",
  };

  return (
    <div className="space-y-10 max-w-4xl">
      {/* Inject preview fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href={googleFontsUrl} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        {/* Heading Font */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Heading Font</label>
          <select
            value={values.headingFont}
            onChange={(e) => set("headingFont", e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-blue"
          >
            {HEADING_FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        {/* Body Font */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Body Font</label>
          <select
            value={values.bodyFont}
            onChange={(e) => set("bodyFont", e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-blue"
          >
            {BODY_FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        {/* Font Scale */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Font Scale</label>
          <select
            value={values.fontScale}
            onChange={(e) => set("fontScale", e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-blue"
          >
            {FONT_SCALES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {/* Heading Weight */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Heading Weight</label>
          <select
            value={values.headingWeight}
            onChange={(e) => set("headingWeight", e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-blue"
          >
            {HEADING_WEIGHTS.map((w) => <option key={w.value} value={w.value}>{w.label}</option>)}
          </select>
        </div>

        {/* Line Height */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-slate-700">Line Height Preset</label>
          <div className="flex gap-3 flex-wrap">
            {LINE_HEIGHTS.map((lh) => (
              <button
                key={lh.value}
                type="button"
                onClick={() => set("lineHeight", lh.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  values.lineHeight === lh.value
                    ? "bg-wisdom-blue text-white border-wisdom-blue"
                    : "bg-white text-slate-600 border-slate-200 hover:border-wisdom-blue"
                }`}
              >
                {lh.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Live Preview</h3>

        <div className="space-y-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
          <h2 style={previewHeadingStyle} className="text-slate-800">
            Bringing Healing, Hope &amp; Belonging
          </h2>
          <p style={previewBodyStyle} className="text-slate-600 max-w-prose">
            Wisdom Integration Ministry walks alongside families navigating special needs — with faith,
            professional care, and radical belonging. Every child is a gift from God, and every family
            deserves to feel seen, supported, and celebrated.
          </p>
          <button
            style={{ fontFamily: `'${values.bodyFont}', sans-serif`, fontSize: `calc(0.875rem * ${SCALE_MAP[values.fontScale] ?? "1"})` }}
            className="px-6 py-2.5 bg-wisdom-blue text-white rounded-full font-semibold"
          >
            Learn More About Us
          </button>
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-4">
        <Button onClick={handleSave} isLoading={saving} className="px-8 rounded-full bg-wisdom-blue font-bold">
          Save Typography Settings
        </Button>
        {saved && <span className="text-sm text-green-600 font-medium">Saved — changes will apply on next page load.</span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    </div>
  );
}
