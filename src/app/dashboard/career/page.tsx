"use client";

import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";

export default function DashboardMarketplaceRedirect() {
  const router = useRouter();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="w-full max-w-md border border-border bg-card p-10">
        <h2 className="mb-3 font-headline text-2xl text-ink">Marketplace Hub</h2>
        <p className="mb-6 font-body text-sm text-muted-foreground">
          The Marketplace has moved to a primary site page for easier access.
        </p>
        <button
          onClick={() => router.push("/marketplace")}
          className="flex w-full items-center justify-center gap-2 bg-sage py-3.5 font-body text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-sage-dark"
        >
          Go to Marketplace Hub <ExternalLink className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
