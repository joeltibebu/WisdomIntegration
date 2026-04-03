export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "@/components/cms/TestimonialForm";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const item = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Edit Testimonial</h1>
        </div>
        <TestimonialForm
          id={item.id}
          defaultValues={{
            name: item.name,
            role: item.role,
            content: item.content,
            contentAm: item.contentAm,
            imageUrl: item.imageUrl,
            order: item.order,
            active: item.active,
          }}
        />
      </div>
    </>
  );
}
