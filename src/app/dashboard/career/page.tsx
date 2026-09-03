
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function DashboardMarketplaceRedirect() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <Card className="border-none shadow-sm max-w-md w-full">
        <CardContent className="pt-10 pb-8 space-y-4">
          <h2 className="text-2xl font-bold text-primary">Marketplace Hub</h2>
          <p className="text-muted-foreground">The Marketplace has moved to a primary site page for easier access.</p>
          <Button 
            className="w-full bg-primary hover:bg-primary/90 h-12 rounded-xl text-lg font-bold"
            onClick={() => router.push("/marketplace")}
          >
            Go to Marketplace Hub <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
