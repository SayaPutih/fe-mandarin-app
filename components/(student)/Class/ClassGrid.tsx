"use client";

import { StudentClass } from "@/types/student";

import ClassCard from "./ClassCard";
import EmptyClass from "./EmptyClass";

interface Props {
  classes: StudentClass[];
}

export default function ClassGrid({
  classes,
}: Props) {
  if (classes.length === 0) {
    return <EmptyClass />;
  }

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
      {classes.map((item) => (
        <ClassCard
          key={item.id}
          data={item}
        />
      ))}
    </div>
  );
}