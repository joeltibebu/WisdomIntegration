export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { TestimonialForm } from "@/components/cms/TestimonialForm";

export default async function NewTestimonialPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Add Testimonial</h1>
        </div>
        <TestimonialForm />
      </div>
    </DashboardShell>
  );
}
