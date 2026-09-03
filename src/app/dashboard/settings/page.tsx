"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { User, Lock, CreditCard, ShieldCheck, Camera, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

const tabTriggerClass =
  "flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 font-body text-sm font-bold uppercase tracking-wide data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none";
const fieldClass = "h-11 rounded-none border-border bg-card font-body text-sm shadow-none focus-visible:border-primary focus-visible:ring-0";

function SettingsContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "profile";
  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [nin, setNin] = useState("");

  const userDocRef = useMemoFirebase(() => (user ? doc(db, "users", user.uid) : null), [db, user]);
  const { data: profile, loading: profileLoading } = useDoc(userDocRef);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || user?.displayName || "");
      setPhone(profile.phoneNumber || "");
      setNin(profile.metadata?.nin || "");
    }
  }, [profile, user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      await updateProfile(user, { displayName });
      await updateDoc(doc(db, "users", user.uid), {
        displayName,
        phoneNumber: phone,
        "metadata.nin": nin,
      });

      toast({
        title: "Profile Updated",
        description: "Your institutional record has been saved successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message || "An error occurred while saving your profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 font-headline text-3xl text-ink">Account Settings</h1>
        <p className="font-body text-sm text-muted-foreground">Manage your institutional profile, security, and subscription status.</p>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="h-auto w-full justify-start rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger value="profile" className={tabTriggerClass}>
            <User className="h-4 w-4" /> Profile Information
          </TabsTrigger>
          <TabsTrigger value="account" className={tabTriggerClass}>
            <Lock className="h-4 w-4" /> Account Management
          </TabsTrigger>
          <TabsTrigger value="subscription" className={tabTriggerClass}>
            <CreditCard className="h-4 w-4" /> Subscription &amp; Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="border border-border bg-card p-6 lg:col-span-2">
              <h2 className="mb-1 font-headline text-xl text-ink">Institutional Profile</h2>
              <p className="mb-6 font-body text-sm text-muted-foreground">Keep your professional information up to date for employer verification.</p>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="flex items-center gap-6 border-b border-border pb-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-secondary">
                      <AvatarImage src={user?.photoURL || ""} />
                      <AvatarFallback className="bg-primary/5 text-2xl font-bold text-primary">
                        {(displayName || user?.displayName || "U").substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <button type="button" className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center bg-ink text-cream">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-headline text-lg text-ink">{displayName || user?.displayName || "Unset Name"}</h4>
                    <p className="font-body text-sm text-muted-foreground">{user?.email}</p>
                    <span className="mt-2 inline-block bg-primary/10 px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-primary">
                      PADTI ID: {user?.uid.substring(0, 8).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="font-body text-xs font-medium text-muted-foreground">Full Professional Name</Label>
                    <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="e.g. John Doe" className={fieldClass} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-body text-xs font-medium text-muted-foreground">Email Address (Read-only)</Label>
                    <Input id="email" value={user?.email || ""} disabled className={`${fieldClass} bg-secondary`} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-body text-xs font-medium text-muted-foreground">Phone Number</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 ..." className={fieldClass} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nin" className="font-body text-xs font-medium text-muted-foreground">National ID (NIN)</Label>
                    <Input id="nin" value={nin} onChange={(e) => setNin(e.target.value)} placeholder="11-digit number" className={fieldClass} />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-sage px-8 py-3.5 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark disabled:opacity-60"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                  Save Profile Changes
                </button>
              </form>
            </div>

            <div className="border border-border bg-secondary p-6">
              <h2 className="mb-5 flex items-center gap-2 font-headline text-lg text-ink">
                <ShieldCheck className="h-5 w-5 text-primary" /> Verification Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 border border-border bg-card p-4">
                  <div className="bg-primary/10 p-2 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-bold text-ink">Email Verified</p>
                    <p className="font-body text-[10px] font-bold uppercase text-muted-foreground">Security Checked</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 border border-border bg-card p-4 opacity-60">
                  <div className="bg-accent/10 p-2 text-accent">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-bold text-ink">Institutional Audit</p>
                    <p className="font-body text-[10px] font-bold uppercase text-muted-foreground">Pending Review</p>
                  </div>
                </div>
                <p className="font-body text-xs italic leading-relaxed text-muted-foreground">
                  &ldquo;Institutional verification is required for full access to the Career Marketplace and verified talent search.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="account" className="mt-8">
          <div className="max-w-2xl border border-border bg-card p-6">
            <h2 className="mb-1 font-headline text-xl text-ink">Account Security</h2>
            <p className="mb-6 font-body text-sm text-muted-foreground">Manage your authentication methods and login security.</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary p-2">
                    <Lock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-bold text-ink">Account Password</p>
                    <p className="font-body text-xs text-muted-foreground">Last changed 3 months ago</p>
                  </div>
                </div>
                <button className="border border-primary px-4 py-2 font-body text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                  Update Password
                </button>
              </div>

              <div className="flex items-center justify-between border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary p-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-bold text-ink">Two-Factor Auth</p>
                    <p className="font-body text-xs text-muted-foreground">Add an extra layer of security</p>
                  </div>
                </div>
                <button className="border border-primary px-4 py-2 font-body text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                  Setup 2FA
                </button>
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <h4 className="mb-2 font-body text-sm font-bold uppercase tracking-widest text-destructive">Danger Zone</h4>
              <p className="mb-4 font-body text-xs text-muted-foreground">
                Permanently delete your account and all institutional data. This action cannot be undone.
              </p>
              <button className="bg-destructive px-6 py-2.5 font-body text-sm font-bold text-destructive-foreground">Delete Account</button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="subscription" className="mt-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="border border-border bg-card md:col-span-2">
              <div className="p-6">
                <h2 className="mb-1 font-headline text-xl text-ink">Active Subscription</h2>
                <p className="mb-6 font-body text-sm text-muted-foreground">Overview of your current platform access and billing cycles.</p>
                <div className="bg-ink p-8 text-cream">
                  <span className="mb-4 inline-block bg-cream/10 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-cream">
                    Institutional Professional
                  </span>
                  <h3 className="mb-2 font-headline text-4xl text-cream">
                    ₦1,500,000 <span className="font-body text-lg font-normal text-cream/60">/ Program</span>
                  </h3>
                  <p className="font-body text-sm font-medium text-cream/70">Professional CDL Class A (Heavy Haul) - Installment Plan</p>
                </div>

                <div className="mt-6 space-y-3">
                  <h4 className="font-body text-xs font-bold uppercase tracking-widest text-primary">Upcoming Payments</h4>
                  <div className="flex items-center justify-between border border-border p-4">
                    <div>
                      <p className="font-body text-sm font-bold text-ink">₦375,000</p>
                      <p className="font-body text-xs text-muted-foreground">Due: Dec 15, 2023</p>
                    </div>
                    <span className="border border-border px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Installment 3/4
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t border-border bg-secondary p-6">
                <button className="w-full bg-sage py-3.5 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
                  Manage Billing Methods
                </button>
              </div>
            </div>

            <div className="border border-border bg-card p-6">
              <h2 className="mb-4 font-headline text-lg text-ink">Invoicing History</h2>
              <div>
                {[
                  { date: "Oct 15, 2023", id: "#INV-928" },
                  { date: "Sep 15, 2023", id: "#INV-842" },
                  { date: "Aug 15, 2023", id: "#INV-710" },
                ].map((inv, i, arr) => (
                  <div key={inv.id} className={`flex items-center justify-between py-3 ${i !== arr.length - 1 ? "border-b border-border" : ""}`}>
                    <div>
                      <p className="font-body text-sm font-bold text-ink">{inv.id}</p>
                      <p className="font-body text-[10px] text-muted-foreground">{inv.date}</p>
                    </div>
                    <button className="font-body text-xs font-bold text-primary hover:underline">PDF</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function DashboardSettingsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center font-body text-muted-foreground">Loading institutional settings...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
