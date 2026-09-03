
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  ChevronDown, 
  LogOut,
  Settings,
  LayoutDashboard,
  Briefcase,
  Users,
  ShieldCheck,
  Truck,
  Wrench,
  Handshake,
  Building2,
  Scale,
  Building
} from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar({ transparentOnTop = false }: { transparentOnTop?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useUser();
  const auth = useAuth();

  useEffect(() => {
    if (!transparentOnTop) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentOnTop]);

  const isGhost = transparentOnTop && !scrolled;

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Courses", href: "/programs" },
  ];

  return (
    <nav
      className={`z-50 w-full transition-colors duration-300 ${
        transparentOnTop ? "fixed inset-x-0 top-0" : "sticky top-0"
      } ${
        isGhost
          ? "border-b border-transparent bg-transparent"
          : "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-1">
                <Logo className={`h-8 w-8 ${isGhost ? "text-white" : "text-primary"}`} />
              </div>
              <span
                className={`text-xl font-bold tracking-tight font-headline ${
                  isGhost ? "text-white" : "text-primary"
                }`}
              >
                PADTI
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isGhost ? "text-white/85 hover:text-white" : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors outline-none ${
                      isGhost ? "text-white/85 hover:text-white" : "text-foreground/70 hover:text-primary"
                    }`}
                  >
                    Marketplace <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 p-2 rounded-xl border-none shadow-xl">
                  <DropdownMenuItem asChild>
                    <Link href="/marketplace?tab=opportunities" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span>Opportunities</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/marketplace?tab=talent" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Verified Talents</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/marketplace?tab=insurance" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <span>Insurances</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/marketplace?tab=equipment" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Truck className="h-4 w-4 text-primary" />
                      <span>Equipment</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/marketplace?tab=services" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-primary" />
                      <span>Services</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors outline-none ${
                      isGhost ? "text-white/85 hover:text-white" : "text-foreground/70 hover:text-primary"
                    }`}
                  >
                    Partners <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 p-2 rounded-xl border-none shadow-xl">
                  <DropdownMenuItem asChild>
                    <Link href="/partners" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Handshake className="h-4 w-4 text-primary" />
                      <span>About Partnerships</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/partners/directory" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Partner Network</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className={`flex items-center pl-8 ml-2 ${isGhost ? "border-l border-white/25" : "border-l"}`}>
                {loading ? (
                  <div className="h-9 w-9 rounded-full bg-secondary animate-pulse" />
                ) : user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                        <Avatar className="h-9 w-9 border-2 border-primary/20">
                          <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {user.displayName?.substring(0, 2).toUpperCase() || "JD"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl border-none shadow-xl">
                      <DropdownMenuLabel className="font-normal px-4 py-3">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-bold leading-none">{user.displayName || "Member"}</p>
                          <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer py-3 rounded-lg flex items-center gap-3">
                          <LayoutDashboard className="h-4 w-4 text-primary" />
                          <span>Control Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings" className="cursor-pointer py-3 rounded-lg flex items-center gap-3">
                          <Settings className="h-4 w-4 text-primary" />
                          <span>Account Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={handleSignOut}
                        className="cursor-pointer py-3 rounded-lg flex items-center gap-3 text-destructive focus:text-destructive focus:bg-destructive/10"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      className={`font-bold ${isGhost ? "text-white/90 hover:bg-white/10 hover:text-white" : "text-foreground/70 hover:text-primary"}`}
                      asChild
                    >
                      <Link href="/auth/signin">Sign In</Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 font-bold rounded-xl shadow-md gap-2">
                          Get Started <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl border-none shadow-xl">
                        <DropdownMenuItem asChild>
                          <Link href="/auth/signup" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-primary" />
                            <div className="flex flex-col">
                              <span className="font-bold">Driver / Student</span>
                              <span className="text-[10px] text-muted-foreground">Start your training journey</span>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/auth/signup-partner" className="cursor-pointer py-3 rounded-lg flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-primary" />
                            <div className="flex flex-col">
                              <span className="font-bold">Institutional Partner</span>
                              <span className="text-[10px] text-muted-foreground">Employers, Insurers, Fleet Owners</span>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            {!loading && user && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoURL || ""} />
                <AvatarFallback className="text-[10px]">{user.displayName?.substring(0, 2).toUpperCase() || "JD"}</AvatarFallback>
              </Avatar>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
                isGhost && !isOpen ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t bg-background px-4 pb-4 pt-2 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground/70 hover:bg-accent hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {!loading && (
              <div className="pt-4 space-y-2 border-t mt-2">
                {user ? (
                  <>
                    <Link href="/dashboard" className="block px-3 py-2 font-bold text-primary flex items-center gap-2" onClick={() => setIsOpen(false)}>
                      <LayoutDashboard className="h-4 w-4" /> Go to Dashboard
                    </Link>
                    <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="w-full text-left px-3 py-2 font-bold text-destructive flex items-center gap-2">
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin" className="block px-3 py-2 font-bold text-foreground/70" onClick={() => setIsOpen(false)}>Sign In</Link>
                    <Link href="/auth/signup" className="block px-3 py-2 font-bold text-primary" onClick={() => setIsOpen(false)}>Driver Sign Up</Link>
                    <Link href="/auth/signup-partner" className="block px-3 py-2 font-bold text-primary" onClick={() => setIsOpen(false)}>Partner Sign Up</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function GraduationCap({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
