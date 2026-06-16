import Image from "next/image";

export default function Divider() {
  return (
    <div className="w-full object-cover py-8">
      <Image
        src="/squiggle.svg"
        width={711}
        height={29}
        alt=""
        aria-hidden="true"
        className="w-full"
      />
    </div>
  );
}
