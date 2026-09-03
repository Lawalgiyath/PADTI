"use client";

import { Check, X, User, Calendar, ExternalLink } from "lucide-react";

const applications = [
  {
    name: "Alice Johnson",
    program: "Professional CDL Class A",
    date: "Oct 24, 2023",
    status: "New",
    score: "88%",
    details: "Background check cleared. Medical certificate verified.",
  },
  {
    name: "Mark Stevens",
    program: "Advanced Road Safety",
    date: "Oct 23, 2023",
    status: "Pending",
    score: "92%",
    details: "Waiting for secondary ID verification.",
  },
  {
    name: "Elena Rodriguez",
    program: "Fleet Management Specialist",
    date: "Oct 22, 2023",
    status: "Urgent",
    score: "95%",
    details: "Scholarship applicant. Fast-track requested.",
  },
];

export default function AdminApplicationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 font-headline text-3xl text-ink">Platform Applications</h1>
        <p className="font-body text-sm text-muted-foreground">Review and manage institutional applications and student enrollments.</p>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.name} className="border border-border bg-card">
            <div className="flex items-start justify-between border-b border-border bg-secondary p-6">
              <div className="flex items-center gap-3">
                <div className="bg-card p-2.5 text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-headline text-lg text-ink">{app.name}</h2>
                  <p className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" /> Submitted: {app.date}
                  </p>
                </div>
              </div>
              <span
                className={`font-body text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${
                  app.status === "Urgent" ? "bg-destructive text-destructive-foreground" : "bg-primary/10 text-primary"
                }`}
              >
                {app.status}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
              <div className="space-y-4 md:col-span-2">
                <div className="flex flex-wrap gap-8">
                  <div>
                    <h4 className="mb-1 font-body text-xs font-bold uppercase tracking-widest text-primary">Target Program / Type</h4>
                    <p className="font-body text-sm font-medium text-ink">{app.program}</p>
                  </div>
                  <div>
                    <h4 className="mb-1 font-body text-xs font-bold uppercase tracking-widest text-primary">Eligibility Score</h4>
                    <p className="font-body text-sm font-bold text-primary">{app.score}</p>
                  </div>
                </div>
                <div>
                  <h4 className="mb-1 font-body text-xs font-bold uppercase tracking-widest text-primary">Status Note</h4>
                  <p className="font-body text-sm text-muted-foreground">{app.details}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2">
                <button className="flex items-center justify-center gap-2 bg-sage py-3 font-body text-xs font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
                  <Check className="h-4 w-4" /> Approve Application
                </button>
                <button className="flex items-center justify-center gap-2 border border-border py-3 font-body text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-secondary">
                  <X className="h-4 w-4" /> Reject
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2 font-body text-xs font-bold text-primary hover:underline">
                  <ExternalLink className="h-3 w-3" /> View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
