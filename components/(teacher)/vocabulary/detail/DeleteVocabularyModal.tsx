import type {
  VocabularyDetail,
} from "@/types/teacher";

interface DeleteVocabularyModalProps {
  open: boolean;

  word: VocabularyDetail;

  onClose: () => void;

  onDelete: () => void;
}

export default function DeleteVocabularyModal({
  open,
  word,
  onClose,
  onDelete,
}: DeleteVocabularyModalProps) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-2xl">

        <div className="mb-6 flex justify-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">

            <span className="text-3xl text-red-600">
              🗑️
            </span>

          </div>

        </div>

        <h2 className="text-center text-2xl font-bold">
          Delete Vocabulary
        </h2>

        <p className="mt-3 text-center text-zinc-500">
          This action cannot be undone.
        </p>

        <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4">

          <p className="text-sm text-zinc-500">
            Vocabulary
          </p>

          <p className="mt-1 text-3xl font-bold">
            {word.simplified}
          </p>

          <p className="text-zinc-500">
            {word.pinyin}
          </p>

        </div>

        <div className="mt-8 flex gap-3">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border bg-white py-3 font-medium hover:bg-zinc-100"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="flex-1 rounded-xl bg-red-600 py-3 font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}