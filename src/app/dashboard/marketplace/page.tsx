"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { MapPin, Building2, UserCheck, Briefcase, Star, Filter, GraduationCap } from "lucide-react";

const jobAds = [
  { title: "Senior Logistics Driver", company: "DHL Global", location: "Bonn, DE", salary: "Competitive", type: "Full-Time", category: "Job" },
  { title: "Articulated Fleet Operator", company: "Maersk", location: "Copenhagen, DK", salary: "Market Rate", type: "Full-Time", category: "Job" },
  { title: "Logistics Trainee (Paid)", company: "FedEx Express", location: "Paris, FR", salary: "€1,800/mo", type: "Internship", category: "Internship" },
  { title: "Fleet Management Intern", company: "LogiStream", location: "London, UK", salary: "Unpaid (Academic Credit)", type: "Internship", category: "Internship" },
  { title: "Night Shift Long-Haul", company: "Deep Road", location: "Manchester, UK", salary: "Premium", type: "Contract", category: "Job" },
  { title: "Junior Yard Marshall", company: "Global Trans", location: "Berlin, DE", salary: "€2,200/mo", type: "Paid Internship", category: "Internship" },
];

const candidates = [
  { name: "Johnathan Doe", score: 92, location: "Hamburg, DE", skills: ["Articulated Reversing", "Eco-Driving"] },
  { name: "Sarah Miller", score: 95, location: "Toronto, CA", skills: ["Long-Haul", "Fleet Safety"] },
  { name: "Michael Chen", score: 88, location: "Vancouver, CA", skills: ["Yard Maneuvers", "Logistics"] },
];

function DriverMarketplace() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="mb-2 font-headline text-3xl text-ink">Hot Jobs &amp; Internships</h1>
          <p className="font-body text-sm text-muted-foreground">Premium listings and training placements from PADTI&apos;s global network.</p>
        </div>
        <button className="flex items-center gap-2 border border-border px-5 py-2.5 font-body text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-secondary">
          <Filter className="h-4 w-4" /> Filter
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobAds.map((ad) => (
          <div key={ad.title} className="flex flex-col border border-border bg-card p-6 transition-colors hover:border-primary/40">
            <div className="mb-2 flex items-start justify-between">
              <span className={`flex items-center gap-1 font-body text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${ad.category === "Internship" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                {ad.category === "Internship" ? <GraduationCap className="h-3 w-3" /> : <Briefcase className="h-3 w-3" />}
                {ad.type}
              </span>
              <span className="font-body text-[10px] font-bold uppercase text-muted-foreground">{ad.category}</span>
            </div>
            <h3 className="mb-1 min-h-[3.5rem] font-headline text-xl text-ink">{ad.title}</h3>
            <p className="mb-4 flex items-center gap-1 font-body text-sm font-medium text-muted-foreground">
              <Building2 className="h-3.5 w-3.5" /> {ad.company}
            </p>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {ad.location}
              </div>
              <div className="font-body text-sm font-semibold text-ink">
                <span className="font-normal text-muted-foreground">Compensation: </span>
                {ad.salary}
              </div>
              <div className="flex items-center gap-2 bg-secondary p-2.5 font-body text-xs text-muted-foreground">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span>High Match for your Curriculum (94%)</span>
              </div>
            </div>
            <button className="mt-5 w-full bg-sage py-3 font-body text-xs font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
              {ad.category === "Internship" ? "Apply for Placement" : "Apply for Job"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmployerMarketplace() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 font-headline text-3xl text-ink">Verified Talent Search</h1>
          <p className="font-body text-sm text-muted-foreground">Direct access to PADTI&apos;s top-performing graduates.</p>
        </div>
        <button className="bg-accent px-6 py-3 font-body text-sm font-bold uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90">
          Advanced Search
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {candidates.map((driver) => (
          <div key={driver.name} className="border border-border bg-card p-6 text-center transition-colors hover:border-primary/40">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-primary/10 font-headline text-xl text-primary">
              {driver.name.charAt(0)}
            </div>
            <h3 className="font-headline text-lg text-ink">{driver.name}</h3>
            <p className="mb-5 flex items-center justify-center gap-1 font-body text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" /> {driver.location}
            </p>
            <div className="mb-5 flex justify-around border-y border-border py-4">
              <div>
                <p className="font-headline text-xl text-primary">{driver.score}%</p>
                <p className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Score</p>
              </div>
              <div>
                <p className="font-headline text-xl text-primary">Active</p>
                <p className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</p>
              </div>
            </div>
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {driver.skills.map((skill) => (
                <span key={skill} className="bg-secondary px-2 py-1 font-body text-[10px] text-muted-foreground">{skill}</span>
              ))}
            </div>
            <button className="flex w-full items-center justify-center gap-2 border border-border py-3 font-body text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-secondary">
              <UserCheck className="h-4 w-4" /> View Full Credentials
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarketplaceDispatcher() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "driver";

  if (role === "employer") return <EmployerMarketplace />;
  return <DriverMarketplace />;
}

export default function MarketplaceDashboard() {
  return (
    <Suspense fallback={<div className="font-body text-sm text-muted-foreground">Loading Marketplace...</div>}>
      <MarketplaceDispatcher />
    </Suspense>
  );
}
