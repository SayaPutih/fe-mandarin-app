"use client";

import { useState } from "react";

import { useGetStudentsByClass } from "@/hooks/useTeacherStudentClass";

import StudentTable from "./StudentTable";
import AddStudentModal from "./AddStudentModal";

interface Props {
  classId: string;
}

export default function StudentSection({
  classId,
}: Props) {
  const {
    loading,
    students,
    refresh,
  } = useGetStudentsByClass(classId);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="rounded-xl border bg-white p-5">

        <div className="mb-5 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-semibold">
              Students
            </h2>

            <p className="text-sm text-gray-500">
              {students.length} Students
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Add Student
          </button>

        </div>

        <StudentTable
            loading={loading}
            students={students}
            classId={classId}
            refresh={refresh}
        />

      </div>

      <AddStudentModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        classId={classId}
        refresh={refresh}
      />
    </>
  );
}