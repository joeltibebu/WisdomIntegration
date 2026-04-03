export const dynamic = "force-dynamic";
import { BookForm } from "@/components/cms/BookForm";

export default async function NewBookPage() {
  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-heading font-bold text-wisdom-text">Add Book</h1>
        <BookForm />
      </div>
    </>
  );
}
