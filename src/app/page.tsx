"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Quote,
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

export default function Home() {
  const { user } = useUser();
  const driverPath = user ? "/programs" : "/auth/signup";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative flex min-h-[88vh] items-center pt-16">
          <HeroSlideshow />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/75 to-navy-deep/30" />
          <div className="container relative z-10 mx-auto px-4 py-20">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <Badge className="mb-6 border-none bg-gold px-6 py-1.5 text-sm font-bold tracking-wide text-navy-deep shadow-lg">
                THE WORLD&apos;S LARGEST ARTICULATED DRIVER NETWORK
              </Badge>
              <h1 className="mb-4 font-headline text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl">
                Train for Excellence. Partner for Growth.
              </h1>
              <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-gold" />
              <p className="text-lg font-medium leading-relaxed text-white/85 md:text-xl">
                PADTI Connect bridges elite driver training and the global logistics ecosystem — for drivers, employers, and partners alike.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="overflow-hidden rounded-2xl border-none bg-white shadow-[0_20px_50px_-15px_rgba(10,37,64,0.45)]">
                <div className="h-1.5 bg-primary" />
                <CardHeader className="p-8 pb-4">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-navy-deep">For Drivers</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    Get certified, gain real experience, and land verified roles in the global logistics economy.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Button size="lg" className="w-full rounded-xl bg-primary py-6 text-base font-bold hover:bg-blue-600" asChild>
                    <Link href={driverPath}>
                      {user ? "Explore Programs" : "Start Driver Training"} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden rounded-2xl border-none bg-white shadow-[0_20px_50px_-15px_rgba(10,37,64,0.45)]">
                <div className="h-1.5 bg-gold" />
                <CardHeader className="p-8 pb-4">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gold/15 text-gold-dark">
                    <Handshake className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-navy-deep">For Partners</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    Hire verified talent, offer insurance instruments, or join as a manufacturer in our ecosystem.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="lg" variant="outline" className="w-full rounded-xl border-2 border-navy-deep py-6 text-base font-bold text-navy-deep hover:bg-navy-deep hover:text-white">
                        Join the Ecosystem
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-64 rounded-xl p-2 shadow-xl">
                      <DropdownMenuItem asChild>
                        <Link href="/auth/signup-partner?role=employer" className="flex cursor-pointer items-center gap-2 rounded-lg py-3">
                          <Building2 className="h-4 w-4 text-primary" /> <span>Employer &amp; Fleet</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/auth/signup-partner?role=insurer" className="flex cursor-pointer items-center gap-2 rounded-lg py-3">
                          <Scale className="h-4 w-4 text-primary" /> <span>Insurance Provider</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/auth/signup-partner?role=manufacturer" className="flex cursor-pointer items-center gap-2 rounded-lg py-3">
                          <Truck className="h-4 w-4 text-primary" /> <span>Equipment Manufacturer</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/auth/signup-partner?role=institution" className="flex cursor-pointer items-center gap-2 rounded-lg py-3">
                          <Building className="h-4 w-4 text-primary" /> <span>Institutional Partner</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-surface-alt py-20">
          <div className="container mx-auto grid grid-cols-2 gap-8 px-4 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-headline text-3xl font-extrabold text-navy-deep md:text-4xl">{s.val}</h3>
                <div className="mx-auto my-2 h-0.5 w-6 bg-gold" />
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Insights */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="mb-14 text-center">
              <Badge className="mb-4 border-none bg-primary px-4 py-1 text-white">GLOBAL IMPACT</Badge>
              <h2 className="font-headline text-3xl font-bold text-navy-deep md:text-4xl">Strategic Industry Insights</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {insights.map((item, i) => {
                const featured = i === 2;
                return (
                  <Card
                    key={item.tag}
                    className={
                      featured
                        ? "flex h-full flex-col rounded-2xl border-none bg-navy-deep shadow-[0_20px_50px_-15px_rgba(10,37,64,0.5)]"
                        : "flex h-full flex-col rounded-2xl border-l-4 border-primary bg-white shadow-md transition-shadow hover:shadow-xl"
                    }
                  >
                    <CardHeader className="p-8 pb-2">
                      <Quote className={featured ? "mb-4 h-6 w-6 text-gold" : "mb-4 h-6 w-6 text-primary/40"} />
                      <CardTitle className={featured ? "text-lg font-bold text-white" : "text-lg font-bold text-navy-deep"}>
                        {item.tag}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow p-8 pt-2">
                      <p className={featured ? "text-base italic leading-relaxed text-white/80" : "text-base italic leading-relaxed text-muted-foreground"}>
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <p className={featured ? "mt-6 text-xs font-bold uppercase tracking-widest text-gold" : "mt-6 text-xs font-bold uppercase tracking-widest text-primary/70"}>
                        — {item.source}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="bg-surface-alt py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="mb-10 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
              Institutional Partners &amp; Global Stakeholders
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {partners.map((p) => (
                <span key={p} className="text-lg font-bold text-navy-deep/70">{p}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-navy-deep py-24 text-center text-white">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 font-headline text-3xl font-bold leading-tight md:text-5xl">
              Join the Future of Articulated Logistics
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/75">
              Enroll for elite training or register your organization to access a global network of verified articulated driver talent.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="w-full rounded-xl bg-gold px-10 py-6 text-base font-bold text-navy-deep shadow-[0_10px_30px_-8px_rgba(216,160,45,0.6)] hover:bg-gold/90 sm:w-auto" asChild>
                <Link href={driverPath}>{user ? "View Courses" : "Apply for Training"}</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="lg" variant="outline" className="w-full rounded-xl border-2 border-white/40 bg-transparent px-10 py-6 text-base font-bold text-white hover:bg-white hover:text-navy-deep sm:w-auto">
                    Become a Partner
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-64 rounded-xl p-2 shadow-xl">
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup-partner?role=employer" className="flex cursor-pointer items-center gap-2 rounded-lg py-3">
                      <Building2 className="h-4 w-4 text-primary" /> <span>Employer &amp; Fleet</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup-partner?role=insurer" className="flex cursor-pointer items-center gap-2 rounded-lg py-3">
                      <Scale className="h-4 w-4 text-primary" /> <span>Insurance Provider</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup-partner?role=manufacturer" className="flex cursor-pointer items-center gap-2 rounded-lg py-3">
                      <Truck className="h-4 w-4 text-primary" /> <span>Equipment Manufacturer</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup-partner?role=institution" className="flex cursor-pointer items-center gap-2 rounded-lg py-3">
                      <Building className="h-4 w-4 text-primary" /> <span>Institutional Partner</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
