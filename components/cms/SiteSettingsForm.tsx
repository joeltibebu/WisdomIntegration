"use client";

import React, { useState } from "react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface ContactSettings {
  phone: string;
  email: string;
  address: string;
}

interface SocialSettings {
  facebook: string;
  instagram: string;
  youtube: string;
  twitter: string;
}

interface Props {
  contact: ContactSettings;
  social: SocialSettings;
}

export function SiteSettingsForm({ contact: initialContact, social: initialSocial }: Props) {
  const [contact, setContact] = useState<ContactSettings>(initialContact);
  const [social, setSocial] = useState<SocialSettings>(initialSocial);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(key: string, value: Record<string, unknown>) {
    const res = await fetch("/api/admin/cms/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    const json = await res.json();
    if (!res.ok || json.error) throw new Error(json.error?.message ?? "Failed to save.");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      await Promise.all([
        save("contact", contact as unknown as Record<string, unknown>),
        save("social", social as unknown as Record<string, unknown>),
      ]);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8 max-w-2xl">
      <section>
        <h2 className="font-heading font-semibold text-wisdom-text mb-4">Contact Information</h2>
        <div className="space-y-4">
          <FormField id="phone" label="Phone" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: (e.target as HTMLInputElement).value })} placeholder="+1 (555) 000-0000" />
          <FormField id="email" label="Email" type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: (e.target as HTMLInputElement).value })} placeholder="info@wisdomintegration.org" />
          <FormField id="address" label="Address" fieldType="textarea" rows={2} value={contact.address} onChange={(e) => setContact({ ...contact, address: (e.target as HTMLTextAreaElement).value })} placeholder="123 Main St, City, State" />
        </div>
      </section>

      <section>
        <h2 className="font-heading font-semibold text-wisdom-text mb-4">Social Media Links</h2>
        <div className="space-y-4">
          <FormField id="facebook" label="Facebook URL" value={social.facebook} onChange={(e) => setSocial({ ...social, facebook: (e.target as HTMLInputElement).value })} placeholder="https://facebook.com/..." />
          <FormField id="instagram" label="Instagram URL" value={social.instagram} onChange={(e) => setSocial({ ...social, instagram: (e.target as HTMLInputElement).value })} placeholder="https://instagram.com/..." />
          <FormField id="youtube" label="YouTube URL" value={social.youtube} onChange={(e) => setSocial({ ...social, youtube: (e.target as HTMLInputElement).value })} placeholder="https://youtube.com/..." />
          <FormField id="twitter" label="X / Twitter URL" value={social.twitter} onChange={(e) => setSocial({ ...social, twitter: (e.target as HTMLInputElement).value })} placeholder="https://x.com/..." />
        </div>
      </section>

      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      {success && <p role="status" className="text-sm text-green-600">Settings saved successfully.</p>}

      <Button type="submit" variant="primary" isLoading={saving}>Save Settings</Button>
    </form>
  );
}
