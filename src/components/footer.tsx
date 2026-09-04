
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary font-headline">PADTI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional Articulated Driver Training Institute. Empowering the next generation of global logistics professionals.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Training</h3>
            <ul className="space-y-2">
              <li><Link href="/programs" className="text-sm text-muted-foreground hover:text-primary">CDL Class A</Link></li>
              <li><Link href="/programs" className="text-sm text-muted-foreground hover:text-primary">Advanced Simulation</Link></li>
              <li><Link href="/programs" className="text-sm text-muted-foreground hover:text-primary">Safety Protocols</Link></li>
              <li><Link href="/programs" className="text-sm text-muted-foreground hover:text-primary">Fleet Management</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Portal</h3>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary">Trainee Dashboard</Link></li>
              <li><Link href="/dashboard/learning" className="text-sm text-muted-foreground hover:text-primary">Learning Management</Link></li>
              <li><Link href="/marketplace" className="text-sm text-muted-foreground hover:text-primary">Marketplace</Link></li>
              <li><Link href="/partners" className="text-sm text-muted-foreground hover:text-primary">Partners</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Institutional</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/partners" className="text-sm text-muted-foreground hover:text-primary">Partnerships</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Investor Relations</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} PADTI Connect. All rights reserved. Professional Articulated Driver Training Institute.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-xs text-muted-foreground hover:text-primary">Terms of Service</Link>
            <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary">Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
