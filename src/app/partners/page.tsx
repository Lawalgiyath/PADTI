"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Building2,
  Scale,
  Truck,
  Building,
  Network,
  Handshake,
  Globe2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LiquidBackground } from "@/components/liquid-background";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";

const partnerTypes = [
  {
    title: "Employers & Fleets",
    description: "Access our verified talent pool to build safer, more efficient fleets with pre-screened, rig-ready professionals.",
    icon: Building2,
    features: ["Bulk Verification", "Direct Recruitment", "Performance Analytics"],
  },
  {
    title: "Insurance Companies",
    description: "Develop data-driven insurance instruments for drivers based on their institutional scores and safety records.",
    icon: Scale,
    features: ["Risk Assessment API", "Score-Based Premiums", "Claims Mitigation"],
  },
  {
    title: "Equipment Manufacturers",
    description: "Connect with the next generation of buyers and fleet managers looking for cutting-edge articulated vehicles.",
    icon: Truck,
    features: ["Brand Integration", "Product Demo Labs", "Purchase Pipeline"],
  },
  {
    title: "Institutional Partners",
    description: "Governments, NGOs, and embassies looking to facilitate cross-border logistics and workforce development.",
    icon: Building,
    features: ["Visa Support Data", "Compliance Audits", "Workforce Grants"],
  },
];

const scoreFeatures = [
  "Live Performance Telemetry",
  "Tamper-Proof Verification",
  "Risk Prediction Modeling",
  "Asset Utilization Data",
  "Cross-Border Compliance",
  "Direct Hire Matching",
];

const partnersList = [
  { name: "AXA Insurance", logo: "/images/logos/axa.svg", type: "Insurance" },
  { name: "Scania Group", logo: undefined, type: "Equipment" },
  { name: "DHL Global", logo: "/images/logos/dhl.svg", type: "Employer" },
  { name: "EU Logistics Council", logo: undefined, type: "Institutional" },
  { name: "Maersk Line", logo: "/images/logos/maersk.svg", type: "Logistics" },
  { name: "Volvo Trucks", logo: "/images/logos/volvo.svg", type: "Equipment" },
  { name: "Allianz", logo: "/images/logos/allianz.svg", type: "Insurance" },
  { name: "FedEx Express", logo: "/images/logos/fedex.svg", type: "Logistics" },
];

const floatingIcons = [
  { Icon: Handshake, className: "left-[10%] top-[24%] h-8 w-8", delay: "0s" },
  { Icon: Globe2, className: "left-[86%] top-[20%] h-7 w-7", delay: "0.5s" },
  { Icon: Network, className: "left-[18%] top-[68%] h-6 w-6", delay: "1s" },
  { Icon: Building2, className: "left-[80%] top-[66%] h-7 w-7", delay: "0.3s" },
  { Icon: Scale, className: "left-[50%] top-[16%] h-6 w-6", delay: "0.8s" },
];

