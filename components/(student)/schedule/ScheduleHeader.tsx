"use client";

import { useRouter } from "next/navigation";

export default function ScheduleHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Review Schedule
        </h1>

        <p className="text-sm text-zinc-500">
          Review calendar generated from
          GRU-HLR prediction.
        </p>
      </div>

      <button
        onClick={() =>
          router.push("/student/home")
        }
        className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-100"
      >
        ← Back
      </button>
    </div>
  );
}