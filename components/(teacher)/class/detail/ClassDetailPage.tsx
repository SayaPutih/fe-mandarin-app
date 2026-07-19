"use client";

import { useState } from "react";

import StudentSection from "./StudentSection";
import AssignmentSection from "./AssignmentSection";
import CreateAssignmentSection from "./CreateAssignmentSection";
import TeacherButton from "@/components/ui/TeacherButton";

interface Props {
  classId: string;
}

export default function ClassDetailPage({
  classId,
}: Props) {

  const [tab, setTab] = useState<
    "students" | "assignments"
  >("assignments");

  const [
    showCreateAssignment,
    setShowCreateAssignment,
  ] = useState(false);

  return (

    <div className="space-y-4 bg-white sm:p-4 rounded-xl p-4">

      <div className="mb-6 flex items-center gap-6 justify-between">
        <div>
          <h1 className="mt-4 text-2xl font-bold">
            Manange Class
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage students and assignments for this class.
          </p>
        </div>
        <TeacherButton
            label="Back"
            href="/teacher/class"
            variant="gray"
            style="py-2"
          />
      </div>

      <div className="flex gap-3 border-b border-zinc-400">
        <button
          onClick={() =>
            setTab("assignments")
          }
          className={`border-b-2 px-4 py-3 font-medium transition ${
            tab === "assignments"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500"
          }`}
        >
          Assignments
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
          Students
        </button>

      </div>

      {tab === "students" && (

        <StudentSection
          classId={classId}
        />

      )}

      {tab === "assignments" && (

        showCreateAssignment ? (

          <CreateAssignmentSection
            classId={classId}
            onBack={() =>
              setShowCreateAssignment(false)
            }
          />

        ) : (

          <AssignmentSection
            classId={classId}
            onCreate={() =>
              setShowCreateAssignment(
                true
              )
            }
          />

        )

      )}

    </div>

  );

}