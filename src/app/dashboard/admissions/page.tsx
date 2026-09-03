"use client";

import { FileUp, CheckCircle, Clock, AlertCircle, FileText, Download } from "lucide-react";

const documents = [
  { name: "Government ID / Passport", status: "Verified" },
  { name: "Medical Fitness Certificate", status: "Verified" },
  { name: "Background Check Authorization", status: "Verified" },
  { name: "Prior Experience Logs (Optional)", status: "Pending", action: true },
];

export default function AdmissionsPortal() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 font-headline text-3xl text-ink">Admissions Portal</h1>
        <p className="font-body text-sm text-muted-foreground">Manage your enrollment applications and compliance documents.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <div className="border border-border bg-card p-6">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="font-headline text-xl text-ink">Application #PAD-10294</h2>
                <p className="font-body text-sm text-muted-foreground">Professional CDL Class A Training Program</p>
              </div>
              <span className="bg-accent/10 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-accent">
                Under Review
              </span>
            </div>
            <div className="relative space-y-8">
              <div className="absolute bottom-0 left-3 top-0 w-px bg-border" />
              <div className="relative flex items-start gap-4">
                <div className="z-10 rounded-full bg-primary p-1 text-primary-foreground">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-body text-sm font-bold text-ink">Personal Information Submission</h4>
                  <p className="font-body text-xs text-muted-foreground">Submitted on Oct 12, 2023</p>
                </div>
              </div>
              <div className="relative flex items-start gap-4">
                <div className="z-10 rounded-full bg-primary p-1 text-primary-foreground">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-body text-sm font-bold text-ink">Medical Screening</h4>
                  <p className="font-body text-xs text-muted-foreground">Cleared on Oct 14, 2023</p>
                </div>
              </div>
              <div className="relative flex items-start gap-4">
                <div className="z-10 rounded-full bg-accent p-1 text-cream">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-body text-sm font-bold text-ink">Eligibility &amp; Background Check</h4>
                  <p className="font-body text-xs text-muted-foreground">Currently in progress by local authorities</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-border bg-card p-6">
            <h2 className="mb-1 font-headline text-xl text-ink">Required Documentation</h2>
            <p className="mb-5 font-body text-sm text-muted-foreground">Please upload clear scanned copies of the following documents</p>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between border border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-secondary p-2">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-ink">{doc.name}</p>
                      <p className="font-body text-xs text-muted-foreground">PDF, JPG, PNG allowed</p>
                    </div>
                  </div>
                  {doc.action ? (
                    <button className="flex items-center gap-2 border border-primary px-3 py-2 font-body text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                      <FileUp className="h-3.5 w-3.5" /> Upload
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 border border-primary/30 bg-primary/5 px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-primary">
                      <CheckCircle className="h-3 w-3" /> Verified
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-ink p-6 text-cream">
            <h2 className="mb-1 font-headline text-xl text-cream">Need Help?</h2>
            <p className="mb-5 font-body text-sm text-cream/60">Our admission officers are here to assist with your application.</p>
            <button className="w-full bg-sage py-3.5 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
              Contact Admissions
            </button>
          </div>

          <div className="border border-border bg-card p-6">
            <h2 className="mb-4 font-headline text-lg text-ink">Guidelines</h2>
            <div className="space-y-3 font-body text-sm text-muted-foreground">
              <div className="flex gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-primary" />
                <p>Ensure all documents are under 5MB in size.</p>
              </div>
              <div className="flex gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-primary" />
                <p>Medical clearance must be within the last 30 days.</p>
              </div>
              <button className="flex items-center gap-1.5 pt-2 font-body text-sm font-bold text-primary hover:underline">
                <Download className="h-3.5 w-3.5" /> Download Handbook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
