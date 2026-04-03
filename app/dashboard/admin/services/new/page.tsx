export const dynamic = "force-dynamic";
import { ServiceForm } from "@/components/ServiceForm";

export default async function NewServicePage() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Add Service</h1>
          <p className="text-sm text-wisdom-muted mt-1">Create a new service offering.</p>
        </div>
        <ServiceForm />
      </div>
    </>
  );
}
