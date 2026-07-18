"use client";

import { useRouter } from "next/navigation";

export default function ReviewedWordsHeader() {
  const router = useRouter();

  return (
    <div className="mb-2 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">
          Reviewed Words
        </h1>

        <p className="mt-1 text-xs text-zinc-500">
          Vocabulary that has been
          reviewed using flashcards.
        </p>
      </div>

      <button
        onClick={() =>
          router.push("/student/home")
        }
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
  );
}