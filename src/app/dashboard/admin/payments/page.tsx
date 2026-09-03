"use client";

import { Input } from "@/components/ui/input";
import {
  CreditCard,
  ArrowUpRight,
  Search,
  AlertTriangle,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
} from "lucide-react";

const transactions = [
  { id: "TX-9021", user: "Johnathan Doe", type: "Installment", amount: "₦1,200,000", date: "2m ago", status: "Success", method: "Visa •••• 4242" },
  { id: "TX-9018", user: "LogiStream Europe", type: "Premium Tier", amount: "₦4,500,000", date: "45m ago", status: "Success", method: "Bank Transfer" },
  { id: "TX-9015", user: "Sarah Miller", type: "Installment", amount: "₦1,200,000", date: "2h ago", status: "Success", method: "Mastercard •••• 1188" },
  { id: "TX-9012", user: "Elena Rodriguez", type: "Simulator Fee", amount: "₦250,000", date: "5h ago", status: "Pending", method: "Visa •••• 9921" },
  { id: "TX-9009", user: "Global Trans", type: "API Access", amount: "₦2,800,000", date: "1d ago", status: "Failed", method: "Corporate Billing" },
  { id: "TX-9005", user: "Michael Chen", type: "Installment", amount: "₦1,200,000", date: "1d ago", status: "Success", method: "PayPal" },
];

const statusStyle: Record<string, string> = {
  Success: "bg-primary/10 text-primary",
  Pending: "bg-accent/10 text-accent",
  Failed: "bg-destructive/10 text-destructive",
};

const barColor: Record<string, string> = {
  Success: "bg-primary",
  Pending: "bg-accent",
  Failed: "bg-destructive",
};

export default function AdminGlobalPaymentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="mb-2 font-headline text-3xl text-ink">Institutional Revenue</h1>
          <p className="font-body text-sm text-muted-foreground">Monitor platform billing, revenue growth, and real-time transaction logs.</p>
        </div>
        <button className="flex items-center gap-2 bg-sage px-6 py-3 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark">
          <Download className="h-4 w-4" /> Financial Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border border-border bg-card p-5">
          <p className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">Monthly Revenue</p>
          <p className="font-headline text-3xl text-ink">₦67.4M</p>
          <div className="mt-1 flex items-center gap-1 font-body text-xs font-bold text-primary">
            <ArrowUpRight className="h-3 w-3" /> +12.4% vs last month
          </div>
        </div>
        <div className="border border-border bg-card p-5">
          <p className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Installments</p>
          <p className="font-headline text-3xl text-ink">1,240</p>
          <div className="mt-1 font-body text-xs text-muted-foreground">Across all programs</div>
        </div>
        <div className="border border-border bg-card p-5">
          <p className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">Past Due Accounts</p>
          <p className="font-headline text-3xl text-destructive">42</p>
          <div className="mt-1 flex items-center gap-1 font-body text-xs font-bold text-destructive">
            <AlertTriangle className="h-3 w-3" /> Requires Review
          </div>
        </div>
        <div className="border border-border bg-card p-5">
          <p className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">Employer Payouts</p>
          <p className="font-headline text-3xl text-ink">₦12.8M</p>
          <div className="mt-1 font-body text-xs text-muted-foreground">Internship stipends pending</div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by Transaction ID, Name, or Company..." className="h-11 rounded-none border-border bg-background pl-10 font-body text-sm shadow-none focus-visible:border-primary focus-visible:ring-0" />
          </div>
          <button className="flex items-center justify-center gap-2 border border-border px-5 py-2.5 font-body text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-secondary">
            <Filter className="h-4 w-4" /> Filter
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="font-headline text-xl text-ink">Transaction Ledger</h2>
          {transactions.map((tx) => (
            <div key={tx.id} className="flex flex-col border border-border bg-card sm:flex-row sm:items-stretch">
              <div className={`h-1 w-full shrink-0 sm:h-auto sm:w-1.5 ${barColor[tx.status]}`} />
              <div className="grid flex-1 grid-cols-1 items-center gap-6 p-6 md:grid-cols-4">
                <div className="space-y-1 md:col-span-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-secondary px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{tx.id}</span>
                    <h3 className="font-headline text-lg text-ink">{tx.user}</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 font-body text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> {tx.type}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {tx.date}</span>
                    <span className="hidden sm:inline">&middot; {tx.method}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Amount / Status</p>
                  <div className="flex items-center gap-2">
                    <span className="font-headline text-lg text-ink">{tx.amount}</span>
                    <span className={`flex items-center gap-1 font-body text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${statusStyle[tx.status]}`}>
                      {tx.status === "Success" && <CheckCircle2 className="h-3 w-3" />}
                      {tx.status === "Pending" && <Clock className="h-3 w-3" />}
                      {tx.status === "Failed" && <XCircle className="h-3 w-3" />}
                      {tx.status}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-1">
                  <button className="p-2 text-muted-foreground transition-colors hover:text-ink" title="View Details">
                    <FileText className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-muted-foreground transition-colors hover:text-ink" title="Download Receipt">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button className="w-full py-4 text-center font-body text-sm font-bold text-primary hover:underline">
            Load More Transactions
          </button>
        </div>
      </div>
    </div>
  );
}
