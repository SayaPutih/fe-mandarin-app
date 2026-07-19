"use client";

import { useAssignments } from "@/hooks/useTeacherAssignmentClass";
import AssignmentTable from "./AssignmentTable";
import TeacherButton from "@/components/ui/TeacherButton";
import { Plus } from 'lucide-react';

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
    <div className="rounded-xl border border-zinc-200 bg-white p-5">

      <div className="mb-5 flex items-center justify-between">

        <div>
            <h2 className="text-xl font-semibold">
              Assignments
            </h2>

            <p className="text-sm text-gray-500">
              {assignments.length} Assignments
            </p>
        </div>

        <TeacherButton
          icon={<Plus width={16}/>}
          onClick={onCreate}
          variant="green"
          style="py-2"
        />

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