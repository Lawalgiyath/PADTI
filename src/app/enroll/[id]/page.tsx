
"use client";

import { use, useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  ArrowLeft, 
  CheckCircle2, 
  CreditCard, 
  Calendar, 
  GraduationCap, 
  ShieldCheck,
  FileText,
  User as UserIcon,
  Loader2,
  Building2,
  Banknote,
  FileUp,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useUser, useFirestore } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Script from "next/script";

const COURSES = [
  {
    id: "cdl-a",
    title: "Professional CDL Class A (Heavy Haul)",
    cost: "₦1,500,000",
    amountNumeric: 1500000,
    duration: "8 Weeks",
    level: "Professional"
  },
  {
    id: "safety-expert",
    title: "Advanced Road Safety & Fuel Efficiency",
    cost: "₦550,000",
    amountNumeric: 550000,
    duration: "4 Weeks",
    level: "Specialist"
  },
  {
    id: "fleet-mgmt",
    title: "Fleet Management & Logistics Specialist",
    cost: "₦2,500,000",
    amountNumeric: 2500000,
    duration: "12 Weeks",
    level: "Enterprise"
  },
  {
    id: "upgrade-training",
    title: "Articulated Upgrade: Standard to Heavy Vehicle",
    cost: "₦750,000",
    amountNumeric: 750000,
    duration: "6 Weeks",
    level: "Technical Upgrade"
  }
];

