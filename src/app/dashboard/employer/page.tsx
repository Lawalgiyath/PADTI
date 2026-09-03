"use client";

import { Input } from "@/components/ui/input";
import { ShieldCheck, CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
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
        <h1 className="mb-2 font-headline text-3xl text-ink">Verify Driver Credentials</h1>
        <p className="font-body text-sm text-muted-foreground">Instantly validate student certifications and performance records.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="border border-border bg-card p-6">
            <h2 className="mb-1 flex items-center gap-2 font-headline text-xl text-ink">
              <ShieldCheck className="h-5 w-5 text-primary" /> Certificate Validation
            </h2>
            <p className="mb-6 font-body text-sm text-muted-foreground">Enter the PADTI certificate ID found on the driver&apos;s credential.</p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                placeholder="e.g. PAD-12345"
                className="h-12 rounded-none border-border bg-background font-body text-sm shadow-none focus-visible:border-primary focus-visible:ring-0"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
              />
              <button onClick={handleVerify} className="bg-sage px-8 py-3 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
                Verify Now
              </button>
            </div>

            {verified === true && (
              <div className="mt-6 flex flex-col items-center gap-6 border border-primary/30 bg-primary/5 p-6 md:flex-row">
                <div className="bg-primary p-3 text-primary-foreground">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-headline text-xl text-ink">Credential Verified</h3>
                  <p className="font-body text-sm text-muted-foreground">Driver: Johnathan Doe | CDL A Certified | Issued: Oct 2023</p>
                  <div className="mt-2 flex flex-wrap justify-center gap-2 md:justify-start">
                    <span className="border border-primary/30 bg-card px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-primary">Active Status</span>
                    <span className="border border-primary/30 bg-card px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-primary">92% Skill Score</span>
                  </div>
                </div>
                <button className="border border-primary px-4 py-2 font-body text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                  View Performance Report
                </button>
              </div>
            )}

            {verified === false && (
              <div className="mt-6 flex items-center gap-4 border border-destructive/30 bg-destructive/5 p-6">
                <XCircle className="h-7 w-7 text-destructive" />
                <div>
                  <h3 className="font-headline text-lg text-ink">Invalid ID</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    The certificate ID provided does not match our verified records. Please check for typos.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border border-border bg-secondary p-5">
              <h3 className="mb-2 flex items-center gap-2 font-headline text-base text-ink">
                <Info className="h-4 w-4 text-primary" /> Verification Help
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                PADTI IDs are unique 8-character codes assigned to graduates upon successful completion of all training modules.
              </p>
            </div>
            <div className="border border-border bg-secondary p-5">
              <h3 className="mb-2 flex items-center gap-2 font-headline text-base text-ink">
                <AlertCircle className="h-4 w-4 text-primary" /> Security Note
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                All verification attempts are logged for security purposes. Unauthorized access to driver data is strictly prohibited.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-ink p-6 text-cream">
            <h2 className="mb-1 font-headline text-xl text-cream">Bulk Verification</h2>
            <p className="mb-5 font-body text-sm text-cream/60">Need to verify multiple drivers for a large fleet recruitment?</p>
            <button className="w-full bg-sage py-3.5 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
              Request API Access
            </button>
          </div>

          <div className="border border-border bg-card p-6">
            <h2 className="mb-4 font-headline text-base text-ink">Verification Stats</h2>
            <div className="space-y-3 font-body text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Monthly Verifications</span>
                <span className="font-bold text-ink">128</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Successful Matches</span>
                <span className="font-bold text-primary">98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
