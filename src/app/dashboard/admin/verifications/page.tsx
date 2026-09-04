"use client";

import { useState } from "react";
import { collection, query, where, doc, updateDoc } from "firebase/firestore";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { maskNin } from "@/lib/nin";
import { ShieldCheck, Check, X, Eye, EyeOff, User } from "lucide-react";

interface VerificationUser {
  id: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  metadata?: { nin?: string; ninVerificationStatus?: string };
}

export default function AdminVerificationsPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [processing, setProcessing] = useState<string | null>(null);

  const pendingQuery = useMemoFirebase(
    () => query(collection(db, "users"), where("metadata.ninVerificationStatus", "==", "pending")),
    [db]
  );
  const { data: pending, loading } = useCollection<VerificationUser>(pendingQuery);

  const handleDecision = async (userId: string, decision: "verified" | "rejected") => {
    setProcessing(userId);
    try {
      await updateDoc(doc(db, "users", userId), {
        "metadata.ninVerificationStatus": decision,
        verified: decision === "verified",
      });
      toast({
        title: decision === "verified" ? "NIN Verified" : "NIN Rejected",
        description: "The applicant's verification status has been updated.",
      });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Update Failed", description: error.message });
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 flex items-center gap-2 font-headline text-3xl text-ink">
          <ShieldCheck className="h-7 w-7 text-primary" /> NIN Verification Queue
        </h1>
        <p className="font-body text-sm text-muted-foreground">
          Manually review National Identification Numbers submitted by drivers and partners against their
          supporting documentation before marking an account verified.
        </p>
      </div>

      {loading && <p className="font-body text-sm text-muted-foreground">Loading verification queue...</p>}

      {!loading && pending && pending.length === 0 && (
        <div className="border border-dashed border-border px-6 py-16 text-center">
          <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-primary/40" />
          <h3 className="mb-1 font-headline text-xl text-ink">Queue is clear</h3>
          <p className="font-body text-sm text-muted-foreground">No NIN submissions are pending review right now.</p>
        </div>
      )}

      <div className="space-y-4">
        {pending?.map((u) => {
          const nin = u.metadata?.nin || "";
          const isRevealed = revealed[u.id];
          return (
            <div key={u.id} className="border border-border bg-card">
              <div className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2.5 text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-headline text-lg text-ink">{u.displayName || "Unnamed Applicant"}</h2>
                    <p className="font-body text-xs text-muted-foreground">{u.email} {u.phoneNumber ? `· ${u.phoneNumber}` : ""}</p>
                  </div>
                </div>
                <span className="bg-accent/10 px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-accent">
                  Pending Review
                </span>
              </div>
              <div className="flex flex-col items-start justify-between gap-4 border-t border-border p-6 sm:flex-row sm:items-center">
                <div>
                  <p className="mb-1 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Submitted NIN
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-ink">{isRevealed ? nin : maskNin(nin)}</span>
                    <button
                      type="button"
                      onClick={() => setRevealed((r) => ({ ...r, [u.id]: !r[u.id] }))}
                      className="text-muted-foreground hover:text-ink"
                    >
                      {isRevealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision(u.id, "verified")}
                    disabled={processing === u.id}
                    className="flex items-center gap-2 bg-sage px-5 py-2.5 font-body text-xs font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark disabled:opacity-60"
                  >
                    <Check className="h-4 w-4" /> Verify
                  </button>
                  <button
                    onClick={() => handleDecision(u.id, "rejected")}
                    disabled={processing === u.id}
                    className="flex items-center gap-2 border border-destructive px-5 py-2.5 font-body text-xs font-bold uppercase tracking-widest text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground disabled:opacity-60"
                  >
                    <X className="h-4 w-4" /> Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
