"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { 
  User, 
  Lock, 
  CreditCard, 
  ShieldCheck, 
  Camera, 
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

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

  // Get extended profile data from Firestore
  const userDocRef = useMemoFirebase(() => 
    user ? doc(db, "users", user.uid) : null
  , [db, user]);
  const { data: profile, loading: profileLoading } = useDoc(userDocRef);

  // Sync state with profile data when it loads
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
      // 1. Update Firebase Auth Profile (for immediate UI reflect in header)
      await updateProfile(user, { displayName });
      
      // 2. Update Firestore document (for persistent institutional data)
      await updateDoc(doc(db, "users", user.uid), { 
        displayName,
        phoneNumber: phone,
        "metadata.nin": nin
      });

      toast({ 
        title: "Profile Updated", 
        description: "Your institutional record has been saved successfully." 
      });
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Update Failed", 
        description: error.message || "An error occurred while saving your profile." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2 font-headline">Account Settings</h1>
        <p className="text-muted-foreground">Manage your institutional profile, security, and subscription status.</p>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="bg-secondary/50 p-1 rounded-xl h-auto flex flex-wrap justify-start border border-secondary">
          <TabsTrigger value="profile" className="rounded-lg py-2.5 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
            <User className="h-4 w-4" /> Profile Information
          </TabsTrigger>
          <TabsTrigger value="account" className="rounded-lg py-2.5 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
            <Lock className="h-4 w-4" /> Account Management
          </TabsTrigger>
          <TabsTrigger value="subscription" className="rounded-lg py-2.5 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
            <CreditCard className="h-4 w-4" /> Subscription & Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 border-none shadow-sm">
              <CardHeader>
                <CardTitle>Institutional Profile</CardTitle>
                <CardDescription>Keep your professional information up to date for employer verification.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b border-secondary">
                    <div className="relative group">
                      <Avatar className="h-24 w-24 border-4 border-secondary ring-2 ring-primary/10">
                        <AvatarImage src={user?.photoURL || ""} />
                        <AvatarFallback className="text-2xl font-bold bg-primary/5 text-primary">
                          {(displayName || user?.displayName || "U").substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Button type="button" size="icon" variant="secondary" className="absolute -bottom-1 -right-1 rounded-full shadow-lg h-8 w-8">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{displayName || user?.displayName || "Unset Name"}</h4>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                      <Badge className="mt-2 bg-primary/10 text-primary border-none uppercase">
                        PADTI ID: {user?.uid.substring(0, 8).toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Full Professional Name</Label>
                      <Input 
                        id="displayName" 
                        value={displayName} 
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="e.g. John Doe" 
                        className="rounded-xl h-11"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address (Read-only)</Label>
                      <Input id="email" value={user?.email || ""} disabled className="rounded-xl h-11 bg-secondary/30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 ..." 
                        className="rounded-xl h-11" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nin">National ID (NIN)</Label>
                      <Input 
                        id="nin" 
                        value={nin}
                        onChange={(e) => setNin(e.target.value)}
                        placeholder="11-digit number" 
                        className="rounded-xl h-11" 
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 rounded-xl px-8 h-12 font-bold gap-2">
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                      Save Profile Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <ShieldCheck className="h-5 w-5" /> Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-white rounded-2xl border border-secondary shadow-sm flex items-center gap-4">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Email Verified</p>
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">Security Checked</p>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-secondary shadow-sm flex items-center gap-4 opacity-60">
                  <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Institutional Audit</p>
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">Pending Review</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  "Institutional verification is required for full access to the Career Marketplace and verified talent search."
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="account" className="mt-8">
          <Card className="max-w-2xl border-none shadow-sm">
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your authentication methods and login security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary p-2 rounded-lg">
                      <Lock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Account Password</p>
                      <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-xl font-bold border-primary text-primary">Update Password</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary p-2 rounded-lg">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Two-Factor Auth</p>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-xl font-bold border-primary text-primary">Setup 2FA</Button>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h4 className="text-sm font-bold text-destructive mb-2 uppercase tracking-widest">Danger Zone</h4>
                <p className="text-xs text-muted-foreground mb-4">Permanently delete your account and all institutional data. This action cannot be undone.</p>
                <Button variant="destructive" className="rounded-xl font-bold h-11 px-6">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-sm md:col-span-2">
              <CardHeader>
                <CardTitle>Active Subscription</CardTitle>
                <CardDescription>Overview of your current platform access and billing cycles.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-primary text-white p-8 rounded-[32px] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-10">
                    <CreditCard className="h-40 w-40" />
                  </div>
                  <div className="relative z-10">
                    <Badge className="bg-white/20 text-white border-none mb-4 uppercase font-bold tracking-widest">Institutional Professional</Badge>
                    <h3 className="text-4xl font-black mb-2">₦1,500,000 <span className="text-lg font-normal text-white/70">/ Program</span></h3>
                    <p className="text-white/80 font-medium">Professional CDL Class A (Heavy Haul) - Installment Plan</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Upcoming Payments</h4>
                  <div className="flex items-center justify-between p-4 border rounded-2xl bg-white shadow-sm">
                    <div>
                      <p className="font-bold">₦375,000</p>
                      <p className="text-xs text-muted-foreground">Due: Dec 15, 2023</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-bold">INSTALLMENT 3/4</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-secondary/20 p-6">
                <Button className="w-full bg-primary h-12 rounded-xl font-bold">Manage Billing Methods</Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Invoicing History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { date: "Oct 15, 2023", amount: "₦375k", id: "#INV-928" },
                  { date: "Sep 15, 2023", amount: "₦375k", id: "#INV-842" },
                  { date: "Aug 15, 2023", amount: "₦375k", id: "#INV-710" },
                ].map((inv, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b last:border-0 border-secondary">
                    <div>
                      <p className="text-sm font-bold">{inv.id}</p>
                      <p className="text-[10px] text-muted-foreground">{inv.date}</p>
                    </div>
                    <Button variant="ghost" className="text-primary font-bold text-xs underline">PDF</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function DashboardSettingsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading institutional settings...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
