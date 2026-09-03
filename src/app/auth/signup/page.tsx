
"use client";

import Link from "next/link";
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  ShieldCheck, 
  ArrowLeft,
  Loader2,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/logo";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuth, useFirestore } from "@/firebase";
import { useToast } from "@/hooks/use-toast";

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
    nin: ""
  });

  const nigerianStates = [
    "Lagos", "Abuja (FCT)", "Rivers", "Kano", "Oyo", "Kaduna", "Ogun", "Delta", "Enugu", "Edo", "Kwara", "Akwa Ibom"
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
        displayName: fullName
      });

      const profileData = {
        uid: user.uid,
        email: formData.email,
        displayName: fullName,
        role: 'driver',
        phoneNumber: formData.phone,
        verified: false,
        createdAt: serverTimestamp(),
        metadata: {
          state: formData.state,
          nin: formData.nin
        }
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
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4 py-12">
      <div className="w-full max-w-xl">
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
            <CardTitle className="text-3xl text-center font-bold text-primary">Driver Registration</CardTitle>
            <CardDescription className="text-center text-lg">
              Join the elite institute for professional articulated drivers
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 p-8 bg-secondary/10">
            <form onSubmit={handleRegister} className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="firstName" placeholder="John" className="pl-10 h-11 rounded-xl bg-white border-none shadow-sm" required value={formData.firstName} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="lastName" placeholder="Doe" className="pl-10 h-11 rounded-xl bg-white border-none shadow-sm" required value={formData.lastName} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="john@example.com" className="pl-10 h-11 rounded-xl bg-white border-none shadow-sm" required value={formData.email} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" placeholder="+234 ..." className="pl-10 h-11 rounded-xl bg-white border-none shadow-sm" required value={formData.phone} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">State of Residence</Label>
                  <Select onValueChange={(val) => setFormData({...formData, state: val})}>
                    <SelectTrigger className="h-11 rounded-xl bg-white border-none shadow-sm">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {nigerianStates.map(state => (
                        <SelectItem key={state} value={state.toLowerCase()}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nin" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">National ID (NIN)</Label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="nin" placeholder="11-digit NIN" className="pl-10 h-11 rounded-xl bg-white border-none shadow-sm" value={formData.nin} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" title="Create Password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Create Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" className="pl-10 h-11 rounded-xl bg-white border-none shadow-sm" required value={formData.password} onChange={handleInputChange} />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4 py-7 text-lg rounded-2xl font-bold shadow-xl" disabled={loading}>
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : (
                  <>Create Driver Account <ChevronRight className="ml-2 h-5 w-5" /></>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center gap-4 p-8 bg-white border-t">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="text-sm text-muted-foreground">Already have an account?</div>
              <Link href="/auth/signin" className="text-sm font-bold text-primary hover:underline">Sign in to Portal</Link>
            </div>
            <div className="text-center">
              <Link href="/auth/signup-partner" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-widest">
                Are you an Employer or Partner? Register here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function DriverSignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Registration...</div>}>
      <DriverSignUpForm />
    </Suspense>
  );
}
