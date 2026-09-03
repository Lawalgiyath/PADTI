"use client";

import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal, GraduationCap, MapPin, Download } from "lucide-react";

const learners = [
  { id: "LRN-001", name: "Johnathan Doe", status: "Active", program: "Articulated Pro", progress: "64%", location: "Hamburg, DE" },
  { id: "LRN-002", name: "Sarah Miller", status: "Active", program: "Safety Master", progress: "92%", location: "Toronto, CA" },
  { id: "LRN-003", name: "Michael Chen", status: "Inactive", program: "Logistics Admin", progress: "15%", location: "Vancouver, CA" },
  { id: "LRN-004", name: "Elena Rodriguez", status: "Active", program: "Articulated Pro", progress: "45%", location: "Madrid, ES" },
  { id: "LRN-005", name: "Ahmed Hassan", status: "Completed", program: "Safety Master", progress: "100%", location: "Cairo, EG" },
];

export default function AdminAllLearnersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="mb-2 font-headline text-3xl text-ink">Learner Directory</h1>
          <p className="font-body text-sm text-muted-foreground">Comprehensive database of all registered students and trainees.</p>
        </div>
        <button className="flex items-center gap-2 border border-primary px-5 py-2.5 font-body text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
          <Download className="h-4 w-4" /> Export Student Data
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search learners by name, ID, or location..." className="h-11 rounded-none border-border bg-background pl-10 font-body text-sm shadow-none focus-visible:border-primary focus-visible:ring-0" />
        </div>
        <button className="flex items-center justify-center gap-2 border border-border px-5 py-2.5 font-body text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-secondary">
          <Filter className="h-4 w-4" /> Filter
        </button>
      </div>

      <div className="overflow-x-auto border border-border bg-card">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="p-4 font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Learner ID</th>
              <th className="p-4 font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Name</th>
              <th className="p-4 font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
              <th className="p-4 font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Current Program</th>
              <th className="p-4 font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Progress</th>
              <th className="p-4 text-right font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {learners.map((learner) => (
              <tr key={learner.id} className="border-b border-border transition-colors last:border-0 hover:bg-secondary/50">
                <td className="p-4 font-mono text-xs text-muted-foreground">{learner.id}</td>
                <td className="p-4">
                  <div className="font-body text-sm font-bold text-ink">{learner.name}</div>
                  <div className="flex items-center gap-1 font-body text-[10px] text-muted-foreground">
                    <MapPin className="h-2.5 w-2.5" /> {learner.location}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`font-body text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${
                      learner.status === "Active"
                        ? "bg-primary/10 text-primary"
                        : learner.status === "Completed"
                        ? "bg-accent/10 text-accent"
                        : "border border-border text-muted-foreground"
                    }`}
                  >
                    {learner.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 font-body text-sm text-ink">
                    <GraduationCap className="h-3.5 w-3.5 text-primary" /> {learner.program}
                  </div>
                </td>
                <td className="p-4 font-body text-sm font-bold text-ink">{learner.progress}</td>
                <td className="p-4 text-right">
                  <button className="p-1 text-muted-foreground transition-colors hover:text-ink">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
