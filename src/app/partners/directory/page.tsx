"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Search,
  Heart,
  Share2,
  Building2,
  MapPin,
  Truck,
  Scale,
  Building,
  ExternalLink,
  Users,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";

const PARTNER_DATA = [
  {
    id: "p1",
    name: "DHL Global",
    type: "Logistics",
    location: "Bonn, DE",
    logo: "/images/logos/dhl.svg",
    listings: 14,
    likes: 245,
    description: "Global leader in express shipping and logistics services across 220+ countries.",
  },
  {
    id: "p2",
    name: "AXA Insurance",
    type: "Insurance",
    location: "Paris, FR",
    logo: "/images/logos/axa.svg",
    listings: 4,
    likes: 128,
    description: "Providing innovative insurance instruments specifically designed for articulated professionals.",
  },
  {
    id: "p3",
    name: "Scania Group",
    type: "Manufacturer",
    location: "Sodertalje, SE",
    logo: undefined,
    listings: 8,
    likes: 312,
    description: "World-leading provider of transport solutions, including trucks and buses for heavy transport.",
  },
  {
    id: "p4",
    name: "Maersk Line",
    type: "Logistics",
    location: "Copenhagen, DK",
    logo: "/images/logos/maersk.svg",
    listings: 22,
    likes: 410,
    description: "Integrated container logistics company and the largest container ship operator in the world.",
  },
  {
    id: "p5",
    name: "EU Logistics Council",
    type: "Institutional",
    location: "Brussels, BE",
    logo: undefined,
    listings: 0,
    likes: 89,
    description: "Strategic body facilitating cross-border logistics standards and professional mobility in Europe.",
  },
  {
    id: "p6",
    name: "Volvo Trucks",
    type: "Manufacturer",
    location: "Gothenburg, SE",
    logo: "/images/logos/volvo.svg",
    listings: 12,
    likes: 275,
    description: "Driving progress through high-quality, safe and environmentally friendly articulated vehicles.",
  },
];

const typeIcon: Record<string, typeof Truck> = {
  Logistics: Truck,
  Insurance: Scale,
  Manufacturer: Truck,
  Institutional: Building,
};

export default function PartnerDirectoryPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [likedPartners, setLikedPartners] = useState<Set<string>>(new Set());

  const categories = ["All", "Logistics", "Insurance", "Manufacturer", "Institutional"];

  const filteredPartners = PARTNER_DATA.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || p.type === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleLike = (id: string) => {
    const newLiked = new Set(likedPartners);
    if (newLiked.has(id)) newLiked.delete(id);
    else newLiked.add(id);
    setLikedPartners(newLiked);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-grow px-6 py-16 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 font-body text-xs font-bold uppercase tracking-[0.35em] text-primary">
                Verified Network
              </p>
              <h1 className="font-headline text-4xl text-ink md:text-6xl">Partner Network Directory</h1>
            </div>
            <p className="max-w-sm font-body text-sm text-muted-foreground">
              Explore the institutions, fleets, and manufacturers driving the future of articulated logistics.
            </p>
          </div>

          {/* Controls */}
          <div className="mb-10 flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search by institution name or location..."
                className="h-12 w-full border border-border bg-card pl-11 pr-4 font-body text-sm outline-none focus:border-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "h-12 border px-6 font-body text-xs font-bold uppercase tracking-widest transition-colors",
                    filter === cat
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary hover:text-ink"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <SectionLabel>{filteredPartners.length} Verified Institutions</SectionLabel>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPartners.map((partner, i) => {
              const TypeIcon = typeIcon[partner.type] ?? Building;
              return (
                <Reveal key={partner.id} delay={i * 60}>
                  <div className="flex h-full flex-col border border-border bg-card p-6">
                    <div className="mb-5 flex items-start justify-between">
                      {partner.logo ? (
                        <Image src={partner.logo} alt={partner.name} width={80} height={30} className="h-8 w-auto object-contain" />
                      ) : (
                        <span className="font-headline text-lg text-ink">{partner.name}</span>
                      )}
                      <span className="flex items-center gap-1 font-body text-[10px] font-bold uppercase tracking-widest text-accent">
                        <TypeIcon className="h-3 w-3" /> {partner.type}
                      </span>
                    </div>
                    <h3 className="mb-1 font-headline text-lg text-ink">{partner.name}</h3>
                    <p className="mb-4 flex items-center gap-1.5 font-body text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {partner.location}
                    </p>
                    <p className="mb-6 font-body text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {partner.description}
                    </p>
                    <div className="mb-6 mt-auto grid grid-cols-2 border-y border-border py-4">
                      <div className="text-center">
                        <p className="font-headline text-xl text-ink">{partner.listings}</p>
                        <p className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Listings</p>
                      </div>
                      <div className="border-l border-border text-center">
                        <p className="font-headline text-xl text-ink">
                          {partner.likes + (likedPartners.has(partner.id) ? 1 : 0)}
                        </p>
                        <p className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Network Score</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleLike(partner.id)}
                        className={cn(
                          "flex flex-1 items-center justify-center gap-2 border py-2.5 font-body text-xs font-bold uppercase tracking-widest transition-colors",
                          likedPartners.has(partner.id)
                            ? "border-accent text-accent"
                            : "border-border text-muted-foreground hover:border-primary hover:text-ink"
                        )}
                      >
                        <Heart className={cn("h-3.5 w-3.5", likedPartners.has(partner.id) && "fill-current")} /> Like
                      </button>
                      <button className="flex flex-1 items-center justify-center gap-2 border border-border py-2.5 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-ink">
                        <Share2 className="h-3.5 w-3.5" /> Share
                      </button>
                      <button className="flex items-center justify-center border border-primary px-3 text-primary transition-colors hover:bg-primary hover:text-primary-foreground" title="View Profile">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {filteredPartners.length === 0 && (
            <div className="border border-border bg-card py-20 text-center">
              <Building2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
              <h3 className="font-headline text-2xl text-ink">No partners found</h3>
              <p className="mt-2 font-body text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
              <button
                className="mt-6 font-body text-sm font-bold text-primary hover:underline"
                onClick={() => {
                  setSearch("");
                  setFilter("All");
                }}
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Ecosystem CTA */}
          <div className="mt-6 flex flex-col items-center justify-between gap-8 bg-ink p-12 text-center lg:flex-row lg:text-left">
            <div>
              <h2 className="font-headline text-3xl text-cream">Connect Your Institution</h2>
              <p className="mt-3 max-w-xl font-body text-sm text-cream/60">
                Whether you&apos;re an employer, insurer, or equipment provider, the PADTI Partner Network is your
                gateway to global logistics excellence.
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
              <button className="bg-sage px-8 py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
                Integration API
              </button>
              <Link
                href="/auth/signup?role=employer"
                className="border border-cream/40 px-8 py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
              >
                Contact Network Lead
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
