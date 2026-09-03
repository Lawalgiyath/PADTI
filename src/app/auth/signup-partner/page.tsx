"use client";

import Link from "next/link";
import Image from "next/image";
import {
  User,
  Building2,
  ArrowRight,
  Mail,
  Lock,
  Phone,
  Truck,
  Building,
  Scale,
  ArrowLeft,
  Loader2,
  Globe,
  FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuth, useFirestore } from "@/firebase";
import { useToast } from "@/hooks/use-toast";

const fieldClass =
  "h-12 rounded-none border-border bg-card pl-11 font-body text-sm shadow-none focus-visible:border-primary focus-visible:ring-0";
const labelClass = "font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground";

function PartnerSignUpForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const db = useFirestore();

  const initialRole = searchParams.get("role") || "employer";
  const [role, setRole] = useState(initialRole);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    orgName: "",
    regNo: "",
    website: "",
    sector: "",
  });

  useEffect(() => {
    if (["employer", "insurer", "manufacturer", "institution"].includes(initialRole)) {
      setRole(initialRole);
    }
  }, [initialRole]);

  const partnerTypes = [
    { value: "employer", label: "Employer / Fleet Owner", icon: Building2 },
    { value: "insurer", label: "Insurance Provider", icon: Scale },
    { value: "manufacturer", label: "Equipment Manufacturer", icon: Truck },
    { value: "institution", label: "Institutional Partner", icon: Building },
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
        role,
        phoneNumber: formData.phone,
        verified: false,
        createdAt: serverTimestamp(),
        metadata: {
          orgName: formData.orgName,
          regNo: formData.regNo,
          website: formData.website,
          sector: formData.sector,
        },
      };

      await setDoc(doc(db, "users", user.uid), profileData);

      toast({
        title: "Registration Successful",
        description: "Your organization has been added to the PADTI ecosystem.",
      });

      router.push(`/dashboard?role=${role}`);
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
          src="/images/planning-meeting/padti-planning-meeting-02.jpeg"
          alt="PADTI leadership in a strategic planning session"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <p className="mb-3 font-body text-xs font-bold uppercase tracking-[0.35em] text-cream/70">
            Global Partner Ecosystem
          </p>
          <h2 className="max-w-md font-headline text-4xl leading-tight text-cream">
            A unified ecosystem for <span className="italic">logistics excellence</span>
          </h2>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center bg-background px-6 py-16">
        <div className="w-full max-w-xl">
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
            Partner Registration
          </p>
          <h1 className="mb-8 font-headline text-3xl text-ink">
            Register your <span className="italic">organization</span>
          </h1>

          <div className="mb-8">
            <Label className={`${labelClass} mb-3 block`}>Partner Category</Label>
            <RadioGroup value={role} onValueChange={setRole} className="grid grid-cols-2 gap-2">
              {partnerTypes.map((type) => (
                <div key={type.value}>
                  <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
                  <Label
                    htmlFor={type.value}
                    className="flex h-20 cursor-pointer flex-col items-center justify-center border border-border bg-card text-center transition-colors hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  >
                    <type.icon className="mb-2 h-5 w-5 text-primary" />
                    <span className="font-body text-[10px] font-bold uppercase leading-tight tracking-wide">
                      {type.label.split(" / ")[0]}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="orgName" className={labelClass}>Organization Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="orgName" placeholder="ACME Logistics Ltd" className={fieldClass} required value={formData.orgName} onChange={handleInputChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="regNo" className={labelClass}>Registration Number</Label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="regNo" placeholder="RC1234567" className={fieldClass} required value={formData.regNo} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName" className={labelClass}>Contact First Name</Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="firstName" placeholder="John" className={fieldClass} required value={formData.firstName} onChange={handleInputChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className={labelClass}>Contact Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="lastName" placeholder="Doe" className={fieldClass} required value={formData.lastName} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className={labelClass}>Work Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="corp@example.com" className={fieldClass} required value={formData.email} onChange={handleInputChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className={labelClass}>Office Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="phone" placeholder="+234 ..." className={fieldClass} required value={formData.phone} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="website" className={labelClass}>Website (Optional)</Label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="website" placeholder="https://..." className={fieldClass} value={formData.website} onChange={handleInputChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label className={labelClass}>Industry Sector</Label>
                <Select onValueChange={(val) => setFormData({ ...formData, sector: val })}>
                  <SelectTrigger className="h-12 rounded-none border-border bg-card font-body text-sm shadow-none focus:ring-0">
                    <SelectValue placeholder="Select Sector" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="logistics">Logistics &amp; Transport</SelectItem>
                    <SelectItem value="finance">Insurance &amp; Finance</SelectItem>
                    <SelectItem value="manufacturing">Equipment Manufacturing</SelectItem>
                    <SelectItem value="government">Government / Public Body</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className={labelClass}>Account Password</Label>
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
                <>Register Institution <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <div className="mt-8 space-y-3 border-t border-border pt-6 text-center">
            <p className="font-body text-sm text-muted-foreground">
              Have an account?{" "}
              <Link href="/auth/signin" className="font-bold text-primary hover:underline">Sign in to Portal</Link>
            </p>
            <Link
              href="/auth/signup"
              className="inline-block font-body text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              Are you a Driver or Student? Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PartnerSignUpPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center font-body text-muted-foreground">Loading registration portal...</div>}>
      <PartnerSignUpForm />
    </Suspense>
  );
}
