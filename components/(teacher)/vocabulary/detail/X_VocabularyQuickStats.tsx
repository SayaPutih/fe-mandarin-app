import StatCard from "@/components/ui/common/StatCard";

import type {
  VocabularyDetail,
} from "@/types/teacher";

interface VocabularyQuickStatsProps {
  word: VocabularyDetail;
}

export default function VocabularyQuickStats({
  word,
}: VocabularyQuickStatsProps) {
  return (
    <div className="mb-8 grid gap-5 md:grid-cols-4">

      <StatCard
        title="HSK Level"
        value={word.hskLevel}
      />

      <StatCard
        title="Radical"
        value={
          word.radical || "-"
        }
      />

      <StatCard
        title="Difficulty"
        value={
          word.lexicalDifficulty
            ? Number(
                word.lexicalDifficulty
              ).toFixed(2)
            : "-"
        }
      />

      <StatCard
        title="Meanings"
        value={
          word.meanings?.length ||
          0
        }
      />

    </div>
  );
}