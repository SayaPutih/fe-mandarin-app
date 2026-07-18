import type {
  VocabularyDetail,
} from "@/types/teacher";

interface VocabularyHeroProps {
  word: VocabularyDetail;
}

export default function VocabularyHero({
  word,
}: VocabularyHeroProps) {
  return (
    <div className="mb-8 rounded-3xl border bg-white p-10 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            {word.simplified}
          </h1>

          <p className="mt-3 text-2xl text-zinc-500">
            {word.pinyin}
          </p>
        </div>

        <span className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white">
          HSK {word.hskLevel}
        </span>

      </div>
    </div>
  );
}