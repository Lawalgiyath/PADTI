"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Receipt,
  Download,
  ArrowUpRight
} from "lucide-react";

export default function LearnerPaymentsPage() {
  const installments = [
    { id: "INST-01", amount: "€1,200", dueDate: "Oct 15, 2023", status: "Paid", datePaid: "Oct 12, 2023" },
    { id: "INST-02", amount: "€1,200", dueDate: "Nov 15, 2023", status: "Paid", datePaid: "Nov 14, 2023" },
    { id: "INST-03", amount: "€1,200", dueDate: "Dec 15, 2023", status: "Upcoming" },
    { id: "INST-04", amount: "€1,200", dueDate: "Jan 15, 2024", status: "Upcoming" },
  ];

  const history = [
    { id: "PAY-9921", amount: "€1,200", method: "Visa •••• 4242", date: "Nov 14, 2023", status: "Success" },
    { id: "PAY-9805", amount: "€1,200", method: "Visa •••• 4242", date: "Oct 12, 2023", status: "Success" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2 font-headline">Payments & Billing</h1>
        <p className="text-muted-foreground">Manage your tuition installments and view your financial history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> Total Course Fee</CardDescription>
            <CardTitle className="text-3xl font-bold">€4,800</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span>Payment Progress</span>
                <span>50% Paid</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Amount Paid</CardDescription>
            <CardTitle className="text-3xl font-bold">€2,400</CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2"><AlertCircle className="h-4 w-4 text-accent" /> Next Due Date</CardDescription>
            <CardTitle className="text-3xl font-bold">Dec 15, 2023</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Installment Plan</CardTitle>
              <CardDescription>Breakdown of your scheduled training payments.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {installments.map((inst) => (
                  <div key={inst.id} className="flex items-center justify-between p-4 border rounded-2xl bg-white hover:bg-secondary/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${inst.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-secondary text-primary'}`}>
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold">{inst.amount}</p>
                        <p className="text-xs text-muted-foreground">Due: {inst.dueDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {inst.status === 'Paid' ? (
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-bold uppercase text-green-600">Paid on</p>
                          <p className="text-xs font-medium">{inst.datePaid}</p>
                        </div>
                      ) : (
                        <Button size="sm" className="bg-primary hover:bg-primary/90 h-9 px-4 rounded-lg font-bold">Pay Now</Button>
                      )}
                      <Badge variant={inst.status === 'Paid' ? 'secondary' : 'outline'} className={inst.status === 'Paid' ? 'bg-green-100 text-green-700 border-none' : ''}>
                        {inst.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Recent successful transactions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {history.map((pay) => (
                  <div key={pay.id} className="flex items-center justify-between py-4 border-b last:border-0 px-2">
                    <div className="flex items-center gap-3">
                      <Receipt className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-bold">{pay.amount}</p>
                        <p className="text-xs text-muted-foreground">{pay.method} • {pay.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary gap-1">
                      <Download className="h-4 w-4" /> Receipt
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-primary text-white border-none shadow-lg">
            <CardHeader>
              <CardTitle>Automatic Payments</CardTitle>
              <CardDescription className="text-white/70 text-sm">Enable auto-pay to ensure you never miss a training deadline.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 font-bold rounded-xl border-none">Setup Auto-Pay</Button>
              <p className="text-[10px] text-center text-white/50 px-4">By enabling, you agree to PADTI's recurring billing terms.</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Payment Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <p>Installments are interest-free for standard plans.</p>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <p>Late payments may restrict access to the simulator lab.</p>
              </div>
              <Button variant="link" className="p-0 h-auto text-primary gap-1 font-bold">
                View Billing Policy <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
