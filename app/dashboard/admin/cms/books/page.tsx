export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DeleteButton } from "@/components/cms/DeleteButton";

export default async function BooksAdminPage() {
  const items = await prisma.book.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-heading font-bold text-wisdom-text">Books</h1>
            <p className="text-sm text-wisdom-muted mt-1">Manage the bookshelf section on the homepage.</p>
          </div>
          <Link href="/dashboard/admin/cms/books/new">
            <Button variant="primary">+ Add Book</Button>
          </Link>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-wisdom-border rounded-card p-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-semibold text-wisdom-text text-sm">{item.title}</span>
                  <span className="text-xs text-wisdom-muted">by {item.author}</span>
                  <Badge variant={item.active ? "green" : "gray"}>{item.active ? "Active" : "Hidden"}</Badge>
                </div>
                <p className="text-sm text-wisdom-muted line-clamp-1">{item.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/dashboard/admin/cms/books/${item.id}/edit`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <DeleteButton
                  endpoint={`/api/admin/cms/books/${item.id}`}
                  confirmMessage={`Delete book "${item.title}"?`}
                />
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-wisdom-muted text-sm">No books yet.</p>}
        </div>
      </div>
    </>
  );
}
