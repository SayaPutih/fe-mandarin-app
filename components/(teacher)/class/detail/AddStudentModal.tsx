"use client";

import { useState } from "react";

//import { useStudents } from "@/hooks/useStudents";
import { useAddStudentToClass } from "@/hooks/useTeacherStudentClass";
import { useAvailableStudents } from "@/hooks/useTeacherStudentClass";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="sm:w-1/2 w-full rounded-xl bg-white p-6">

        <h2 className="mb-5 text-xl font-semibold">
          Add Students
        </h2>

        <input
          className="mb-5 w-full rounded-lg border p-3"
          placeholder="Search Student..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="max-h-[350px] space-y-2 overflow-y-auto">

          {loading ? (

            <p>Loading...</p>

          ) : (

            filteredStudents.map((student) => {

              const selected =
                selectedStudents.includes(student.id);

              return (

                <div
                  key={student.id}
                  className={`flex items-center justify-between rounded-lg border p-3 transition
                    ${
                      selected
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                >

                  <div>

                    <p className="font-medium">
                      {student.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {student.email}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      toggleStudent(student.id)
                    }
                    className={`rounded-lg px-4 py-2 text-white
                      ${
                        selected
                          ? "bg-gray-500"
                          : "bg-blue-500"
                      }`}
                  >
                    {selected
                      ? "Selected"
                      : "Add"}
                  </button>

                </div>

              );

            })

          )}

        </div>

        <div className="mt-6 flex justify-between items-center">

          <span className="text-sm text-gray-500">
            {selectedStudents.length} student selected
          </span>

          <div className="flex gap-3">

            <button
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              disabled={
                adding ||
                selectedStudents.length === 0
              }
              onClick={onConfirm}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
              Add Students ({selectedStudents.length})
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}