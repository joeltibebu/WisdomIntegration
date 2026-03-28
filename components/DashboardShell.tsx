"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Badge } from "./ui/Badge";

type Role = "PARENT" | "THERAPIST" | "ADMIN";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface DashboardShellProps {
  children: React.ReactNode;
  role: Role;
  userName: string;
}

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
function DocumentIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <circle cx="12" cy="12" r="6" strokeWidth={2} />
      <circle cx="12" cy="12" r="2" strokeWidth={2} />
    </svg>
  );
}
function CogIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

const navItemsByRole: Record<Role, NavItem[]> = {
  PARENT: [
    { href: "/dashboard/parent/children", label: "My Children", icon: <UsersIcon /> },
    { href: "/dashboard/parent/appointments/book", label: "Book a Session", icon: <CalendarIcon /> },
    { href: "/dashboard/parent/appointments", label: "Appointments", icon: <CalendarIcon /> },
    { href: "/dashboard/parent/reports", label: "Reports", icon: <DocumentIcon /> },
    { href: "/dashboard/parent/messages", label: "Messages", icon: <ChatIcon /> },
  ],
  THERAPIST: [
    { href: "/dashboard/therapist/caseload", label: "My Caseload", icon: <UsersIcon /> },
    { href: "/dashboard/therapist/schedule", label: "Schedule", icon: <CalendarIcon /> },
    { href: "/dashboard/therapist/notes", label: "Session Notes", icon: <DocumentIcon /> },
    { href: "/dashboard/therapist/goals", label: "Goals", icon: <TargetIcon /> },
  ],
  ADMIN: [
    { href: "/dashboard/admin/users", label: "Users", icon: <UsersIcon /> },
    { href: "/dashboard/admin/bookings", label: "Bookings", icon: <CalendarIcon /> },
    { href: "/dashboard/admin/services", label: "Services", icon: <CogIcon /> },
    { href: "/dashboard/admin/content", label: "Content", icon: <DocumentIcon /> },
    { href: "/dashboard/admin/analytics", label: "Analytics", icon: <ChartIcon /> },
  ],
};

const roleBadgeVariant: Record<Role, "blue" | "green" | "orange"> = {
  PARENT: "green",
  THERAPIST: "blue",
  ADMIN: "orange",
};

const roleLabel: Record<Role, string> = {
  PARENT: "Parent",
  THERAPIST: "Therapist",
  ADMIN: "Admin",
};

export function DashboardShell({ children, role, userName }: DashboardShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = navItemsByRole[role];

  const SidebarContent = () => (
    <nav aria-label="Dashboard navigation" className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-wisdom-border">
        <Link
          href="/"
          className="text-wisdom-blue font-heading font-bold text-lg focus:outline-none focus:ring-2 focus:ring-wisdom-blue rounded"
        >
          Wisdom Integration
        </Link>
      </div>

      {/* Nav items */}
      <ul className="flex-1 px-3 py-4 space-y-1 list-none overflow-y-auto" role="list">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px]",
                  "focus:outline-none focus:ring-2 focus:ring-wisdom-blue",
                  isActive
                    ? "bg-blue-50 text-wisdom-blue"
                    : "text-wisdom-text hover:bg-gray-100 hover:text-wisdom-blue",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Home link */}
      <div className="px-3 py-4 border-t border-wisdom-border">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-wisdom-muted hover:text-wisdom-text hover:bg-gray-100 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-wisdom-blue"
        >
          <HomeIcon />
          Back to Site
        </Link>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-wisdom-bg flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-wisdom-surface border-r border-wisdom-border shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative z-10 w-64 bg-wisdom-surface flex flex-col h-full shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-wisdom-surface border-b border-wisdom-border px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sticky top-0 z-30">
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-wisdom-text hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-wisdom-blue min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Open sidebar navigation"
            onClick={() => setSidebarOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="sr-only">Open menu</span>
          </button>

          <div className="flex-1" />

          {/* User info */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-wisdom-text hidden sm:block">
              {userName}
            </span>
            <Badge variant={roleBadgeVariant[role]}>{roleLabel[role]}</Badge>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="px-3 py-2 rounded-lg text-sm font-medium text-wisdom-muted hover:text-wisdom-text hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-wisdom-blue min-h-[44px] flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Log out</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
