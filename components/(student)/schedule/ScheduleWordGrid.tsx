"use client";

import { MainCard } from "../Card/Card";

interface Props {
  words: any[];
}

export default function ScheduleWordGrid({
  words,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-8">
      {words.map((word) => (
        <MainCard
          key={word.id}
          item={{ word }}
        />
      ))}
    </div>
  );
}