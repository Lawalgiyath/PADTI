"use client";

import { use } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Building2, 
  DollarSign, 
  Briefcase, 
  Clock, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Truck,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // Mock data for the detailed view
  const jobDetails = {
    title: id.includes('job-1') ? "Senior Logistics Driver" : "Professional Driver Opportunity",
    company: "LogiStream Europe",
    location: "Hamburg, Germany",
    salary: "€45,000 - €55,000 / Year",
    type: "Full-Time",
    posted: "2 days ago",
    description: "We are seeking a highly skilled and safety-conscious Senior Logistics Driver to join our European fleet operations. In this role, you will be responsible for the long-haul transport of goods across international borders, ensuring timely delivery and maintaining the highest institutional standards of vehicle care and road safety.",
    requirements: [
      "Certified PADTI Professional (CDL Class A Equivalent)",
      "Minimum 3 years of articulated vehicle experience",
      "Clean safety record and verified performance score > 85%",
      "Fluency in English (German or French is a plus)",
      "Valid international passport and work authorization"
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Premium Euro 6 tractor units with full maintenance support",
      "Health and dental insurance coverage",
      "Ongoing professional development labs at PADTI centers",
      "Paid relocation assistance (if applicable)"
    ],
    schedule: "5 Days on / 2 Days off rotating roster",
    equipment: "Mercedes-Benz Actros (latest gen) / Scania R-Series"
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <Link href="/career" className="inline-flex items-center text-primary font-bold hover:underline mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Marketplace
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary text-white font-bold">{jobDetails.type}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {jobDetails.posted}
                  </span>
                </div>
                <h1 className="text-4xl font-extrabold text-primary font-headline">{jobDetails.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-lg font-medium text-muted-foreground">
                  <span className="flex items-center gap-1"><Building2 className="h-5 w-5" /> {jobDetails.company}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-5 w-5" /> {jobDetails.location}</span>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-10 rounded-2xl font-bold text-lg shadow-xl border-none">
                  Apply Now
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="border-none shadow-sm overflow-hidden rounded-[24px]">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Role Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {jobDetails.description}
                    </p>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-primary">Core Requirements</h3>
                      <ul className="space-y-3">
                        {jobDetails.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-primary">Benefits & Perks</h3>
                      <ul className="space-y-3">
                        {jobDetails.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <Sparkles className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-none shadow-sm rounded-[24px] bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Job Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Compensation</p>
                      <p className="text-xl font-bold text-primary">{jobDetails.salary}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Institutional Matching</p>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-accent" />
                        <span className="font-bold text-lg">94% Fit Score</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Primary Equipment</p>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Truck className="h-4 w-4" /> {jobDetails.equipment}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Work Schedule</p>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> {jobDetails.schedule}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full rounded-xl font-bold border-primary text-primary hover:bg-primary/5">
                      Save to Dashboard
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-none shadow-lg bg-primary text-white rounded-[24px]">
                  <CardHeader>
                    <CardTitle className="text-lg">Employer Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-white/70">For specific inquiries regarding this listing, you can reach out to the recruitment agent directly.</p>
                    <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold border-none">Message Agent</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}