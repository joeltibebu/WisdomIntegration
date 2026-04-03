import Image from "next/image";

interface VideoCardProps {
  title: string;
  description: string;
  thumbnail_url?: string | null;
  video_url: string;
  category: string;
  is_featured: boolean;
}

export function VideoCard({
  title,
  description,
  thumbnail_url,
  video_url,
  category,
  is_featured,
}: VideoCardProps) {
  return (
    <div
      data-testid="video-card"
      className="group relative bg-white dark:bg-white/5 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {is_featured && (
        <div
          data-testid="featured-ribbon"
          className="absolute top-5 right-[-28px] z-20 bg-wisdom-blue text-white text-[10px] font-black uppercase tracking-widest px-10 py-1 rotate-45 shadow-md"
          aria-label="Featured"
        >
          Featured
        </div>
      )}

      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-white/5">
        {thumbnail_url && (
          <Image
            src={thumbnail_url}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}

        <a
          href={video_url}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="play-button"
          aria-label={`Play video: ${title}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-14 h-14 rounded-full bg-wisdom-blue/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-6 h-6 ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M4.5 3.5v13L16.5 10l-12-6.5z" />
            </svg>
          </div>
        </a>
      </div>

      <div className="p-8">
        <div className="mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-wisdom-muted">
            Video
          </span>
        </div>

        <h3 className="font-heading font-extrabold text-xl text-wisdom-text mb-3 group-hover:text-wisdom-blue transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-wisdom-muted leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
