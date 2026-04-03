import { VideoForm } from "@/components/admin/VideoForm";

export default function NewVideoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-heading font-black text-slate-800 mb-2">New Video</h2>
        <p className="text-slate-500 text-sm">Add a new video to the content hub.</p>
      </div>
      <VideoForm />
    </div>
  );
}
