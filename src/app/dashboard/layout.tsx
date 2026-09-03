"use client";

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarFooter } from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  Users, 
  ClipboardList, 
  Brain, 
  CreditCard, 
  User, 
  ListTodo,
  Mail,
  LifeBuoy,
  Building2,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";
import { Suspense } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@/firebase";
import { signOut } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function DashboardSidebarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'driver';

  const driverItems = [
    { title: "Overview", href: "/dashboard?role=driver", icon: LayoutDashboard },
    { title: "Admissions", href: "/dashboard/admissions?role=driver", icon: FileText },
    { title: "Learning", href: "/dashboard/learning?role=driver", icon: GraduationCap },
    { title: "Payments", href: "/dashboard/payments?role=driver", icon: CreditCard },
    { title: "Hot Jobs", href: "/dashboard/marketplace?role=driver", icon: Briefcase },
    { title: "Study Assistant", href: "/dashboard/study-assistant?role=driver", icon: Brain },
  ];

  const employerItems = [
    { title: "Overview", href: "/dashboard?role=employer", icon: LayoutDashboard },
    { title: "Marketplace", href: "/dashboard/marketplace?role=employer", icon: Briefcase },
    { title: "Verify Driver", href: "/dashboard/employer?role=employer", icon: ShieldCheck },
    { title: "My Listings", href: "/dashboard/employer/listings?role=employer", icon: ListTodo },
  ];

  const adminItems = [
    { title: "Overview", href: "/dashboard?role=admin", icon: LayoutDashboard },
    { title: "Applications", href: "/dashboard/admin/applications?role=admin", icon: FileText },
    { title: "All Learners", href: "/dashboard/admin/learners?role=admin", icon: Users },
    { title: "Employer Requests", href: "/dashboard/admin/requests?role=admin", icon: ClipboardList },
    { title: "All Employers", href: "/dashboard/admin/employers?role=admin", icon: Building2 },
    { title: "Payments", href: "/dashboard/admin/payments?role=admin", icon: CreditCard },
    { title: "Support Tickets", href: "/dashboard/admin/support?role=admin", icon: LifeBuoy },
    { title: "Inbox", href: "/dashboard/admin/inbox?role=admin", icon: Mail },
  ];

  const items = role === 'admin' ? adminItems : role === 'employer' ? employerItems : driverItems;

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden uppercase tracking-widest text-[10px] font-bold">
          {role} Portal
        </SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === item.href.split('?')[0]}
                tooltip={item.title}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      
      <SidebarGroup className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings" isActive={pathname === "/dashboard/settings"}>
              <Link href={`/dashboard/settings?role=${role}`}>
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}

function UserNav() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'driver';
  const auth = useAuth();
  const { user, loading } = useUser();
  const router = useRouter();
  
  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/auth/signin");
  };

  const initials = user?.displayName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2) || "U";

  const profileLabel = role === 'admin' ? "Admin Profile" : role === 'employer' ? "Employer Profile" : "Student Profile";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden outline-none ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
          <Avatar className="h-full w-full">
            <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 mt-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold leading-none">
              {loading ? "Syncing..." : (user?.displayName || "PADTI Member")}
            </p>
            <p className="text-[10px] leading-none text-muted-foreground uppercase font-bold tracking-wider pt-1">
              {role} Account
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer py-2.5">
          <Link href={`/dashboard/settings?role=${role}&tab=profile`}>
            <User className="mr-2 h-4 w-4" />
            <span>{profileLabel}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer py-2.5">
          <Link href={`/dashboard/settings?role=${role}&tab=account`}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Account Management</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer py-2.5 text-destructive focus:text-destructive" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DashboardHeaderLabel() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'driver';
  
  const titles: Record<string, string> = {
    admin: "Admin Dashboard",
    employer: "Partner Dashboard",
    driver: "Driver Dashboard",
  };

  return (
    <h2 className="font-body text-sm font-bold text-primary uppercase tracking-widest">
      {titles[role] || "Driver Dashboard"}
    </h2>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/auth/signin");
  };

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="p-1">
              <Logo className="h-7 w-7 text-sidebar-primary" />
            </div>
            <span className="font-headline text-lg text-sidebar-foreground truncate group-data-[collapsible=icon]:hidden">PADTI</span>
          </div>
        </SidebarHeader>
        
        <Suspense fallback={<div className="p-4">Loading menu...</div>}>
          <DashboardSidebarContent />
        </Suspense>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleSignOut} tooltip="Sign Out">
                <LogOut />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4 bg-card/80 backdrop-blur-sm sticky top-0 z-30">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <Suspense fallback={<div className="h-4 w-32 bg-muted animate-pulse rounded" />}>
              <DashboardHeaderLabel />
            </Suspense>
          </div>
          <div className="flex items-center gap-4">
            <Suspense fallback={<div className="h-8 w-8 rounded-full bg-muted animate-pulse" />}>
              <UserNav />
            </Suspense>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}