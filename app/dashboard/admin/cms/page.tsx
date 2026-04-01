export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";

const sections = [
  { href: "/dashboard/admin/cms/hero", label: "Hero Sections", description: "Edit hero banners for Home and About pages" },
  { href: "/dashboard/admin/cms/images", label: "Image Manager", description: "Update images for About page, blog posts, and more" },
  { href: "/dashboard/admin/cms/testimonials", label: "Testimonials", description: "Manage family stories shown on the homepage" },
  { href: "/dashboard/admin/cms/events", label: "Events", description: "Create and manage upcoming events and programs" },
  { href: "/dashboard/admin/cms/gallery", label: "Gallery", description: "Manage gallery images" },
  { href: "/dashboard/admin/cms/books", label: "Books", description: "Manage the bookshelf section" },
  { href: "/dashboard/admin/cms/settings", label: "Site Settings", description: "Edit footer, contact info, and social links" },
];

export default async function CMSHubPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Website Content</h1>
          <p className="text-sm text-wisdom-muted mt-1">Manage all public-facing website content from here.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="block bg-white border border-wisdom-border rounded-card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-wisdom-blue"
            >
              <h2 className="font-heading font-semibold text-wisdom-text mb-1">{s.label}</h2>
              <p className="text-sm text-wisdom-muted">{s.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
