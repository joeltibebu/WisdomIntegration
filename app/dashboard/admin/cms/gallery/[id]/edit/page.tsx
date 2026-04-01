export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { GalleryImageForm } from "@/components/cms/GalleryImageForm";

export default async function EditGalleryImagePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  const item = await prisma.galleryImage.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
      <div className="space-y-6">
        <h1 className="text-2xl font-heading font-bold text-wisdom-text">Edit Gallery Image</h1>
        <GalleryImageForm
          id={item.id}
          defaultValues={{
            imageUrl: item.imageUrl,
            title: item.title,
            titleAm: item.titleAm,
            description: item.description,
            order: item.order,
            active: item.active,
          }}
        />
      </div>
    </DashboardShell>
  );
}
