//EE 4
import StatCard from "@/components/ui/common/StatCard";

import type { Student } from "@/types/teacher";

interface StudentsStatsProps {
  students: Student[];
}

export default function StudentsStats({
  students,
}: StudentsStatsProps) {
  const totalVocabulary =
    students.reduce(
      (acc, student) =>
        acc +
        (student.memoryStates
          ?.length || 0),
      0
    );

  return (
    <div className="mb-4 grid gap-3 md:grid-cols-3">
      <StatCard
        title="Total Students"
        value={students.length}
      />

      <StatCard
        title="Vocabulary Learned"
        value={totalVocabulary}
      />

      <StatCard
        title="Active Learners"
        value={students.length}
      />
    </div>
  );
}