"use client";

import { Check, X, Building2, Clock, ExternalLink } from "lucide-react";

const requests = [
  {
    company: "LogiStream Europe",
    type: "Premium Partner Application",
    date: "Oct 24, 2023",
    status: "Pending",
    details: "Seeking priority access to graduates in Northern Germany region.",
  },
  {
    company: "Global Heavy Lift",
    type: "Talent Search API Access",
    date: "Oct 23, 2023",
    status: "Review Required",
    details: "Requesting integration with internal HR software.",
  },
  {
    company: "Swift Express",
    type: "Internship Program Sponsorship",
    date: "Oct 22, 2023",
    status: "Urgent",
    details: "Applying for the 2024 Winter Graduate Cohort sponsorship.",
  },
];

export default function AdminRequestsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 font-headline text-3xl text-ink">Employer Partnership Requests</h1>
        <p className="font-body text-sm text-muted-foreground">Review and approve corporate partnerships and institutional requests.</p>
      </div>

      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.company} className="border border-border bg-card">
            <div className="flex items-start justify-between border-b border-border bg-secondary p-6">
              <div className="flex items-center gap-3">
                <div className="bg-card p-2.5 text-primary">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-headline text-lg text-ink">{req.company}</h2>
                  <p className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {req.date}
                  </p>
                </div>
              </div>
              <span
                className={`font-body text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${
                  req.status === "Urgent" ? "bg-destructive text-destructive-foreground" : "bg-primary/10 text-primary"
                }`}
              >
                {req.status}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
              <div className="space-y-4 md:col-span-2">
                <div>
                  <h4 className="mb-1 font-body text-xs font-bold uppercase tracking-widest text-primary">Request Type</h4>
                  <p className="font-body text-sm font-medium text-ink">{req.type}</p>
                </div>
                <div>
                  <h4 className="mb-1 font-body text-xs font-bold uppercase tracking-widest text-primary">Details</h4>
                  <p className="font-body text-sm text-muted-foreground">{req.details}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2">
                <button className="flex items-center justify-center gap-2 bg-sage py-3 font-body text-xs font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
                  <Check className="h-4 w-4" /> Approve Partnership
                </button>
                <button className="flex items-center justify-center gap-2 border border-border py-3 font-body text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-secondary">
                  <X className="h-4 w-4" /> Decline
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2 font-body text-xs font-bold text-primary hover:underline">
                  <ExternalLink className="h-3 w-3" /> View Company Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
