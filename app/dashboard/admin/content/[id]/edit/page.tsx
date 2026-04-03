export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ContentPostForm } from "@/components/ContentPostForm";

interface PageProps {
  params: { id: string };
}

export default async function EditContentPage({ params }: PageProps) {
  const post = await prisma.contentPost.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return (
    <>
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
            imageUrl: post.imageUrl,
            published: post.published,
          }}
        />
      </div>
    </>
  );
}
