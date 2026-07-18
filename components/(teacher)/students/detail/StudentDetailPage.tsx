"use client";

import { useParams } from "next/navigation";

import { useStudentDetail } from "@/hooks/useStudentDetail";

import StudentDetailLoading from "./StudentDetailLoading";
import StudentHeader from "./StudentHeader";
import StudentOverview from "./StudentOverview";
import LearningPerformance from "./LearningPerformance";
import VocabularyStats from "./VocabularyStats";
import VocabularyList from "./VocabularyList";
import ReviewScheduleTable from "./ReviewScheduleTable";

export default function StudentDetailPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    loading,
    student,
    retention,
    masteredWords,
    forgottenWords,
    reviewSchedule,
  } = useStudentDetail(id);

  if (loading || !student) {
    return <StudentDetailLoading />;
  }

  return (
    <div
      className="
        min-h-screen
        rounded-xl
        bg-gradient-to-br
        from-zinc-50
        to-zinc-100
        p-4
      "
    >
      <StudentHeader
        student={student}
      />

      <StudentOverview
        student={student}
        retention={retention}
      />

      <LearningPerformance
        retention={retention}
      />

      <VocabularyStats
        masteredCount={
          masteredWords.length
        }
        forgottenCount={
          forgottenWords.length
        }
      />

      <div
        className="
          mb-4
          grid
          gap-3
          lg:grid-cols-2
        "
      >
        <VocabularyList
          title="Top Mastered"
          words={masteredWords}
          color="green"
          emptyText="No mastered vocabulary"
        />

        <VocabularyList
          title="At Risk"
          words={forgottenWords}
          color="red"
          emptyText="No at-risk vocabulary"
        />
      </div>

      <ReviewScheduleTable
        reviewSchedule={
          reviewSchedule
        }
      />
    </div>
  );
}