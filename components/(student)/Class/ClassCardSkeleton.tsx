"use client";

export default function ClassCardSkeleton() {
  return (
    <div className="animate-pulse rounded-[28px] border border-gray-200 bg-white p-5">

      <div className="mb-6 h-12 w-12 rounded-xl bg-gray-200" />

      <div className="h-6 w-2/3 rounded bg-gray-200" />

      <div className="mt-3 space-y-2">

        <div className="h-3 rounded bg-gray-200" />
        <div className="h-3 w-5/6 rounded bg-gray-200" />

      </div>

      <div className="mt-6 space-y-4">

        <div className="flex gap-3">

          <div className="h-4 w-4 rounded-full bg-gray-200" />

          <div className="flex-1 space-y-2">

            <div className="h-2.5 w-16 rounded bg-gray-200" />
            <div className="h-3.5 w-28 rounded bg-gray-200" />

          </div>

        </div>

        <div className="flex gap-3">

          <div className="h-4 w-4 rounded-full bg-gray-200" />

          <div className="flex-1 space-y-2">

            <div className="h-2.5 w-16 rounded bg-gray-200" />
            <div className="h-3.5 w-24 rounded bg-gray-200" />

          </div>

        </div>

      </div>

      <div className="mt-6 border-t border-gray-100 pt-4">

        <div className="h-4 w-24 rounded bg-gray-200" />

      </div>

    </div>
  );
}