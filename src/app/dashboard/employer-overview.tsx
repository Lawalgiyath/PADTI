"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Search,
  Truck,
  Building2
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  ResponsiveContainer 
} from "recharts";
import { useUser } from "@/firebase";

const hiringStats = [
  { name: "Active Jobs", count: 12 },
  { name: "Applicants", count: 48 },
  { name: "Interviews", count: 8 },
  { name: "Hired", count: 5 },
];

export default function EmployerOverview() {
  const { user } = useUser();
  const orgName = user?.displayName || "Partner";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back, {orgName}</h1>
        <p className="text-muted-foreground">Manage your fleet recruitment and verify credentials in real-time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2"><Truck className="h-4 w-4" /> Active Listings</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2"><Users className="h-4 w-4" /> Total Applications</CardDescription>
            <CardTitle className="text-3xl">156</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Verifications</CardDescription>
            <CardTitle className="text-3xl">42</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Talent Matches</CardDescription>
            <CardTitle className="text-3xl">89%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-sm border-none">
          <CardHeader>
            <CardTitle>Recruitment Pipeline</CardTitle>
            <CardDescription>Visual breakdown of your current hiring funnel</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hiringStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <ChartTooltip cursor={{ fill: '#f3f4f6' }} />
                <Bar dataKey="count" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-none bg-primary text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" /> Quick Actions</CardTitle>
            <CardDescription className="text-white/70">Manage your institutional partnership</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold py-6 rounded-xl border-none">Post New Opportunity</Button>
            <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-white font-bold py-6 rounded-xl">Verify Credentials</Button>
            <Button variant="link" className="w-full text-white/80 hover:text-white">Download Hiring Report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}