"use client";

import ClassCardSkeleton from "./ClassCardSkeleton";

export default function ClassGridSkeleton() {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-5
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <ClassCardSkeleton
          key={index}
        />
      ))}
    </div>
  );
}