//EE

import TeacherButton from "@/components/ui/TeacherButton";

interface VocabularyHeaderProps {
  onAdd: () => void;
}

export default function VocabularyHeader({
  onAdd,
}: VocabularyHeaderProps) {
  return (
    <div className="mb-8 flex sm:flex-row flex-col items-end sm:items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold">
          HSK Vocabulary
        </h1>

        <p className="mt-2 text-zinc-500">
          Explore and monitor Mandarin
          vocabulary used in the learning
          system.
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <TeacherButton
          label="Add Vocabulary"
          variant="green"
          onClick={onAdd}
          style="rounded-xl px-5 py-3 "
        />
      </div>
    </div>
  );
}