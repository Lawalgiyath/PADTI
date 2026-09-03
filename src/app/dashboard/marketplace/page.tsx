"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Building2, UserCheck, Briefcase, Star, Filter, GraduationCap } from "lucide-react";

function DriverMarketplace() {
  const jobAds = [
    { title: "Senior Logistics Driver", company: "DHL Global", location: "Bonn, DE", salary: "Competitive", type: "Full-Time", category: "Job" },
    { title: "Articulated Fleet Operator", company: "Maersk", location: "Copenhagen, DK", salary: "Market Rate", type: "Full-Time", category: "Job" },
    { title: "Logistics Trainee (Paid)", company: "FedEx Express", location: "Paris, FR", salary: "€1,800/mo", type: "Internship", category: "Internship" },
    { title: "Fleet Management Intern", company: "LogiStream", location: "London, UK", salary: "Unpaid (Academic Credit)", type: "Internship", category: "Internship" },
    { title: "Night Shift Long-Haul", company: "Deep Road", location: "Manchester, UK", salary: "Premium", type: "Contract", category: "Job" },
    { title: "Junior Yard Marshall", company: "Global Trans", location: "Berlin, DE", salary: "€2,200/mo", type: "Paid Internship", category: "Internship" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Hot Jobs & Internships</h1>
          <p className="text-muted-foreground">Premium listings and training placements from PADTI's global network.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobAds.map((ad, idx) => (
          <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-all group flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge className={ad.category === 'Internship' ? "bg-accent text-accent-foreground font-bold" : "bg-primary/10 text-primary border-none font-bold"}>
                  {ad.category === 'Internship' ? <GraduationCap className="h-3 w-3 mr-1" /> : <Briefcase className="h-3 w-3 mr-1" />}
                  {ad.type}
                </Badge>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{ad.category}</span>
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors min-h-[3.5rem] line-clamp-2">{ad.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 font-medium">
                <Building2 className="h-3 w-3" /> {ad.company}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {ad.location}
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary/80">
                <span className="text-muted-foreground font-normal">Compensation:</span> {ad.salary}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 p-2 rounded-lg">
                <Star className="h-4 w-4 text-accent fill-accent" /> 
                <span>High Match for your Curriculum (94%)</span>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl font-bold">
                {ad.category === 'Internship' ? "Apply for Placement" : "Apply for Job"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function EmployerMarketplace() {
  const candidates = [
    { name: "Johnathan Doe", score: 92, location: "Hamburg, DE", skills: ["Articulated Reversing", "Eco-Driving"] },
    { name: "Sarah Miller", score: 95, location: "Toronto, CA", skills: ["Long-Haul", "Fleet Safety"] },
    { name: "Michael Chen", score: 88, location: "Vancouver, CA", skills: ["Yard Maneuvers", "Logistics"] },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Verified Talent Search</h1>
          <p className="text-muted-foreground">Direct access to PADTI's top-performing graduates.</p>
        </div>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-bold">Advanced Search</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {candidates.map((driver, idx) => (
          <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-all">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary font-bold text-xl">
                {driver.name.charAt(0)}
              </div>
              <CardTitle className="text-lg">{driver.name}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-1">
                <MapPin className="h-3 w-3" /> {driver.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-around text-center border-y py-4">
                <div>
                  <p className="text-xl font-bold text-primary">{driver.score}%</p>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Score</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-green-600">Active</p>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Status</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {driver.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="text-[10px]">{skill}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full rounded-xl gap-2">
                <UserCheck className="h-4 w-4" /> View Full Credentials
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MarketplaceDispatcher() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'driver';

  if (role === 'employer') return <EmployerMarketplace />;
  return <DriverMarketplace />;
}

export default function MarketplaceDashboard() {
  return (
    <Suspense fallback={<div>Loading Marketplace...</div>}>
      <MarketplaceDispatcher />
    </Suspense>
  );
}
