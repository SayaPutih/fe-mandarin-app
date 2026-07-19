//EE 4
import StatCard from "@/components/ui/common/StatCard";

interface VocabularyStatsProps {
  masteredCount: number;
  forgottenCount: number;
}

export default function VocabularyStats({
  masteredCount,
  forgottenCount,
}: VocabularyStatsProps) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-3">
      <StatCard
        title="Mastered Vocabulary"
        value={masteredCount}
      />

      <StatCard
        title="At Risk Vocabulary"
        value={forgottenCount}
      />
    </div>
  );
}