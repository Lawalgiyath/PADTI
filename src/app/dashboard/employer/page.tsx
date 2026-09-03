"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { useState } from "react";

export default function EmployerVerifyPage() {
  const [certId, setCertId] = useState("");
  const [verified, setVerified] = useState<null | boolean>(null);

  const handleVerify = () => {
    if (certId === "PAD-12345") setVerified(true);
    else if (certId) setVerified(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2 font-headline">Verify Driver Credentials</h1>
        <p className="text-muted-foreground">Instantly validate student certifications and performance records.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> Certificate Validation</CardTitle>
              <CardDescription>Enter the PADTI certificate ID found on the driver's credential.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  placeholder="e.g. PAD-12345" 
                  className="h-12 rounded-xl"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                />
                <Button onClick={handleVerify} className="bg-primary h-12 px-8 rounded-xl font-bold">Verify Now</Button>
              </div>

              {verified === true && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 animate-in zoom-in-95">
                  <div className="bg-green-500 text-white p-3 rounded-full">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-green-800">Credential Verified</h3>
                    <p className="text-green-700">Driver: Johnathan Doe | CDL A Certified | Issued: Oct 2023</p>
                    <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                      <Badge className="bg-green-200 text-green-800 border-none font-bold">Active Status</Badge>
                      <Badge className="bg-green-200 text-green-800 border-none font-bold">92% Skill Score</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="border-green-200 text-green-800 hover:bg-green-100 font-bold">View Performance Report</Button>
                </div>
              )}

              {verified === false && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-4 animate-in shake">
                  <XCircle className="h-8 w-8 text-red-500" />
                  <div>
                    <h3 className="text-lg font-bold text-red-800">Invalid ID</h3>
                    <p className="text-red-700">The certificate ID provided does not match our verified records. Please check for typos.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Card className="border-none shadow-sm bg-secondary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2"><Info className="h-4 w-4 text-primary" /> Verification Help</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">PADTI IDs are unique 8-character codes assigned to graduates upon successful completion of all training modules.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-secondary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2"><AlertCircle className="h-4 w-4 text-primary" /> Security Note</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">All verification attempts are logged for security purposes. Unauthorized access to driver data is strictly prohibited.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-primary text-white border-none shadow-lg">
            <CardHeader>
              <CardTitle>Bulk Verification</CardTitle>
              <CardDescription className="text-white/70">Need to verify multiple drivers for a large fleet recruitment?</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold py-6 rounded-xl shadow-lg border-none">Request API Access</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Verification Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Monthly Verifications</span>
                <span className="font-bold">128</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Successful Matches</span>
                <span className="font-bold text-green-600">98%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
