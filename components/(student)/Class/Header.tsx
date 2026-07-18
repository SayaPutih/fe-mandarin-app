"use client";

import Link from "next/link";
import { ArrowLeft, GraduationCap } from "lucide-react";

interface Props {
  totalClasses?: number;
}

export default function Header({
  totalClasses = 0,
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

        <div className="flex items-start justify-center gap-5 sm:flex-row flex-col">

          <div className="flex h-16 sm:h-32 h-16 sm:w-32 shrink-0 items-center justify-center rounded-2xl bg-gray-100">
            <GraduationCap
              size={50}
              className="text-gray-700"
            />
          </div>

          <div>

            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
              Welcome Back 👋
            </p>

            <h1 className="mt-1 text-4xl font-bold tracking-tight text-gray-900">
              My Classes
            </h1>

            <p className="mt-3 max-w-lg text-base leading-7 text-gray-500">
              Browse all your enrolled Mandarin classes and continue
              learning at your own pace.
            </p>

          </div>

        </div>

        <div className="text-left sm:text-right ">

          <p className="text-5xl font-bold leading-none text-gray-900">
            {totalClasses}
          </p>

          <p className="mt-1 text-base text-gray-400">
            Total Classes
          </p>

        </div>

      </div>

    </div>
  );
}