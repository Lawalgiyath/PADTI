"use client";

import { Plus, Briefcase, GraduationCap, MoreVertical, Truck, Users, Clock, MapPin, TrendingUp, FileSearch } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const listings = [
  { title: "Senior Logistics Driver", type: "Job", applications: 24, status: "Active", posted: "2d ago", location: "Hamburg, DE" },
  { title: "Articulated Fleet Intern", type: "Internship", applications: 15, status: "Active", posted: "5d ago", location: "Berlin, DE" },
  { title: "Long-Haul Specialist", type: "Job", applications: 9, status: "Reviewing", posted: "1w ago", location: "Bonn, DE" },
];

const talentMatches = [
  { name: "Sarah M.", score: 95 },
  { name: "Johnathan D.", score: 92 },
  { name: "Michael C.", score: 88 },
];

export default function EmployerListingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="mb-2 font-headline text-3xl text-ink">My Active Listings</h1>
          <p className="font-body text-sm text-muted-foreground">Manage your job openings and internship placements.</p>
        </div>
        <button className="flex items-center gap-2 bg-sage px-6 py-3.5 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
          <Plus className="h-4 w-4" /> Post New Opportunity
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {listings.map((item) => (
            <div key={item.title} className="flex flex-col gap-6 border border-border bg-card p-6 transition-colors hover:border-primary/40 sm:flex-row sm:items-center">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center ${item.type === "Job" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                {item.type === "Job" ? <Briefcase className="h-5 w-5" /> : <GraduationCap className="h-5 w-5" />}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-headline text-lg text-ink">{item.title}</h3>
                    <div className="mt-1 flex items-center gap-3 font-body text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.location}</span>
                      <span>&middot;</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {item.posted}</span>
                    </div>
                  </div>
                  <span
                    className={`font-body text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${
                      item.status === "Active" ? "bg-primary/10 text-primary" : "border border-border text-muted-foreground"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:border-l sm:border-border sm:pl-6">
                <div className="min-w-[70px] text-center">
                  <p className="font-headline text-2xl text-ink">{item.applications}</p>
                  <p className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Applicants</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 text-muted-foreground transition-colors hover:text-ink">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-none border-border">
                    <DropdownMenuItem className="cursor-pointer">View Applicants</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Edit Listing</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-destructive">Close Listing</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}

          {listings.length === 0 && (
            <div className="flex flex-col items-center justify-center border border-dashed border-border px-6 py-20 text-center">
              <div className="mb-6 rounded-full bg-secondary p-6">
                <FileSearch className="h-10 w-10 text-primary/40" />
              </div>
              <h3 className="mb-2 font-headline text-xl text-ink">No active listings</h3>
              <p className="mb-8 max-w-sm font-body text-sm text-muted-foreground">
                You haven&apos;t posted any opportunities yet. Start recruiting top driver talent today.
              </p>
              <button className="bg-sage px-8 py-3 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
                Create Your First Post
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="relative overflow-hidden bg-ink p-6 text-cream">
            <Truck className="absolute -bottom-8 -right-8 h-40 w-40 text-cream/5" />
            <h2 className="relative mb-5 flex items-center gap-2 font-headline text-xl text-cream">
              <TrendingUp className="h-5 w-5 text-accent" /> Hiring Insights
            </h2>
            <div className="relative space-y-3 font-body text-sm">
              <div className="flex items-center justify-between">
                <span className="text-cream/60">Total Impressions</span>
                <span className="font-bold text-cream">1,402</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cream/60">Application Rate</span>
                <span className="font-bold text-accent">+8.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cream/60">Average Match Score</span>
                <span className="font-bold text-cream">89%</span>
              </div>
            </div>
            <button className="relative mt-6 w-full border border-cream/30 py-3 font-body text-xs font-bold uppercase tracking-widest text-cream transition-colors hover:border-cream">
              Download Full Report
            </button>
          </div>

          <div className="border border-border bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 font-headline text-base text-ink">
              <Users className="h-4 w-4 text-primary" /> Recent Talent Matches
            </h2>
            <div className="space-y-2">
              {talentMatches.map((match) => (
                <div key={match.name} className="flex items-center justify-between bg-secondary px-3 py-2.5">
                  <span className="font-body text-sm font-semibold text-ink">{match.name}</span>
                  <span className="bg-primary px-2 py-0.5 font-body text-[10px] font-bold text-primary-foreground">{match.score}% Match</span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full font-body text-xs font-bold text-primary hover:underline">View More in Marketplace</button>
          </div>
        </div>
      </div>
    </div>
  );
}
