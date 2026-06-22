"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "@/components/(student)/dashboard/Layout/DashboardLayout";
import { getToken } from "@/util/auth";


export default function DashboardLoayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout >
      {children}
    </DashboardLayout>
  );
}