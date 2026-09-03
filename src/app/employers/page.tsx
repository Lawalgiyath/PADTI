"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  BarChart3,
  Globe2,
  ArrowRight,
  CheckCircle2,
  Building2,
  Zap,
} from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";

const benefits = [
  {
    title: "Verified Credentials",
    description: "Every PADTI graduate carries a tamper-proof digital certificate. Instantly verify CDL status, safety records, and training completion.",
    icon: ShieldCheck,
  },
  {
    title: "Performance Analytics",
    description: "Gain access to detailed student performance data, including simulation scores, yard maneuver efficiency, and road safety assessments.",
    icon: BarChart3,
  },
  {
    title: "Global Talent Pipeline",
    description: "Connect with a diverse pool of highly trained articulated drivers from across the globe, ready for international deployment.",
    icon: Globe2,
  },
  {
    title: "Direct Recruitment",
    description: "Bypass traditional job boards. Post opportunities directly to our graduates and manage applications through our specialized portal.",
    icon: Zap,
  },
];

const topEmployers = [
  { name: "DHL Global", logo: "/images/logos/dhl.svg", industry: "Logistics & Express" },
  { name: "FedEx", logo: "/images/logos/fedex.svg", industry: "Parcel Delivery" },
  { name: "Maersk", logo: "/images/logos/maersk.svg", industry: "Shipping & Logistics" },
  { name: "LogiTrans", logo: undefined, industry: "European Freight" },
  { name: "Global Heavy", logo: undefined, industry: "Specialized Transport" },
  { name: "DeepRoad", logo: undefined, industry: "Long-Haul Freight" },
];

export default function EmployersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar transparentOnTop />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
          <Image
            src="/images/planning-meeting/padti-planning-meeting-06.jpeg"
            alt="PADTI leadership in a strategic planning session"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/40" />
          <div className="relative z-10 px-6 py-16 text-center">
            <p className="mb-4 font-body text-xs font-bold uppercase tracking-[0.35em] text-cream/70">
              Enterprise Partnerships
            </p>
            <h1 className="mx-auto max-w-3xl font-headline text-4xl leading-tight text-cream md:text-6xl">
              The elite talent pipeline <span className="italic">for articulated drivers</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-body text-base text-cream/70 md:text-lg">
              Join the global logistics leaders who trust PADTI to deliver safe, professional,
              performance-verified heavy vehicle operators.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/auth/signup"
                className="rounded-l-full bg-sage px-9 py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark"
              >
                Join as Employer
              </Link>
              <span className="hidden font-body text-xl font-light text-cream/30 sm:inline" aria-hidden>
                |
              </span>
              <button className="rounded-r-full border border-cream/40 px-9 py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink">
                Verification Portal
              </button>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-background px-6 py-24 md:px-16">
          <SectionLabel>Why Partner With PADTI</SectionLabel>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 80}>
                <div className="flex h-full flex-col border border-border bg-card p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <benefit.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 font-headline text-lg text-ink">{benefit.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Partnership showcase */}
        <section className="bg-secondary px-6 py-24 md:px-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Reveal className="relative h-[320px] md:h-[420px]">
              <Image
                src="/images/planning-meeting/padti-planning-meeting-02.jpeg"
                alt="PADTI leadership and partners in a strategic planning session"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </Reveal>
            <Reveal delay={120}>
              <p className="mb-3 font-body text-xs font-bold uppercase tracking-[0.35em] text-primary">
                Institutional Grade
              </p>
              <h2 className="mb-6 font-headline text-3xl text-ink md:text-4xl">
                Enterprise solutions <span className="italic">for modern fleets</span>
              </h2>
              <p className="mb-8 font-body text-base leading-relaxed text-muted-foreground">
                Our platform provides employers with unparalleled visibility into the talent market. From
                bulk certification verification to predictive performance modeling, we give you the tools
                to build a safer and more efficient fleet.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "Instant Credential Verification",
                  "Safety-First Training Standards",
                  "Direct Hire Pipeline",
                  "Internship Program Management",
                  "Performance Data Access",
                  "Compliance Monitoring",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span className="font-body text-sm font-medium text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Top employers */}
        <section className="bg-background px-6 py-24 md:px-16">
          <SectionLabel>Join Leading Employers</SectionLabel>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {topEmployers.map((emp, i) => (
              <Reveal key={emp.name} delay={i * 60}>
                <div className="flex h-full flex-col items-center justify-center gap-3 border border-border bg-card px-4 py-8 text-center">
                  {emp.logo ? (
                    <Image src={emp.logo} alt={emp.name} width={80} height={28} className="h-7 w-auto object-contain" />
                  ) : (
                    <span className="font-headline text-base text-ink">{emp.name}</span>
                  )}
                  <p className="font-body text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                    {emp.industry}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-ink px-6 py-28 text-center md:px-16">
          <h2 className="mx-auto max-w-3xl font-headline text-4xl leading-tight text-cream md:text-6xl">
            Future-proof <span className="italic">your fleet</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-base text-cream/60 md:text-lg">
            Ready to access the world&apos;s most rigorously trained driver talent? Create your employer
            account today and start sourcing verified excellence.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/auth/signup"
              className="rounded-l-full bg-sage px-9 py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark"
            >
              Register as Employer
            </Link>
            <span className="hidden font-body text-xl font-light text-cream/30 sm:inline" aria-hidden>
              |
            </span>
            <button className="rounded-r-full border border-cream/40 px-9 py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink">
              Contact Partnership Team
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
