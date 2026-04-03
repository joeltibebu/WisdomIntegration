export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable, Column } from "@/components/ui/DataTable";
import { TogglePublishButton } from "@/components/TogglePublishButton";

type PostRow = {
  id: string;
  title: string;
  published: boolean;
  publishedAt: string | null;
};

const columns: Column<PostRow>[] = [
  { key: "title", header: "Title", sortable: true },
  {
    key: "published",
    header: "Status",
    render: (row) =>
      row.published ? (
        <Badge variant="green">Published</Badge>
      ) : (
        <Badge variant="gray">Draft</Badge>
      ),
  },
  {
    key: "publishedAt",
    header: "Published Date",
    sortable: true,
    render: (row) =>
      row.publishedAt
        ? new Date(row.publishedAt).toLocaleDateString("en-US", { dateStyle: "medium" })
        : "—",
  },
  {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <span className="inline-flex items-center gap-3 flex-wrap">
        <Link
          href={`/dashboard/admin/content/${row.id}/edit`}
          className="text-sm font-medium text-wisdom-blue hover:underline focus:outline-none focus:ring-2 focus:ring-wisdom-blue rounded"
        >
          Edit
        </Link>
        <TogglePublishButton postId={row.id} currentPublished={row.published} postTitle={row.title} />
      </span>
    ),
  },
];

export default async function AdminContentPage() {
  const posts = await prisma.contentPost.findMany({ orderBy: { createdAt: "desc" } });

  type DbPost = { id: string; title: string; published: boolean; publishedAt: Date | null };
  const rows: PostRow[] = (posts as DbPost[]).map((p) => ({
    id: p.id,
    title: p.title,
    published: p.published,
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
  }));

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-heading font-bold text-wisdom-text">Content</h1>
            <p className="text-sm text-wisdom-muted mt-1">
              Manage blog posts and resources.
            </p>
          </div>
          <Link href="/dashboard/admin/content/new">
            <Button variant="primary">+ New Post</Button>
          </Link>
        </div>

        <DataTable<PostRow>
          columns={columns}
          data={rows}
          caption="All content posts"
          getRowKey={(row) => row.id}
          emptyMessage="No posts found."
        />
      </div>
    </>
  );
}
