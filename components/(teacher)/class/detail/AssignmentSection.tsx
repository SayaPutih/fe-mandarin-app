"use client";

import { useAssignments } from "@/hooks/useTeacherAssignmentClass";
import AssignmentTable from "./AssignmentTable";

interface Props {
  classId: string;

  onCreate: () => void;
}

export default function AssignmentSection({
  classId,
  onCreate,
}: Props) {

  const {
  loading,
  assignments,
  refresh,
} = useAssignments(classId);

  return (
    <div className="rounded-xl border bg-white p-5">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Assignments
        </h2>

        <button
          onClick={onCreate}
          className="rounded-lg bg-green-600 px-4 py-2 text-white"
        >
          Create Assignment
        </button>

      </div>

      <AssignmentTable
        classId={classId}
        loading={loading}
        assignments={assignments}
        refresh={refresh}
      />

    </div>
  );
}