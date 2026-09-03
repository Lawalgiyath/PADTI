"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building2, 
  FileText, 
  AlertCircle,
  Activity,
  CheckCircle
} from "lucide-react";
import { useUser } from "@/firebase";

export default function AdminOverview() {
  const { user } = useUser();
  const firstName = user?.displayName ? user.displayName.split(" ")[0] : "Admin";

  const pendingRequests = [
    { type: "Student Enrollment", name: "Alice Johnson", date: "2 hours ago", status: "New" },
    { type: "Employer Verification", name: "Global Trans Co", date: "5 hours ago", status: "Urgent" },
    { type: "Certificate Approval", name: "Bob Smith", date: "1 day ago", status: "Pending" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back, {firstName}</h1>
        <p className="text-muted-foreground">Manage platform operations, student admissions, and employer partnerships.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2"><Users className="h-4 w-4" /> Total Students</CardDescription>
            <CardTitle className="text-3xl">1,240</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Partner Employers</CardDescription>
            <CardTitle className="text-3xl">86</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2"><Activity className="h-4 w-4" /> Platform Growth</CardDescription>
            <CardTitle className="text-3xl">+18% <span className="text-sm font-normal text-muted-foreground">this month</span></CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-sm border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><AlertCircle className="h-5 w-5 text-accent" /> Pending Actions</CardTitle>
            <CardDescription>Items requiring administrative review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingRequests.map((req, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-xl hover:bg-secondary/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    {req.type.includes('Student') ? <Users className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{req.name}</p>
                    <p className="text-xs text-muted-foreground">{req.type} • {req.date}</p>
                  </div>
                </div>
                <Badge variant={req.status === 'Urgent' ? 'destructive' : 'default'} className="rounded-lg">
                  {req.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm border-none">
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
            <CardDescription>Operational status of PADTI systems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">LMS Services</span>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Credential Verification API</span>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Employer Marketplace</span>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Operational</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}