
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
  CheckCircle2,
  Truck,
  Wrench,
  Star,
  HeartHandshake,
  Phone,
  Settings,
  Users
} from "lucide-react";

function MarketplaceHubContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'opportunities';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const jobs = [
    { id: "job-1", title: "Senior Logistics Driver", company: "LogiStream Europe", location: "Hamburg, DE", salary: "€45,000 - €55,000", type: "Full-Time", logo: "LS", tags: ["CDL A"] },
    { id: "job-2", title: "Articulated Fleet Operator", company: "Global Trans", location: "Toronto, CA", salary: "$60,000 - $75,000", type: "Full-Time", logo: "GT", tags: ["Long-Haul"] },
    { id: "job-3", title: "Logistics Trainee (Paid)", company: "Express Way", location: "London, UK", salary: "€2,400/mo", type: "Internship", logo: "EW", tags: ["Entry Level"] },
  ];

  const drivers = [
    { id: "talent-1", name: "Johnathan Doe", title: "Certified CDL A Driver", location: "Hamburg, DE", score: 92, verified: true },
    { id: "talent-2", name: "Sarah Miller", title: "Heavy Haul Specialist", location: "Toronto, CA", score: 95, verified: true },
  ];

  const insurancePlans = [
    { title: "Score-Based Liability", provider: "AXA Institutional", scoreImpact: "High Scorers Save 40%", limit: "€5M" },
    { title: "Fleet Integrity Shield", provider: "Allianz Global", scoreImpact: "Pre-Screened Talent Bonus", limit: "Cargo Focused" },
  ];

  const equipment = [
    { name: "Scania R-Series (Euro 6)", provider: "Scania Global", price: "From €125,000", condition: "New" },
    { name: "Mercedes-Benz Actros Electric", provider: "Daimler Truck", price: "Contact for Lease", condition: "Available" },
  ];

  const services = [
    { title: "Mobile Articulated Maintenance", provider: "FleetFix Global", rating: 4.9, tags: ["24/7 Support"] },
    { title: "Digital Compliance Audit", provider: "SafeLogistics Ltd", rating: 4.8, tags: ["Global Standards"] },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-primary mb-2 font-headline">Institutional Marketplace</h1>
            <p className="text-lg text-muted-foreground">The world's central hub for logistics opportunities, talent, and industry assets.</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-primary px-3 py-1 text-[10px] uppercase font-bold tracking-widest">Verified Ecosystem</Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <TabsList className="bg-white border p-1 rounded-xl h-auto flex flex-wrap justify-start">
              <TabsTrigger value="opportunities" className="rounded-lg py-2.5 px-6 data-[state=active]:bg-primary data-[state=active]:text-white gap-2">
                <Briefcase className="h-4 w-4" /> Opportunities
              </TabsTrigger>
              <TabsTrigger value="talent" className="rounded-lg py-2.5 px-6 data-[state=active]:bg-primary data-[state=active]:text-white gap-2">
                <Users className="h-4 w-4" /> Verified Talent
              </TabsTrigger>
              <TabsTrigger value="insurance" className="rounded-lg py-2.5 px-6 data-[state=active]:bg-primary data-[state=active]:text-white gap-2">
                <ShieldCheck className="h-4 w-4" /> Insurances
              </TabsTrigger>
              <TabsTrigger value="equipment" className="rounded-lg py-2.5 px-6 data-[state=active]:bg-primary data-[state=active]:text-white gap-2">
                <Truck className="h-4 w-4" /> Equipment
              </TabsTrigger>
              <TabsTrigger value="services" className="rounded-lg py-2.5 px-6 data-[state=active]:bg-primary data-[state=active]:text-white gap-2">
                <Wrench className="h-4 w-4" /> Services
              </TabsTrigger>
            </TabsList>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search the ecosystem..." className="pl-10 h-12 rounded-xl border-none shadow-sm text-lg" />
            </div>
          </div>

          <TabsContent value="opportunities" className="animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <Card key={job.id} className="border-none shadow-sm hover:shadow-md transition-all bg-white overflow-hidden group">
                  <CardHeader className="flex flex-row items-start gap-4 pb-4">
                    <div className="bg-primary/10 text-primary font-bold w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-xl group-hover:scale-110 transition-transform">
                      {job.logo}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
                        <Badge variant="secondary" className="border-none font-bold">{job.type}</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" /> {job.company}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 pb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {job.location}</div>
                    <div className="flex items-center gap-2 text-sm font-bold text-primary"><DollarSign className="h-4 w-4" /> {job.salary}</div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl font-bold" asChild>
                      <Link href={`/marketplace/opportunity/${job.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="talent" className="animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drivers.map((driver) => (
                <Card key={driver.id} className="border-none shadow-sm hover:shadow-md transition-all bg-white text-center p-6 rounded-[32px] group">
                  <div className="relative inline-block mx-auto mb-4">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl group-hover:scale-110 transition-transform">
                      {driver.name.charAt(0)}
                    </div>
                    {driver.verified && <CheckCircle2 className="absolute bottom-0 right-0 h-6 w-6 text-green-500 fill-white" />}
                  </div>
                  <CardTitle className="text-xl font-bold mb-1">{driver.name}</CardTitle>
                  <p className="text-sm font-medium text-primary/80 mb-4">{driver.title}</p>
                  <div className="flex justify-around text-center border-y py-4 mb-6 border-secondary">
                    <div><p className="text-xl font-bold text-primary">{driver.score}%</p><p className="text-[10px] uppercase font-bold text-muted-foreground">Score</p></div>
                    <div><p className="text-xl font-bold text-green-600">Active</p><p className="text-[10px] uppercase font-bold text-muted-foreground">Status</p></div>
                  </div>
                  <Button variant="outline" className="w-full rounded-xl font-bold" asChild>
                    <Link href={`/marketplace/talent/${driver.id}`}>Verify Credentials</Link>
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insurance" className="animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {insurancePlans.map((plan, idx) => (
                <Card key={idx} className="border-none shadow-sm hover:shadow-xl transition-all rounded-[32px] bg-white group">
                  <CardHeader className="p-8 pb-4">
                    <div className="bg-primary/10 text-primary w-12 h-12 rounded-xl flex items-center justify-center mb-6"><ShieldCheck className="h-6 w-6" /></div>
                    <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                    <CardDescription className="font-bold text-primary/70">{plan.provider}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-4 space-y-4">
                    <div className="p-4 bg-secondary/30 rounded-2xl">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Premium Benefit</p>
                      <p className="font-bold text-primary">{plan.scoreImpact}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Coverage Limit: {plan.limit}</p>
                  </CardContent>
                  <CardFooter className="p-8 pt-0">
                    <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl h-12 font-bold">Request Quote</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="equipment" className="animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {equipment.map((item, idx) => (
                <Card key={idx} className="border-none shadow-sm hover:shadow-xl transition-all rounded-[32px] bg-white group overflow-hidden">
                  <div className="h-48 bg-secondary/50 flex items-center justify-center relative"><Truck className="h-20 w-20 text-primary/20" /></div>
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-2xl font-bold">{item.name}</CardTitle>
                    <CardDescription className="font-bold text-primary/70">{item.provider}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-4 flex justify-between items-center border-t border-secondary">
                    <span className="text-lg font-black text-primary">{item.price}</span>
                    <Badge variant="outline" className="border-primary text-primary font-bold">{item.condition}</Badge>
                  </CardContent>
                  <CardFooter className="p-8 pt-0">
                    <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl h-12 font-bold">Inquire Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, idx) => (
                <Card key={idx} className="border-none shadow-sm hover:shadow-xl transition-all rounded-[32px] bg-white group">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-primary/10 text-primary w-12 h-12 rounded-xl flex items-center justify-center"><Wrench className="h-6 w-6" /></div>
                      <div className="flex items-center gap-1 text-sm font-bold text-orange-500"><Star className="h-4 w-4 fill-current" /> {service.rating}</div>
                    </div>
                    <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                    <CardDescription className="font-medium mt-1">{service.provider}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-4">
                    <div className="flex flex-wrap gap-2">{service.tags.map((tag, i) => <Badge key={i} variant="secondary" className="bg-secondary/50 text-[10px] uppercase font-bold">{tag}</Badge>)}</div>
                  </CardContent>
                  <CardFooter className="p-8 pt-0">
                    <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl h-12 font-bold gap-2"><Phone className="h-4 w-4" /> Book Consultation</Button>
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

export default function MarketplacePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-secondary/30">
        <Suspense fallback={<div className="container mx-auto p-12 text-center">Loading marketplace ecosystem...</div>}>
          <MarketplaceHubContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
