"use client";

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
          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Close
          </button>
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

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}