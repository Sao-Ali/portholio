import Image from "next/image";

const photos = [
  { src: "/about0.jpg", alt: "Ali Sao photo 1" },
  { src: "/about1.jpg", alt: "Ali Sao photo 2" },
  { src: "/about2.jpg", alt: "Ali Sao photo 3" },
];

export default function AboutImages() {
  return (
    <div className="mb-8 flex justify-between gap-[10px]">
      {photos.map(photo => (
        <div
          key={photo.src}
          className="relative aspect-square w-[calc(33.33%-10px)] overflow-hidden rounded-md border-2 border-green-faded bg-green-faded-xl"
        >
          <Image
            src={photo.src}
            fill
            sizes="(max-width: 768px) 30vw, 180px"
            alt={photo.alt}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
