"use client";

import TeacherButton from "@/components/ui/TeacherButton";

interface NoticeModalProps {
  message: string;
  onClose: () => void;
}

export function NoticeModal({
  message,
  onClose,
}: NoticeModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-3 text-xl font-semibold">
          Notice
        </h2>

        <p className="mb-6 text-gray-600">
          {message}
        </p>

        <div className="flex justify-end">
          <TeacherButton
            label="Close"
            variant="blue"
            onClick={onClose}
            style="py-3"
          />
        </div>

      </div>

    </div>
  );
}

interface ConfirmationModalProps {
  title?: string;
  message: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmationModal({
  title = "Confirmation",
  message,
  loading = false,
  onClose,
  onConfirm,
}: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/40">
            <div className="text-center">
              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
              <p className="font-medium text-white">
                Loading...
              </p>
            </div>
          </div>
        )}

        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="mt-3 text-gray-600">
          {message}
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <TeacherButton
            label="Cancel"
            onClick={onClose}
            disabled={loading}
            variant="blue"
            style="py-2"
          />

          <TeacherButton
            label="Delete"
            onClick={onConfirm}
            disabled={loading}
            variant="red"
            style="py-2"
          />
        </div>

      </div>

    </div>
  );
}