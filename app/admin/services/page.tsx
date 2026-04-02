import React from "react";
import { ServiceManager } from "@/components/admin/ServiceManager";

export const dynamic = "force-dynamic";

export default function AdminServicesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-3xl font-heading font-black text-slate-800 mb-2">
          Services
        </h2>
        <p className="text-slate-500 max-w-2xl text-sm leading-relaxed font-medium">
          Manage the services displayed on the public Services page. Add, edit, or deactivate services — changes reflect immediately on the site.
        </p>
      </section>

      <ServiceManager />
    </div>
  );
}
