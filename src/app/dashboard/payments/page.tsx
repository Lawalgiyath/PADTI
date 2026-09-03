"use client";

import { CreditCard, Calendar, CheckCircle2, AlertCircle, Receipt, Download, ArrowUpRight } from "lucide-react";

const installments = [
  { id: "INST-01", amount: "€1,200", dueDate: "Oct 15, 2023", status: "Paid", datePaid: "Oct 12, 2023" },
  { id: "INST-02", amount: "€1,200", dueDate: "Nov 15, 2023", status: "Paid", datePaid: "Nov 14, 2023" },
  { id: "INST-03", amount: "€1,200", dueDate: "Dec 15, 2023", status: "Upcoming" },
  { id: "INST-04", amount: "€1,200", dueDate: "Jan 15, 2024", status: "Upcoming" },
];

const history = [
  { id: "PAY-9921", amount: "€1,200", method: "Visa •••• 4242", date: "Nov 14, 2023" },
  { id: "PAY-9805", amount: "€1,200", method: "Visa •••• 4242", date: "Oct 12, 2023" },
];

export default function LearnerPaymentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 font-headline text-3xl text-ink">Payments &amp; Billing</h1>
        <p className="font-body text-sm text-muted-foreground">Manage your tuition installments and view your financial history.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="border border-border bg-card p-5">
          <p className="mb-3 flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <CreditCard className="h-3.5 w-3.5" /> Total Course Fee
          </p>
          <p className="mb-3 font-headline text-3xl text-ink">€4,800</p>
          <div className="space-y-1.5">
            <div className="flex justify-between font-body text-xs font-medium text-muted-foreground">
              <span>Payment Progress</span>
              <span>50% Paid</span>
            </div>
            <div className="h-1.5 w-full bg-secondary">
              <div className="h-full w-1/2 bg-primary" />
            </div>
          </div>
        </div>
        <div className="border border-border bg-card p-5">
          <p className="mb-3 flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Amount Paid
          </p>
          <p className="font-headline text-3xl text-ink">€2,400</p>
        </div>
        <div className="border border-border bg-card p-5">
          <p className="mb-3 flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <AlertCircle className="h-3.5 w-3.5 text-accent" /> Next Due Date
          </p>
          <p className="font-headline text-2xl text-ink">Dec 15, 2023</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="border border-border bg-card p-6">
            <h2 className="mb-1 font-headline text-xl text-ink">Installment Plan</h2>
            <p className="mb-5 font-body text-sm text-muted-foreground">Breakdown of your scheduled training payments.</p>
            <div className="space-y-3">
              {installments.map((inst) => (
                <div key={inst.id} className="flex items-center justify-between border border-border p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 ${inst.status === "Paid" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-bold text-ink">{inst.amount}</p>
                      <p className="font-body text-xs text-muted-foreground">Due: {inst.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {inst.status === "Paid" ? (
                      <div className="hidden text-right sm:block">
                        <p className="font-body text-[10px] font-bold uppercase text-primary">Paid on</p>
                        <p className="font-body text-xs font-medium text-ink">{inst.datePaid}</p>
                      </div>
                    ) : (
                      <button className="bg-sage px-4 py-2 font-body text-xs font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
                        Pay Now
                      </button>
                    )}
                    <span
                      className={`font-body text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${
                        inst.status === "Paid" ? "bg-primary/10 text-primary" : "border border-border text-muted-foreground"
                      }`}
                    >
                      {inst.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border bg-card p-6">
            <h2 className="mb-1 font-headline text-xl text-ink">Payment History</h2>
            <p className="mb-5 font-body text-sm text-muted-foreground">Recent successful transactions.</p>
            <div>
              {history.map((pay, i) => (
                <div key={pay.id} className={`flex items-center justify-between py-4 ${i !== history.length - 1 ? "border-b border-border" : ""}`}>
                  <div className="flex items-center gap-3">
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-body text-sm font-bold text-ink">{pay.amount}</p>
                      <p className="font-body text-xs text-muted-foreground">{pay.method} &middot; {pay.date}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 font-body text-xs font-bold text-primary hover:underline">
                    <Download className="h-3.5 w-3.5" /> Receipt
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-ink p-6 text-cream">
            <h2 className="mb-1 font-headline text-xl text-cream">Automatic Payments</h2>
            <p className="mb-5 font-body text-sm text-cream/60">Enable auto-pay to ensure you never miss a training deadline.</p>
            <button className="w-full bg-sage py-3.5 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
              Setup Auto-Pay
            </button>
            <p className="mt-3 text-center font-body text-[10px] text-cream/50">By enabling, you agree to PADTI&apos;s recurring billing terms.</p>
          </div>

          <div className="border border-border bg-card p-6">
            <h2 className="mb-4 font-headline text-lg text-ink">Payment Help</h2>
            <div className="space-y-3 font-body text-sm text-muted-foreground">
              <div className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                <p>Installments are interest-free for standard plans.</p>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                <p>Late payments may restrict access to the simulator lab.</p>
              </div>
              <button className="flex items-center gap-1.5 pt-2 font-body text-sm font-bold text-primary hover:underline">
                View Billing Policy <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
