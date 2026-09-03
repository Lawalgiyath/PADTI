"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, TrendingUp, ShieldCheck, Truck, Building2 } from "lucide-react";
import { useUser } from "@/firebase";

const hiringStats = [
  { name: "Active Jobs", count: 12 },
  { name: "Applicants", count: 48 },
  { name: "Interviews", count: 8 },
  { name: "Hired", count: 5 },
];

const stats = [
  { icon: Truck, label: "Active Listings", value: "12" },
  { icon: Users, label: "Total Applications", value: "156" },
  { icon: ShieldCheck, label: "Verifications", value: "42" },
  { icon: TrendingUp, label: "Talent Matches", value: "89%" },
];

export default function EmployerOverview() {
  const { user } = useUser();
  const orgName = user?.displayName || "Partner";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 font-headline text-3xl text-ink">Welcome back, {orgName}</h1>
        <p className="font-body text-sm text-muted-foreground">Manage your fleet recruitment and verify credentials in real-time.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-border bg-card p-5">
            <p className="mb-3 flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <stat.icon className="h-3.5 w-3.5" /> {stat.label}
            </p>
            <p className="font-headline text-3xl text-ink">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="border border-border bg-card p-6 lg:col-span-2">
          <h2 className="font-headline text-xl text-ink">Recruitment Pipeline</h2>
          <p className="mb-4 font-body text-sm text-muted-foreground">Visual breakdown of your current hiring funnel</p>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hiringStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <ChartTooltip cursor={{ fill: "hsl(var(--secondary))" }} />
                <Bar dataKey="count" fill="hsl(var(--accent))" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-ink p-6 text-cream">
          <h2 className="mb-1 flex items-center gap-2 font-headline text-xl text-cream">
            <Building2 className="h-5 w-5" /> Quick Actions
          </h2>
          <p className="mb-6 font-body text-sm text-cream/60">Manage your institutional partnership</p>
          <div className="space-y-3">
            <button className="w-full bg-sage py-3.5 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
              Post New Opportunity
            </button>
            <button className="w-full border border-cream/30 py-3.5 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:border-cream">
              Verify Credentials
            </button>
            <button className="w-full font-body text-sm font-medium text-cream/70 underline-offset-2 hover:text-cream hover:underline">
              Download Hiring Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
