"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Briefcase, 
  GraduationCap, 
  MoreVertical, 
  Truck, 
  Users, 
  Clock,
  MapPin,
  TrendingUp,
  FileSearch
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function EmployerListingsPage() {
  const listings = [
    { title: "Senior Logistics Driver", type: "Job", applications: 24, status: "Active", posted: "2d ago", location: "Hamburg, DE" },
    { title: "Articulated Fleet Intern", type: "Internship", applications: 15, status: "Active", posted: "5d ago", location: "Berlin, DE" },
    { title: "Long-Haul Specialist", type: "Job", applications: 9, status: "Reviewing", posted: "1w ago", location: "Bonn, DE" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2 font-headline">My Active Listings</h1>
          <p className="text-muted-foreground">Manage your job openings and internship placements.</p>
        </div>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 font-bold py-6 px-6 rounded-xl border-none shadow-lg">
          <Plus className="h-5 w-5" /> Post New Opportunity
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {listings.map((item, idx) => (
            <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <div className="flex flex-col sm:flex-row sm:items-center p-6 gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.type === 'Job' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent-foreground'}`}>
                  {item.type === 'Job' ? <Briefcase className="h-6 w-6" /> : <GraduationCap className="h-6 w-6" />}
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.location}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {item.posted}</span>
                      </div>
                    </div>
                    <Badge variant={item.status === 'Active' ? 'default' : 'secondary'} className={item.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100 border-none' : ''}>
                      {item.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:border-l sm:pl-6">
                  <div className="text-center min-w-[80px]">
                    <p className="text-2xl font-bold text-primary">{item.applications}</p>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Applicants</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer">View Applicants</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Edit Listing</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-destructive">Close Listing</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          ))}

          {listings.length === 0 && (
            <Card className="border-dashed border-2 bg-transparent">
              <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-secondary p-6 rounded-full mb-6">
                  <FileSearch className="h-12 w-12 text-primary/40" />
                </div>
                <h3 className="text-xl font-bold mb-2">No active listings</h3>
                <p className="text-muted-foreground max-w-sm mb-8">You haven't posted any opportunities yet. Start recruiting top driver talent today.</p>
                <Button className="bg-primary hover:bg-primary/90 font-bold px-8">Create Your First Post</Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="bg-primary text-white border-none shadow-lg overflow-hidden relative">
            <div className="absolute -right-8 -bottom-8 opacity-10">
              <Truck className="h-40 w-40" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><TrendingUp className="h-5 w-5 text-accent" /> Hiring Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">Total Impressions</span>
                <span className="font-bold">1,402</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">Application Rate</span>
                <span className="font-bold text-accent">+8.4%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">Average Match Score</span>
                <span className="font-bold">89%</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-white border-none font-bold">Download Full Report</Button>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Recent Talent Matches</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Sarah M.", score: 95 },
                { name: "Johnathan D.", score: 92 },
                { name: "Michael C.", score: 88 },
              ].map((match, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-secondary/20 rounded-xl">
                  <span className="text-sm font-semibold">{match.name}</span>
                  <Badge className="bg-primary text-white text-[10px]">{match.score}% Match</Badge>
                </div>
              ))}
              <Button variant="link" className="w-full text-xs text-primary font-bold">View More in Marketplace</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
