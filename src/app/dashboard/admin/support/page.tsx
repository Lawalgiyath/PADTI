"use client";

import { Input } from "@/components/ui/input";
import { Clock, MessageSquare, AlertCircle, CheckCircle, Search, User } from "lucide-react";

const tickets = [
  { id: "TKT-4921", subject: "Payment installment failed", user: "John Doe", role: "Driver", priority: "High", status: "Open", date: "2h ago" },
  { id: "TKT-4918", subject: "Unable to upload ID", user: "Elena R.", role: "Driver", priority: "Medium", status: "In Progress", date: "5h ago" },
  { id: "TKT-4915", subject: "API Integration Error", user: "LogiStream Europe", role: "Employer", priority: "Urgent", status: "Open", date: "1d ago" },
  { id: "TKT-4902", subject: "Forgot password assistance", user: "Mark Stevens", role: "Driver", priority: "Low", status: "Resolved", date: "2d ago" },
];

const priorityStyle: Record<string, string> = {
  Urgent: "bg-destructive text-destructive-foreground",
  High: "bg-accent/10 text-accent",
  Medium: "bg-primary/10 text-primary",
  Low: "border border-border text-muted-foreground",
};

export default function AdminSupportTicketsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="mb-2 font-headline text-3xl text-ink">Institutional Support</h1>
          <p className="font-body text-sm text-muted-foreground">Manage help desk requests from learners and institutional partners.</p>
        </div>
        <span className="flex items-center border border-destructive/30 bg-destructive/5 px-4 py-2.5 font-body text-xs font-bold uppercase tracking-widest text-destructive">
          12 Urgent Issues
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search tickets by ID, subject, or user..." className="h-11 rounded-none border-border bg-background pl-10 font-body text-sm shadow-none focus-visible:border-primary focus-visible:ring-0" />
        </div>
        <button className="border border-border px-5 py-2.5 font-body text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-secondary">
          Advanced Filter
        </button>
      </div>

      <div className="space-y-4">
        {tickets.map((t) => (
          <div key={t.id} className="flex flex-col border border-border bg-card sm:flex-row sm:items-stretch">
            <div className={`h-1 w-full shrink-0 sm:h-auto sm:w-1.5 ${t.priority === "Urgent" ? "bg-destructive" : t.priority === "High" ? "bg-accent" : "bg-primary"}`} />
            <div className="grid flex-1 grid-cols-1 items-center gap-6 p-6 md:grid-cols-4">
              <div className="space-y-1 md:col-span-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-secondary px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.id}</span>
                  <h3 className="font-headline text-lg text-ink">{t.subject}</h3>
                </div>
                <div className="flex items-center gap-4 font-body text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> {t.user} ({t.role})</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {t.date}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Priority / Status</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`font-body text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${priorityStyle[t.priority]}`}>{t.priority}</span>
                  <span className={`font-body text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${t.status === "Resolved" ? "bg-primary/10 text-primary" : "border border-border text-muted-foreground"}`}>
                    {t.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-1">
                <button className="p-2 text-muted-foreground transition-colors hover:text-ink" title="Reply">
                  <MessageSquare className="h-4 w-4" />
                </button>
                <button className="p-2 text-muted-foreground transition-colors hover:text-primary" title="Resolve">
                  <CheckCircle className="h-4 w-4" />
                </button>
                <button className="p-2 text-muted-foreground transition-colors hover:text-destructive" title="Escalate">
                  <AlertCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
