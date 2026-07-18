import type {
  HSKDistribution as HSKDistributionType,
} from "@/types/teacher";

interface HSKDistributionProps {
  data: HSKDistributionType[];
}

export default function HSKDistribution({
  data,
}: HSKDistributionProps) {
  const max =
    Math.max(
      ...data.map(
        (item) => item._count
      )
    ) || 1;

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        HSK Distribution
      </h2>

      <div className="space-y-3">
        {data.map((item) => {
          const width =
            (item._count / max) * 100;

          return (
            <div
              key={item.hskLevel}
            >
              <div className="mb-1 flex justify-between text-xs">
                <span>
                  HSK {item.hskLevel}
                </span>

                <span>
                  {item._count}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
                <div
                  className="h-full rounded-full bg-black"
                  style={{
                    width: `${width}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}