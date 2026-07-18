"use client";

interface VocabularyHeaderProps {
  onBack: () => void;

  onEdit: () => void;

  onDelete: () => void;
}

export default function VocabularyHeader({
  onBack,
  onEdit,
  onDelete,
}: VocabularyHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <button
        onClick={onBack}
        className="rounded-xl border bg-white px-5 py-3 shadow-sm transition hover:bg-zinc-100"
      >
        ← Back
      </button>

      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className="rounded-xl border border-orange-200 bg-orange-50 px-5 py-3 text-orange-600"
        >
          Edit Vocabulary
        </button>

        <button
          onClick={onDelete}
          className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}