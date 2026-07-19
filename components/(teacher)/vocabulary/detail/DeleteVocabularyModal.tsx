//EE
import type {VocabularyDetail,} from "@/types/teacher";
import TeacherButton from "@/components/ui/TeacherButton";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-300 bg-white p-8 shadow-2xl">

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
          <TeacherButton
            label="Cancel"
            variant="gray"
            onClick={onClose}
            style="flex-1 rounded-xl py-3"
          />
          <TeacherButton
            label="Delete"
            variant="red"
            onClick={onDelete}
            style="flex-1 rounded-xl py-3"
          />

        </div>

      </div>
    </div>
  );
}