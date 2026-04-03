export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BookForm } from "@/components/cms/BookForm";

export default async function EditBookPage({ params }: { params: { id: string } }) {
  const item = await prisma.book.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-heading font-bold text-wisdom-text">Edit Book</h1>
        <BookForm
          id={item.id}
          defaultValues={{
            title: item.title,
            titleAm: item.titleAm,
            author: item.author,
            description: item.description,
            descriptionAm: item.descriptionAm,
            coverImageUrl: item.coverImageUrl,
            purchaseLink: item.purchaseLink,
            active: item.active,
          }}
        />
      </div>
    </>
  );
}
