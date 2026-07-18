"use client";

import type {
  ReviewedWord,
} from "@/types/student";

interface ReviewedWordCardProps {
  item: ReviewedWord;

  flipped: boolean;

  onFlip: () => void;
}

export default function ReviewedWordCard({
  item,
  flipped,
  onFlip,
}: ReviewedWordCardProps) {
  return (
    <div
      className="h-52 cursor-pointer [perspective:1000px]"
      onClick={onFlip}
    >
      <div
        className={`
          relative
          h-full
          w-full
          transition-all
          duration-500
          [transform-style:preserve-3d]
          ${
            flipped
              ? "[transform:rotateY(180deg)]"
              : ""
          }
        `}
      >
        {/* FRONT */}

        <div
          className="
            absolute
            inset-0
            rounded-lg
            border
            bg-white
            p-3
            shadow-sm
            [backface-visibility:hidden]
          "
        >
          <div className="mb-2">
            <h3 className="text-xl font-bold">
              {item.word.simplified}
            </h3>

            <p className="text-xs text-zinc-500">
              {item.word.pinyin}
            </p>
          </div>

          <div className="mb-3">
            <span className="rounded-full bg-zinc-100 px-2 py-1 text-[10px]">
              HSK {item.word.hskLevel}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-zinc-500">
                Correct
              </p>

              <p className="font-semibold">
                {item.correctReviews}
              </p>
            </div>

            <div>
              <p className="text-zinc-500">
                Reviews
              </p>

              <p className="font-semibold">
                {item.totalReviews}
              </p>
            </div>
          </div>

          <p className="mt-4 text-center text-[10px] text-zinc-400">
            Click to reveal meaning
          </p>
        </div>

        {/* BACK */}

        <div
          className="
            absolute
            inset-0
            rounded-lg
            border
            bg-zinc-900
            p-4
            text-white
            shadow-sm
            [backface-visibility:hidden]
            [transform:rotateY(180deg)]
          "
        >
          <div className="space-y-2">
            {item.word.meanings
              ?.slice(0, 3)
              .map(
                (
                  meaning,
                  index
                ) => (
                  <div
                    key={meaning.id}
                    className="rounded bg-white/10 p-1 text-xs"
                  >
                    {index + 1}.{" "}
                    {
                      meaning.meaning
                    }
                  </div>
                )
              )}
          </div>

          <p className="mt-4 text-center text-[10px] text-zinc-300">
            Click to flip back
          </p>
        </div>
      </div>
    </div>
  );
}