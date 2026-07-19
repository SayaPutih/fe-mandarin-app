//EE 3
import type {VocabularyDetail} from "@/types/teacher";

interface VocabularyHeroProps {
  word: VocabularyDetail;
}

export default function VocabularyHero({
  word,
}: VocabularyHeroProps) {
  return (
    <div
      className="
        relative
        mb-8
        rounded-3xl
        border
        border-zinc-200
        bg-white
        p-10
        shadow-sm
        duration-200
        hover:-translate-y-1
        hover:border-black/50
        hover:shadow-lg
      "
    >
      <span
        className="
          absolute
          right-6
          top-6
          rounded-full
          bg-black
          px-5
          py-2
          text-sm
          font-medium
          text-white
          md:hidden
        "
      >
        HSK {word.hskLevel}
      </span>

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div className="pr-20 md:pr-0">
          <h1 className="text-4xl font-bold tracking-tight">
            {word.simplified}
          </h1>

          <p className="mt-3 text-2xl text-zinc-500">
            {word.pinyin}
          </p>
        </div>
        <span
          className="
            hidden
            rounded-full
            bg-black
            px-5
            py-2
            text-sm
            font-medium
            text-white
            md:block
          "
        >
          HSK {word.hskLevel}
        </span>

      </div>
    </div>
  );
}