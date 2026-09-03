
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, User, Calendar, ExternalLink } from "lucide-react";

export default function AdminApplicationsPage() {
  const applications = [
    { 
      name: "Alice Johnson", 
      program: "Professional CDL Class A", 
      date: "Oct 24, 2023", 
      status: "New",
      score: "88%",
      details: "Background check cleared. Medical certificate verified."
    },
    { 
      name: "Mark Stevens", 
      program: "Advanced Road Safety", 
      date: "Oct 23, 2023", 
      status: "Pending",
      score: "92%",
      details: "Waiting for secondary ID verification."
    },
    { 
      name: "Elena Rodriguez", 
      program: "Fleet Management Specialist", 
      date: "Oct 22, 2023", 
      status: "Urgent",
      score: "95%",
      details: "Scholarship applicant. Fast-track requested."
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Platform Applications</h1>
        <p className="text-muted-foreground">Review and manage institutional applications and student enrollments.</p>
      </div>

      <div className="space-y-4">
        {applications.map((app, idx) => (
          <Card key={idx} className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-secondary/20 pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl shadow-sm">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{app.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Submitted: {app.date}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={app.status === 'Urgent' ? 'destructive' : 'default'} className="rounded-lg">
                  {app.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div className="flex gap-8">
                    <div>
                      <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Target Program / Type</h4>
                      <p className="text-sm font-medium">{app.program}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Eligibility Score</h4>
                      <p className="text-sm font-bold text-green-600">{app.score}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Status Note</h4>
                    <p className="text-sm text-muted-foreground">{app.details}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                  <Button className="bg-primary hover:bg-primary/90 gap-2">
                    <Check className="h-4 w-4" /> Approve Application
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <X className="h-4 w-4" /> Reject
                  </Button>
                  <Button variant="ghost" className="text-xs text-muted-foreground gap-1">
                    <ExternalLink className="h-3 w-3" /> View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
