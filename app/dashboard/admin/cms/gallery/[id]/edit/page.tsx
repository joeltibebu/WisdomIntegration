export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { GalleryImageForm } from "@/components/cms/GalleryImageForm";

export default async function EditGalleryImagePage({ params }: { params: { id: string } }) {
  const item = await prisma.galleryImage.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <>
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
    </>
  );
}
