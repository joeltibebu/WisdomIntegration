import Image from "next/image";

interface ContentCardProps {
  title: string;
  excerpt?: string | null;
  featured_image?: string | null;
  content_type: "blog" | "devotional" | "guide";
  published_at?: Date | null;
  slug: string;
}

const BADGE_LABELS: Record<ContentCardProps["content_type"], string> = {
  blog: "Blog",
  devotional: "Devotional",
  guide: "Guide",
};

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function ContentCard({
  title,
  excerpt,
  featured_image,
  content_type,
  published_at,
  slug: _slug,
}: ContentCardProps) {
  const isDevotional = content_type === "devotional";

  return (
    <div
      data-testid="content-card"
      className="group relative bg-white dark:bg-white/5 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {isDevotional && (
        <div
          data-testid="devotional-accent"
          className="absolute top-0 left-0 bottom-0 w-1 bg-wisdom-blue/20 z-10"
          aria-hidden="true"
        />
      )}

      {featured_image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={featured_image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-wisdom-muted">
            {BADGE_LABELS[content_type]}
          </span>
          {published_at && (
            <time
              dateTime={published_at.toISOString()}
              className="text-xs text-wisdom-muted font-medium"
            >
              {formatDate(published_at)}
            </time>
          )}
        </div>

        <h3 className="font-heading font-extrabold text-xl text-wisdom-text mb-3 group-hover:text-wisdom-blue transition-colors line-clamp-2">
          {title}
        </h3>

        {excerpt && (
          <p className="text-sm text-wisdom-muted leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        )}
      </div>
    </div>
  );
}
