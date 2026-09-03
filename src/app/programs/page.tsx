"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Truck,
  Briefcase,
  GraduationCap,
  BookOpen,
  Award,
  ClipboardCheck,
} from "lucide-react";
import Link from "next/link";
import { LiquidBackground } from "@/components/liquid-background";
import { SectionLabel } from "@/components/section-label";

const levelIcon = {
  Professional: GraduationCap,
  Specialist: ShieldCheck,
  Enterprise: Briefcase,
  "Technical Upgrade": Zap,
} as const;

const programs = [
  {
    id: "cdl-a",
    title: "Professional CDL Class A (Heavy Haul)",
    duration: "8 Weeks",
    cost: "₦1,500,000",
    level: "Professional" as const,
  },
  {
    id: "safety-expert",
    title: "Advanced Road Safety & Fuel Efficiency",
    duration: "4 Weeks",
    cost: "₦550,000",
    level: "Specialist" as const,
  },
  {
    id: "fleet-mgmt",
    title: "Fleet Management & Logistics Specialist",
    duration: "12 Weeks",
    cost: "₦2,500,000",
    level: "Enterprise" as const,
  },
  {
    id: "upgrade-training",
    title: "Articulated Upgrade: Standard to Heavy Vehicle",
    duration: "6 Weeks",
    cost: "₦750,000",
    level: "Technical Upgrade" as const,
  },
];

const floatingIcons = [
  { Icon: GraduationCap, className: "left-[8%] top-[22%] h-8 w-8", delay: "0s" },
  { Icon: BookOpen, className: "left-[85%] top-[18%] h-7 w-7", delay: "0.6s" },
  { Icon: Award, className: "left-[15%] top-[70%] h-6 w-6", delay: "1.2s" },
  { Icon: ClipboardCheck, className: "left-[78%] top-[68%] h-7 w-7", delay: "0.3s" },
  { Icon: ShieldCheck, className: "left-[50%] top-[15%] h-6 w-6", delay: "0.9s" },
];

export default function ProgramsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar transparentOnTop />

      <main className="flex-grow">
        {/* Hero — liquid shader background */}
        <section className="relative flex min-h-[62vh] items-center justify-center overflow-hidden">
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

          <div className="relative z-10 px-6 pt-16 text-center">
            <p className="mb-4 font-body text-xs font-bold uppercase tracking-[0.35em] text-cream/70">
              PADTI Curriculum
            </p>
            <h1 className="font-headline text-5xl text-cream md:text-7xl">
              Our <span className="italic">Courses</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl font-body text-base text-cream/70 md:text-lg">
              Global-standard, FRSC-compliant certifications, from first gear change to logistics leadership.
            </p>
          </div>
        </section>

        {/* Programs grid — compact, four across */}
        <section className="bg-background px-6 py-24 md:px-16">
          <SectionLabel>Choose Your Program</SectionLabel>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => {
              const Icon = levelIcon[program.level];
              return (
                <Link
                  key={program.id}
                  href={`/enroll/${program.id}`}
                  className="group flex flex-col border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <p className="mb-2 font-body text-[10px] font-bold uppercase tracking-widest text-accent">
                    {program.level}
                  </p>
                  <h3 className="mb-4 font-headline text-lg leading-snug text-ink">{program.title}</h3>
                  <div className="mb-5 mt-auto flex items-center gap-1.5 font-body text-xs font-medium text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {program.duration}
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <span className="font-headline text-xl text-ink">{program.cost}</span>
                    <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Why train with PADTI */}
        <section className="bg-secondary px-6 py-24 md:px-16">
          <SectionLabel>Why Train With PADTI</SectionLabel>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-body text-base leading-relaxed text-muted-foreground md:text-lg">
              Our curriculum is developed in direct collaboration with the world&apos;s leading logistics firms. We
              don&apos;t just teach you how to drive; we train you to meet the operational and safety requirements
              of global fleets.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2">
            {[
              { title: "Institutional Grade Equipment", icon: Truck, desc: "Train on the latest Euro 6 and electric articulated units." },
              { title: "Advanced VR & Simulators", icon: Zap, desc: "Hone your skills in high-risk scenarios without the real-world danger." },
              { title: "Direct Career Pipeline", icon: Briefcase, desc: "Graduates get priority placement in the PADTI Career Marketplace." },
              { title: "Global Accreditation", icon: ShieldCheck, desc: "Certificates verified by our international logistics partners." },
            ].map((benefit) => (
              <div key={benefit.title} className="flex gap-4 bg-background p-8">
                <benefit.icon className="h-6 w-6 shrink-0 text-primary" strokeWidth={1.5} />
                <div>
                  <h4 className="mb-1 font-headline text-lg text-ink">{benefit.title}</h4>
                  <p className="font-body text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink px-6 py-28 text-center md:px-16">
          <h2 className="mx-auto max-w-3xl font-headline text-4xl leading-tight text-cream md:text-6xl">
            Ready to master <span className="italic">the articulated world?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-base text-cream/60 md:text-lg">
            Enrollment is open for the current cohort. Secure your place in the world&apos;s most rigorous
            articulated driver training program.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-sage px-9 py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark"
            >
              Register Student Account
            </Link>
            <button className="border border-cream/40 px-9 py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink">
              Download Brochure
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
