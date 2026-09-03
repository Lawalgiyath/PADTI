
"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Scale, FileText, CheckCircle2, TrendingUp, Info } from "lucide-react";

export default function InsuranceMarketplacePage() {
  const plans = [
    {
      title: "Score-Based Professional Liability",
      provider: "AXA Institutional",
      description: "Premiums dynamically adjusted based on your PADTI Performance Score. High-scorers save up to 40%.",
      coverage: "Up to €5M per incident",
      features: ["Performance Discount", "Global Coverage", "Instant Verification"],
      category: "Driver Focus"
    },
    {
      title: "Fleet Integrity Shield",
      provider: "Allianz Global",
      description: "Comprehensive fleet insurance for logistics partners hiring exclusively PADTI graduates.",
      coverage: "Asset & Cargo Protection",
      features: ["Pre-Screened Talent Bonus", "24/7 Roadside Assistance", "Compliance Audits"],
      category: "Fleet Focus"
    },
    {
      title: "Health & Mobility Plus",
      provider: "Bupa Professional",
      description: "International health coverage designed for long-haul drivers crossing multiple jurisdictions.",
      coverage: "Full Medical + Repatriation",
      features: ["No Borders Clause", "Telehealth Support", "Disability Benefits"],
      category: "Personal Focus"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <Badge className="bg-primary text-white px-4 py-1">INSURANCE INSTRUMENTS</Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold text-primary font-headline">Score-Driven Protection</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Access specialized insurance products that reward professional excellence and safety-first driving.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {plans.map((plan, idx) => (
                <Card key={idx} className="border-none shadow-sm hover:shadow-xl transition-all rounded-[32px] overflow-hidden flex flex-col bg-white">
                  <CardHeader className="p-8 pb-4">
                    <div className="bg-primary/10 text-primary font-bold w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="w-fit mb-2 border-primary text-primary">{plan.category}</Badge>
                    <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                    <CardDescription className="font-bold text-primary/80">{plan.provider}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-4 flex-grow space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>
                    <div className="p-4 bg-secondary/30 rounded-2xl">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Coverage Limit</p>
                      <p className="font-bold text-primary">{plan.coverage}</p>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm font-medium">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-8 pt-0">
                    <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl font-bold h-12">
                      Request Quote
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-blue-900 to-primary text-white border-none rounded-[40px] shadow-xl overflow-hidden relative">
              <div className="absolute right-0 top-0 p-12 opacity-10">
                <TrendingUp className="h-48 w-48" />
              </div>
              <CardContent className="p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Insurers: Integrate Your API</h2>
                  <p className="text-white/80 text-lg max-w-xl">
                    Connect your risk assessment engine directly to the PADTI verification API to offer real-time, score-based instruments.
                  </p>
                </div>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl px-10 py-7 text-lg font-bold border-none shadow-lg">
                  Developer Portal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
