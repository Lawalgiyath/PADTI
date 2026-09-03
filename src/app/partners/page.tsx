
"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  Globe2, 
  ArrowRight, 
  CheckCircle2,
  Building2,
  Scale,
  Truck,
  Building,
  HeartHandshake,
  ChevronDown,
  Search,
  Network
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function PartnersPage() {
  const partnerTypes = [
    {
      title: "Employers & Fleets",
      description: "Access our verified talent pool to build safer, more efficient fleets with pre-screened, rigs-ready professionals.",
      icon: Building2,
      features: ["Bulk Verification", "Direct Recruitment", "Performance Analytics"]
    },
    {
      title: "Insurance Companies",
      description: "Develop data-driven insurance instruments for drivers based on their institutional scores and safety records.",
      icon: Scale,
      features: ["Risk Assessment API", "Score-Based Premiums", "Claims Mitigation"]
    },
    {
      title: "Equipment Manufacturers",
      description: "Connect with the next generation of buyers and fleet managers looking for cutting-edge articulated vehicles.",
      icon: Truck,
      features: ["Brand Integration", "Product Demo Labs", "Purchase Pipeline"]
    },
    {
      title: "Institutional Partners",
      description: "Governments, NGOs, and Embassies looking to facilitate cross-border logistics and workforce development.",
      icon: Building,
      features: ["Visa Support Data", "Compliance Audits", "Workforce Grants"]
    }
  ];

  const partnersList = [
    { name: "AXA Insurance", logo: "AX", type: "Insurance" },
    { name: "Scania Group", logo: "SG", type: "Equipment" },
    { name: "DHL Global", logo: "DH", type: "Employer" },
    { name: "EU Logistics Council", logo: "EU", type: "Institutional" },
    { name: "Maersk Line", logo: "ML", type: "Logistics" },
    { name: "Volvo Trucks", logo: "VT", type: "Equipment" },
    { name: "Allianz", logo: "AZ", type: "Insurance" },
    { name: "FedEx Express", logo: "FE", type: "Logistics" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary py-24 text-white">
          <div className="container px-4 mx-auto text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground px-4 py-1 text-sm font-bold border-none">
              GLOBAL PARTNER ECOSYSTEM
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-headline leading-tight">
              A Unified Ecosystem for <br />Global Logistics Excellence
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto font-medium">
              Join the world's leading organizations integrating with the PADTI score-based system to drive safety, efficiency, and growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-7 rounded-2xl font-bold border-none shadow-xl gap-2">
                    Register as Partner <ChevronDown className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-64 p-2 rounded-xl border-none shadow-2xl">
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup?role=employer" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <span>Employer & Fleet</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup?role=insurer" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Scale className="h-4 w-4 text-primary" />
                      <span>Insurance Company</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup?role=manufacturer" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Truck className="h-4 w-4 text-primary" />
                      <span>Equipment Manufacturer</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup?role=institution" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Building className="h-4 w-4 text-primary" />
                      <span>Institutional Partner</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 text-lg px-8 py-7 rounded-2xl font-bold border-none shadow-lg" asChild>
                <Link href="/partners/directory">Explore Partner Network <Network className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Partner Categories Grid */}
        <section className="py-24 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 font-headline text-primary">How You Can Partner With Us</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our platform provides tailored solutions for every stakeholder in the logistics supply chain.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {partnerTypes.map((partner, idx) => (
                <Card key={idx} className="border-none shadow-sm bg-secondary/20 hover:shadow-md transition-all group rounded-[32px] overflow-hidden">
                  <div className="p-10 flex flex-col md:flex-row gap-8">
                    <div className="bg-primary text-white w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                      <partner.icon className="h-8 w-8" />
                    </div>
                    <div className="space-y-4">
                      <CardTitle className="text-2xl font-bold text-primary">{partner.title}</CardTitle>
                      <p className="text-muted-foreground leading-relaxed text-lg">{partner.description}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {partner.features.map((feature, i) => (
                          <Badge key={i} variant="outline" className="border-primary/20 text-primary bg-white/50">{feature}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* The Power of the Score Section */}
        <section className="py-24 bg-secondary/30 text-center">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto space-y-8">
              <Badge variant="secondary" className="bg-primary/10 text-primary font-bold px-3 py-1">THE PADTI PERFORMANCE SCORE</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-primary font-headline">Driving Decisions Through Data</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                The core of our ecosystem is a proprietary performance score. This data point is a live, institutional-grade metric that allows insurers to lower premiums for high-scorers and manufacturers to identify high-volume potential clients.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left pt-8">
                {[
                  "Live Performance Telemetry",
                  "Tamper-Proof Verification",
                  "Risk Prediction Modeling",
                  "Asset Utilization Data",
                  "Cross-Border Compliance",
                  "Direct Hire Matching"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-secondary">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                    <span className="font-semibold text-primary/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Global Network Section */}
        <section className="py-24 bg-white overflow-hidden text-center">
          <div className="container px-4 mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 font-headline text-primary">Global Strategic Network</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join our network of industry leaders who are setting the new global standard.
              </p>
            </div>
            
            <div className="relative">
              <div className="flex overflow-x-auto pb-12 gap-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4">
                {partnersList.map((partner, idx) => (
                  <div 
                    key={idx} 
                    className="flex-shrink-0 w-[280px] snap-center p-10 bg-secondary/10 rounded-[40px] hover:bg-secondary/20 transition-all group cursor-default border border-transparent hover:border-primary/10 shadow-sm hover:shadow-md"
                  >
                    <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-3xl text-primary shadow-lg border-4 border-secondary transition-transform group-hover:scale-110">
                      {partner.logo}
                    </div>
                    <h4 className="font-bold text-primary text-xl truncate">{partner.name}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-2">{partner.type} Partner</p>
                  </div>
                ))}
              </div>
              <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white to-transparent pointer-events-none hidden md:block"></div>
              <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white to-transparent pointer-events-none hidden md:block"></div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-primary text-white text-center overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <HeartHandshake className="h-[500px] w-[500px] absolute -bottom-20 -left-20" />
            <Globe2 className="h-[500px] w-[500px] absolute -top-20 -right-20" />
          </div>
          <div className="container px-4 mx-auto relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 font-headline">Ready to Scale With Us?</h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Whether you are an employer seeking talent or a manufacturer looking for growth, our ecosystem is ready to integrate your services.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-8 text-xl font-bold rounded-2xl border-none shadow-2xl gap-2">
                    Apply for Partnership <ChevronDown className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-64 p-2 rounded-xl border-none shadow-2xl">
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup?role=employer" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <span>Employer & Fleet</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup?role=insurer" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Scale className="h-4 w-4 text-primary" />
                      <span>Insurance Company</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup?role=manufacturer" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Truck className="h-4 w-4 text-primary" />
                      <span>Equipment Manufacturer</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup?role=institution" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Building className="h-4 w-4 text-primary" />
                      <span>Institutional Partner</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 px-10 py-8 text-xl font-bold rounded-2xl border-none shadow-xl" asChild>
                <Link href="/partners/directory">Browse Partner Directory</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
