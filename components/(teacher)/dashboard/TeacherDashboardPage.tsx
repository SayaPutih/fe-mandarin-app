"use client";

import DashboardHeader from "./DashboardHeader";
import DashboardLoading from "./DashboardLoading";
import DashboardStats from "./DashboardStats";
import RetentionAnalytics from "./RetentionAnalytics";
import HSKDistribution from "./HSKDistribution";
import HardestVocabulary from "./HardestVocabulary";

import { useTeacherDashboard } from "@/hooks/useTeacherDashboard";

export default function TeacherDashboardPage() {
  const {
    loading,
    dashboard,
    retention,
    hardestWords,
    hskDistribution,
  } = useTeacherDashboard();

  if (loading || !dashboard) {
    return <DashboardLoading />;
  }

  return (
    <div
      className="
        min-h-screen
        rounded-xl
        bg-gradient-to-br
        from-zinc-50
        to-zinc-100
        p-5
      "
    >
      <DashboardHeader />

      <DashboardStats
        dashboard={dashboard}
      />

      <RetentionAnalytics
        retention={retention}
      />

      <div
        className="
          grid
          gap-5
          lg:grid-cols-2
        "
      >
        <HSKDistribution
          data={hskDistribution}
        />

        <HardestVocabulary
          words={hardestWords}
        />
      </div>
    </div>
  );
}