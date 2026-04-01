export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DeleteButton } from "@/components/cms/DeleteButton";

export default async function GalleryAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  const items = await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-heading font-bold text-wisdom-text">Gallery</h1>
            <p className="text-sm text-wisdom-muted mt-1">Manage gallery images shown on the site.</p>
          </div>
          <Link href="/dashboard/admin/cms/gallery/new">
            <Button variant="primary">+ Add Image</Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-wisdom-border rounded-card overflow-hidden">
              <div className="relative aspect-square bg-slate-100">
                <Image src={item.imageUrl} alt={item.title ?? "Gallery image"} fill className="object-cover" />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-xs font-medium text-wisdom-text truncate">{item.title ?? "Untitled"}</span>
                  <Badge variant={item.active ? "green" : "gray"} >{item.active ? "On" : "Off"}</Badge>
                </div>
                <div className="flex gap-2">
                  <Link href={`/dashboard/admin/cms/gallery/${item.id}/edit`} className="flex-1">
                    <Button variant="outline" size="sm" fullWidth>Edit</Button>
                  </Link>
                  <DeleteButton endpoint={`/api/admin/cms/gallery/${item.id}`} confirmMessage="Delete this image?" />
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length === 0 && <p className="text-wisdom-muted text-sm">No gallery images yet.</p>}
      </div>
    </DashboardShell>
  );
}
