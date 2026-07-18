"use client";

import { useState } from "react";

import StudentSection from "./StudentSection";
import AssignmentSection from "./AssignmentSection";
import CreateAssignmentSection from "./CreateAssignmentSection";

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

    <div className="space-y-6">

      <div className="flex gap-3 border-b">
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