import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/DashboardShell";
import { ContentPostForm } from "@/components/ContentPostForm";

interface PageProps {
  params: { id: string };
}

export default async function EditContentPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/auth/login");

  const post = await prisma.contentPost.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return (
    <DashboardShell role="ADMIN" userName={session.user.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Edit Post</h1>
          <p className="text-sm text-wisdom-muted mt-1">Update the post content.</p>
        </div>
        <ContentPostForm
          postId={post.id}
          defaultValues={{
            title: post.title,
            slug: post.slug,
            body: post.body,
            published: post.published,
          }}
        />
      </div>
    </DashboardShell>
  );
}
