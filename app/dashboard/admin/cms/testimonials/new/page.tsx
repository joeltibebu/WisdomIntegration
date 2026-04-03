export const dynamic = "force-dynamic";
import { TestimonialForm } from "@/components/cms/TestimonialForm";

export default async function NewTestimonialPage() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-wisdom-text">Add Testimonial</h1>
        </div>
        <TestimonialForm />
      </div>
    </>
  );
}
