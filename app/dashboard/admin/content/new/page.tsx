export const dynamic = "force-dynamic";
import { ContentPostForm } from "@/components/ContentPostForm";

export default async function NewContentPage() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">New Post</h1>
          <p className="text-sm text-wisdom-muted mt-1">Create a new blog post or resource.</p>
        </div>
        <ContentPostForm />
      </div>
    </>
  );
}
