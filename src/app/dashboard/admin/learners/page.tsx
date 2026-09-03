
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, MoreHorizontal, GraduationCap, MapPin, Download } from "lucide-react";

export default function AdminAllLearnersPage() {
  const learners = [
    { id: "LRN-001", name: "Johnathan Doe", status: "Active", program: "Articulated Pro", progress: "64%", location: "Hamburg, DE" },
    { id: "LRN-002", name: "Sarah Miller", status: "Active", program: "Safety Master", progress: "92%", location: "Toronto, CA" },
    { id: "LRN-003", name: "Michael Chen", status: "Inactive", program: "Logistics Admin", progress: "15%", location: "Vancouver, CA" },
    { id: "LRN-004", name: "Elena Rodriguez", status: "Active", program: "Articulated Pro", progress: "45%", location: "Madrid, ES" },
    { id: "LRN-005", name: "Ahmed Hassan", status: "Completed", program: "Safety Master", progress: "100%", location: "Cairo, EG" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Learner Directory</h1>
          <p className="text-muted-foreground">Comprehensive database of all registered students and trainees.</p>
        </div>
        <Button variant="outline" className="rounded-xl border-primary text-primary font-bold">
          <Download className="h-4 w-4 mr-2" /> Export Student Data
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search learners by name, ID, or location..." className="pl-10 h-10 rounded-xl" />
        </div>
        <Button variant="secondary" className="rounded-xl"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/30">
                <TableHead className="font-bold">Learner ID</TableHead>
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Current Program</TableHead>
                <TableHead className="font-bold">Progress</TableHead>
                <TableHead className="font-bold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {learners.map((learner) => (
                <TableRow key={learner.id} className="hover:bg-secondary/10 transition-colors">
                  <TableCell className="font-mono text-xs">{learner.id}</TableCell>
                  <TableCell>
                    <div className="font-bold">{learner.name}</div>
                    <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-2 w-2" /> {learner.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={learner.status === 'Active' ? 'default' : learner.status === 'Completed' ? 'secondary' : 'outline'} className={learner.status === 'Completed' ? 'bg-green-100 text-green-700' : ''}>
                      {learner.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="h-3 w-3 text-primary" /> {learner.program}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">{learner.progress}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
