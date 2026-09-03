
"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { 
  Search, 
  MapPin, 
  Building2, 
  DollarSign, 
  Briefcase, 
  Clock, 
  Filter,
  Sparkles,
  GraduationCap,
  UserCheck,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

function CareerMarketplaceContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'opportunities';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const jobs = [
    { 
      id: "job-1",
      title: "Senior Logistics Driver", 
      company: "LogiStream Europe", 
      location: "Hamburg, DE", 
      salary: "€45,000 - €55,000", 
      type: "Full-Time", 
      category: "Job",
      logo: "LS",
      tags: ["CDL A", "International"]
    },
    { 
      id: "job-2",
      title: "Articulated Fleet Operator", 
      company: "Global Trans", 
      location: "Toronto, CA", 
      salary: "$60,000 - $75,000", 
      type: "Full-Time", 
      category: "Job",
      logo: "GT",
      tags: ["Long-Haul"]
    },
    { 
      id: "job-3",
      title: "Logistics Trainee (Paid)", 
      company: "Express Way", 
      location: "London, UK", 
      salary: "€2,400/mo", 
      type: "Paid Internship", 
      category: "Internship",
      logo: "EW",
      tags: ["Entry Level"]
    },
    { 
      id: "job-4",
      title: "Safety Compliance Intern", 
      company: "Deep Road", 
      location: "Chicago, US", 
      salary: "Paid Stipend", 
      type: "Internship", 
      category: "Internship",
      logo: "DR",
      tags: ["Safety"]
    },
  ];

  const drivers = [
    { 
      id: "talent-1",
      name: "Johnathan Doe", 
      title: "Certified CDL A Driver", 
      location: "Hamburg, DE", 
      score: 92, 
      skills: ["Articulated Reversing", "Eco-Driving"], 
      postedBy: "PADTI Institute",
      verified: true 
    },
    { 
      id: "talent-2",
      name: "Sarah Miller", 
      title: "Heavy Haul Specialist", 
      location: "Toronto, CA", 
      score: 95, 
      skills: ["Long-Haul", "Fleet Safety"], 
      postedBy: "Self",
      verified: true 
    },
    { 
      id: "talent-3",
      name: "Michael Chen", 
      title: "Logistics Graduate", 
      location: "Vancouver, CA", 
      score: 88, 
      skills: ["Yard Maneuvers", "Logistics"], 
      postedBy: "Global Agents",
      verified: true 
    },
    { 
      id: "talent-4",
      name: "Elena Rodriguez", 
      title: "Safety Expert", 
      location: "Madrid, ES", 
      score: 94, 
      skills: ["Risk Mitigation", "Maintenance"], 
      postedBy: "PADTI Institute",
      verified: true 
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-primary mb-2 font-headline">Career Marketplace</h1>
            <p className="text-lg text-muted-foreground">The world's premier platform connecting verified logistics talent with global industry leaders.</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-primary px-3 py-1">500+ Active Listings</Badge>
            <Badge className="bg-accent text-accent-foreground px-3 py-1 font-bold">Verified Network</Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <TabsList className="bg-white border p-1 rounded-xl h-12">
              <TabsTrigger value="opportunities" className="rounded-lg py-2 px-6 data-[state=active]:bg-primary data-[state=active]:text-white">
                Opportunities
              </TabsTrigger>
              <TabsTrigger value="talent" className="rounded-lg py-2 px-6 data-[state=active]:bg-primary data-[state=active]:text-white">
                Verified Talent
              </TabsTrigger>
            </TabsList>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search roles, drivers, or locations..." className="pl-10 h-12 rounded-xl border-none shadow-sm text-lg" />
            </div>
            <Button variant="outline" className="h-12 rounded-xl px-6 bg-white border-none shadow-sm font-semibold">
              <Filter className="h-4 w-4 mr-2" /> Filters
            </Button>
          </div>

          <TabsContent value="opportunities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <Card key={job.id} className="border-none shadow-sm hover:shadow-md transition-all overflow-hidden bg-white group">
                  <CardHeader className="flex flex-row items-start gap-4 pb-4">
                    <div className="bg-primary/10 text-primary font-bold w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-xl group-hover:scale-110 transition-transform">
                      {job.logo}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
                        <Badge className={job.category === 'Internship' ? "bg-accent text-accent-foreground border-none" : "bg-secondary text-primary border-none"}>
                          {job.type}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" /> {job.company}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 pb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
                      <DollarSign className="h-4 w-4" /> {job.salary}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {job.category === 'Internship' ? <GraduationCap className="h-4 w-4" /> : <Briefcase className="h-4 w-4" />} 
                      {job.tags[0]}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" /> Posted 2d ago
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl h-11 font-bold" asChild>
                      <Link href={`/career/opportunity/${job.id}`}>
                        {job.category === 'Internship' ? "View Internship Details" : "Apply for Position"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="talent" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drivers.map((driver) => (
                <Card key={driver.id} className="border-none shadow-sm hover:shadow-md transition-all overflow-hidden bg-white group">
                  <CardHeader className="text-center pb-4 pt-8">
                    <div className="relative inline-block mx-auto mb-4">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl group-hover:scale-110 transition-transform">
                        {driver.name.charAt(0)}
                      </div>
                      {driver.verified && (
                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
                          <CheckCircle2 className="h-6 w-6 text-green-500 fill-white" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold">{driver.name}</CardTitle>
                    <CardDescription className="font-medium text-primary/80">{driver.title}</CardDescription>
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-2">
                      <MapPin className="h-3 w-3" /> {driver.location}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-2">
                    <div className="flex justify-around text-center border-y py-4">
                      <div>
                        <p className="text-2xl font-bold text-primary">{driver.score}%</p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Skill Score</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">Active</p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Status</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest text-center">Core Competencies</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {driver.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-[10px] py-0 px-2">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-muted-foreground/60 uppercase pt-2">
                      <ShieldCheck className="h-3 w-3" /> Profile by: <span className="text-primary">{driver.postedBy}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full rounded-xl gap-2 font-bold group-hover:bg-primary group-hover:text-white transition-colors" asChild>
                      <Link href={`/career/talent/${driver.id}`}>
                        <UserCheck className="h-4 w-4" /> View Verified Credentials
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function CareerMarketplacePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-secondary/30">
        <Suspense fallback={<div className="container mx-auto p-12 text-center">Loading marketplace...</div>}>
          <CareerMarketplaceContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
