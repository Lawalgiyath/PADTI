"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Briefcase, 
  CheckCircle2, 
  GraduationCap, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Truck
} from "lucide-react";
import Link from "next/link";

export default function ProgramsPage() {
  const programs = [
    {
      id: "cdl-a",
      title: "Professional CDL Class A (Heavy Haul)",
      description: "Our flagship program designed for complete mastery of long-haul articulated vehicles. Includes intensive simulator training and real-world road time.",
      duration: "8 Weeks",
      cost: "₦1,500,000",
      careers: ["Long-Haul Driver", "Heavy Equipment Transporter", "Owner-Operator"],
      features: ["Full Simulator Access", "Fuel Efficiency Training", "International Licensing Support"],
      level: "Professional"
    },
    {
      id: "safety-expert",
      title: "Advanced Road Safety & Fuel Efficiency",
      description: "A specialized certification for experienced drivers looking to optimize fleet performance and maintain the highest institutional safety standards.",
      duration: "4 Weeks",
      cost: "₦550,000",
      careers: ["Safety Compliance Officer", "Fleet Training Lead", "Eco-Driving Consultant"],
      features: ["Advanced Telematics", "Risk Mitigation Certification", "Fuel Optimization Analysis"],
      level: "Specialist"
    },
    {
      id: "fleet-mgmt",
      title: "Fleet Management & Logistics Specialist",
      description: "Comprehensive management training for the next generation of logistics leaders. Covers supply chain optimization and digital fleet monitoring.",
      duration: "12 Weeks",
      cost: "₦2,500,000",
      careers: ["Logistics Manager", "Dispatch Supervisor", "Supply Chain Coordinator"],
      features: ["ERP Integration Training", "Staff Management Labs", "Global Logistics Certification"],
      level: "Enterprise"
    },
    {
      id: "upgrade-training",
      title: "Articulated Upgrade: Standard to Heavy Vehicle",
      description: "A bridging program for drivers with standard class licenses looking to transition into the high-demand articulated heavy vehicle sector.",
      duration: "6 Weeks",
      cost: "₦750,000",
      careers: ["Articulated Truck Driver", "Urban Distribution Specialist", "Logistics Lead"],
      features: ["Transition Maneuver Labs", "Heavy Load Physics", "Professional Heavy Driving"],
      level: "Technical Upgrade"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-primary py-20 text-white">
          <div className="container px-4 mx-auto text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground px-4 py-1 text-sm font-bold border-none">
              PADTI CURRICULUM
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-headline">Our Courses</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed">
              Global-standard certifications designed to turn aspiring drivers into elite professionals and current operators into logistics leaders. Our training programs are fully FRSC-compliant and meet all statutory licensing requirements.
            </p>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-24 bg-secondary/20">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programs.map((program) => (
                <Card key={program.id} className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white group hover:scale-[1.01] transition-transform">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline" className="border-primary text-primary font-bold">
                        {program.level}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                        <Clock className="h-4 w-4" /> {program.duration}
                      </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-primary mb-4">{program.title}</CardTitle>
                    <CardDescription className="text-lg leading-relaxed">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    {/* Career Outcomes */}
                    <div>
                      <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Briefcase className="h-4 w-4" /> Target Career Paths
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {program.careers.map((career, i) => (
                          <Badge key={i} variant="secondary" className="bg-secondary/50 text-foreground py-1 px-3">
                            {career}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {program.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm font-medium">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Cost Display */}
                    <div className="bg-secondary/30 p-6 rounded-2xl flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">Program Tuition</p>
                        <p className="text-3xl font-black text-primary">{program.cost}</p>
                      </div>
                      <Badge className="bg-primary text-white text-[10px] uppercase font-black px-3 py-1">Installments Available</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-8 pt-0">
                    <Button className="w-full bg-primary hover:bg-primary/90 py-7 text-lg font-bold rounded-2xl shadow-lg" asChild>
                      <Link href={`/enroll/${program.id}`}>Apply for Enrollment <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Global Standard Section */}
        <section className="py-24 bg-white">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto space-y-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-primary font-headline">Why Train with PADTI?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our curriculum is developed in direct collaboration with the world's leading logistics firms. We don't just teach you how to drive; we train you to meet the operational and safety requirements of global fleets.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
                {[
                  { title: "Institutional Grade Equipment", icon: Truck, desc: "Train on the latest Euro 6 and Electric articulated units." },
                  { title: "Advanced VR & Simulators", icon: Zap, desc: "Hone your skills in high-risk scenarios without the real-world danger." },
                  { title: "Direct Career Pipeline", icon: Briefcase, desc: "Graduates get priority placement in the PADTI Career Marketplace." },
                  { title: "Global Accreditation", icon: ShieldCheck, desc: "Certificates verified by our international logistics partners." }
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-3xl bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary h-fit">
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-white text-center">
          <div className="container px-4 mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 font-headline leading-tight">Ready to Master <br />the Articulated World?</h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Enrollment is currently open for the current cohort. Secure your spot in the world's most rigorous articulated driver training program.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 px-12 py-8 text-xl font-bold rounded-2xl shadow-xl border-none" asChild>
                <Link href="/auth/signup">Register Student Account</Link>
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 px-12 py-8 text-xl font-bold rounded-2xl shadow-lg border-none">
                Download Brochure
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
