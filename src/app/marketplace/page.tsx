"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { SectionLabel } from "@/components/section-label";
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Wrench,
  Star,
  Phone,
  Users,
  ArrowRight,
} from "lucide-react";

const TABS = [
  { key: "opportunities", label: "Opportunities", icon: Briefcase },
  { key: "talent", label: "Verified Talent", icon: Users },
  { key: "insurance", label: "Insurance", icon: ShieldCheck },
  { key: "equipment", label: "Equipment", icon: Truck },
  { key: "services", label: "Services", icon: Wrench },
] as const;

const jobs = [
  { id: "job-1", title: "Senior Logistics Driver", company: "LogiStream Europe", logo: undefined, location: "Hamburg, DE", salary: "€45,000 - €55,000", type: "Full-Time" },
  { id: "job-2", title: "Articulated Fleet Operator", company: "Global Trans", logo: undefined, location: "Toronto, CA", salary: "$60,000 - $75,000", type: "Full-Time" },
  { id: "job-3", title: "Logistics Trainee (Paid)", company: "Express Way", logo: undefined, location: "London, UK", salary: "€2,400/mo", type: "Internship" },
];

const talent = [
  { id: "talent-1", name: "Lawal Giyath", title: "Founder & Platform Lead, PADTI Connect", location: "Lagos, NG", status: "Verified" },
];

const insurancePlans = [
  { title: "Score-Based Liability", provider: "AXA Institutional", logo: "/images/logos/axa.svg", scoreImpact: "High Scorers Save 40%", limit: "€5M" },
  { title: "Fleet Integrity Shield", provider: "Allianz Global", logo: undefined, scoreImpact: "Pre-Screened Talent Bonus", limit: "Cargo Focused" },
];

const equipment = [
  { name: "Scania R-Series (Euro 6)", provider: "Scania Global", image: "/images/equipment/scania-r-series.jpg", price: "From €125,000", condition: "New" },
  { name: "Mercedes-Benz Actros Electric", provider: "Daimler Truck", image: "/images/equipment/mercedes-actros.jpg", price: "Contact for Lease", condition: "Available" },
];

const services = [
  { title: "Mobile Articulated Maintenance", provider: "FleetFix Global", rating: 4.9, tags: ["24/7 Support"] },
  { title: "Digital Compliance Audit", provider: "SafeLogistics Ltd", rating: 4.8, tags: ["Global Standards"] },
];

function LogoOrText({ logo, name }: { logo?: string; name: string }) {
  if (logo) {
    return (
      <div className="flex h-11 w-20 items-center justify-start">
        <Image src={logo} alt={name} width={80} height={32} className="h-auto max-h-8 w-auto object-contain" />
      </div>
    );
  }
  return <span className="font-headline text-lg text-ink">{name}</span>;
}

function MarketplaceHubContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "opportunities";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="px-6 py-16 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-body text-xs font-bold uppercase tracking-[0.35em] text-primary">
              Verified Ecosystem
            </p>
            <h1 className="font-headline text-4xl text-ink md:text-6xl">Institutional Marketplace</h1>
          </div>
          <p className="max-w-sm font-body text-sm text-muted-foreground">
            The hub for real logistics opportunities, talent, and industry assets, connected to PADTI&apos;s
            verified partner network.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-border pb-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 font-body text-sm font-bold uppercase tracking-wide transition-colors ${
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-ink"
              }`}
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </div>

        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search the ecosystem..."
            className="h-12 w-full border border-border bg-card pl-11 pr-4 font-body text-sm outline-none focus:border-primary"
          />
        </div>

        {/* Opportunities */}
        {activeTab === "opportunities" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/marketplace/opportunity/${job.id}`}
                className="group flex flex-col border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <LogoOrText logo={job.logo} name={job.company} />
                <p className="mb-4 mt-4 font-body text-[10px] font-bold uppercase tracking-widest text-accent">
                  {job.type}
                </p>
                <h3 className="mb-4 font-headline text-lg leading-snug text-ink">{job.title}</h3>
                <div className="mb-5 mt-auto flex items-center gap-1.5 font-body text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {job.location}
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="font-body text-sm font-bold text-ink">{job.salary}</span>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Talent */}
        {activeTab === "talent" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {talent.map((person) => (
              <div key={person.id} className="flex flex-col items-center border border-border bg-card p-8 text-center">
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 font-headline text-xl text-primary">
                  {person.name.charAt(0)}
                  <CheckCircle2 className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-background text-primary" />
                </div>
                <h3 className="font-headline text-xl text-ink">{person.name}</h3>
                <p className="mt-1 font-body text-sm text-muted-foreground">{person.title}</p>
                <div className="mt-4 flex items-center gap-1.5 font-body text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {person.location}
                </div>
                <Link
                  href={`/marketplace/talent/${person.id}`}
                  className="mt-6 w-full border border-primary py-2.5 font-body text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Insurance */}
        {activeTab === "insurance" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {insurancePlans.map((plan, idx) => (
              <div key={idx} className="flex flex-col border border-border bg-card p-6">
                <LogoOrText logo={plan.logo} name={plan.provider} />
                <h3 className="mb-3 mt-4 font-headline text-lg text-ink">{plan.title}</h3>
                <p className="mb-4 font-body text-sm font-bold text-primary">{plan.scoreImpact}</p>
                <p className="mb-6 mt-auto font-body text-xs text-muted-foreground">Coverage limit: {plan.limit}</p>
                <button className="w-full border border-primary py-2.5 font-body text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                  Request Quote
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Equipment */}
        {activeTab === "equipment" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {equipment.map((item, idx) => (
              <div key={idx} className="flex flex-col border border-border bg-card">
                <div className="relative h-40 w-full overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-headline text-lg text-ink">{item.name}</h3>
                  <p className="mb-4 mt-1 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {item.provider}
                  </p>
                  <div className="mb-5 mt-auto flex items-center justify-between border-t border-border pt-4">
                    <span className="font-body text-sm font-bold text-ink">{item.price}</span>
                    <span className="font-body text-[10px] font-bold uppercase tracking-widest text-accent">{item.condition}</span>
                  </div>
                  <button className="w-full border border-primary py-2.5 font-body text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                    Inquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Services */}
        {activeTab === "services" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, idx) => (
              <div key={idx} className="flex flex-col border border-border bg-card p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Wrench className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1 font-body text-sm font-bold text-accent">
                    <Star className="h-3.5 w-3.5 fill-current" /> {service.rating}
                  </div>
                </div>
                <h3 className="font-headline text-lg text-ink">{service.title}</h3>
                <p className="mt-1 font-body text-xs text-muted-foreground">{service.provider}</p>
                <div className="mb-6 mt-4 flex flex-wrap gap-2">
                  {service.tags.map((tag, i) => (
                    <span key={i} className="border border-border px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="mt-auto flex w-full items-center justify-center gap-2 border border-primary py-2.5 font-body text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                  <Phone className="h-3.5 w-3.5" /> Book Consultation
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<div className="p-16 text-center font-body text-muted-foreground">Loading marketplace...</div>}>
          <MarketplaceHubContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
