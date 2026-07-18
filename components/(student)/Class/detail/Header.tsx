"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
} from "lucide-react";

interface Props {
  totalAssignments: number;
}

export default function Header({
  totalAssignments,
}: Props) {
  return (
    <div className="mb-8 rounded-[28px] bg-white px-6 py-7">

      <Link
        href="/student/class"
        className="
          mb-6
          inline-flex
          items-center
          gap-2
          rounded-lg
          px-3
          py-2
          text-sm
          font-medium
          text-gray-600
          transition
          hover:bg-gray-100
        "
      >
        <ArrowLeft size={16} />
        Back to Classes
      </Link>

      <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">

        {/* Left */}

        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 sm:h-32 sm:w-32">
            <BookOpen
              size={50}
              className="text-gray-700"
            />
          </div>

          <div>

            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
              Ready to Learn 
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Assignments
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
              View your assignments, track your learning progress, and
              complete every flashcard set.
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="text-left sm:text-right">

          <p className="text-4xl font-bold leading-none text-gray-900 sm:text-5xl">
            {totalAssignments}
          </p>

          <p className="mt-1 text-sm text-gray-400 sm:text-base">
            Total Assignments
          </p>

        </div>

      </div>

    </div>
  );
}