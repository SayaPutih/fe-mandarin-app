"use client";

import { Sparkles, Clock3, Brain } from "lucide-react";

import MainCard from "../Card/Card";

interface Props {
  dueReview: any[];
  lowHalfLife: any[];
  loading: boolean;
}

export default function RecomendedSection({
  dueReview,
  lowHalfLife,
  loading,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      {/* Header */}

      <div className="mb-6 flex items-center gap-2">
        <Sparkles
          size={18}
          className="text-zinc-700"
        />

        <h2 className="text-lg font-semibold">
          Recommended Words
        </h2>
      </div>

      {loading && (
        <div className="py-10 text-center text-sm text-zinc-500">
          Loading recommendations...
        </div>
      )}

      {!loading &&
        dueReview.length === 0 &&
        lowHalfLife.length === 0 && (
          <div className="py-10 text-center text-sm text-zinc-500">
            No recommendation available.
          </div>
      )}

      {/* Due Review */}

      {dueReview.length > 0 && (
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Clock3
              size={16}
              className="text-zinc-600"
            />

            <h3 className="font-medium">
              Due Review
            </h3>

            <span
              className="
              rounded-full
              bg-zinc-100
              px-2
              py-1
              text-[10px]
              text-zinc-600
            "
            >
              {dueReview.length} Words
            </span>
          </div>

          <div
            className="
            grid
            grid-cols-2
            gap-3
            md:grid-cols-5
          "
          >
            {dueReview.map((item) => (
              <MainCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </div>
      )}

      {/* Low Half Life */}

      {lowHalfLife.length > 0 && (
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Brain
              size={16}
              className="text-zinc-600"
            />

            <h3 className="font-medium">
              Low Memory Strength
            </h3>

            <span
              className="
              rounded-full
              bg-zinc-100
              px-2
              py-1
              text-[10px]
              text-zinc-600
            "
            >
              {lowHalfLife.length} Words
            </span>
          </div>

          <div
            className="
            grid
            grid-cols-2
            gap-3
            md:grid-cols-5
          "
          >
            {lowHalfLife.map((item) => (
              <MainCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}