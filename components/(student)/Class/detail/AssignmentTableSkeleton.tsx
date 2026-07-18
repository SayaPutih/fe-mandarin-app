"use client";

export default function AssignmentTableSkeleton() {
  return (
    <>
      {/* Mobile */}

      <div className="space-y-4 md:hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="h-6 w-2/3 rounded bg-gray-200" />

            <div className="mt-3 h-4 w-full rounded bg-gray-200" />

            <div className="mt-6 space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
            </div>

            <div className="mt-5 h-10 w-full rounded-xl bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Desktop */}

      <div className="hidden animate-pulse overflow-hidden rounded-3xl border border-gray-200 bg-white md:block">

        {Array.from({ length: 6 }).map((_, i) => (

          <div
            key={i}
            className="flex items-center justify-between border-b px-6 py-5 last:border-0"
          >

            <div className="space-y-2">
              <div className="h-5 w-48 rounded bg-gray-200" />
              <div className="h-4 w-64 rounded bg-gray-200" />
            </div>

            <div className="h-4 w-16 rounded bg-gray-200" />

            <div className="h-4 w-24 rounded bg-gray-200" />

            <div className="h-4 w-16 rounded bg-gray-200" />

            <div className="h-9 w-20 rounded bg-gray-200" />

          </div>

        ))}

      </div>
    </>
  );
}