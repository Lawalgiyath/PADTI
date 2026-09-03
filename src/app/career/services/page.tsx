
"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench, MapPin, CheckCircle2, Star, Clock, HeartHandshake, Phone } from "lucide-react";

export default function ServicesMarketplacePage() {
  const services = [
    {
      title: "Mobile Articulated Maintenance",
      provider: "FleetFix Global",
      location: "European Network",
      rating: 4.9,
      description: "On-site diagnostic and repair services for heavy vehicle fleets. Minimizing downtime through rapid deployment.",
      tags: ["24/7 Support", "OEM Parts", "Performance Tuning"]
    },
    {
      title: "Digital Compliance Audit",
      provider: "SafeLogistics Ltd",
      location: "London / Virtual",
      rating: 4.8,
      description: "Ensure your fleet meets international safety and environmental regulations with our comprehensive audit services.",
      tags: ["Risk Mitigation", "Certification", "Global Standards"]
    },
    {
      title: "Telematics Integration",
      provider: "TeleLink Solutions",
      location: "Global",
      rating: 5.0,
      description: "End-to-end telematics setup for articulated units. Real-time tracking, fuel monitoring, and driver safety data.",
      tags: ["AI Powered", "Cloud Sync", "Fleet Dashboard"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <Badge className="bg-accent text-accent-foreground px-4 py-1 font-bold border-none">INSTITUTIONAL SERVICES</Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold text-primary font-headline">Support Ecosystem</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover professional services dedicated to maintaining and optimizing global logistics operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <Card key={idx} className="border-none shadow-sm hover:shadow-xl transition-all rounded-[32px] overflow-hidden flex flex-col bg-white">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-primary/10 text-primary font-bold w-12 h-12 rounded-xl flex items-center justify-center">
                        <Wrench className="h-6 w-6" />
                      </div>
                      <div className="flex items-center gap-1 text-sm font-bold text-orange-500">
                        <Star className="h-4 w-4 fill-current" /> {service.rating}
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 font-medium mt-1">
                      <HeartHandshake className="h-4 w-4 text-primary" /> {service.provider}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-4 flex-grow space-y-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold uppercase tracking-widest">
                      <MapPin className="h-3 w-3" /> {service.location}
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {service.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-secondary/50 text-foreground text-[10px] uppercase font-bold px-3">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-8 pt-0">
                    <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl font-bold h-12 gap-2">
                      <Phone className="h-4 w-4" /> Book Consultation
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="bg-white rounded-[40px] shadow-sm p-12 flex flex-col lg:flex-row items-center gap-12 border-none">
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-primary">List Your Professional Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Are you a service provider in the logistics industry? Join our marketplace to connect with fleet managers, drivers, and institutional partners who need your expertise.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 font-semibold text-primary/80">
                    <CheckCircle2 className="h-5 w-5 text-accent" /> Verified Network Access
                  </div>
                  <div className="flex items-center gap-3 font-semibold text-primary/80">
                    <CheckCircle2 className="h-5 w-5 text-accent" /> Direct B2B Engagement
                  </div>
                </div>
                <Button className="bg-primary rounded-xl px-10 h-14 font-bold text-lg">Apply as Provider</Button>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                <div className="p-8 bg-secondary/30 rounded-3xl text-center">
                  <p className="text-4xl font-black text-primary mb-1">200+</p>
                  <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Active Providers</p>
                </div>
                <div className="p-8 bg-secondary/30 rounded-3xl text-center">
                  <p className="text-4xl font-black text-primary mb-1">15k+</p>
                  <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Service Requests</p>
                </div>
                <div className="p-8 bg-secondary/30 rounded-3xl text-center">
                  <p className="text-4xl font-black text-primary mb-1">98%</p>
                  <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Client Satisfaction</p>
                </div>
                <div className="p-8 bg-secondary/30 rounded-3xl text-center">
                  <p className="text-4xl font-black text-primary mb-1">24h</p>
                  <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Avg Response Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
