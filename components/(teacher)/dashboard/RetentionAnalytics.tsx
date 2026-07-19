import type { RetentionAnalytics as RetentionAnalyticsType } from "@/types/teacher";

interface RetentionAnalyticsProps {
  retention: RetentionAnalyticsType | null;
}

export default function RetentionAnalytics({
  retention,
}: RetentionAnalyticsProps) {
  return (
    <div className="mb-5 rounded-xl border bg-white p-5 shadow-sm border-zinc-200 transition-all
        duration-200
        hover:-translate-y-1
        hover:border-black/50
        hover:shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">
        Retention Analytics
      </h2>

      <div className="grid grid-cols-3 gap-4 flex items-center justify-center">
        <div className="flex items-center justify-between flex-col">
          <p className="text-xs text-zinc-500">
            Average P(R)
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            {(
              (retention?._avg?.predictedRecall ??
                0) * 100
            ).toFixed(1)}
            %
          </h3>
        </div>

        <div className="flex items-center justify-between flex-col">
          <p className="text-xs text-zinc-500">
            Lowest P(R)
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            {(
              (retention?._min?.predictedRecall ??
                0) * 100
            ).toFixed(1)}
            %
          </h3>
        </div>

        <div className="flex items-center justify-between flex-col">
          <p className="text-xs text-zinc-500">
            Highest P(R)
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            {(
              (retention?._max?.predictedRecall ??
                0) * 100
            ).toFixed(1)}
            %
          </h3>
        </div>
      </div>
    </div>
  );
}