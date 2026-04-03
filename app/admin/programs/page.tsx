import React from "react";
import { ProgramManager } from "@/components/admin/ProgramManager";

export const dynamic = "force-dynamic";

export default function AdminProgramsPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-3xl font-heading font-black text-slate-800 mb-2">
          Programs
        </h2>
        <p className="text-slate-500 max-w-2xl text-sm leading-relaxed font-medium">
          Manage the programs displayed on the public Programs page. Add, edit, or reorder programs — changes reflect immediately on the site.
        </p>
      </section>

      <ProgramManager />
    </div>
  );
}
