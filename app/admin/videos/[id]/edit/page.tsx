import { notFound } from "next/navigation";
import { VideoForm } from "@/components/admin/VideoForm";
import { prisma } from "@/lib/prisma";

interface EditVideoPageProps {
  params: { id: string };
}

export default async function EditVideoPage({ params }: EditVideoPageProps) {
  const video = await prisma.video.findUnique({ where: { id: params.id } });

  if (!video) {
    notFound();
  }

  const defaultValues = {
    title: video.title,
    slug: video.slug,
    description: video.description,
    thumbnail_url: video.thumbnail_url,
    video_url: video.video_url,
    category: video.category,
    is_featured: video.is_featured,
    is_published: video.is_published,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-heading font-black text-slate-800 mb-2">Edit Video</h2>
        <p className="text-slate-500 text-sm">Update the video details.</p>
      </div>
      <VideoForm videoId={video.id} defaultValues={defaultValues} />
    </div>
  );
}
