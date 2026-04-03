export const dynamic = "force-dynamic";
import { GalleryImageForm } from "@/components/cms/GalleryImageForm";

export default async function NewGalleryImagePage() {
  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-heading font-bold text-wisdom-text">Add Gallery Image</h1>
        <GalleryImageForm />
      </div>
    </>
  );
}
