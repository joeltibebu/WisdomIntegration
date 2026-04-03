import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

interface EditBlogPostPageProps {
  params: { id: string };
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const post = await prisma.contentPost.findUnique({ where: { id: params.id } });

  if (!post) {
    redirect("/admin/blogs");
  }

  const defaultValues = {
    title: post.title,
    slug: post.slug,
    body: post.body,
    excerpt: post.excerpt,
    featured_image: post.featured_image,
    content_type: post.content_type,
    category: post.category,
    is_published: post.published,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-heading font-black text-slate-800 mb-2">Edit Post</h2>
        <p className="text-slate-500 text-sm">Update the blog post, devotional, or guide.</p>
      </div>
      <BlogPostForm postId={post.id} defaultValues={defaultValues} />
    </div>
  );
}
