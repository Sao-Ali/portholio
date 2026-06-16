import Image from "next/image";
import Link from "next/link";

export default function BackButton() {
  return (
    <Link href="/" className="back-button group">
      <div className="mb-12 flex items-center gap-1">
        <Image
          src="/back-arrow.svg"
          width={28}
          height={13}
          alt=""
          aria-hidden="true"
          className="group-hover:wiggle"
        />
        back home
      </div>
    </Link>
  );
}
