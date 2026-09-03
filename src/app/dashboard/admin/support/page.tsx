
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LifeBuoy, Clock, MessageSquare, AlertCircle, CheckCircle, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminSupportTicketsPage() {
  const tickets = [
    { id: "TKT-4921", subject: "Payment installment failed", user: "John Doe", role: "Driver", priority: "High", status: "Open", date: "2h ago" },
    { id: "TKT-4918", subject: "Unable to upload ID", user: "Elena R.", role: "Driver", priority: "Medium", status: "In Progress", date: "5h ago" },
    { id: "TKT-4915", subject: "API Integration Error", user: "LogiStream Europe", role: "Employer", priority: "Urgent", status: "Open", date: "1d ago" },
    { id: "TKT-4902", subject: "Forgot password assistance", user: "Mark Stevens", role: "Driver", priority: "Low", status: "Resolved", date: "2d ago" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Institutional Support</h1>
          <p className="text-muted-foreground">Manage help desk requests from learners and institutional partners.</p>
        </div>
        <div className="flex gap-2">
           <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700 h-9 flex items-center px-4 rounded-xl font-bold">
            12 Urgent Issues
          </Badge>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tickets by ID, subject, or user..." className="pl-10 h-10 rounded-xl" />
        </div>
        <Button variant="secondary" className="rounded-xl">Advanced Filter</Button>
      </div>

      <div className="space-y-4">
        {tickets.map((t) => (
          <Card key={t.id} className="border-none shadow-sm hover:shadow-md transition-shadow group">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center">
                <div className={`w-2 shrink-0 ${t.priority === 'Urgent' ? 'bg-red-500' : t.priority === 'High' ? 'bg-orange-400' : 'bg-blue-400'}`}></div>
                <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                  <div className="md:col-span-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px] py-0 px-2 uppercase tracking-widest font-bold">
                        {t.id}
                      </Badge>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{t.subject}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" /> {t.user} ({t.role})</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {t.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Priority / Status</p>
                    <div className="flex items-center gap-2">
                      <Badge className={t.priority === 'Urgent' ? 'bg-red-500' : t.priority === 'High' ? 'bg-orange-400' : 'bg-blue-400'}>{t.priority}</Badge>
                      <Badge variant={t.status === 'Resolved' ? 'secondary' : 'outline'} className={t.status === 'Resolved' ? 'bg-green-100 text-green-700 border-none' : ''}>
                        {t.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