export default function CourseEnrollmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = COURSES.find(c => c.id === id) || COURSES[0];
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

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
    paymentProofFilename: ""
  });

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (user) {
      const names = user.displayName?.split(" ") || ["", ""];
      setFormData(prev => ({
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
        paymentStatus: formData.paymentMethod === 'paystack' ? 'paid' : 'awaiting-verification',
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
        paymentProofFilename: formData.paymentProofFilename || null
      });
      setIsSubmitted(true);
      setShowAuthPrompt(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Enrollment Error",
        description: "We couldn't save your application. Please try again."
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePaystackPayment = () => {
    // @ts-ignore
    const handler = window.PaystackPop.setup({
      key: 'pk_test_85121e0fb04ba83e7cf0ac5f667f6ca51abff6a6', // UPDATED WITH USER PROVIDED KEY
      email: formData.email,
      amount: course.amountNumeric * 100, // Amount in kobo
      currency: "NGN",
      callback: (response: any) => {
        completeEnrollment(response.reference);
      },
      onClose: () => {
        toast({
          title: "Payment Cancelled",
          description: "Transaction was not completed."
        });
      }
    });
    handler.openIframe();
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowAuthPrompt(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (formData.paymentMethod === 'paystack') {
        handlePaystackPayment();
      } else {
        completeEnrollment();
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-secondary/30">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-none shadow-2xl rounded-[32px] text-center p-8">
            <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <CardTitle className="text-3xl font-bold text-primary mb-2">Application Received!</CardTitle>
            <CardDescription className="text-lg mb-8">
              Your enrollment for <strong>{course.title}</strong> is being processed. 
              {formData.paymentMethod === 'offline' && " Once your manual payment is verified, you will gain full access."}
            </CardDescription>
            <Button className="w-full bg-primary h-12 rounded-xl font-bold" asChild>
              <Link href="/dashboard/learning">Go to Learning Portal</Link>
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <Link href="/programs" className="inline-flex items-center text-primary font-bold hover:underline mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
            </Link>

            {showAuthPrompt && !user && (
              <div className="bg-primary p-8 rounded-[32px] text-white shadow-xl animate-in slide-in-from-top-4">
                <h3 className="text-2xl font-bold mb-2">Identity Verification Required</h3>
                <p className="text-white/80 mb-6">To complete your enrollment for <strong>{course.title}</strong>, please sign in or create your student account.</p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-white text-primary hover:bg-white/90 font-bold px-8" asChild>
                    <Link href={`/auth/signup?redirect=/enroll/${id}`}>Create Account</Link>
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8" asChild>
                    <Link href={`/auth/signin?redirect=/enroll/${id}`}>Sign In</Link>
                  </Button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Enrollment Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                  <CardHeader className="bg-primary text-white p-8">
                    <CardTitle className="text-2xl">Institutional Admission Form</CardTitle>
                    <CardDescription className="text-white/70">Complete your application and secure your spot in the upcoming cohort.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleInitialSubmit} className="space-y-8">
                      <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary/40 flex items-center gap-2">
                          <UserIcon className="h-4 w-4" /> Personal Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                              id="firstName" 
                              placeholder="John" 
                              required 
                              className="h-11 rounded-xl"
                              value={formData.firstName}
                              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              placeholder="Doe" 
                              required 
                              className="h-11 rounded-xl" 
                              value={formData.lastName}
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Work Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              placeholder="john@example.com" 
                              required 
                              className="h-11 rounded-xl" 
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                              id="phone" 
                              placeholder="+234 ..." 
                              required 
                              className="h-11 rounded-xl" 
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary/40 flex items-center gap-2">
                          <Calendar className="h-4 w-4" /> Program Schedule
                        </h4>
                        <div className="space-y-2">
                          <Label>Preferred Enrollment Cohort</Label>
                          <Select required onValueChange={(val) => setFormData({...formData, cohort: val})}>
                            <SelectTrigger className="h-11 rounded-xl">
                              <SelectValue placeholder="Select a start date" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="jan-2024">January 2024 (Winter Cohort)</SelectItem>
                              <SelectItem value="march-2024">March 2024 (Spring Cohort)</SelectItem>
                              <SelectItem value="june-2024">June 2024 (Summer Cohort)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary/40 flex items-center gap-2">
                          <CreditCard className="h-4 w-4" /> Payment Selection
                        </h4>
                        
                        <div className="space-y-4">
                          <Label>Select Payment Method</Label>
                          <RadioGroup 
                            defaultValue="paystack" 
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            onValueChange={(val) => setFormData({...formData, paymentMethod: val as any})}
                          >
                            <div>
                              <RadioGroupItem value="paystack" id="paystack" className="peer sr-only" />
                              <Label
                                htmlFor="paystack"
                                className="flex flex-col items-center justify-between rounded-2xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all h-full"
                              >
                                <div className="flex items-center gap-3 w-full">
                                  <CreditCard className="h-6 w-6 text-primary" />
                                  <div className="flex-1 text-left">
                                    <p className="font-bold">Paystack Checkout</p>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Card, USSD, or Bank Transfer</p>
                                  </div>
                                </div>
                              </Label>
                            </div>

                            <div>
                              <RadioGroupItem value="offline" id="offline" className="peer sr-only" />
                              <Label
                                htmlFor="offline"
                                className="flex flex-col items-center justify-between rounded-2xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all h-full"
                              >
                                <div className="flex items-center gap-3 w-full">
                                  <Banknote className="h-6 w-6 text-primary" />
                                  <div className="flex-1 text-left">
                                    <p className="font-bold">Manual Transfer</p>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Offline payment verification</p>
                                  </div>
                                </div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {formData.paymentMethod === 'offline' && (
                          <div className="p-6 bg-secondary/30 rounded-2xl space-y-4 border border-secondary animate-in slide-in-from-top-2">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase text-primary/50 tracking-widest">Institutional Bank Details</p>
                              <p className="font-bold text-lg">PADTI Training Inst. Ltd</p>
                              <p className="text-xl font-black text-primary">0012345678</p>
                              <p className="font-bold">Access Bank PLC</p>
                            </div>
                            
                            <div className="space-y-2 pt-2 border-t border-secondary/50">
                              <Label className="text-xs font-bold">Attach Proof of Payment (Image/PDF)</Label>
                              <div className="flex items-center gap-4">
                                <Button type="button" variant="outline" className="bg-white rounded-xl gap-2 w-full h-12" onClick={() => document.getElementById('proof-upload')?.click()}>
                                  <FileUp className="h-4 w-4" /> {formData.paymentProofFilename || "Upload Evidence"}
                                </Button>
                                <input 
                                  id="proof-upload" 
                                  type="file" 
                                  className="hidden" 
                                  accept="image/*,.pdf" 
                                  onChange={(e) => setFormData({...formData, paymentProofFilename: e.target.files?.[0]?.name || ""})}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label>Payment Plan Preference</Label>
                          <Select required onValueChange={(val) => setFormData({...formData, paymentPlan: val})}>
                            <SelectTrigger className="h-11 rounded-xl">
                              <SelectValue placeholder="Select plan type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full">Full Payment (5% Discount Applied)</SelectItem>
                              <SelectItem value="install-2">2 Installments (50/50)</SelectItem>
                              <SelectItem value="install-4">4 Monthly Installments</SelectItem>
                              <SelectItem value="employer">Employer Sponsored</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4 border-t pt-6">
                        <div className="flex items-start space-x-3">
                          <Checkbox id="terms" required />
                          <Label htmlFor="terms" className="text-xs leading-relaxed text-muted-foreground">
                            I agree to PADTI's enrollment terms, medical screening requirements, and the institutional code of conduct for professional drivers.
                          </Label>
                        </div>

                        <Button 
                          type="submit" 
                          disabled={isSaving}
                          className="w-full bg-primary hover:bg-primary/90 h-16 rounded-2xl font-bold text-xl shadow-2xl transition-all hover:scale-[1.01]"
                        >
                          {isSaving ? <Loader2 className="h-6 w-6 animate-spin" /> : (
                            formData.paymentMethod === 'paystack' ? "Secure Payment & Enroll" : "Submit Manual Application"
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Course Summary Sidebar */}
              <div className="space-y-6">
                <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white sticky top-24">
                  <div className="bg-secondary/50 p-6 border-b">
                    <h3 className="font-bold text-primary flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" /> Enrollment Summary
                    </h3>
                  </div>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Selected Program</p>
                      <p className="font-bold text-primary text-xl leading-tight">{course.title}</p>
                    </div>
                    <div className="flex justify-between items-center py-4 border-y border-secondary/50">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Duration</p>
                        <p className="font-bold flex items-center gap-1 text-sm"><Calendar className="h-3 w-3" /> {course.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Level</p>
                        <Badge variant="outline" className="text-[10px] border-primary text-primary font-bold">{course.level}</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                       <div className="flex justify-between text-sm font-medium text-muted-foreground">
                        <span>Base Tuition:</span>
                        <span>{course.cost}</span>
                      </div>
                      {formData.paymentPlan === 'full' && (
                         <div className="flex justify-between text-sm font-bold text-green-600">
                          <span>Discount (5%):</span>
                          <span>- ₦{(course.amountNumeric * 0.05).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="bg-primary/5 p-4 rounded-2xl">
                        <p className="text-[10px] uppercase font-bold text-primary tracking-widest mb-1">Payable Total</p>
                        <p className="text-3xl font-black text-primary">
                          ₦{formData.paymentPlan === 'full' 
                            ? (course.amountNumeric * 0.95).toLocaleString() 
                            : course.amountNumeric.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="bg-accent/5 p-4 rounded-2xl flex gap-3 items-start border border-accent/20">
                      <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                      <p className="text-[10px] text-muted-foreground leading-snug italic">
                        Verification of payment and medical screening is required before course material is released.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
