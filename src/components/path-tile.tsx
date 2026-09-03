import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function PathTile({
  href,
  image,
  label,
  description,
  className = "",
}: {
  href: string;
  image: string;
  label: string;
  description: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative block h-[240px] overflow-hidden md:h-[260px] ${className}`}
    >
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(min-width: 768px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="font-headline text-2xl text-cream">{label}</h3>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-cream transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <p className="max-w-sm font-body text-xs text-cream/80">{description}</p>
      </div>
    </Link>
  );
}
