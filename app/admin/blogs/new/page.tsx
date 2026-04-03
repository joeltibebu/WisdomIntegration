import { BlogPostForm } from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-heading font-black text-slate-800 mb-2">New Post</h2>
        <p className="text-slate-500 text-sm">Create a new blog post, devotional, or guide.</p>
      </div>
      <BlogPostForm />
    </div>
  );
}
