export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { DashboardShell } from "@/components/DashboardShell";
import { ContentPostForm } from "@/components/ContentPostForm";

export default async function NewContentPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">New Post</h1>
          <p className="text-sm text-wisdom-muted mt-1">Create a new blog post or resource.</p>
        </div>
        <ContentPostForm />
      </div>
    </DashboardShell>
  );
}

