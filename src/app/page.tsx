
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
  TrendingUp, 
  Users, 
  Monitor, 
  Building2, 
  GraduationCap, 
  Briefcase,
  ChevronDown,
  Zap,
  Handshake,
  Scale,
  Truck,
  Building,
  Quote,
  Sparkles,
  Search
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useUser } from "@/firebase";

export default function Home() {
  const { user } = useUser();
  const heroImg = PlaceHolderImages.find(img => img.id === "hero-truck");

  const driverPath = user ? "/programs" : "/auth/signup";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Dual-Sided Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary pt-16">
          <Image
            src={heroImg?.imageUrl || ""}
            alt={heroImg?.description || "Hero"}
            fill
            className="object-cover opacity-20 mix-blend-overlay"
            priority
            data-ai-hint="truck highway"
          />
          <div className="container relative z-10 px-4 py-20">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <Badge className="mb-6 bg-accent text-accent-foreground px-6 py-1.5 text-sm font-bold border-none shadow-lg">
                THE WORLD'S LARGEST ARTICULATED DRIVER NETWORK
              </Badge>
              <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-8 tracking-tight font-headline leading-tight">
                Train for Excellence. <br />Partner for Growth.
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-12 font-medium leading-relaxed">
                PADTI Connect bridges the gap between elite driver training and the global logistics ecosystem. 
                Whether you're starting your journey, hiring a fleet, or offering industry services, we provide the platform for professional success.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Aspiring Driver CTA */}
              <Card className="bg-white/95 backdrop-blur-md border-none shadow-2xl rounded-[32px] overflow-hidden group hover:scale-[1.02] transition-all">
                <CardHeader className="p-8 pb-4">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-primary mb-2">For Drivers</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    Get certified, gain experience through internships, and land high-paying roles with verified credentials.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg py-8 rounded-2xl font-bold shadow-xl" asChild>
                    <Link href={driverPath}>
                      {user ? "Explore Training Programs" : "Start Driver Training"} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Partner CTA */}
              <Card className="bg-accent/95 backdrop-blur-md border-none shadow-2xl rounded-[32px] overflow-hidden group hover:scale-[1.02] transition-all">
                <CardHeader className="p-8 pb-4">
                  <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent-foreground group-hover:scale-110 transition-transform">
                    <Handshake className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-accent-foreground mb-2">For Partners</CardTitle>
                  <CardDescription className="text-lg text-accent-foreground/80">
                    Hire verified talent, offer insurance instruments, or connect as a manufacturer within our global ecosystem.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 flex gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="lg" className="flex-1 bg-white text-primary hover:bg-white/90 text-lg py-8 rounded-2xl font-bold shadow-xl border-none gap-2">
                        Join the Ecosystem <ChevronDown className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-64 p-2 rounded-xl border-none shadow-xl">
                      <DropdownMenuItem asChild>
                        <Link href="/auth/signup-partner?role=employer" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-primary" />
                          <span>Employer & Fleet</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/auth/signup-partner?role=insurer" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                          <Scale className="h-4 w-4 text-primary" />
                          <span>Insurance Provider</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/auth/signup-partner?role=manufacturer" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                          <Truck className="h-4 w-4 text-primary" />
                          <span>Equipment Manufacturer</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/auth/signup-partner?role=institution" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                          <Building className="h-4 w-4 text-primary" />
                          <span>Institutional Partner</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-white">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: Users, val: "25k+", label: "Verified Drivers", color: "text-blue-600" },
                { icon: Globe, val: "15+", label: "Countries Served", color: "text-green-600" },
                { icon: Briefcase, val: "850+", label: "Active Job Listings", color: "text-orange-600" },
                { icon: ShieldCheck, val: "100%", label: "Secure Verification", color: "text-primary" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-8 rounded-3xl bg-secondary/20 hover:bg-secondary/40 transition-colors">
                  <stat.icon className={`h-10 w-10 mx-auto mb-4 ${stat.color}`} />
                  <h3 className="text-4xl font-black text-foreground mb-1">{stat.val}</h3>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Industry Insights Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16 space-y-4">
              <Badge className="bg-primary text-white px-4 py-1">GLOBAL IMPACT</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-primary font-headline">Strategic Industry Insights</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Understanding the global logistics landscape and our commitment to excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-xl rounded-[32px] bg-white hover:shadow-2xl transition-all h-full flex flex-col">
                <CardHeader className="p-10 pb-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-primary">Global Career Mobility</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-0 flex-grow">
                  <div className="relative">
                    <Quote className="absolute -left-4 -top-4 h-8 w-8 text-primary/10" />
                    <p className="text-lg italic text-muted-foreground leading-relaxed">
                      "Articulated truck driving is a high-demand global skill. Professional certification from an institutional-grade institute is the primary key to unlocking lucrative international logistics careers."
                    </p>
                  </div>
                  <p className="mt-8 text-xs font-bold text-primary uppercase tracking-widest">— Industry Talent Outlook</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] bg-white hover:shadow-2xl transition-all h-full flex flex-col">
                <CardHeader className="p-10 pb-4">
                  <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <Globe className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-primary">The Global Shortage</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-0 flex-grow">
                  <div className="relative">
                    <Quote className="absolute -left-4 -top-4 h-8 w-8 text-orange-600/10" />
                    <p className="text-lg italic text-muted-foreground leading-relaxed">
                      "The global shortage of truck drivers is set to double by 2028. We must focus on high-quality training and institutional certification to bridge this critical gap in the supply chain."
                    </p>
                  </div>
                  <p className="mt-8 text-xs font-bold text-orange-600 uppercase tracking-widest">— IRU Global Driver Shortage Report</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] bg-primary text-white hover:shadow-2xl transition-all h-full flex flex-col overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <TrendingUp className="h-32 w-32" />
                </div>
                <CardHeader className="p-10 pb-4 relative z-10">
                  <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">NATEP Alignment</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-0 flex-grow relative z-10">
                  <div className="relative">
                    <Quote className="absolute -left-4 -top-4 h-8 w-8 text-white/20" />
                    <p className="text-lg italic text-white/90 leading-relaxed">
                      "Nigeria's National Talent Export Programme (NATEP) aims to position Nigeria as a global hub for talent. PADTI is at the forefront, preparing world-class drivers for the global marketplace."
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">STRATEGIC ALIGNMENT</p>
                    <p className="text-sm font-medium text-white/70">Empowering Nigerian Professionals for Global Deployment.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Institutional Partners */}
        <section className="py-24 bg-white border-y">
          <div className="container px-4 mx-auto text-center">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.3em] mb-12">Institutional Partners & Global Stakeholders</p>
            <div className="flex flex-wrap justify-center items-center gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <div className="flex items-center gap-3 font-black text-2xl"><Building2 className="h-8 w-8" /> DHL GLOBAL</div>
              <div className="flex items-center gap-3 font-black text-2xl"><Building2 className="h-8 w-8" /> MAERSK</div>
              <div className="flex items-center gap-3 font-black text-2xl"><Building2 className="h-8 w-8" /> AXA INSURANCE</div>
              <div className="flex items-center gap-3 font-black text-2xl"><Building2 className="h-8 w-8" /> SCANIA</div>
              <div className="flex items-center gap-3 font-black text-2xl"><Building2 className="h-8 w-8" /> FRSC</div>
              <div className="flex items-center gap-3 font-black text-2xl"><Building2 className="h-8 w-8" /> NATEP</div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <Monitor className="h-[500px] w-[500px] absolute -bottom-20 -left-20" />
            <Briefcase className="h-[500px] w-[500px] absolute -top-20 -right-20" />
          </div>
          <div className="container px-4 mx-auto relative z-10">
            <h2 className="text-4xl md:text-7xl font-bold mb-8 font-headline leading-tight">Join the Future of <br />Articulated Logistics</h2>
            <p className="text-xl md:text-2xl text-white/80 mb-16 max-w-3xl mx-auto font-medium">
              Enroll for elite training or register your organization to access a global network of verified articulated driver talent and services.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 px-12 py-9 text-xl font-bold rounded-2xl shadow-2xl border-none" asChild>
                <Link href={driverPath}>{user ? "View Courses" : "Apply for Training"}</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 px-12 py-9 text-xl font-bold rounded-2xl shadow-xl border-none gap-2">
                    Become a Partner <ChevronDown className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-64 p-2 rounded-xl border-none shadow-2xl">
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup-partner?role=employer" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <span>Employer & Fleet</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup-partner?role=insurer" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Scale className="h-4 w-4 text-primary" />
                      <span>Insurance Provider</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup-partner?role=manufacturer" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Truck className="h-4 w-4 text-primary" />
                      <span>Equipment Manufacturer</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup-partner?role=institution" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Building className="h-4 w-4 text-primary" />
                      <span>Institutional Partner</span>
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
