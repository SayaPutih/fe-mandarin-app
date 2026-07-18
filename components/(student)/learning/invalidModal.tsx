"use client";

import Link from "next/link";

import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
} from "lucide-react";

export default function InvalidModal() {
  return (
    <div
      className="
        flex
        min-h-[70vh]
        w-full
        items-center
        justify-center
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-3xl
          border
          bg-white
          p-8
          text-center
          shadow-sm
        "
      >
        <div
          className="
            mx-auto
            mb-6
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-amber-100
          "
        >
          <AlertTriangle
            size={40}
            className="text-amber-600"
          />
        </div>

        <h2 className="text-2xl font-bold">
          No Flashcards Available
        </h2>

        <p className="mt-3 text-zinc-500">
          This HSK level currently does not
          contain any flashcard learning
          materials.
        </p>

        <div
          className="
            mt-6
            rounded-2xl
            bg-zinc-50
            p-4
          "
        >
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-600">
            <BookOpen size={16} />
            Please choose another HSK level.
          </div>
        </div>

        <Link
          href="/student/flashcard"
          className="
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-zinc-900
            px-6
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-zinc-800
          "
        >
          <ArrowLeft size={16} />
          Back to HSK Levels
        </Link>
      </div>
    </div>
  );
}