//EE 2
import type {StudentRetention,} from "@/types/teacher";

interface LearningPerformanceProps {
  retention: StudentRetention | null;
}

export default function LearningPerformance({
  retention,
}: LearningPerformanceProps) {
  const recall =
    retention?._avg
      ?.predictedRecall || 0;

  return (
    <div className="mb-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition-all
        duration-200 hover:-translate-y-1 hover:border-black/50 hover:shadow-lg">
      <h2 className="mb-3 text-lg font-semibold">
        Learning Performance
      </h2>

      <div className="mb-1 flex justify-between text-sm">
        <span>
          Average Retention
        </span>

        <span>
          {(recall * 100).toFixed(1)}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
        <div
          className="h-full bg-black"
          style={{
            width: `${recall * 100}%`,
          }}
        />
      </div>
    </div>
  );
}