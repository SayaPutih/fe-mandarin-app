"use client";

import { useRemoveStudentFromClass } from "@/hooks/useTeacherStudentClass";
import TeacherButton from "@/components/ui/TeacherButton";

interface Props {
  open: boolean;
  onClose: () => void;

  classId: string;
  studentId: string;
  studentName: string;

  refresh: () => void;
}

export default function DeleteStudentModal({
  open,
  onClose,
  classId,
  studentId,
  studentName,
  refresh,
}: Props) {
  const {
    loading,
    handleRemoveStudent,
  } = useRemoveStudentFromClass();

  if (!open) return null;

  const handleDelete = async () => {
    await handleRemoveStudent(
      classId,
      studentId
    );

    refresh();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold">
          Remove Student
        </h2>

        <p className="mt-3 text-gray-600">
          Are you sure you want to remove{" "}
          <span className="font-semibold">
            {studentName}
          </span>{" "}
          from this class?
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <TeacherButton
            label="Cancel"
            variant="blue"
            style="py-2"
            onClick={onClose}
          />

          <TeacherButton
            label={loading
              ? "Removing..."
              : "Remove"}
            variant="red"
            style="py-2 disabled:opacity-50"
            disabled={loading}
            onClick={handleDelete}    
          />

        </div>
      </div>
    </div>
  );
}