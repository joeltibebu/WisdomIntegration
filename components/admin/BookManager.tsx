"use client";

import React, { useState, useEffect } from "react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Image from "next/image";

interface Book {
  id: string;
  title: string;
  titleAm: string;
  author: string;
  description: string;
  descriptionAm: string;
  coverImageUrl: string;
  purchaseLink: string | null;
  active: boolean;
}

export function BookManager() {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Partial<Book> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/admin/books");
      const result = await res.json();
      if (result.data) setBooks(result.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingBook) return;
    setSaving(true);
    setMessage(null);
    try {
      const method = editingBook.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/books", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBook),
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error);
      
      setMessage({ type: "success", text: "Book saved successfully!" });
      setEditingBook(null);
      fetchBooks();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessage({ type: "error", text: "Error: " + msg });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await fetch(`/api/admin/books?id=${id}`, { method: "DELETE" });
      fetchBooks();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading) return <div className="p-8 text-slate-500 font-bold">Loading bookshelf...</div>;

  return (
    <div className="space-y-10">
      {message && (
        <div className={`p-4 rounded-xl border ${
          message.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
        } font-bold text-sm shadow-sm`}>
          {message.text}
        </div>
      )}

      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-heading font-black text-slate-800 uppercase tracking-tight">Wisdom Bookshelf</h3>
        <Button 
          onClick={() => setEditingBook({ title: "", titleAm: "", author: "Daniel Takele", description: "", descriptionAm: "", coverImageUrl: "/images/book-cover.png", active: true })}
          className="bg-wisdom-orange rounded-full px-6 font-bold"
        >
          Add New Publication
        </Button>
      </div>

      {/* Editor Modal / Inline Form */}
      {editingBook && (
        <Card className="p-8 border-wisdom-orange/20 shadow-xl ring-4 ring-wisdom-orange/5">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-heading font-black text-lg text-wisdom-orange uppercase">
              {editingBook.id ? "Update Book" : "Register Publication"}
            </h4>
            <button onClick={() => setEditingBook(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xs uppercase">Cancel</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField id="title" label="Main Title (English)" value={editingBook.title || ""} onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })} />
            <FormField id="titleAm" label="Main Title (Amharic)" value={editingBook.titleAm || ""} onChange={(e) => setEditingBook({ ...editingBook, titleAm: e.target.value })} className="font-amharic" />
            <FormField id="author" label="Author / Writer" value={editingBook.author || ""} onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })} />
            <FormField id="cover" label="Cover Image URL" value={editingBook.coverImageUrl || ""} onChange={(e) => setEditingBook({ ...editingBook, coverImageUrl: e.target.value })} />
            
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField id="description" label="Abstract / Summary (EN)" value={editingBook.description || ""} onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })} fieldType="textarea" rows={3} />
              <FormField id="descriptionAm" label="Abstract / Summary (AM)" value={editingBook.descriptionAm || ""} onChange={(e) => setEditingBook({ ...editingBook, descriptionAm: e.target.value })} fieldType="textarea" rows={3} className="font-amharic" />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={handleSave} disabled={saving} className="bg-wisdom-orange px-10 rounded-full font-black uppercase text-xs">
              {saving ? "Processing..." : "Commit Publication"}
            </Button>
          </div>
        </Card>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
        {books.length === 0 && !editingBook && (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No publications found. Add the first book to the ministry bookshelf.</p>
          </div>
        )}
        {books.map((book) => (
          <Card key={book.id} className="p-0 border-slate-100 hover:border-wisdom-orange/30 transition-all group overflow-hidden flex shadow-sm hover:shadow-xl">
             {/* Thumbnail */}
             <div className="w-1/3 relative bg-slate-100 border-r border-slate-50">
               <Image 
                 src={book.coverImageUrl || "/images/book-cover.png"}
                 alt={book.title}
                 fill
                 className="object-cover group-hover:scale-105 transition-transform duration-700"
               />
             </div>
             {/* Content */}
             <div className="w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.1em] text-wisdom-orange">{book.author}</span>
                    <span className={`w-2 h-2 rounded-full ${book.active ? "bg-wisdom-green" : "bg-slate-300"}`} />
                  </div>
                  <h4 className="font-heading font-bold text-slate-800 leading-tight mb-1 group-hover:text-wisdom-orange transition-colors">{book.title}</h4>
                  <p className="font-amharic text-slate-400 text-sm opacity-75">{book.titleAm}</p>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button onClick={() => setEditingBook(book)} variant="outline" className="flex-1 rounded-full text-[10px] font-black uppercase border-slate-200 text-slate-500 hover:bg-slate-50">Edit</Button>
                  <Button onClick={() => handleDelete(book.id)} variant="outline" className="px-3 rounded-full text-red-300 border-slate-200 hover:bg-red-50 hover:border-red-100">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </Button>
                </div>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
