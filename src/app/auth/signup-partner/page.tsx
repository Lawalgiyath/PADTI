"use client";

import Link from "next/link";
import { 
  User, 
  Building2, 
  ChevronRight, 
  Mail, 
  Lock, 
  Phone, 
  Truck, 
  Building,
  Scale,
  ArrowLeft,
  Loader2,
  Globe,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuth, useFirestore } from "@/firebase";
import { useToast } from "@/hooks/use-toast";

function PartnerSignUpForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const db = useFirestore();

  const initialRole = searchParams.get('role') || 'employer';
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
    sector: ""
  });

  useEffect(() => {
    if (['employer', 'insurer', 'manufacturer', 'institution'].includes(initialRole)) {
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

      // Update Auth Profile
      await updateProfile(user, {
        displayName: fullName
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
          sector: formData.sector
        }
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
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <Logo className="h-10 w-10 text-primary" />
            </div>
            <span className="text-2xl font-bold text-primary font-headline">PADTI</span>
          </Link>
          <Link href="/" className="flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
          </Link>
        </div>
        
        <Card className="shadow-2xl border-none rounded-[32px] overflow-hidden">
          <CardHeader className="space-y-1 bg-white pb-8">
            <CardTitle className="text-3xl text-center font-bold text-primary">Partner Registration</CardTitle>
            <CardDescription className="text-center text-lg">
              Register your organization in our global logistics ecosystem
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8 p-8 bg-secondary/10">
            <div className="space-y-4 bg-white p-6 rounded-[24px] shadow-sm border border-secondary">
              <Label className="text-sm font-black text-primary uppercase tracking-widest block text-center mb-2">Partner Category:</Label>
              <RadioGroup 
                value={role} 
                onValueChange={setRole} 
                className="grid grid-cols-2 md:grid-cols-4 gap-3"
              >
                {partnerTypes.map((type) => (
                  <div key={type.value}>
                    <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
                    <Label
                      htmlFor={type.value}
                      className="flex flex-col items-center justify-center rounded-2xl border-2 border-transparent bg-secondary/30 p-4 hover:bg-primary/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all h-24 text-center"
                    >
                      <type.icon className="mb-2 h-5 w-5 text-primary" />
                      <span className="font-bold text-[10px] uppercase leading-tight">{type.label.split(' / ')[0]}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <form onSubmit={handleRegister} className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Organization Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="orgName" placeholder="ACME Logistics Ltd" className="pl-10 h-11 rounded-xl bg-white border-none shadow-sm" required value={formData.orgName} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regNo" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Registration Number</Label>
                  <div className="relative flex items-center">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="regNo" placeholder="RC1234567" className="pl-10 h-11 rounded-xl bg-white border-none shadow-sm" required value={formData.regNo} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="firstName" placeholder="John" className="pl-10 h-11 rounded-xl bg-white border-none shadow-sm" required value={formData.firstName} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="lastName" placeholder="Doe" className="pl-10 h-11 rounded-xl bg-white border-none shadow-sm" required value={formData.lastName} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Work Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="corp@example.com" className="pl-10 h-11 rounded-xl bg-white border-none shadow-sm" required value={formData.email} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Office Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" placeholder="+234 ..." className="pl-10 h-11 rounded-xl bg-white border-none shadow-sm" required value={formData.phone} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Website (Optional)</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="website" placeholder="https://..." className="pl-10 h-11 rounded-xl bg-white border-none shadow-sm" value={formData.website} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Industry Sector</Label>
                  <Select onValueChange={(val) => setFormData({...formData, sector: val})}>
                    <SelectTrigger className="h-11 rounded-xl bg-white border-none shadow-sm">
                      <SelectValue placeholder="Select Sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="logistics">Logistics & Transport</SelectItem>
                      <SelectItem value="finance">Insurance & Finance</SelectItem>
                      <SelectItem value="manufacturing">Equipment Manufacturing</SelectItem>
                      <SelectItem value="government">Government / Public Body</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" title="Create Password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Account Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" className="pl-10 h-11 rounded-xl bg-white border-none shadow-sm" required value={formData.password} onChange={handleInputChange} />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4 py-7 text-lg rounded-2xl font-bold shadow-xl" disabled={loading}>
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : (
                  <>Register Institution <ChevronRight className="ml-2 h-5 w-5" /></>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center gap-4 p-8 bg-white border-t">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="text-sm text-muted-foreground">Have an account?</div>
              <Link href="/auth/signin" className="text-sm font-bold text-primary hover:underline">Sign in to Portal</Link>
            </div>
            <div className="text-center">
              <Link href="/auth/signup" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-widest">
                Are you a Driver or Student? Register here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function PartnerSignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading registration portal...</div>}>
      <PartnerSignUpForm />
    </Suspense>
  );
}