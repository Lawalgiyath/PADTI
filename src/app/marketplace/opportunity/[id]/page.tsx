"use client";

import { use } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Briefcase,
  Clock,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";

const LISTINGS: Record<string, {
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  description: string;
  requirements: string[];
  benefits: string[];
  schedule: string;
  equipment: string;
  equipmentImage: string;
}> = {
  "job-1": {
    title: "Senior Logistics Driver",
    company: "DHL",
    logo: "/images/logos/dhl.svg",
    location: "Hamburg, Germany",
    salary: "€45,000 - €55,000 / Year",
    type: "Full-Time",
    posted: "2 days ago",
    description:
      "We are seeking a highly skilled and safety-conscious Senior Logistics Driver to join DHL's European fleet operations. In this role, you will be responsible for the long-haul transport of goods across international borders, ensuring timely delivery and maintaining the highest institutional standards of vehicle care and road safety.",
    requirements: [
      "Certified PADTI Professional (CDL Class A Equivalent)",
      "Minimum 3 years of articulated vehicle experience",
      "Clean safety record and verified performance score above 85%",
      "Fluency in English; German or French is a plus",
      "Valid international passport and work authorization",
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Premium Euro 6 tractor units with full maintenance support",
      "Health and dental insurance coverage",
      "Ongoing professional development labs at PADTI centers",
      "Paid relocation assistance where applicable",
    ],
    schedule: "5 days on, 2 days off rotating roster",
    equipment: "Scania R-Series (Euro 6)",
    equipmentImage: "/images/equipment/scania-r-series.jpg",
  },
};

export default function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const job = LISTINGS[id] ?? LISTINGS["job-1"];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-grow px-6 py-16 md:px-16">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/marketplace"
            className="mb-8 inline-flex items-center gap-2 font-body text-sm font-bold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Marketplace
          </Link>

          <div className="mb-12 flex flex-col justify-between gap-6 border-b border-border pb-10 md:flex-row md:items-end">
            <div>
              <div className="mb-4 flex items-center gap-4">
                <Image src={job.logo} alt={job.company} width={72} height={28} className="h-7 w-auto object-contain" />
                <span className="font-body text-[10px] font-bold uppercase tracking-widest text-accent">{job.type}</span>
                <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {job.posted}
                </span>
              </div>
              <h1 className="font-headline text-4xl text-ink md:text-5xl">{job.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-5 font-body text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" /> {job.company}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {job.location}
                </span>
              </div>
            </div>
            <button className="whitespace-nowrap bg-sage px-9 py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
              Apply Now
            </button>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="space-y-10 lg:col-span-2">
              <div>
                <h2 className="mb-4 font-headline text-2xl text-ink">Role Overview</h2>
                <p className="font-body leading-relaxed text-muted-foreground">{job.description}</p>
              </div>

              <div>
                <h3 className="mb-4 font-headline text-xl text-ink">Core Requirements</h3>
                <ul className="space-y-3">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 font-body text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-headline text-xl text-ink">Benefits &amp; Perks</h3>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 font-body text-sm text-muted-foreground">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-headline text-xl text-ink">Primary Equipment</h3>
                <div className="border border-border">
                  <div className="relative h-56 w-full">
                    <Image src={job.equipmentImage} alt={job.equipment} fill className="object-cover" sizes="(min-width: 1024px) 60vw, 100vw" />
                  </div>
                  <p className="p-4 font-body text-sm font-bold text-ink">{job.equipment}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-border bg-card p-7">
                <h3 className="mb-6 font-headline text-lg text-ink">Job Details</h3>
                <div className="space-y-5">
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Compensation</p>
                    <p className="font-headline text-xl text-ink">{job.salary}</p>
                  </div>
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Institutional Matching</p>
                    <div className="mt-1 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-accent" />
                      <span className="font-body text-sm font-bold text-ink">94% Fit Score</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Work Schedule</p>
                    <div className="mt-1 flex items-center gap-2 font-body text-sm text-ink">
                      <Calendar className="h-4 w-4" /> {job.schedule}
                    </div>
                  </div>
                </div>
                <button className="mt-7 w-full border border-primary py-3 font-body text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                  Save to Dashboard
                </button>
              </div>

              <div className="bg-ink p-7">
                <h3 className="mb-3 font-headline text-lg text-cream">Employer Contact</h3>
                <p className="mb-5 font-body text-sm text-cream/60">
                  For specific inquiries regarding this listing, reach out to the recruitment agent directly.
                </p>
                <button className="w-full bg-cream py-3 font-body text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-cream/90">
                  Message Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
