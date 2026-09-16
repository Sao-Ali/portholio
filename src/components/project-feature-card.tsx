import Image from "next/image";
import Link from "next/link";

type ProjectFeatureCardProps = {
  href: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  latest?: boolean;
};

function isAnimatedImage(src: string) {
  return src.toLowerCase().endsWith(".gif");
}

export default function ProjectFeatureCard({
  href,
  title,
  description,
  thumbnailUrl,
  latest = false,
}: ProjectFeatureCardProps) {
  const isExternal = href.startsWith("http");
  const isAnimatedThumbnail = isAnimatedImage(thumbnailUrl);
  const imageClass = isAnimatedThumbnail
    ? "object-contain p-2"
    : "object-cover";

  if (latest) {
    const featuredCard = (
      <article className="group overflow-hidden rounded-lg border border-green-faded bg-off-white transition-colors hover:border-green hover:bg-green-faded-xl">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-green-faded-xl">
          <Image
            src={thumbnailUrl}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 576px"
            unoptimized={isAnimatedThumbnail}
            className={`transition-transform duration-500 group-hover:scale-[1.02] ${imageClass}`}
            alt={`${title} thumbnail`}
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-neutral-700 backdrop-blur-sm">
            Work in progress
          </span>
        </div>
        <div className="flex items-start justify-between gap-6 p-4">
          <div>
            <h3>{title}</h3>
            <p className="mt-1 text-gray">{description}</p>
          </div>
          <span className="mt-1 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true">
            &rarr;
          </span>
        </div>
      </article>
    );

    return isExternal ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {featuredCard}
      </a>
    ) : (
      <Link href={href}>{featuredCard}</Link>
    );
  }

  const card = (
      <article className="group flex items-center gap-4 border-b border-neutral-200 py-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-green-faded-xl sm:h-24 sm:w-36">
          <Image
            src={thumbnailUrl}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 112px, 144px"
            unoptimized={isAnimatedThumbnail}
            className={`transition-transform duration-300 group-hover:scale-[1.03] ${imageClass}`}
            alt={`${title} thumbnail`}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3>{title}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-5 text-gray">{description}</p>
        </div>
        <span className="shrink-0 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true">
          &rarr;
        </span>
      </article>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {card}
      </a>
    );
  }

  return (
    <Link href={href}>
      {card}
    </Link>
  );
}
