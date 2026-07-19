//EE
import StatCard from "@/components/ui/common/StatCard";
import { useVocabularyStats } from "@/hooks/teacher/useTeacherVocabularyStats";

export default function VocabularyStats() {

  const {
      loading,
      countHskTotal,
      countMandarin,
      countMandarinMeaning
    } = useVocabularyStats();

  if(loading){
    return (
      <div className="mb-8 grid gap-5 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <StatCard
            key={index}
            title="Loading..."
            value={0}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="mb-8 grid gap-5 md:grid-cols-3">
      <StatCard
        title="Total Vocabulary"
        value={countHskTotal}
      />

      <StatCard
        title="HSK Levels"
        value={countMandarin}
      />

      <StatCard
        title="Total Meanings"
        value={countMandarinMeaning}
      />
    </div>
  );
}