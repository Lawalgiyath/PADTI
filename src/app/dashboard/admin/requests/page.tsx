"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Building2, UserCheck, Clock, ExternalLink } from "lucide-react";

export default function AdminRequestsPage() {
  const requests = [
    { 
      company: "LogiStream Europe", 
      type: "Premium Partner Application", 
      date: "Oct 24, 2023", 
      status: "Pending",
      details: "Seeking priority access to graduates in Northern Germany region."
    },
    { 
      company: "Global Heavy Lift", 
      type: "Talent Search API Access", 
      date: "Oct 23, 2023", 
      status: "Review Required",
      details: "Requesting integration with internal HR software."
    },
    { 
      company: "Swift Express", 
      type: "Internship Program Sponsorship", 
      date: "Oct 22, 2023", 
      status: "Urgent",
      details: "Applying for the 2024 Winter Graduate Cohort sponsorship."
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Employer Partnership Requests</h1>
        <p className="text-muted-foreground">Review and approve corporate partnerships and institutional requests.</p>
      </div>

      <div className="space-y-4">
        {requests.map((req, idx) => (
          <Card key={idx} className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-secondary/20 pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl shadow-sm">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{req.company}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {req.date}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={req.status === 'Urgent' ? 'destructive' : 'default'} className="rounded-lg">
                  {req.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Request Type</h4>
                    <p className="text-sm font-medium">{req.type}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Details</h4>
                    <p className="text-sm text-muted-foreground">{req.details}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                  <Button className="bg-primary hover:bg-primary/90 gap-2">
                    <Check className="h-4 w-4" /> Approve Partnership
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <X className="h-4 w-4" /> Decline
                  </Button>
                  <Button variant="ghost" className="text-xs text-muted-foreground gap-1">
                    <ExternalLink className="h-3 w-3" /> View Company Profile
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
