
"use client";

import Link from "next/link";
import { Mail, Lock, ArrowLeft, Loader2, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { useState, Suspense } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const redirectPath = searchParams.get("redirect") || "/";

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Welcome Back",
        description: "You have successfully signed in.",
      });
      router.push(redirectPath);
    } catch (error: any) {
      let message = "Could not sign in. Please check your credentials.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        message = "Invalid email or password.";
      } else if (error.code === 'auth/invalid-email') {
        message = "Please enter a valid email address.";
      }
      
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push(redirectPath);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google Sign In Failed",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <div className="w-full max-w-md">
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
        
        <Card className="shadow-xl border-none rounded-[32px] overflow-hidden">
          <CardHeader className="space-y-1 bg-white">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Access your PADTI student or employer portal
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 p-8 bg-secondary/10">
            <div className="grid grid-cols-1 gap-2">
              <Button variant="outline" onClick={handleGoogleSignIn} className="rounded-xl py-6 font-bold gap-2 bg-white border-none shadow-sm">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted-foreground/20" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-muted-foreground">
                <span className="bg-transparent px-2">Institutional Access</span>
              </div>
            </div>
            <form onSubmit={handleSignIn} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    className="pl-10 h-11 rounded-xl bg-white border-none shadow-sm" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-xs text-primary font-bold hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    className="pl-10 h-11 rounded-xl bg-white border-none shadow-sm" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-2 py-6 text-lg rounded-xl font-bold" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In to Portal"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col p-6 bg-white border-t gap-3">
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-muted-foreground">Don't have an account?</span>
              <Link href="/auth/signup" className="font-bold text-primary hover:underline flex items-center gap-1">
                <User className="h-3 w-3" /> Driver Sign Up
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/auth/signup-partner" className="font-bold text-primary hover:underline flex items-center gap-1">
                <Building2 className="h-3 w-3" /> Partner Sign Up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Sign In...</div>}>
      <SignInForm />
    </Suspense>
  );
}
