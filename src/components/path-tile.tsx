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
      className={`group relative block h-[420px] overflow-hidden ${className}`}
    >
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(min-width: 768px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-headline text-3xl text-cream">{label}</h3>
          <ArrowUpRight className="h-6 w-6 shrink-0 text-cream transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <p className="max-w-sm font-body text-sm text-cream/80">{description}</p>
      </div>
    </Link>
  );
}
