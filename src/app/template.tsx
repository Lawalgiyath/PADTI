"use client";

import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-page-fade min-h-screen">
      {children}
    </div>
  );
}
