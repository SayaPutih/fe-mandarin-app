//EE 3

import type {VocabularyDetail,} from "@/types/teacher";

interface VocabularyInformationProps {
  word: VocabularyDetail;
}

export default function VocabularyInformation({
  word,
}: VocabularyInformationProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm  border-zinc-200 transition-all
        duration-200 hover:-translate-y-1 hover:border-black/50 hover:shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold">
        Vocabulary Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <p className="text-sm text-zinc-500">
            Simplified Chinese
          </p>

          <p className="mt-1 text-xl font-semibold">
            {word.simplified}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">
            Pinyin
          </p>

          <p className="mt-1 text-xl font-semibold">
            {word.pinyin}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">
            Part of Speech
          </p>

          <p className="mt-1 text-xl font-semibold">
            {word.pos || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">
            Radical
          </p>

          <p className="mt-1 text-xl font-semibold">
            {word.radical || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">
            Difficulty
          </p>

          <p className="mt-1 text-xl font-semibold">
            {word.lexicalDifficulty || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">
            Created At
          </p>

          <p className="mt-1 text-xl font-semibold">
            {new Date(
              word.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

      </div>
    </div>
  );
}