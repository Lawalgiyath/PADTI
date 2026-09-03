"use client";

import { Users, Building2, AlertCircle, Activity, CheckCircle } from "lucide-react";
import { useUser } from "@/firebase";

const pendingRequests = [
  { type: "Student Enrollment", name: "Alice Johnson", date: "2 hours ago", status: "New" },
  { type: "Employer Verification", name: "Global Trans Co", date: "5 hours ago", status: "Urgent" },
  { type: "Certificate Approval", name: "Bob Smith", date: "1 day ago", status: "Pending" },
];

const systemStatus = ["LMS Services", "Credential Verification API", "Employer Marketplace"];

export default function AdminOverview() {
  const { user } = useUser();
  const firstName = user?.displayName ? user.displayName.split(" ")[0] : "Admin";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 font-headline text-3xl text-ink">Welcome back, {firstName}</h1>
        <p className="font-body text-sm text-muted-foreground">Manage platform operations, student admissions, and employer partnerships.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border border-border bg-card p-5">
          <p className="mb-3 flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Users className="h-3.5 w-3.5" /> Total Students
          </p>
          <p className="font-headline text-3xl text-ink">1,240</p>
        </div>
        <div className="border border-border bg-card p-5">
          <p className="mb-3 flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Building2 className="h-3.5 w-3.5" /> Partner Employers
          </p>
          <p className="font-headline text-3xl text-ink">86</p>
        </div>
        <div className="border border-border bg-card p-5">
          <p className="mb-3 flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Activity className="h-3.5 w-3.5" /> Platform Growth
          </p>
          <p className="font-headline text-3xl text-ink">
            +18% <span className="font-body text-sm font-normal text-muted-foreground">this month</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="border border-border bg-card p-6">
          <h2 className="mb-1 flex items-center gap-2 font-headline text-xl text-ink">
            <AlertCircle className="h-5 w-5 text-accent" /> Pending Actions
          </h2>
          <p className="mb-5 font-body text-sm text-muted-foreground">Items requiring administrative review</p>
          <div className="space-y-3">
            {pendingRequests.map((req, idx) => (
              <div key={idx} className="flex items-center justify-between border border-border p-4 transition-colors hover:bg-secondary">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    {req.type.includes("Student") ? <Users className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-body text-sm font-bold text-ink">{req.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{req.type} &middot; {req.date}</p>
                  </div>
                </div>
                <span
                  className={`font-body text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${
                    req.status === "Urgent" ? "bg-destructive text-destructive-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border bg-card p-6">
          <h2 className="mb-1 font-headline text-xl text-ink">Platform Health</h2>
          <p className="mb-5 font-body text-sm text-muted-foreground">Operational status of PADTI systems</p>
          <div className="space-y-4">
            {systemStatus.map((system) => (
              <div key={system} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="font-body text-sm font-medium text-ink">{system}</span>
                </div>
                <span className="border border-primary/30 bg-primary/5 px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-primary">
                  Operational
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
