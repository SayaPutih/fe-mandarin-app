"use client";

import Link from "next/link";
import TeacherButton from "@/components/ui/TeacherButton";


interface Props {
  assignment: any;
  onEdit: () => void;
  onRefresh: () => void;
}

export default function AssignmentHeader({
  assignment,
  onEdit,
}: Props) {

  return (

    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <div className="flex items-start justify-between gap-6">

      <div className="flex-1">

        <h1 className="text-3xl font-bold">
          {assignment.title}
        </h1>

        <p className="mt-2 text-gray-500">
          {assignment.description || "No description."}
        </p>

      </div>

      <div className="flex items-center gap-3">

         <TeacherButton
            variant="yellow"
            label="Edit"
            onClick={onEdit}
            style="py-2"
          />

        <TeacherButton
          variant="gray"
          label="Back"
          href="../"
          style="py-2"
        />

      </div>

    </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div>
          <p className="text-sm text-gray-500">
            Class
          </p>
          <p className="font-medium">
            {assignment.class.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Due Date
          </p>
          <p className="font-medium">
            {assignment.dueDate
              ? new Date(
                  assignment.dueDate
                ).toLocaleString()
              : "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Cards
          </p>
          <p className="font-medium">
            {assignment.totalCards}
          </p>
        </div>

        {/* <div>
          <p className="text-sm text-gray-500">
            Students
          </p>
          <p className="font-medium">
            {assignment.totalStudents}
          </p>
        </div> */}

      </div>

    </div>

  );

}