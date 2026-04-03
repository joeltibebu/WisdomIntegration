export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { PageBlockImageEditor } from "@/components/cms/PageBlockImageEditor";

export default async function ImagesAdminPage() {
  const [aboutBlocks, posts] = await Promise.all([
    prisma.pageBlock.findMany({
      where: { page: "about" },
      orderBy: { order: "asc" },
    }),
    prisma.contentPost.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const imageBlocks = aboutBlocks.filter((b) => b.imageUrl != null || b.section.startsWith("story"));

  return (
    <>
      <div className="space-y-10">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Image Manager</h1>
          <p className="text-sm text-wisdom-muted mt-1">Update images used across the public website.</p>
        </div>

        {/* About Page Images */}
        <section>
          <h2 className="font-heading font-semibold text-lg text-wisdom-text mb-4 pb-2 border-b border-wisdom-border">
            About Page Images
          </h2>
          <div className="space-y-4">
            {imageBlocks.length > 0 ? imageBlocks.map((block) => (
              <PageBlockImageEditor
                key={block.id}
                id={block.id}
                label={block.title ?? block.section}
                currentImageUrl={block.imageUrl ?? ""}
              />
            )) : (
              <p className="text-sm text-wisdom-muted">No about page image blocks found. Run the seed script first.</p>
            )}
          </div>
        </section>

        {/* Blog Post Featured Images */}
        <section>
          <h2 className="font-heading font-semibold text-lg text-wisdom-text mb-4 pb-2 border-b border-wisdom-border">
            Blog Post Featured Images
          </h2>
          <div className="space-y-4">
            {posts.length > 0 ? posts.map((post) => (
              <PageBlockImageEditor
                key={post.id}
                id={post.id}
                label={post.title}
                currentImageUrl={(post as { imageUrl?: string | null }).imageUrl ?? ""}
                endpoint="/api/admin/content"
                method="PUT"
                fieldName="imageUrl"
                extraFields={{ id: post.id, title: post.title, slug: post.slug, body: post.body, published: post.published }}
              />
            )) : (
              <p className="text-sm text-wisdom-muted">No blog posts yet.</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
