import Image from "next/image";
import Link from "next/link";

type SiteHeaderProps = {
  compact?: boolean;
};

export default function SiteHeader({ compact = false }: SiteHeaderProps) {
  const size = compact ? 42 : 88;

  return (
    <div className={compact ? "flex justify-center" : "mb-8 flex justify-center"}>
      <Link
        href="/"
        aria-label="Ali Sao home"
        className="block transition-transform duration-200 hover:scale-105"
      >
        <Image
          src="/header.png"
          width={size}
          height={size}
          alt="Ali Sao"
          priority={!compact}
          className="h-auto w-auto object-contain"
        />
      </Link>
    </div>
  );
}
