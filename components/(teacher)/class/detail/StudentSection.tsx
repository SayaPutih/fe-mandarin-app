"use client";

import { useState } from "react";

import { useGetStudentsByClass } from "@/hooks/useTeacherStudentClass";

import StudentTable from "./StudentTable";
import AddStudentModal from "./AddStudentModal";
import TeacherButton from "@/components/ui/TeacherButton";
import { Plus } from "lucide-react";

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
      <div className="rounded-xl border bg-white p-5 border-zinc-200">

        <div className="mb-5 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-semibold">
              Students
            </h2>

            <p className="text-sm text-gray-500">
              {students.length} Students
            </p>
          </div>

          <TeacherButton
            icon={<Plus width={16}/>}
            onClick={() => setIsOpen(true)}
            variant="green"
            style="py-2"
          />
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