function PartnerRegisterMenu({ label }: { label: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-l-full bg-sage px-9 py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
          {label}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-64 rounded-none border-border p-2">
        <DropdownMenuItem asChild>
          <Link href="/auth/signup?role=employer" className="flex cursor-pointer items-center gap-2 py-3">
            <Building2 className="h-4 w-4 text-primary" /> <span>Employer &amp; Fleet</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/auth/signup?role=insurer" className="flex cursor-pointer items-center gap-2 py-3">
            <Scale className="h-4 w-4 text-primary" /> <span>Insurance Company</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/auth/signup?role=manufacturer" className="flex cursor-pointer items-center gap-2 py-3">
            <Truck className="h-4 w-4 text-primary" /> <span>Equipment Manufacturer</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/auth/signup?role=institution" className="flex cursor-pointer items-center gap-2 py-3">
            <Building className="h-4 w-4 text-primary" /> <span>Institutional Partner</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function PartnersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar transparentOnTop />

      <main className="flex-grow">
        {/* Hero — liquid shader background */}
        <section className="relative flex min-h-[64vh] items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <LiquidBackground colorA="#0a1730" colorB="#1e4d8f" colorC="#c98a3a" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/40" />

          {floatingIcons.map(({ Icon, className, delay }, i) => (
            <Icon
              key={i}
              className={`absolute animate-pulse text-cream/25 ${className}`}
              style={{ animationDelay: delay, animationDuration: "3.5s" }}
              strokeWidth={1.25}
            />
          ))}

          <div className="relative z-10 px-6 py-16 text-center">
            <p className="mb-4 font-body text-xs font-bold uppercase tracking-[0.35em] text-cream/70">
              Global Partner Ecosystem
            </p>
            <h1 className="mx-auto max-w-3xl font-headline text-4xl leading-tight text-cream md:text-6xl">
              A unified ecosystem for <span className="italic">global logistics excellence</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-body text-base text-cream/70 md:text-lg">
              Join the organizations integrating with the PADTI score-based system to drive safety, efficiency, and growth.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
              <PartnerRegisterMenu label="Register as Partner" />
              <span className="hidden font-body text-xl font-light text-cream/30 sm:inline" aria-hidden>
                |
              </span>
              <Link
                href="/partners/directory"
                className="rounded-r-full border border-cream/40 px-9 py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
              >
                Explore Partner Network
              </Link>
            </div>
          </div>
        </section>

        {/* How you can partner */}
        <section className="bg-background px-6 py-24 md:px-16">
          <Reveal>
            <SectionLabel>How You Can Partner With Us</SectionLabel>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partnerTypes.map((partner, i) => (
              <Reveal key={partner.title} delay={i * 80}>
                <div className="flex h-full flex-col border border-border bg-card p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <partner.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 font-headline text-lg text-ink">{partner.title}</h3>
                  <p className="mb-5 font-body text-sm leading-relaxed text-muted-foreground">{partner.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2 border-t border-border pt-4">
                    {partner.features.map((feature) => (
                      <span key={feature} className="font-body text-[10px] font-bold uppercase tracking-widest text-accent">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Real photos — institutional engagement */}
        <section className="grid grid-cols-1 md:grid-cols-2">
          <Reveal className="relative h-[320px] md:h-[420px]">
            <Image
              src="/images/planning-meeting/padti-planning-meeting-02.jpeg"
              alt="PADTI leadership in a strategic partnership planning session"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="font-body text-[10px] font-bold uppercase tracking-widest text-cream/70">Strategic Planning</p>
              <h3 className="font-headline text-2xl text-cream">Building the partner network</h3>
            </div>
          </Reveal>
          <Reveal delay={120} className="relative h-[320px] md:h-[420px]">
            <Image
              src="/images/facility-visit/padti-facility-visit-13.jpeg"
              alt="FRSC officials and PADTI staff at the training facility"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              style={{ objectPosition: "center 32%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="font-body text-[10px] font-bold uppercase tracking-widest text-cream/70">Institutional Alignment</p>
              <h3 className="font-headline text-2xl text-cream">FRSC-compliant, ground level</h3>
            </div>
          </Reveal>
        </section>

        {/* Power of the score */}
        <section className="bg-secondary px-6 py-24 text-center md:px-16">
          <Reveal>
            <SectionLabel>The PADTI Performance Score</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-headline text-3xl text-ink md:text-5xl">
                Driving decisions <span className="italic">through data</span>
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-muted-foreground md:text-lg">
                The core of our ecosystem is a proprietary performance score, a live institutional-grade metric that
                lets insurers lower premiums for high scorers and manufacturers identify high-volume potential
                clients.
              </p>
            </div>
          </Reveal>
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {scoreFeatures.map((item, i) => (
              <Reveal key={item} delay={i * 60} y={12}>
                <div className="flex h-full items-center gap-3 bg-background p-6 text-left">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="font-body text-sm font-bold text-ink">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Global network */}
        <section className="bg-background px-6 py-24 md:px-16">
          <Reveal>
            <SectionLabel>Global Strategic Network</SectionLabel>
          </Reveal>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {partnersList.map((partner, i) => (
              <Reveal key={partner.name} delay={i * 60} y={16}>
                <div className="flex h-full flex-col items-center justify-center gap-4 border border-border bg-card px-6 py-10 text-center">
                  {partner.logo ? (
                    <Image src={partner.logo} alt={partner.name} width={96} height={36} className="h-9 w-auto object-contain" />
                  ) : (
                    <span className="font-headline text-xl text-ink">{partner.name}</span>
                  )}
                  <p className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {partner.type} Partner
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-ink px-6 py-28 text-center md:px-16">
          <h2 className="mx-auto max-w-3xl font-headline text-4xl leading-tight text-cream md:text-6xl">
            Ready to <span className="italic">scale with us?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-base text-cream/60 md:text-lg">
            Whether you are an employer seeking talent or a manufacturer looking for growth, our ecosystem is
            ready to integrate your services.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <PartnerRegisterMenu label="Apply for Partnership" />
            <span className="hidden font-body text-xl font-light text-cream/30 sm:inline" aria-hidden>
              |
            </span>
            <Link
              href="/partners/directory"
              className="rounded-r-full border border-cream/40 px-9 py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              Browse Partner Directory
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
