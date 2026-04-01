import React from "react";
import { EventManager } from "@/components/admin/EventManager";

export const dynamic = "force-dynamic";

export default function AdminEventsPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-3xl font-heading font-black text-slate-800 mb-2">
          Events & Workshops
        </h2>
        <p className="text-slate-500 max-w-2xl text-sm leading-relaxed font-medium">
          Manage the schedule for community outreach, parent workshops, and developmental integration seminars. Scheduled events will appear on the programs page.
        </p>
      </section>

      <EventManager />
    </div>
  );
}
