export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { SiteSettingsForm } from "@/components/cms/SiteSettingsForm";

const defaultContact = { phone: "", email: "", address: "" };
const defaultSocial = { facebook: "", instagram: "", youtube: "", twitter: "" };

export default async function SiteSettingsPage() {
  const settings = await prisma.siteSetting.findMany();
  const contactRow = settings.find((s) => s.key === "contact");
  const socialRow = settings.find((s) => s.key === "social");

  const contact = (contactRow?.value as typeof defaultContact) ?? defaultContact;
  const social = (socialRow?.value as typeof defaultSocial) ?? defaultSocial;

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Site Settings</h1>
          <p className="text-sm text-wisdom-muted mt-1">Update contact info and social media links used across the site.</p>
        </div>
        <SiteSettingsForm contact={contact} social={social} />
      </div>
    </>
  );
}
