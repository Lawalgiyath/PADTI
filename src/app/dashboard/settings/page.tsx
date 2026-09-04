"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser, useFirestore, useStorage, useDoc, useMemoFirebase } from "@/firebase";
import { User, Lock, CreditCard, ShieldCheck, Camera, Loader2, CheckCircle2, AlertCircle, Clock, XCircle, Eye, EyeOff } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useToast } from "@/hooks/use-toast";
import { isValidNin, maskNin, type NinVerificationStatus } from "@/lib/nin";

const tabTriggerClass =
  "flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 font-body text-sm font-bold uppercase tracking-wide data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none";
const fieldClass = "h-11 rounded-none border-border bg-card font-body text-sm shadow-none focus-visible:border-primary focus-visible:ring-0";

function SettingsContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "profile";
  const { user } = useUser();
  const db = useFirestore();
  const storage = useStorage();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [nin, setNin] = useState("");
  const [ninStatus, setNinStatus] = useState<NinVerificationStatus>("unsubmitted");
  const [ninRevealed, setNinRevealed] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userDocRef = useMemoFirebase(() => (user ? doc(db, "users", user.uid) : null), [db, user]);
  const { data: profile, loading: profileLoading } = useDoc(userDocRef);

  const originalNin = profile?.metadata?.nin || "";

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || user?.displayName || "");
      setPhone(profile.phoneNumber || "");
      setNin(profile.metadata?.nin || "");
      setNinStatus(profile.metadata?.ninVerificationStatus || "unsubmitted");
    }
  }, [profile, user]);

  const ninError = nin.length > 0 && !isValidNin(nin) ? "NIN must be exactly 11 digits" : "";

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast({ variant: "destructive", title: "Invalid File", description: "Please choose an image file." });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ variant: "destructive", title: "File Too Large", description: "Profile photos must be under 5MB." });
      return;
    }

    setUploadingPhoto(true);
    try {
      const storageRef = ref(storage, `profile-pictures/${user.uid}/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      await updateProfile(user, { photoURL });
      await updateDoc(doc(db, "users", user.uid), { photoURL });
      toast({ title: "Photo Updated", description: "Your profile picture has been saved." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Upload Failed", description: error.message || "Could not upload photo." });
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (nin && !isValidNin(nin)) {
      toast({ variant: "destructive", title: "Invalid NIN", description: "Your NIN must be exactly 11 digits." });
      return;
    }
    setLoading(true);
    try {
      await updateProfile(user, { displayName });
      const ninChanged = nin !== originalNin;
      const nextStatus: NinVerificationStatus = !nin ? "unsubmitted" : ninChanged ? "pending" : ninStatus;

      await updateDoc(doc(db, "users", user.uid), {
        displayName,
        phoneNumber: phone,
        "metadata.nin": nin,
        "metadata.ninVerificationStatus": nextStatus,
      });
      setNinStatus(nextStatus);

      toast({
        title: "Profile Updated",
        description: ninChanged && nin
          ? "Your profile was saved. Your NIN has been submitted for admin verification."
          : "Your institutional record has been saved successfully.",
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
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoSelect}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingPhoto}
                      className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center bg-ink text-cream disabled:opacity-60"
                    >
                      {uploadingPhoto ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
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
                    <div className="relative">
                      <Input
                        id="nin"
                        type="text"
                        value={ninRevealed ? nin : nin ? maskNin(nin) : ""}
                        onFocus={() => setNinRevealed(true)}
                        onChange={(e) => setNin(e.target.value.replace(/\D/g, "").slice(0, 11))}
                        inputMode="numeric"
                        placeholder="11-digit number"
                        className={`${fieldClass} pr-10`}
                      />
                      {nin && (
                        <button
                          type="button"
                          onClick={() => setNinRevealed((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink"
                        >
                          {ninRevealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      )}
                    </div>
                    {ninError && <p className="font-body text-xs text-destructive">{ninError}</p>}
                    <p className="font-body text-xs text-muted-foreground">
                      Used for identity verification only. Visible to you and PADTI administrators.
                    </p>
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
                  <div className={user?.emailVerified ? "bg-primary/10 p-2 text-primary" : "bg-secondary p-2 text-muted-foreground"}>
                    {user?.emailVerified ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-body text-sm font-bold text-ink">Email</p>
                    <p className="font-body text-[10px] font-bold uppercase text-muted-foreground">
                      {user?.emailVerified ? "Verified" : "Not Verified"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 border border-border bg-card p-4">
                  <div
                    className={
                      ninStatus === "verified"
                        ? "bg-primary/10 p-2 text-primary"
                        : ninStatus === "rejected"
                        ? "bg-destructive/10 p-2 text-destructive"
                        : ninStatus === "pending"
                        ? "bg-accent/10 p-2 text-accent"
                        : "bg-secondary p-2 text-muted-foreground"
                    }
                  >
                    {ninStatus === "verified" && <CheckCircle2 className="h-5 w-5" />}
                    {ninStatus === "rejected" && <XCircle className="h-5 w-5" />}
                    {ninStatus === "pending" && <Clock className="h-5 w-5" />}
                    {ninStatus === "unsubmitted" && <AlertCircle className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-body text-sm font-bold text-ink">NIN Verification</p>
                    <p className="font-body text-[10px] font-bold uppercase text-muted-foreground">
                      {ninStatus === "verified" && "Verified"}
                      {ninStatus === "rejected" && "Rejected — resubmit"}
                      {ninStatus === "pending" && "Pending Admin Review"}
                      {ninStatus === "unsubmitted" && "Not Submitted"}
                    </p>
                  </div>
                </div>
                <p className="font-body text-xs italic leading-relaxed text-muted-foreground">
                  &ldquo;NIN verification is reviewed manually by PADTI administrators and is required for full
                  access to the Career Marketplace and verified talent search.&rdquo;
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
