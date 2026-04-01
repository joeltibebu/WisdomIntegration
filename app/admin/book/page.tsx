import React from "react";
import { BookManager } from "@/components/admin/BookManager";

export const dynamic = "force-dynamic";

export default function AdminBookPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-3xl font-heading font-black text-slate-800 mb-2">
          Ministry Bookshelf
        </h2>
        <p className="text-slate-500 max-w-2xl text-sm leading-relaxed font-medium">
          Manage the library of publications from Brother Daniel and Sister Yenenesh. All active books will be displayed on the resources page and featured on the homepage.
        </p>
      </section>

      <BookManager />
    </div>
  );
}
