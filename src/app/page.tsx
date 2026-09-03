"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  ArrowRight,
  Globe,
  ShieldCheck,
  Users,
  Briefcase,
  GraduationCap,
  Handshake,
  Scale,
  Truck,
  Building,
  Building2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useUser } from "@/firebase";
import { TruckExperience } from "@/components/experience/truck-experience";
import { KineticText } from "@/components/experience/kinetic-text";
import { StatCounter } from "@/components/experience/stat-counter";

const stats = [
  { icon: Users, value: 25000, suffix: "+", label: "Verified Drivers" },
  { icon: Globe, value: 15, suffix: "+", label: "Countries Served" },
  { icon: Briefcase, value: 850, suffix: "+", label: "Active Job Listings" },
  { icon: ShieldCheck, value: 100, suffix: "%", label: "Secure Verification" },
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
      "The global shortage of truck drivers is set to double by 2028 — high-quality training and institutional certification is how the gap in the supply chain closes.",
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

function PartnerDropdown({ label, onLight = false }: { label: string; onLight?: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          data-cursor-hover
          className={
            onLight
              ? "group inline-flex items-center gap-3 border border-asphalt/30 bg-transparent px-8 py-4 font-body text-sm font-bold uppercase tracking-widest text-asphalt transition-colors hover:border-asphalt hover:bg-asphalt hover:text-bone"
              : "group inline-flex items-center gap-3 border border-border bg-transparent px-8 py-4 font-body text-sm font-bold uppercase tracking-widest text-bone transition-colors hover:border-primary hover:text-primary"
          }
        >
          {label}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-64 rounded-none border-border bg-card p-2">
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
  );
}

export default function Home() {
  const { user } = useUser();
  const driverPath = user ? "/programs" : "/auth/signup";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-grow">
        <TruckExperience ctaHref={driverPath} ctaLabel={user ? "Explore Training Programs" : "Start Driver Training"} />

        {/* Dual path split */}
        <section className="grid grid-cols-1 border-b border-border md:grid-cols-2">
          <Link
            href={driverPath}
            data-cursor-hover
            className="group relative flex min-h-[50vh] flex-col justify-end overflow-hidden border-b border-border bg-card p-10 transition-colors hover:bg-secondary md:min-h-[60vh] md:border-b-0 md:border-r"
          >
            <GraduationCap className="mb-8 h-10 w-10 text-primary" />
            <h3 className="font-headline text-4xl text-bone md:text-5xl">FOR DRIVERS</h3>
            <p className="mt-4 max-w-sm font-body text-muted-foreground">
              Get certified, gain real experience, and land verified roles in the global logistics economy.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-body text-sm font-bold uppercase tracking-widest text-primary">
              {user ? "Explore Programs" : "Start Training"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </span>
          </Link>

          <div className="group relative flex min-h-[50vh] flex-col justify-end overflow-hidden bg-graphite p-10 transition-colors hover:bg-secondary md:min-h-[60vh]">
            <Handshake className="mb-8 h-10 w-10 text-primary" />
            <h3 className="font-headline text-4xl text-bone md:text-5xl">FOR PARTNERS</h3>
            <p className="mt-4 max-w-sm font-body text-muted-foreground">
              Hire verified talent, offer insurance instruments, or join as a manufacturer in our ecosystem.
            </p>
            <div className="mt-8">
              <PartnerDropdown label="Join the Ecosystem" />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border py-24">
          <div className="container mx-auto grid grid-cols-2 gap-8 px-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="mx-auto mb-4 h-7 w-7 text-primary" />
                <h3 className="font-headline text-4xl text-bone md:text-5xl">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </h3>
                <p className="mt-2 font-body text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Insights */}
        <section className="border-b border-border py-28">
          <div className="container mx-auto px-6">
            <div className="mb-16 max-w-2xl">
              <p className="mb-4 font-body text-xs font-bold uppercase tracking-[0.35em] text-primary">Global Impact</p>
              <KineticText
                as="h2"
                trigger="scroll"
                text="Strategic Industry Insights"
                className="font-headline text-4xl text-bone md:text-6xl"
              />
            </div>
            <div className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
              {insights.map((item) => (
                <div key={item.tag} className="flex flex-col justify-between bg-background p-10">
                  <div>
                    <p className="mb-6 font-body text-sm font-bold uppercase tracking-widest text-primary">{item.tag}</p>
                    <p className="font-body text-lg italic leading-relaxed text-muted-foreground">&ldquo;{item.quote}&rdquo;</p>
                  </div>
                  <p className="mt-10 font-body text-xs font-bold uppercase tracking-widest text-bone/60">— {item.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners marquee */}
        <section className="overflow-hidden border-b border-border py-16">
          <p className="mb-10 text-center font-body text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground">
            Institutional Partners &amp; Global Stakeholders
          </p>
          <div className="relative flex overflow-hidden">
            <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center gap-20 pr-20">
              {[...partners, ...partners].map((p, i) => (
                <span key={i} className="whitespace-nowrap font-headline text-3xl text-bone/40">
                  {p}
                </span>
              ))}
            </div>
            <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center gap-20 pr-20" aria-hidden>
              {[...partners, ...partners].map((p, i) => (
                <span key={i} className="whitespace-nowrap font-headline text-3xl text-bone/40">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-primary py-32 text-center">
          <div className="container relative z-10 mx-auto px-6">
            <KineticText
              as="h2"
              trigger="scroll"
              text="JOIN THE FUTURE OF ARTICULATED LOGISTICS"
              className="mx-auto max-w-4xl font-headline text-4xl leading-[0.95] text-asphalt md:text-7xl"
            />
            <p className="mx-auto mt-8 max-w-2xl font-body text-lg font-medium text-asphalt/80">
              Enroll for elite training or register your organization to access a global network of verified articulated driver talent.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link
                href={driverPath}
                data-cursor-hover
                className="w-full bg-asphalt px-12 py-5 font-body text-lg font-bold text-bone transition-transform hover:scale-[1.02] sm:w-auto"
              >
                {user ? "View Courses" : "Apply for Training"}
              </Link>
              <PartnerDropdown label="Become a Partner" onLight />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
