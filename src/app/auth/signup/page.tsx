"use client";

import Link from "next/link";
import Image from "next/image";
import {
  User,
  Mail,
  Lock,
  Phone,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/logo";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuth, useFirestore } from "@/firebase";
import { useToast } from "@/hooks/use-toast";

const fieldClass =
  "h-12 rounded-none border-border bg-card pl-11 font-body text-sm shadow-none focus-visible:border-primary focus-visible:ring-0";
const labelClass = "font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground";

function DriverSignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const auth = useAuth();
  const db = useFirestore();

  const redirectPath = searchParams.get("redirect") || "/";

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    state: "",
    nin: "",
  });

  const nigerianStates = [
    "Lagos", "Abuja (FCT)", "Rivers", "Kano", "Oyo", "Kaduna", "Ogun", "Delta", "Enugu", "Edo", "Kwara", "Akwa Ibom",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      const fullName = `${formData.firstName} ${formData.lastName}`;

      await updateProfile(user, {
        displayName: fullName,
      });

      const profileData = {
        uid: user.uid,
        email: formData.email,
        displayName: fullName,
        role: "driver",
        phoneNumber: formData.phone,
        verified: false,
        createdAt: serverTimestamp(),
        metadata: {
          state: formData.state,
          nin: formData.nin,
        },
      };

      await setDoc(doc(db, "users", user.uid), profileData);

      toast({
        title: "Account Created",
        description: "Welcome to the PADTI Driver Portal!",
      });

      router.push(redirectPath);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Photo side */}
      <div className="relative hidden lg:block">
        <Image
          src="/images/facility-visit/padti-facility-visit-03.jpeg"
          alt="PADTI staff and FRSC officials at the training facility"
          fill
          className="object-cover"
          style={{ objectPosition: "center 35%" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <p className="mb-3 font-body text-xs font-bold uppercase tracking-[0.35em] text-cream/70">
            Professional. Verified. Global.
          </p>
          <h2 className="max-w-md font-headline text-4xl leading-tight text-cream">
            Train for excellence. <span className="italic">Partner for growth.</span>
          </h2>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center bg-background px-6 py-16">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-2 flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl text-ink">PADTI</span>
          </Link>
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to home
          </Link>

          <p className="mb-2 font-body text-xs font-bold uppercase tracking-[0.35em] text-primary">
            Driver Registration
          </p>
          <h1 className="mb-8 font-headline text-3xl text-ink">
            Join the <span className="italic">institute</span>
          </h1>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName" className={labelClass}>First Name</Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="firstName" placeholder="John" className={fieldClass} required value={formData.firstName} onChange={handleInputChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className={labelClass}>Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="lastName" placeholder="Doe" className={fieldClass} required value={formData.lastName} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className={labelClass}>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="john@example.com" className={fieldClass} required value={formData.email} onChange={handleInputChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className={labelClass}>Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="phone" placeholder="+234 ..." className={fieldClass} required value={formData.phone} onChange={handleInputChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className={labelClass}>State of Residence</Label>
                <Select onValueChange={(val) => setFormData({ ...formData, state: val })}>
                  <SelectTrigger className="h-12 rounded-none border-border bg-card font-body text-sm shadow-none focus:ring-0">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state.toLowerCase()}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nin" className={labelClass}>National ID (NIN)</Label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="nin" placeholder="11-digit NIN" className={fieldClass} value={formData.nin} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className={labelClass}>Create Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" className={fieldClass} required value={formData.password} onChange={handleInputChange} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 bg-sage py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>Create Driver Account <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <div className="mt-8 space-y-3 border-t border-border pt-6 text-center">
            <p className="font-body text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/signin" className="font-bold text-primary hover:underline">Sign in to Portal</Link>
            </p>
            <Link
              href="/auth/signup-partner"
              className="inline-block font-body text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              Are you an Employer or Partner? Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DriverSignUpPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center font-body text-muted-foreground">Loading registration...</div>}>
      <DriverSignUpForm />
    </Suspense>
  );
}
