"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, ArrowLeft, Loader2, User, Building2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { useState, Suspense } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Reveal } from "@/components/reveal";

const fieldClass =
  "h-12 rounded-none border-border bg-card pl-11 font-body text-sm shadow-none focus-visible:border-primary focus-visible:ring-0";

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
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        message = "Invalid email or password.";
      } else if (error.code === "auth/invalid-email") {
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
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Photo side */}
      <div className="relative hidden lg:block">
        <Image
          src="/images/facility-visit/padti-facility-visit-13.jpeg"
          alt="PADTI staff and FRSC officials at the training facility"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <p className="mb-3 font-body text-xs font-bold uppercase tracking-[0.35em] text-cream/70">
            Welcome back
          </p>
          <h2 className="max-w-md font-headline text-4xl leading-tight text-cream">
            Your <span className="italic">verified network</span> awaits
          </h2>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center bg-background px-6 py-16">
        <Reveal className="w-full max-w-md">
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
            Portal Access
          </p>
          <h1 className="mb-8 font-headline text-3xl text-ink">
            Sign in to your <span className="italic">account</span>
          </h1>

          <button
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 border border-border bg-card py-3.5 font-body text-sm font-bold text-ink transition-colors hover:border-primary"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Institutional Access
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className={fieldClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Password
                </Label>
                <Link href="#" className="font-body text-xs font-bold text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className={fieldClass}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 bg-sage py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Sign In to Portal <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-border pt-6 font-body text-sm">
            <span className="text-muted-foreground">Don&apos;t have an account?</span>
            <Link href="/auth/signup" className="flex items-center gap-1 font-bold text-primary hover:underline">
              <User className="h-3.5 w-3.5" /> Driver Sign Up
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/auth/signup-partner" className="flex items-center gap-1 font-bold text-primary hover:underline">
              <Building2 className="h-3.5 w-3.5" /> Partner Sign Up
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center font-body text-muted-foreground">Loading sign in...</div>}>
      <SignInForm />
    </Suspense>
  );
}
