"use client";

import { Input } from "@/components/ui/input";
import { Building2, Search, MapPin, Briefcase, Star, MoreVertical } from "lucide-react";

const employers = [
  { id: "EMP-001", name: "LogiStream Europe", tier: "Premium", listings: 14, location: "Hamburg, DE", status: "Verified" },
  { id: "EMP-002", name: "Global Trans", tier: "Standard", listings: 8, location: "Toronto, CA", status: "Verified" },
  { id: "EMP-003", name: "Express Way", tier: "Enterprise", listings: 42, location: "London, UK", status: "Verified" },
  { id: "EMP-004", name: "Deep Road Logistics", tier: "Standard", listings: 5, location: "Chicago, US", status: "Reviewing" },
  { id: "EMP-005", name: "Maersk Global", tier: "Enterprise", listings: 120, location: "Copenhagen, DK", status: "Verified" },
];

export default function AdminAllEmployersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 font-headline text-3xl text-ink">Employer Network</h1>
        <p className="font-body text-sm text-muted-foreground">Manage institutional partnerships and corporate recruiting accounts.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search companies by name or region..." className="h-11 rounded-none border-border bg-background pl-10 font-body text-sm shadow-none focus-visible:border-primary focus-visible:ring-0" />
        </div>
        <button className="bg-sage px-6 py-3 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
          Add New Partner
        </button>
      </div>

      <div className="overflow-x-auto border border-border bg-card">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="p-4 font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Partner ID</th>
              <th className="p-4 font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Company Name</th>
              <th className="p-4 font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tier</th>
              <th className="p-4 font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Active Listings</th>
              <th className="p-4 font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Verification</th>
              <th className="p-4 text-right font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employers.map((emp) => (
              <tr key={emp.id} className="border-b border-border transition-colors last:border-0 hover:bg-secondary/50">
                <td className="p-4 font-mono text-xs text-muted-foreground">{emp.id}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 text-primary">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-body text-sm font-bold text-ink">{emp.name}</div>
                      <div className="flex items-center gap-1 font-body text-[10px] text-muted-foreground">
                        <MapPin className="h-2.5 w-2.5" /> {emp.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 font-body text-sm font-semibold text-ink">
                    {emp.tier === "Enterprise" && <Star className="h-3 w-3 fill-accent text-accent" />}
                    {emp.tier}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 font-body text-sm text-muted-foreground">
                    <Briefcase className="h-3 w-3" /> {emp.listings}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`font-body text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${
                      emp.status === "Verified" ? "bg-primary/10 text-primary" : "border border-border text-muted-foreground"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-1 text-muted-foreground transition-colors hover:text-ink">
                    <MoreVertical className="h-4 w-4" />
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
