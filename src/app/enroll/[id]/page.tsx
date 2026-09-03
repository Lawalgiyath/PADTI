"use client";

import { use, useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Calendar,
  GraduationCap,
  ShieldCheck,
  User as UserIcon,
  Loader2,
  Banknote,
  FileUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useUser, useFirestore } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import Script from "next/script";

const fieldClass =
  "h-11 rounded-none border-border bg-card font-body text-sm shadow-none focus-visible:border-primary focus-visible:ring-0";
const sectionLabelClass = "flex items-center gap-2 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-primary";

const COURSES = [
  {
    id: "cdl-a",
    title: "Professional CDL Class A (Heavy Haul)",
    cost: "₦1,500,000",
    amountNumeric: 1500000,
    duration: "8 Weeks",
    level: "Professional",
  },
  {
    id: "safety-expert",
    title: "Advanced Road Safety & Fuel Efficiency",
    cost: "₦550,000",
    amountNumeric: 550000,
    duration: "4 Weeks",
    level: "Specialist",
  },
  {
    id: "fleet-mgmt",
    title: "Fleet Management & Logistics Specialist",
    cost: "₦2,500,000",
    amountNumeric: 2500000,
    duration: "12 Weeks",
    level: "Enterprise",
  },
  {
    id: "upgrade-training",
    title: "Articulated Upgrade: Standard to Heavy Vehicle",
    cost: "₦750,000",
    amountNumeric: 750000,
    duration: "6 Weeks",
    level: "Technical Upgrade",
  },
];

