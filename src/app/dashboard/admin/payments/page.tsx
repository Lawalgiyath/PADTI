
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  AlertTriangle, 
  Download, 
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  FileText
} from "lucide-react";

export default function AdminGlobalPaymentsPage() {
  const transactions = [
    { id: "TX-9021", user: "Johnathan Doe", type: "Installment", amount: "€1,200", date: "2m ago", status: "Success", method: "Visa •••• 4242" },
    { id: "TX-9018", user: "LogiStream Europe", type: "Premium Tier", amount: "€4,500", date: "45m ago", status: "Success", method: "Bank Transfer" },
    { id: "TX-9015", user: "Sarah Miller", type: "Installment", amount: "€1,200", date: "2h ago", status: "Success", method: "Mastercard •••• 1188" },
    { id: "TX-9012", user: "Elena Rodriguez", type: "Simulator Fee", amount: "€250", date: "5h ago", status: "Pending", method: "Visa •••• 9921" },
    { id: "TX-9009", user: "Global Trans", type: "API Access", amount: "€2,800", date: "1d ago", status: "Failed", method: "Corporate Billing" },
    { id: "TX-9005", user: "Michael Chen", type: "Installment", amount: "€1,200", date: "1d ago", status: "Success", method: "PayPal" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Institutional Revenue</h1>
          <p className="text-muted-foreground">Monitor platform billing, revenue growth, and real-time transaction logs.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 font-bold rounded-xl shadow-lg">
          <Download className="h-4 w-4 mr-2" /> Financial Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Monthly Revenue</CardDescription>
            <CardTitle className="text-3xl font-bold">€67,402</CardTitle>
            <div className="flex items-center text-xs text-green-600 font-bold">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +12.4% vs last month
            </div>
          </CardHeader>
        </Card>
        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Active Installments</CardDescription>
            <CardTitle className="text-3xl font-bold">1,240</CardTitle>
            <div className="text-xs text-muted-foreground">Across all programs</div>
          </CardHeader>
        </Card>
        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Past Due Accounts</CardDescription>
            <CardTitle className="text-3xl font-bold text-red-600">42</CardTitle>
            <div className="flex items-center text-xs text-red-600 font-bold">
              <AlertTriangle className="h-3 w-3 mr-1" /> Requires Review
            </div>
          </CardHeader>
        </Card>
        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription>Employer Payouts</CardDescription>
            <CardTitle className="text-3xl font-bold">€12,800</CardTitle>
            <div className="text-xs text-muted-foreground">Internship stipends pending</div>
          </CardHeader>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by Transaction ID, Name, or Company..." className="pl-10 h-10 rounded-xl" />
          </div>
          <Button variant="secondary" className="rounded-xl">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary">Transaction Ledger</h3>
          {transactions.map((tx) => (
            <Card key={tx.id} className="border-none shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center">
                  <div className={`w-2 shrink-0 ${tx.status === 'Success' ? 'bg-green-500' : tx.status === 'Pending' ? 'bg-orange-400' : 'bg-red-500'}`}></div>
                  <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                    <div className="md:col-span-2 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px] py-0 px-2 uppercase tracking-widest font-bold">
                          {tx.id}
                        </Badge>
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{tx.user}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> {tx.type}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {tx.date}</span>
                        <span className="hidden sm:inline-block">• {tx.method}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Amount / Status</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">{tx.amount}</span>
                        <Badge variant={tx.status === 'Success' ? 'secondary' : 'outline'} className={tx.status === 'Success' ? 'bg-green-100 text-green-700 border-none' : tx.status === 'Failed' ? 'bg-red-50 text-red-700 border-red-100' : ''}>
                          {tx.status === 'Success' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {tx.status === 'Pending' && <Clock className="h-3 w-3 mr-1" />}
                          {tx.status === 'Failed' && <XCircle className="h-3 w-3 mr-1" />}
                          {tx.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full" title="View Details">
                        <FileText className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full" title="Download Receipt">
                        <Download className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button variant="link" className="w-full text-sm text-primary font-bold py-4">
            Load More Transactions
          </Button>
        </div>
      </div>
    </div>
  );
}
