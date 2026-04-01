import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Security Guard: Only ADMIN role can access /admin/*
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-body">
      {/* Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full">
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <h1 className="text-xl font-heading font-bold text-slate-800">
            Wisdom Command Center
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500">
              Logged in as: <span className="text-wisdom-blue font-bold">{session.user.name}</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-wisdom-blue text-white flex items-center justify-center font-bold text-xs">
              {session.user.name?.[0] || 'A'}
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
