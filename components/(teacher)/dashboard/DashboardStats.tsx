import type { TeacherDashboard } from "@/types/teacher";

import StatCard from "@/components/(teacher)/common/StatCard";

interface DashboardStatsProps {
  dashboard: TeacherDashboard;
}

export default function DashboardStats({
  dashboard,
}: DashboardStatsProps) {
  return (
    <div
      className="
        mb-5
        grid
        grid-cols-2
        gap-4
        xl:grid-cols-4
      "
    >
      <StatCard
        title="Total Students"
        value={
          dashboard.totalStudents
        }
      />

      <StatCard
        title="Total Vocabulary"
        value={dashboard.totalVocabulary.toLocaleString()}
      />

      <StatCard
        title="Total Reviews"
        value={
          dashboard.totalReviewsToday
        }
      />

      <StatCard
        title="Average Retention"
        value={`${(
          (dashboard.averageRetention ||
            0) * 100
        ).toFixed(1)}%`}
      />
    </div>
  );
}