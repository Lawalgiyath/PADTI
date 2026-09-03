"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  FileUp, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileText,
  Download
} from "lucide-react";

export default function AdmissionsPortal() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Admissions Portal</h1>
        <p className="text-muted-foreground">Manage your enrollment applications and compliance documents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Application #PAD-10294</CardTitle>
                  <CardDescription>Professional CDL Class A Training Program</CardDescription>
                </div>
                <Badge className="bg-accent text-accent-foreground font-bold">Under Review</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>
                <div className="space-y-8 relative">
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary text-white p-1 rounded-full z-10">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">Personal Information Submission</h4>
                      <p className="text-sm text-muted-foreground">Submitted on Oct 12, 2023</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary text-white p-1 rounded-full z-10">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">Medical Screening</h4>
                      <p className="text-sm text-muted-foreground">Cleared on Oct 14, 2023</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="bg-accent text-accent-foreground p-1 rounded-full z-10 animate-pulse">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">Eligibility & Background Check</h4>
                      <p className="text-sm text-muted-foreground">Currently in progress by local authorities</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Required Documentation</CardTitle>
              <CardDescription>Please upload clear scanned copies of the following documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Government ID / Passport", status: "Verified" },
                { name: "Medical Fitness Certificate", status: "Verified" },
                { name: "Background Check Authorization", status: "Verified" },
                { name: "Prior Experience Logs (Optional)", status: "Pending", action: true },
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">PDF, JPG, PNG allowed</p>
                    </div>
                  </div>
                  {doc.action ? (
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileUp className="h-4 w-4" /> Upload
                    </Button>
                  ) : (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                      <CheckCircle className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-primary text-white border-none shadow-lg">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription className="text-white/70">Our admission officers are here to assist with your application.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold py-6 rounded-xl shadow-lg border-none">Contact Admissions</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex gap-2">
                <AlertCircle className="h-4 w-4 text-primary shrink-0" />
                <p>Ensure all documents are under 5MB in size.</p>
              </div>
              <div className="flex gap-2">
                <AlertCircle className="h-4 w-4 text-primary shrink-0" />
                <p>Medical clearance must be within the last 30 days.</p>
              </div>
              <Button variant="link" className="p-0 h-auto text-primary gap-1">
                <Download className="h-3 w-3" /> Download Handbook
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
