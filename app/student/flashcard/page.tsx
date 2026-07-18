"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  BookOpen,
  ChevronRight,
} from "lucide-react";

const levels = [
  {
    label: "HSK 1",
    href: "/student/flashcard/1",
  },
  {
    label: "HSK 2",
    href: "/student/flashcard/2",
  },
  {
    label: "HSK 3",
    href: "/student/flashcard/3",
  },
  {
    label: "HSK 4",
    href: "/student/flashcard/4",
  },
  {
    label: "HSK 5",
    href: "/student/flashcard/5",
  },
  {
    label: "HSK 6",
    href: "/student/flashcard/6",
  },
];

export default function FlashcardPage() {

  const router = useRouter();

  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        md:p-8
      "
    >
      {/* HEADER */}

      <div className="mb-8 flex flex-row justify-between items-center" >
        <div className="flex items-start flex-col">
          <h1 className="text-3xl font-bold">
            Mandarin Flashcard
          </h1>

          <p className="mt-2 text-zinc-500">
            Choose your HSK level to start
            learning vocabulary.
          </p>
        </div>

        <button
                onClick={() => router.push("/student/home")}
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

      {/* HSK GRID */}

      <div
        className="
          grid
          grid-cols-2
          gap-4
          md:grid-cols-3
        "
      >
        {levels.map((level) => (
          <Link
            key={level.href}
            href={level.href}
            className="
              group
              rounded-2xl
              border
              border-zinc-200
              bg-white
              p-6
              transition-all
              duration-200
              hover:-translate-y-1
              hover:border-zinc-900
              hover:bg-zinc-900
              hover:shadow-lg
            "
          >
            <div className="flex flex-col items-center">
              <div
                className="
                  mb-4
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-zinc-100
                  transition-all
                  group-hover:bg-white/10
                "
              >
                <BookOpen
                  size={28}
                  className="
                    text-zinc-900
                    group-hover:text-white
                  "
                />
              </div>

              <h3
                className="
                  text-lg
                  font-semibold
                  text-zinc-900
                  group-hover:text-white
                "
              >
                {level.label}
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-zinc-500
                  group-hover:text-zinc-300
                "
              >
                Open Flashcards
              </p>

              <ChevronRight
                size={18}
                className="
                  mt-4
                  text-zinc-400
                  group-hover:text-white
                "
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}