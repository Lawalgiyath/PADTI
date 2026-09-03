"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Globe,
  ShieldCheck,
  Users,
  Briefcase,
  Scale,
  Truck,
  Building,
  Building2,
  Network,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useUser } from "@/firebase";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { PathTile } from "@/components/path-tile";
import { SectionLabel } from "@/components/section-label";

const stats = [
  { icon: Users, val: "25,000+", label: "Verified Drivers" },
  { icon: Globe, val: "15+", label: "Countries Served" },
  { icon: Briefcase, val: "850+", label: "Active Job Listings" },
  { icon: ShieldCheck, val: "100%", label: "Secure Verification" },
];

const insights = [
  {
    tag: "Global Career Mobility",
    quote:
      "Articulated truck driving is a high-demand global skill. Institutional-grade certification is the primary key to unlocking lucrative international logistics careers.",
    source: "Industry Talent Outlook",
  },
  {
    tag: "The Global Shortage",
    quote:
      "The global shortage of truck drivers is set to double by 2028. High-quality training and institutional certification is how the gap in the supply chain closes.",
    source: "IRU Global Driver Shortage Report",
  },
  {
    tag: "NATEP Alignment",
    quote:
      "Nigeria's National Talent Export Programme aims to position Nigeria as a global talent hub. PADTI trains world-class drivers for that marketplace.",
    source: "Strategic Alignment",
  },
];

const partners = ["DHL Global", "Maersk", "AXA Insurance", "Scania", "FRSC", "NATEP"];

function PartnerMenu({ label, glowIcon = false, roundRight = false }: { label: string; glowIcon?: boolean; roundRight?: boolean }) {
  return (
    <div className="group/glow relative inline-flex">
      {glowIcon && (
        <Network
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 scale-75 text-accent opacity-0 transition-all duration-500 ease-out group-hover/glow:translate-y-[145%] group-hover/glow:scale-100 group-hover/glow:opacity-100 group-hover/glow:drop-shadow-[0_0_10px_hsl(var(--accent))]"
          aria-hidden
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`relative z-10 border border-cream/40 bg-transparent px-8 py-3.5 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink ${
              roundRight ? "rounded-r-full" : ""
            }`}
          >
            {label}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-64 rounded-none border-border p-2">
        <DropdownMenuItem asChild>
          <Link href="/auth/signup-partner?role=employer" className="flex cursor-pointer items-center gap-2 py-3">
            <Building2 className="h-4 w-4 text-primary" /> <span>Employer &amp; Fleet</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/auth/signup-partner?role=insurer" className="flex cursor-pointer items-center gap-2 py-3">
            <Scale className="h-4 w-4 text-primary" /> <span>Insurance Provider</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/auth/signup-partner?role=manufacturer" className="flex cursor-pointer items-center gap-2 py-3">
            <Truck className="h-4 w-4 text-primary" /> <span>Equipment Manufacturer</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/auth/signup-partner?role=institution" className="flex cursor-pointer items-center gap-2 py-3">
            <Building className="h-4 w-4 text-primary" /> <span>Institutional Partner</span>
          </Link>
        </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function Home() {
  const { user } = useUser();
  const driverPath = user ? "/programs" : "/auth/signup";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar transparentOnTop />

      <main className="flex-grow">
        {/* Hero — minimal, one focal photo, one action */}
        <section className="relative flex min-h-[92vh] flex-col justify-end">
          <HeroSlideshow />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/10" />

          <p className="relative z-10 px-6 pt-28 font-body text-xs font-bold uppercase tracking-[0.35em] text-cream/80 md:px-16">
            Professional. Verified. Global.
          </p>

          <div className="relative z-10 px-6 pb-16 pt-6 md:px-16">
            <h1 className="max-w-3xl font-headline text-5xl leading-[1.05] text-cream md:text-7xl">
              Train for excellence.
              <br />
              <span className="italic text-cream/90">Partner for growth.</span>
            </h1>
            <p className="mt-6 max-w-lg font-body text-base text-cream/70 md:text-lg">
              PADTI Connect bridges elite driver training and the global logistics ecosystem.
            </p>
            <div className="mt-9 flex flex-wrap items-center">
              <Link
                href={driverPath}
                className="group inline-flex items-center gap-2 rounded-l-full bg-sage py-4 pl-8 pr-7 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark"
              >
                {user ? "Explore Programs" : "Start Driver Training"}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
              <PartnerMenu label="Join the Ecosystem" glowIcon roundRight />
            </div>
          </div>

          <div className="absolute bottom-6 right-6 z-10 hidden border border-cream/25 bg-ink/40 px-5 py-3 backdrop-blur-sm sm:block">
            <p className="font-body text-[11px] font-bold uppercase tracking-widest text-cream/60">FRSC-Compliant Training</p>
            <p className="font-headline text-lg text-cream">NATEP-Aligned Certification</p>
          </div>
        </section>

        {/* Choose your path — asymmetric photo tiles, not floating cards */}
        <section className="bg-paper bg-background px-6 py-24 md:px-16">
          <SectionLabel>Choose Your Path</SectionLabel>
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
            <PathTile
              href={driverPath}
              image="/images/facility-visit/padti-facility-visit-01.jpeg"
              label="For Drivers"
              description="Get certified, gain real experience, and land verified roles in the global logistics economy."
            />
            <PathTile
              href="/employers"
              image="/images/planning-meeting/padti-planning-meeting-02.jpeg"
              label="For Partners"
              description="Hire verified talent, offer insurance instruments, or join as a manufacturer in our ecosystem."
            />
          </div>
        </section>

        {/* Stats */}
        <section className="bg-paper bg-secondary px-6 py-20 md:px-16">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <s.icon className="mb-4 h-6 w-6 text-sage" />
                <h3 className="font-headline text-4xl text-ink md:text-5xl">{s.val}</h3>
                <p className="mt-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Insights */}
        <section className="bg-paper bg-background px-6 py-28 md:px-16">
          <SectionLabel>Strategic Industry Insights</SectionLabel>
          <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
            {insights.map((item) => (
              <div key={item.tag} className="flex flex-col justify-between bg-background p-10">
                <div>
                  <p className="mb-6 font-body text-xs font-bold uppercase tracking-widest text-sage">{item.tag}</p>
                  <p className="font-headline text-xl italic leading-relaxed text-ink">&ldquo;{item.quote}&rdquo;</p>
                </div>
                <p className="mt-10 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  — {item.source}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section className="bg-paper bg-secondary px-6 py-16 text-center md:px-16">
          <p className="mb-10 font-body text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground">
            Institutional Partners &amp; Global Stakeholders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {partners.map((p) => (
              <span key={p} className="font-headline text-xl text-ink/70">
                {p}
              </span>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-ink px-6 py-28 text-center md:px-16">
          <h2 className="mx-auto max-w-3xl font-headline text-4xl leading-tight text-cream md:text-6xl">
            Join the future of <span className="italic">articulated logistics</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-base text-cream/60 md:text-lg">
            Enroll for elite training or register your organization to access a global network of verified talent.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={driverPath}
              className="inline-flex items-center gap-2 bg-sage px-9 py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark"
            >
              {user ? "View Courses" : "Apply for Training"}
            </Link>
            <PartnerMenu label="Become a Partner" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
