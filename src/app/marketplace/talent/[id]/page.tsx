"use client";

import { use } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MapPin, ShieldCheck, ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";

export default function TalentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const talent = {
    name: "Lawal Giyath",
    title: "Founder & Platform Lead, PADTI Connect",
    location: "Lagos, Nigeria",
    verified: true,
    bio: "Founder and platform lead behind PADTI Connect, building the institutional infrastructure connecting verified articulated drivers with the global logistics ecosystem.",
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-grow px-6 py-16 md:px-16">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/marketplace?tab=talent"
            className="mb-8 inline-flex items-center gap-2 font-body text-sm font-bold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Marketplace
          </Link>

          <div className="flex flex-col items-center gap-8 border border-border bg-card p-10 text-center sm:flex-row sm:text-left">
            <div className="relative shrink-0">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 font-headline text-4xl text-primary">
                {talent.name.charAt(0)}
              </div>
              {talent.verified && (
                <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-1.5">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
              )}
            </div>

            <div>
              <div className="mb-2 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <h1 className="font-headline text-3xl text-ink">{talent.name}</h1>
                <span className="border border-primary/30 bg-primary/5 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-primary">
                  Verified
                </span>
              </div>
              <p className="mb-4 font-body text-lg text-muted-foreground">{talent.title}</p>
              <div className="flex flex-wrap items-center justify-center gap-5 font-body text-sm text-muted-foreground sm:justify-start">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {talent.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" /> PADTI Connect
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 border border-border bg-card p-10">
            <h2 className="mb-4 font-headline text-xl text-ink">About</h2>
            <p className="font-body text-base italic leading-relaxed text-muted-foreground">&ldquo;{talent.bio}&rdquo;</p>
          </div>

          <div className="mt-6 border border-border bg-secondary p-6">
            <p className="text-center font-body text-xs italic text-muted-foreground">
              This profile is manually maintained. Driver credential verification (certifications, training
              hours, performance scores) is available for PADTI-certified graduates once live.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
