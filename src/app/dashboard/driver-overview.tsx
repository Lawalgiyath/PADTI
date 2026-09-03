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
import { CheckCircle2, Clock, MapPin, Award } from "lucide-react";
import { useUser } from "@/firebase";

const performanceData = [
  { name: "Safety", score: 85 },
  { name: "Maneuvers", score: 62 },
  { name: "Fuel Efficiency", score: 92 },
  { name: "Road Laws", score: 78 },
  { name: "Maintenance", score: 45 },
];

const stats = [
  { icon: Clock, label: "Training Hours", value: "124", suffix: "/ 180" },
  { icon: CheckCircle2, label: "Assessments", value: "12", suffix: "completed" },
  { icon: MapPin, label: "Internships", value: "3", suffix: "available" },
  { icon: Award, label: "Certificates", value: "2", suffix: "earned" },
];

const nextSteps = [
  { task: "Articulated Reversing", when: "Tomorrow, 09:00", progress: 0 },
  { task: "Safety Assessment", when: "Next Week", progress: 45 },
  { task: "Documentation Submission", when: "Overdue", progress: 100, overdue: true },
];

export default function DashboardOverview() {
  const { user } = useUser();
  const firstName = user?.displayName ? user.displayName.split(" ")[0] : "Student";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 font-headline text-3xl text-ink">Welcome back, {firstName}</h1>
        <p className="font-body text-sm text-muted-foreground">Your training journey is 64% complete. Keep up the great work.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-border bg-card p-5">
            <p className="mb-3 flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <stat.icon className="h-3.5 w-3.5" /> {stat.label}
            </p>
            <p className="font-headline text-3xl text-ink">
              {stat.value} <span className="font-body text-sm font-normal text-muted-foreground">{stat.suffix}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="border border-border bg-card p-6 lg:col-span-2">
          <h2 className="font-headline text-xl text-ink">Skill Assessment Analytics</h2>
          <p className="mb-4 font-body text-sm text-muted-foreground">Performance breakdown across core competencies</p>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis fontSize={10} tickLine={false} axisLine={false} />
                <ChartTooltip cursor={{ fill: "hsl(var(--secondary))" }} />
                <Bar dataKey="score" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border border-border bg-card p-6">
          <h2 className="font-headline text-xl text-ink">Next Steps</h2>
          <p className="mb-5 font-body text-sm text-muted-foreground">Upcoming tasks in your curriculum</p>
          <div className="space-y-5">
            {nextSteps.map((step) => (
              <div key={step.task} className="space-y-2">
                <div className="flex items-center justify-between font-body text-sm">
                  <span className="font-medium text-ink">{step.task}</span>
                  {step.overdue ? (
                    <span className="bg-destructive px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-widest text-destructive-foreground">
                      Overdue
                    </span>
                  ) : (
                    <span className="text-muted-foreground">{step.when}</span>
                  )}
                </div>
                <div className="h-1.5 w-full bg-secondary">
                  <div
                    className={`h-full ${step.overdue ? "bg-destructive" : "bg-primary"}`}
                    style={{ width: `${step.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
