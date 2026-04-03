export const dynamic = "force-dynamic";
import { EventForm } from "@/components/cms/EventForm";

export default async function NewEventPage() {
  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-heading font-bold text-wisdom-text">New Event</h1>
        <EventForm />
      </div>
    </>
  );
}
