import StatCard from "@/components/(teacher)/common/StatCard";

import type {
  StudentDetail,
  StudentRetention,
} from "@/types/teacher";

interface StudentOverviewProps {
  student: StudentDetail;

  retention: StudentRetention | null;
}

export default function StudentOverview({
  student,
  retention,
}: StudentOverviewProps) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard
        title="Words Learned"
        value={
          student.memoryStates?.length ||
          0
        }
      />

      <StatCard
        title="Attempts"
        value={
          student.attempts?.length || 0
        }
      />

      <StatCard
        title="Recall"
        value={`${(
          (retention?._avg
            ?.predictedRecall || 0) *
          100
        ).toFixed(1)}%`}
      />

      <StatCard
        title="Half Life"
        value={(
          retention?._avg
            ?.predictedHalfLife || 0
        ).toFixed(1)}
      />
    </div>
  );
}