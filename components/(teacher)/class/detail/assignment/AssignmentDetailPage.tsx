"use client";

import { useState } from "react";

import AssignmentHeader from "./AssingmentHeader";

import {
  useAssignmentCards,
  useAssignmentDetail,
  useAssignmentStudents,
} from "@/hooks/useTeacherAssignmentClass";
import AssignmentCardTable from "./AssignmentCardTable";
import AssignmentStudentTable from "./AssingmentStudentTable";

interface Props {
  assignmentId: string;
}

export default function AssignmentDetailPage({
  assignmentId,
}: Props) {

  const {
    loading,
    assignment,
    refresh,
  } = useAssignmentDetail(assignmentId);

  const {
    loading: cardsLoading,
    cards,
    page: cardsPage,
    setPage: setCardsPage,
    totalPages: cardsTotalPages,
  } = useAssignmentCards(assignmentId);

  const {
    loading: studentsLoading,
    students,
    page: studentsPage,
    setPage: setStudentsPage,
    totalPages: studentsTotalPages,
  } = useAssignmentStudents(assignmentId);

  const [tab, setTab] = useState<
    "cards" | "students"
  >("cards");

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
        Loading assignment...
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center text-red-500">
        Assignment not found.
      </div>
    );
  }

  return (

    <div className="space-y-6">

      <AssignmentHeader
        assignment={assignment}
        onRefresh={refresh}
      />

      <div>

        <div className="flex gap-3 border-b">

          <button
            onClick={() =>
              setTab("cards")
            }
            className={`border-b-2 px-4 py-3 font-medium transition ${
              tab === "cards"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
          >
            Flashcards
          </button>

          <button
            onClick={() =>
              setTab("students")
            }
            className={`border-b-2 px-4 py-3 font-medium transition ${
              tab === "students"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
          >
            Student Progress
          </button>

        </div>

        <div className="pt-6">

          {tab === "cards" && (

            <AssignmentCardTable
              loading={cardsLoading}
              cards={cards}
              page={cardsPage}
              totalPages={cardsTotalPages}
              onPageChange={setCardsPage}
            />

          )}

          {tab === "students" && (

            <AssignmentStudentTable
              loading={studentsLoading}
              students={students}
              page={studentsPage}
              totalPages={studentsTotalPages}
              onPageChange={setStudentsPage}
            />

          )}

        </div>

      </div>

    </div>

  );

}