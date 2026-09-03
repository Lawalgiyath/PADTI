
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Search, MapPin, Briefcase, Star, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminAllEmployersPage() {
  const employers = [
    { id: "EMP-001", name: "LogiStream Europe", tier: "Premium", listings: 14, location: "Hamburg, DE", status: "Verified" },
    { id: "EMP-002", name: "Global Trans", tier: "Standard", listings: 8, location: "Toronto, CA", status: "Verified" },
    { id: "EMP-003", name: "Express Way", tier: "Enterprise", listings: 42, location: "London, UK", status: "Verified" },
    { id: "EMP-004", name: "Deep Road Logistics", tier: "Standard", listings: 5, location: "Chicago, US", status: "Reviewing" },
    { id: "EMP-005", name: "Maersk Global", tier: "Enterprise", listings: 120, location: "Copenhagen, DK", status: "Verified" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Employer Network</h1>
        <p className="text-muted-foreground">Manage institutional partnerships and corporate recruiting accounts.</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search companies by name or region..." className="pl-10 h-10 rounded-xl" />
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-xl">Add New Partner</Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/30">
                <TableHead className="font-bold">Partner ID</TableHead>
                <TableHead className="font-bold">Company Name</TableHead>
                <TableHead className="font-bold">Tier</TableHead>
                <TableHead className="font-bold">Active Listings</TableHead>
                <TableHead className="font-bold">Verification</TableHead>
                <TableHead className="font-bold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employers.map((emp) => (
                <TableRow key={emp.id} className="hover:bg-secondary/10 transition-colors">
                  <TableCell className="font-mono text-xs">{emp.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg text-primary">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold">{emp.name}</div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-2 w-2" /> {emp.location}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-semibold text-sm">
                      {emp.tier === 'Enterprise' && <Star className="h-3 w-3 text-accent fill-accent" />}
                      {emp.tier}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Briefcase className="h-3 w-3 text-muted-foreground" /> {emp.listings}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={emp.status === 'Verified' ? 'default' : 'outline'} className={emp.status === 'Verified' ? 'bg-green-100 text-green-700' : ''}>
                      {emp.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreVertical className="h-4 w-4" />
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
