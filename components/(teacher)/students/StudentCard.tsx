"use client";

import Link from "next/link";

import type { Student } from "@/types/teacher";

interface StudentCardProps {
  student: Student;
}

export default function StudentCard({
  student,
}: StudentCardProps) {
  return (
    <div className="rounded-lg border bg-white p-3 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
          {student.name?.[0] || "S"}
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold">
            {student.name}
          </h2>

          <p className="truncate text-xs text-zinc-500">
            {student.email}
          </p>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <div>
          <p className="text-[10px] text-zinc-500">
            Words Learned
          </p>

          <p className="text-lg font-bold">
            {student.memoryStates?.length || 0}
          </p>
        </div>

        <div>
          <p className="text-[10px] text-zinc-500">
            Status
          </p>

          <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-medium text-green-700">
            Active
          </span>
        </div>
      </div>

      <Link
        href={`/teacher/students/${student.id}`}
        className="inline-flex w-full items-center justify-center rounded-lg bg-black px-3 py-2 text-xs font-medium text-white"
      >
        Analytics
      </Link>
    </div>
  );
}