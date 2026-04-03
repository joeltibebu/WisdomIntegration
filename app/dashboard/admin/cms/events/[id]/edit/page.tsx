export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EventForm } from "@/components/cms/EventForm";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const item = await prisma.event.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-heading font-bold text-wisdom-text">Edit Event</h1>
        <EventForm
          id={item.id}
          defaultValues={{
            title: item.title,
            titleAm: item.titleAm,
            description: item.description,
            descriptionAm: item.descriptionAm,
            date: item.date.toISOString(),
            location: item.location,
            locationAm: item.locationAm,
            imageUrl: item.imageUrl,
            active: item.active,
          }}
        />
      </div>
    </>
  );
}
