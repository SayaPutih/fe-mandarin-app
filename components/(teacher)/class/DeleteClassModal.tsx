"use client";

import TeacherButton from "@/components/ui/TeacherButton";

interface DeleteClassModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteClassModal({
  open,
  onClose,
  onDelete,
}: DeleteClassModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900">
          Delete Class
        </h2>

        <p className="mt-3 text-sm text-gray-600">
          Are you sure you want to delete this class?
          <br />
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <TeacherButton
            label="Cancel"
            variant="gray"
            onClick={onClose}
          />

          <TeacherButton
            label="Delete"
            variant="red"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}