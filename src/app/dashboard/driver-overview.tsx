"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  ResponsiveContainer 
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

export default function DashboardOverview() {
  const { user } = useUser();
  const firstName = user?.displayName ? user.displayName.split(" ")[0] : "Student";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back, {firstName}</h1>
        <p className="text-muted-foreground">Your training journey is 64% complete. Keep up the great work.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2"><Clock className="h-4 w-4" /> Training Hours</CardDescription>
            <CardTitle className="text-3xl">124 <span className="text-sm font-normal text-muted-foreground">/ 180</span></CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Assessments</CardDescription>
            <CardTitle className="text-3xl">12 <span className="text-sm font-normal text-muted-foreground">completed</span></CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Internships</CardDescription>
            <CardTitle className="text-3xl">3 <span className="text-sm font-normal text-muted-foreground">available</span></CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2"><Award className="h-4 w-4" /> Certificates</CardDescription>
            <CardTitle className="text-3xl">2 <span className="text-sm font-normal text-muted-foreground">earned</span></CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="shadow-sm border-none">
          <CardHeader>
            <CardTitle>Skill Assessment Analytics</CardTitle>
            <CardDescription>Performance breakdown across core competencies</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis fontSize={10} tickLine={false} axisLine={false} />
                <ChartTooltip cursor={{ fill: '#f3f4f6' }} />
                <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-none">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Upcoming tasks in your curriculum</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Articulated Reversing</span>
                <span className="text-muted-foreground">Tommorrow, 09:00</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Safety Assessment</span>
                <span className="text-muted-foreground">Next Week</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Documentation Submission</span>
                <Badge variant="destructive" className="text-[10px] h-4">Overdue</Badge>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
