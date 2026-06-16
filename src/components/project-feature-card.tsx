import Image from "next/image";
import Link from "next/link";

type ProjectFeatureCardProps = {
  href: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  latest?: boolean;
};

function Arrow() {
  return (
    <Image
      src="/read-me-arrow.svg"
      width={27}
      height={14}
      alt=""
      aria-hidden="true"
    />
  );
}

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
  const card = (
      <div className="hover:bg-green-faded-xl group flex flex-col gap-3 rounded-md border-2 border-green-faded bg-off-white p-2 hover:border-green md:flex-row">
        <div className="relative h-[200px] w-full overflow-hidden rounded-md bg-green-faded-xl md:h-[160px] md:w-[240px]">
          <Image
            src={thumbnailUrl}
            fill
            sizes="(max-width: 768px) 100vw, 240px"
            unoptimized={isAnimatedThumbnail}
            className={`h-[200px] w-full transform rounded-md transition-transform duration-300 group-hover:scale-[1.04] md:h-[160px] ${
              isAnimatedThumbnail ? "object-contain p-2" : "object-cover"
            }`}
            alt={`${title} thumbnail`}
          />
        </div>
        <div className="relative flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="relative">
              <strong>{title} </strong>
              {latest && <span className="text-red text-[14px]">(NEW)</span>}
            </h3>
            <p className="text-gray">{description}</p>
          </div>
          <div className="absolute bottom-0 right-0 opacity-0 transition-opacity group-hover:opacity-100">
            <Arrow />
          </div>
        </div>
      </div>
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
