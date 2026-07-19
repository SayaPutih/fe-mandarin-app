"use client";

import { useState } from "react";

import { FormField } from "@/components/ui/form/FormField";
import TeacherButton from "@/components/ui/TeacherButton";

import {
  useAddStudentToClass,
  useAvailableStudents,
} from "@/hooks/useTeacherStudentClass";

interface Props {
  open: boolean;
  onClose: () => void;
  classId: string;
  refresh: () => void;
}

export default function AddStudentModal({
  open,
  onClose,
  classId,
  refresh,
}: Props) {
  const {
    loading,
    filteredStudents,
    search,
    setSearch,
    refresh: refreshAvailableStudents,
  } = useAvailableStudents({
    classId,
  });

  const {
    loading: adding,
    handleAddStudent,
  } = useAddStudentToClass();

  const [
    selectedStudents,
    setSelectedStudents,
  ] = useState<string[]>([]);

  if (!open) return null;

  const toggleStudent = (studentId: string) => {
    setSelectedStudents((prev) => {

      if (prev.includes(studentId)) {
        return prev.filter(
          (id) => id !== studentId
        );
      }

      return [...prev, studentId];
    });
  };

  const onConfirm = async () => {
    if (selectedStudents.length === 0) return;

    await handleAddStudent(
      classId,
      selectedStudents
    );

    await refresh();

    await refreshAvailableStudents();

    setSelectedStudents([]);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">

        <div className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl">

          <div className="mb-6 flex items-start justify-between">

            <div>

              <h2 className="text-2xl font-bold">
                Add Students
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Select students to add into this class.
              </p>

            </div>

            <div className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold">
              {selectedStudents.length} Selected
            </div>

          </div>

          <FormField
            value={search}
            placeholder="Search student..."
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <div className="mt-5 max-h-[350px] space-y-3 overflow-y-auto">

            {loading ? (

              <div className="py-8 text-center text-zinc-500">
                Loading students...
              </div>

            ) : filteredStudents.length === 0 ? (

              <div className="py-8 text-center text-zinc-500">
                No students Available.
              </div>

            ) : (

              filteredStudents.map((student) => {

                const selected =
                  selectedStudents.includes(
                    student.id
                  );

                return (

                  <div
                    key={student.id}
                    className={`
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-zinc-200
                      p-4
                      transition

                      ${
                        selected
                          ? "bg-zinc-100"
                          : "hover:bg-zinc-50"
                      }
                    `}
                  >

                    <div>

                      <p className="font-medium">
                        {student.name}
                      </p>

                      <p className="text-sm text-zinc-500">
                        {student.email}
                      </p>

                    </div>

                    <TeacherButton
                      label={
                        selected
                          ? "Selected"
                          : "Add"
                      }
                      variant={
                        selected
                          ? "gray"
                          : "green"
                      }
                      onClick={() =>
                        toggleStudent(student.id)
                      }
                    />

                  </div>

                );

              })

            )}

          </div>

          <div className="mt-6 flex items-center justify-between">

            <span className="text-sm text-zinc-500">
              {selectedStudents.length} student selected
            </span>

            <div className="flex gap-3">

              <TeacherButton
                label="Cancel"
                variant="red"
                onClick={onClose}
              />

              <TeacherButton
                label={`Add Students (${selectedStudents.length})`}
                variant="green"
                disabled={
                  adding ||
                  selectedStudents.length === 0
                }
                onClick={onConfirm}
              />

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}