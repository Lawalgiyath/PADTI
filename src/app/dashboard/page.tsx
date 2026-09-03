"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import DashboardOverview from "./driver-overview";
import EmployerOverview from "./employer-overview";
import AdminOverview from "./admin-overview";

function DashboardDispatcher() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'driver';

  if (role === 'admin') return <AdminOverview />;
  if (role === 'employer') return <EmployerOverview />;
  return <DashboardOverview />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <DashboardDispatcher />
    </Suspense>
  );
}
