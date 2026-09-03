"use client";

import { use } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Award,
  ArrowLeft,
  Truck,
  TrendingUp,
  Brain,
  History,
  FileText,
  UserCheck,
  Clock
} from "lucide-react";
import Link from "next/link";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function TalentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // Mock data for the driver profile
  const talent = {
    name: "Johnathan Doe",
    title: "Certified CDL A Driver (Heavy Haul)",
    location: "Hamburg, Germany",
    verified: true,
    score: 92,
    hours: 124,
    assessments: 12,
    bio: "I am a PADTI-certified professional articulated driver with a focus on long-haul logistics and road safety. My training includes over 120 hours of combined simulator and real-world road time, mastering complex maneuvers and eco-driving protocols.",
    skills: [
      { name: "Safety", score: 95 },
      { name: "Maneuvers", score: 88 },
      { name: "Eco-Driving", score: 94 },
      { name: "Maintenance", score: 82 },
      { name: "Logistics", score: 90 }
    ],
    certificates: [
      { id: "CERT-9283", name: "Professional CDL Class A Mastery", date: "Oct 2023" },
      { id: "CERT-9102", name: "Advanced Road Safety Protocol", date: "Aug 2023" },
      { id: "CERT-8842", name: "Eco-Fuel Efficiency Specialist", date: "Jun 2023" }
    ],
    experience: [
      { role: "Logistics Trainee", company: "LogiStream Europe", period: "Jul 2023 - Oct 2023" },
      { role: "Yard Assistant", company: "Hamburg Port Ops", period: "Jan 2023 - Jun 2023" }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <Link href="/career" className="inline-flex items-center text-primary font-bold hover:underline mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Marketplace
            </Link>

            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-8 rounded-[32px] shadow-sm border-none">
              <div className="relative">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-[40px] bg-primary/10 flex items-center justify-center text-primary font-bold text-5xl">
                  {talent.name.charAt(0)}
                </div>
                {talent.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                    <ShieldCheck className="h-10 w-10 text-green-500 fill-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <h1 className="text-4xl font-extrabold text-primary font-headline">{talent.name}</h1>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1">Verified Graduate</Badge>
                  </div>
                  <p className="text-xl font-semibold text-muted-foreground">{talent.title}</p>
                </div>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium"><MapPin className="h-5 w-5" /> {talent.location}</span>
                  <span className="flex items-center gap-1 font-medium"><Award className="h-5 w-5" /> PADTI ID: PAD-10294</span>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                  <Button className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-xl font-bold gap-2">
                    <UserCheck className="h-5 w-5" /> Hire this Driver
                  </Button>
                  <Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-primary text-primary">
                    Download Full Credentials
                  </Button>
                </div>
              </div>

              <div className="bg-secondary/30 p-8 rounded-[32px] text-center min-w-[200px]">
                <p className="text-5xl font-black text-primary mb-1">{talent.score}%</p>
                <p className="text-xs uppercase font-black text-muted-foreground tracking-widest">Aggregate Score</p>
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
                    <span>Performance</span>
                    <span>Top 5%</span>
                  </div>
                  <Progress value={talent.score} className="h-2" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Analytics */}
                <Card className="border-none shadow-sm rounded-[32px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" /> Skill Performance Analytics
                    </CardTitle>
                    <CardDescription>Breakdown of core competencies from institutional assessments.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={talent.skills}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                        <YAxis hide />
                        <Tooltip cursor={{ fill: '#f8fafc' }} />
                        <Bar dataKey="score" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* About & Bio */}
                <Card className="border-none shadow-sm rounded-[32px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" /> Professional Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-lg leading-relaxed text-muted-foreground italic">
                      "{talent.bio}"
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                          <Award className="h-5 w-5" /> Certifications
                        </h3>
                        <div className="space-y-3">
                          {talent.certificates.map((cert, i) => (
                            <div key={i} className="p-4 bg-secondary/20 rounded-2xl flex justify-between items-center group hover:bg-primary/5 transition-colors">
                              <div>
                                <p className="font-bold text-sm group-hover:text-primary transition-colors">{cert.name}</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{cert.id} • {cert.date}</p>
                              </div>
                              <FileText className="h-4 w-4 text-primary opacity-50" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                          <History className="h-5 w-5" /> Experience
                        </h3>
                        <div className="space-y-3">
                          {talent.experience.map((exp, i) => (
                            <div key={i} className="p-4 border border-dashed rounded-2xl">
                              <p className="font-bold text-sm">{exp.role}</p>
                              <p className="text-xs text-muted-foreground">{exp.company}</p>
                              <p className="text-[10px] text-primary/70 uppercase font-bold mt-1">{exp.period}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
                  <div className="bg-primary p-6 text-white">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" /> Quick Stats
                    </h3>
                  </div>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4" /> Training Hours
                      </span>
                      <span className="font-bold text-primary">{talent.hours}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <FileText className="h-4 w-4" /> Assessments
                      </span>
                      <span className="font-bold text-primary">{talent.assessments}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Truck className="h-4 w-4" /> Vehicle Type
                      </span>
                      <span className="font-bold text-primary">Articulated</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" /> Background
                      </span>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none text-[10px]">CLEARED</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-secondary/10 p-6">
                    <p className="text-[10px] text-center w-full text-muted-foreground italic font-medium">
                      Performance data is real-time and synced directly from PADTI simulation clusters.
                    </p>
                  </CardFooter>
                </Card>

                <Card className="bg-accent text-accent-foreground border-none shadow-xl rounded-[32px]">
                  <CardHeader>
                    <CardTitle className="text-xl font-black italic">TOP MATCH</CardTitle>
                    <CardDescription className="text-accent-foreground/80">Based on your company's profile, this driver is a high-priority match.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-primary text-white hover:bg-primary/90 py-6 rounded-2xl font-bold shadow-lg border-none">
                      Schedule Interview
                    </Button>
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
