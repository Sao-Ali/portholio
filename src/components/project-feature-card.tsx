import Image from "next/image";
import Link from "next/link";

type ProjectFeatureCardProps = {
  href: string;
  title: string;
  description: string;
  thumbnailUrl: string;
};

export default function ProjectFeatureCard({
  href,
  title,
  description,
  thumbnailUrl,
}: ProjectFeatureCardProps) {
  const card = (
    <article className="group flex items-center gap-4 border-b border-neutral-200 py-4">
      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-green-faded-xl sm:h-24 sm:w-36">
        <Image
          src={thumbnailUrl}
          fill
          sizes="(max-width: 640px) 112px, 144px"
          unoptimized={thumbnailUrl.endsWith(".gif")}
          className={thumbnailUrl.endsWith(".gif") ? "object-contain p-2" : "object-cover"}
          alt={`${title} preview`}
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3>{title}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-5 text-gray">
          {description}
        </p>
      </div>
      <span className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true">
        &rarr;
      </span>
    </article>
  );

  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer">{card}</a>
  ) : (
    <Link href={href}>{card}</Link>
  );
}
