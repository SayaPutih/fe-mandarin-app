"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getStudentReviewedWords,
} from "@/services/student.service";

export default function ReviewWordsPage() {
    const router = useRouter();
  const [words, setWords] = useState<any[]>([]);
  const [loading, setLoading] =
    useState(true);

  const [page, setPage] = useState(1);
  const [flippedCard, setFlippedCard] =
  useState<string | null>(null);

    const [pagination, setPagination] =
    useState<any>(null);

    const fetchWords = async () => {
    const data =
        await getStudentReviewedWords(page);

    if (data) {
        setWords(data.data);
        setPagination(data.pagination);
    }

    setLoading(false);
    };

    useEffect(() => {
    fetchWords();
    }, [page]);

    if (loading) {
        return (
        <div className="p-6">
            Loading...
        </div>
        );
    }

    return (
    <div className="min-h-screen rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 p-4">
        {/* HEADER */}

        <div className="mb-4 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">
                Reviewed Words
                </h1>

                <p className="mt-1 text-xs text-zinc-500">
                Vocabulary that has been reviewed using flashcards.
                </p>
            </div>

            <button
                onClick={() => router.push("/home")}
                className="
                rounded-lg
                border
                border-zinc-300
                bg-white
                px-4
                py-2
                text-sm
                font-medium
                transition
                hover:bg-zinc-100
                "
            >
                ← Back
            </button>
            </div>

        {/* STATS */}

        <div className="mb-4 rounded-lg border bg-white p-3 shadow-sm">
        <p className="text-xs text-zinc-500">
            Total Reviewed Words
        </p>

        <h2 className="mt-1 text-2xl font-bold">
            {pagination?.total || words.length}
        </h2>
        </div>

        {/* GRID */}

        <div
        className="
            grid
            grid-cols-2
            sm:grid-cols-4
            md:grid-cols-7
            xl:grid-cols-8
            gap-3
        "
        >
{words.map((item) => (
  <div
    key={item.id}
    className="h-52 cursor-pointer [perspective:1000px]"
    onClick={() =>
      setFlippedCard(
        flippedCard === item.id
          ? null
          : item.id
      )
    }
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
          flippedCard === item.id
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
            {item.word?.simplified}
          </h3>

          <p className="text-xs text-zinc-500">
            {item.word?.pinyin}
          </p>
        </div>

        <div className="mb-3">
          <span className="rounded-full bg-zinc-100 px-2 py-1 text-[10px]">
            HSK {item.word?.hskLevel}
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
  {item.word?.meanings
    ?.slice(0, 3)
    .map(
      (
        meaning: any,
        index: number
      ) => (
        <div
          key={meaning.id}
          className="rounded bg-white/10 p-1 text-xs"
        >
          {index + 1}.{" "}
          {meaning.meaning}
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
))}
        </div>

        {words.length === 0 && (
        <div className="mt-4 rounded-lg border bg-white p-6 text-center text-sm text-zinc-500">
            No reviewed words found.
        </div>
        )}

        {/* PAGINATION */}

        <div className="mt-4 flex items-center justify-center gap-2">
        <button
            disabled={page === 1}
            onClick={() =>
            setPage((p) => p - 1)
            }
            className="
            rounded-lg
            border
            px-3
            py-1
            text-xs
            disabled:opacity-50
            "
        >
            Prev
        </button>

        <span className="text-xs">
            Page {page} of{" "}
            {pagination?.totalPages || 1}
        </span>

        <button
            disabled={
            page >=
            (pagination?.totalPages || 1)
            }
            onClick={() =>
            setPage((p) => p + 1)
            }
            className="
            rounded-lg
            border
            px-3
            py-1
            text-xs
            disabled:opacity-50
            "
        >
            Next
        </button>
        </div>
    </div>
    );
}