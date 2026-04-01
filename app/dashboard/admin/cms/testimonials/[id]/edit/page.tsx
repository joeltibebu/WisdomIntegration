export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { TestimonialForm } from "@/components/cms/TestimonialForm";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  const item = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
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
    </DashboardShell>
  );
}
