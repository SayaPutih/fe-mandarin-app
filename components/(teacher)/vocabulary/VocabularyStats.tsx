import StatCard from "@/components/(teacher)/common/StatCard";

import type {
  Vocabulary,
} from "@/types/teacher";

interface Props {
  words: Vocabulary[];
}

export default function VocabularyStats({
  words,
}: Props) {
  const totalMeanings =
    words.reduce(
      (acc, word) =>
        acc +
        (word.meanings?.length || 0),
      0
    );

  const totalHSK =
    new Set(
      words.map(
        (word) => word.hskLevel
      )
    ).size;

  return (
    <div className="mb-8 grid gap-5 md:grid-cols-3">
      <StatCard
        title="Total Vocabulary"
        value={words.length}
      />

      <StatCard
        title="HSK Levels"
        value={totalHSK}
      />

      <StatCard
        title="Total Meanings"
        value={totalMeanings}
      />
    </div>
  );
}