export default function CourseEnrollmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = COURSES.find((c) => c.id === id) || COURSES[0];
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();
  const { toast } = useToast();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cohort: "",
    paymentPlan: "",
    paymentMethod: "paystack" as "paystack" | "offline",
    paymentProofFilename: "",
  });

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (user) {
      const names = user.displayName?.split(" ") || ["", ""];
      setFormData((prev) => ({
        ...prev,
        firstName: prev.firstName || names[0],
        lastName: prev.lastName || names[1] || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const completeEnrollment = async (paystackRef?: string) => {
    if (!user) return;
    setIsSaving(true);
    try {
      await addDoc(collection(db, "enrollments"), {
        uid: user.uid,
        courseId: id,
        courseTitle: course.title,
        status: "enrolled",
        paymentStatus: formData.paymentMethod === "paystack" ? "paid" : "awaiting-verification",
        paymentMethod: formData.paymentMethod,
        paymentReference: paystackRef || `MANUAL-${Date.now()}`,
        progress: 0,
        createdAt: serverTimestamp(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        cohort: formData.cohort,
        paymentPlan: formData.paymentPlan,
        paymentProofFilename: formData.paymentProofFilename || null,
      });
      setIsSubmitted(true);
      setShowAuthPrompt(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Enrollment Error",
        description: "We couldn't save your application. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePaystackPayment = () => {
    // @ts-ignore
    const handler = window.PaystackPop.setup({
      key: "pk_test_85121e0fb04ba83e7cf0ac5f667f6ca51abff6a6", // UPDATED WITH USER PROVIDED KEY
      email: formData.email,
      amount: course.amountNumeric * 100, // Amount in kobo
      currency: "NGN",
      callback: (response: any) => {
        completeEnrollment(response.reference);
      },
      onClose: () => {
        toast({
          title: "Payment Cancelled",
          description: "Transaction was not completed.",
        });
      },
    });
    handler.openIframe();
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowAuthPrompt(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (formData.paymentMethod === "paystack") {
        handlePaystackPayment();
      } else {
        completeEnrollment();
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex flex-grow items-center justify-center px-6 py-16">
          <div className="w-full max-w-md border border-border bg-card p-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="mb-3 font-headline text-3xl text-ink">Application Received</h1>
            <p className="mb-8 font-body text-sm leading-relaxed text-muted-foreground">
              Your enrollment for <strong className="text-ink">{course.title}</strong> is being processed.
              {formData.paymentMethod === "offline" && " Once your manual payment is verified, you will gain full access."}
            </p>
            <Link
              href="/dashboard/learning"
              className="flex w-full items-center justify-center gap-2 bg-sage py-3.5 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark"
            >
              Go to Learning Portal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
      <Navbar />
      <main className="flex-grow px-6 py-16 md:px-16">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/programs"
            className="mb-8 inline-flex items-center gap-2 font-body text-sm font-bold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Courses
          </Link>

          {showAuthPrompt && !user && (
            <div className="mb-8 bg-ink p-8 text-cream">
              <h3 className="mb-2 font-headline text-2xl text-cream">Identity Verification Required</h3>
              <p className="mb-6 font-body text-sm text-cream/70">
                To complete your enrollment for <strong className="text-cream">{course.title}</strong>, please sign
                in or create your student account.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/auth/signup?redirect=/enroll/${id}`}
                  className="bg-sage px-6 py-3 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark"
                >
                  Create Account
                </Link>
                <Link
                  href={`/auth/signin?redirect=/enroll/${id}`}
                  className="border border-cream/40 px-6 py-3 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
                >
                  Sign In
                </Link>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Enrollment Form */}
            <div className="lg:col-span-2">
              <div className="border border-border bg-card">
                <div className="border-b border-border bg-ink p-8">
                  <h1 className="font-headline text-2xl text-cream">Institutional Admission Form</h1>
                  <p className="mt-1 font-body text-sm text-cream/60">
                    Complete your application and secure your spot in the upcoming cohort.
                  </p>
                </div>
                <div className="p-8">
                  <form onSubmit={handleInitialSubmit} className="space-y-10">
                    <div className="space-y-5">
                      <h4 className={sectionLabelClass}>
                        <UserIcon className="h-4 w-4" /> Personal Information
                      </h4>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="font-body text-xs font-medium text-muted-foreground">First Name</Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            required
                            className={fieldClass}
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="font-body text-xs font-medium text-muted-foreground">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            required
                            className={fieldClass}
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="font-body text-xs font-medium text-muted-foreground">Work Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            className={fieldClass}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="font-body text-xs font-medium text-muted-foreground">Phone Number</Label>
                          <Input
                            id="phone"
                            placeholder="+234 ..."
                            required
                            className={fieldClass}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <h4 className={sectionLabelClass}>
                        <Calendar className="h-4 w-4" /> Program Schedule
                      </h4>
                      <div className="space-y-2">
                        <Label className="font-body text-xs font-medium text-muted-foreground">Preferred Enrollment Cohort</Label>
                        <Select required onValueChange={(val) => setFormData({ ...formData, cohort: val })}>
                          <SelectTrigger className="h-11 rounded-none border-border bg-card font-body text-sm shadow-none focus:ring-0">
                            <SelectValue placeholder="Select a start date" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            <SelectItem value="jan-2024">January 2024 (Winter Cohort)</SelectItem>
                            <SelectItem value="march-2024">March 2024 (Spring Cohort)</SelectItem>
                            <SelectItem value="june-2024">June 2024 (Summer Cohort)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <h4 className={sectionLabelClass}>
                        <CreditCard className="h-4 w-4" /> Payment Selection
                      </h4>

                      <div className="space-y-3">
                        <Label className="font-body text-xs font-medium text-muted-foreground">Select Payment Method</Label>
                        <RadioGroup
                          defaultValue="paystack"
                          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                          onValueChange={(val) => setFormData({ ...formData, paymentMethod: val as any })}
                        >
                          <div>
                            <RadioGroupItem value="paystack" id="paystack" className="peer sr-only" />
                            <Label
                              htmlFor="paystack"
                              className="flex h-full cursor-pointer flex-col justify-between border border-border bg-background p-4 transition-colors hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                            >
                              <div className="flex w-full items-center gap-3">
                                <CreditCard className="h-5 w-5 text-primary" />
                                <div className="flex-1 text-left">
                                  <p className="font-body text-sm font-bold text-ink">Paystack Checkout</p>
                                  <p className="font-body text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Card, USSD, or Bank Transfer</p>
                                </div>
                              </div>
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem value="offline" id="offline" className="peer sr-only" />
                            <Label
                              htmlFor="offline"
                              className="flex h-full cursor-pointer flex-col justify-between border border-border bg-background p-4 transition-colors hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                            >
                              <div className="flex w-full items-center gap-3">
                                <Banknote className="h-5 w-5 text-primary" />
                                <div className="flex-1 text-left">
                                  <p className="font-body text-sm font-bold text-ink">Manual Transfer</p>
                                  <p className="font-body text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Offline payment verification</p>
                                </div>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {formData.paymentMethod === "offline" && (
                        <div className="space-y-4 border border-border bg-secondary p-6">
                          <div className="space-y-1">
                            <p className="font-body text-[10px] font-bold uppercase tracking-widest text-primary">Institutional Bank Details</p>
                            <p className="font-headline text-lg text-ink">PADTI Training Inst. Ltd</p>
                            <p className="font-headline text-xl text-ink">0012345678</p>
                            <p className="font-body text-sm font-bold text-ink">Access Bank PLC</p>
                          </div>

                          <div className="space-y-2 border-t border-border pt-4">
                            <Label className="font-body text-xs font-bold text-muted-foreground">Attach Proof of Payment (Image/PDF)</Label>
                            <button
                              type="button"
                              className="flex h-12 w-full items-center justify-center gap-2 border border-border bg-card font-body text-sm font-bold text-ink transition-colors hover:border-primary"
                              onClick={() => document.getElementById("proof-upload")?.click()}
                            >
                              <FileUp className="h-4 w-4" /> {formData.paymentProofFilename || "Upload Evidence"}
                            </button>
                            <input
                              id="proof-upload"
                              type="file"
                              className="hidden"
                              accept="image/*,.pdf"
                              onChange={(e) => setFormData({ ...formData, paymentProofFilename: e.target.files?.[0]?.name || "" })}
                            />
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label className="font-body text-xs font-medium text-muted-foreground">Payment Plan Preference</Label>
                        <Select required onValueChange={(val) => setFormData({ ...formData, paymentPlan: val })}>
                          <SelectTrigger className="h-11 rounded-none border-border bg-card font-body text-sm shadow-none focus:ring-0">
                            <SelectValue placeholder="Select plan type" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            <SelectItem value="full">Full Payment (5% Discount Applied)</SelectItem>
                            <SelectItem value="install-2">2 Installments (50/50)</SelectItem>
                            <SelectItem value="install-4">4 Monthly Installments</SelectItem>
                            <SelectItem value="employer">Employer Sponsored</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-5 border-t border-border pt-8">
                      <div className="flex items-start space-x-3">
                        <Checkbox id="terms" required />
                        <Label htmlFor="terms" className="font-body text-xs leading-relaxed text-muted-foreground">
                          I agree to PADTI&apos;s enrollment terms, medical screening requirements, and the
                          institutional code of conduct for professional drivers.
                        </Label>
                      </div>

                      <button
                        type="submit"
                        disabled={isSaving}
                        className="flex w-full items-center justify-center gap-2 bg-sage py-4 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark disabled:opacity-60"
                      >
                        {isSaving ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            {formData.paymentMethod === "paystack" ? "Secure Payment & Enroll" : "Submit Manual Application"}
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Course Summary Sidebar */}
            <div>
              <div className="sticky top-24 border border-border bg-card">
                <div className="border-b border-border bg-secondary p-6">
                  <h3 className={sectionLabelClass}>
                    <GraduationCap className="h-4 w-4" /> Enrollment Summary
                  </h3>
                </div>
                <div className="space-y-6 p-6">
                  <div className="space-y-1">
                    <p className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Selected Program</p>
                    <p className="font-headline text-xl leading-tight text-ink">{course.title}</p>
                  </div>
                  <div className="flex items-center justify-between border-y border-border py-4">
                    <div>
                      <p className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Duration</p>
                      <p className="mt-1 flex items-center gap-1.5 font-body text-sm font-bold text-ink">
                        <Calendar className="h-3.5 w-3.5" /> {course.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Level</p>
                      <p className="mt-1 font-body text-[10px] font-bold uppercase tracking-widest text-accent">{course.level}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between font-body text-sm text-muted-foreground">
                      <span>Base Tuition</span>
                      <span>{course.cost}</span>
                    </div>
                    {formData.paymentPlan === "full" && (
                      <div className="flex justify-between font-body text-sm font-bold text-primary">
                        <span>Discount (5%)</span>
                        <span>- ₦{(course.amountNumeric * 0.05).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="bg-secondary p-4">
                      <p className="mb-1 font-body text-[10px] font-bold uppercase tracking-widest text-primary">Payable Total</p>
                      <p className="font-headline text-3xl text-ink">
                        ₦
                        {formData.paymentPlan === "full"
                          ? (course.amountNumeric * 0.95).toLocaleString()
                          : course.amountNumeric.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border border-border p-4">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                    <p className="font-body text-xs italic leading-snug text-muted-foreground">
                      Verification of payment and medical screening is required before course material is
                      released.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
