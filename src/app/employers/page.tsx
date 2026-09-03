"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  BarChart3, 
  Users2, 
  Globe2, 
  ArrowRight, 
  CheckCircle2,
  Building2,
  Zap,
  Search
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function EmployersPage() {
  const partnerImg = PlaceHolderImages.find(img => img.id === "employer-partner");

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
    }
  ];

  const topEmployers = [
    { name: "DHL Global", logo: "DH", industry: "Logistics & Express", location: "Global" },
    { name: "FedEx", logo: "FX", industry: "Parcel Delivery", location: "North America" },
    { name: "Maersk", logo: "MA", industry: "Shipping & Logistics", location: "Global" },
    { name: "LogiTrans", logo: "LT", industry: "European Freight", location: "Europe" },
    { name: "Global Heavy", logo: "GH", industry: "Specialized Transport", location: "Australia" },
    { name: "DeepRoad", logo: "DR", industry: "Long-Haul Freight", location: "United Kingdom" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary py-20 text-white">
          <div className="container px-4 mx-auto text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground px-4 py-1 text-sm font-bold border-none">
              ENTERPRISE PARTNERSHIPS
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-headline leading-tight">
              The World's Elite Talent Pipeline <br />For Articulated Drivers
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto font-medium">
              Join the global logistics leaders who trust PADTI to deliver safe, professional, and performance-verified heavy vehicle operators.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-7 rounded-2xl font-bold border-none shadow-xl" asChild>
                <Link href="/auth/signup">Join as Employer <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 text-lg px-8 py-7 rounded-2xl font-bold border-none shadow-lg">
                Verification Portal
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 font-headline text-primary">Why Partner with PADTI?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We bridge the gap between rigorous training and high-stakes operational requirements.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, idx) => (
                <Card key={idx} className="border-none shadow-md bg-secondary/20 hover:shadow-lg transition-all group rounded-3xl">
                  <CardHeader>
                    <div className="bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Showcase */}
        <section className="py-24 bg-secondary/30">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <Image
                  src={partnerImg?.imageUrl || ""}
                  alt="Employer Partnership"
                  width={800}
                  height={600}
                  className="rounded-[40px] shadow-2xl"
                  data-ai-hint="logistics center"
                />
              </div>
              <div className="lg:w-1/2 space-y-8">
                <Badge variant="secondary" className="bg-primary/10 text-primary font-bold px-3 py-1">INSTITUTIONAL GRADE</Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-primary font-headline">Enterprise Solutions for Modern Fleets</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our platform provides employers with unparalleled visibility into the talent market. From bulk certification verification to predictive performance modeling, we give you the tools to build a safer and more efficient fleet.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Instant Credential Verification",
                    "Safety-First Training Standards",
                    "Direct Hire Pipeline",
                    "Internship Program Management",
                    "Performance Data Access",
                    "Compliance Monitoring"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                      <span className="font-semibold text-primary/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Employers Grid */}
        <section className="py-24 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 font-headline text-primary">Join Leading Employers</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                These industry giants are already sourcing their next generation of talent through PADTI Connect.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {topEmployers.map((emp, idx) => (
                <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-all text-center p-6 rounded-3xl bg-secondary/10 group cursor-default">
                  <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-2xl text-primary group-hover:scale-110 transition-transform shadow-sm">
                    {emp.logo}
                  </div>
                  <h4 className="font-bold text-primary">{emp.name}</h4>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">{emp.industry}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-primary text-white text-center overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <Building2 className="h-[500px] w-[500px] absolute -bottom-20 -left-20" />
            <Search className="h-[500px] w-[500px] absolute -top-20 -right-20" />
          </div>
          <div className="container px-4 mx-auto relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 font-headline">Future-Proof Your Fleet</h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Ready to access the world's most rigorously trained driver talent? Create your employer account today and start sourcing verified excellence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-8 text-xl font-bold rounded-2xl border-none shadow-2xl" asChild>
                <Link href="/auth/signup">Register as Employer</Link>
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 px-10 py-8 text-xl font-bold rounded-2xl border-none shadow-xl">
                Contact Partnership Team
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
