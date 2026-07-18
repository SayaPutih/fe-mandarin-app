"use client";

import { useEffect, useRef, useState } from "react";
import {
  Brain,
  Clock3,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { getRecom } from "@/services/recom.service";
import { MainCardWithHalf } from "../Card/Card";

export default function RecomendedSection() {

  const router = useRouter();

  const [dueReview, setDueReview] =
    useState<any[]>([]);

  const [lowHalfLife, setLowHalfLife] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const dueRef =
    useRef<HTMLDivElement>(null);

  const halfRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecom();

      if (data?.data) {
        setDueReview(
          data.data.dueReview || []
        );

        setLowHalfLife(
          data.data.lowHalfLife || []
        );
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const scrollLeft = (
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    ref.current?.scrollBy({
      left: -700,
      behavior: "smooth",
    });
  };

  const scrollRight = (
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    ref.current?.scrollBy({
      left: 700,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="
        rounded-2xl
        bg-white
        p-4
      "
    >
      {/* HEADER */}

      <div className="mb-6">
        <div className="flex items-center gap-2 justify-between flex-1">
          <div className="flex items-center gap-2 justify-center">
            <Sparkles
            size={18}
            className="text-zinc-700"
          />

          <h2 className="text-2xl font-bold">
            Recommended Words
          </h2>
          </div>

          <button
                onClick={() => router.push("/home")}
                className="
                rounded-lg
                border
                border-zinc-300
                bg-white
                px-4
                py-2
                text-sm
                font-medium
                transition
                hover:bg-zinc-100
                "
            >
                ← Back
            </button>
        </div>

        <p className="mt-1 text-sm text-zinc-500">
          Vocabulary that may need your
          attention.
        </p>

        <div className="mt-4 h-[1px] w-full bg-zinc-200" />
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

      {/* UPCOMING REVIEW */}

      {!loading && (
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <Clock3
              size={16}
              className="text-blue-600"
            />

            <h3 className="font-semibold">
              Upcoming Reviews
            </h3>

            <span
              className="
                rounded-full
                bg-blue-50
                px-2
                py-1
                text-[10px]
                text-blue-600
              "
            >
              {dueReview.length}
            </span>
          </div>

          {dueReview.length === 0 ? (
            <div
              className="
                rounded-xl
                border
                border-dashed
                p-6
                text-center
                text-sm
                text-zinc-500
              "
            >
              No upcoming reviews 🎉
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() =>
                  scrollLeft(dueRef)
                }
                className="
                  absolute
                  left-0
                  top-1/2
                  z-10
                  -translate-y-1/2
                  rounded-full
                  border
                  bg-white
                  p-2
                  shadow-md
                  hover:bg-zinc-100
                "
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() =>
                  scrollRight(dueRef)
                }
                className="
                  absolute
                  right-0
                  top-1/2
                  z-10
                  -translate-y-1/2
                  rounded-full
                  border
                  bg-white
                  p-2
                  shadow-md
                  hover:bg-zinc-100
                "
              >
                <ChevronRight size={18} />
              </button>

              <div
                ref={dueRef}
                className="
                  flex
                  gap-4
                  overflow-x-auto
                  hide-scrollbar
                  px-4
                  py-2
                "
              >
                {dueReview.map((item) => (
                  <div
                    key={item.id}
                    className="
  w-[220px]
  sm:w-[250px]
  md:w-[250px]
  shrink-0
"
                  >
                    <MainCardWithHalf
                      item={item}
                      mode="due"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* LOW MEMORY */}

      {!loading && (
        <div className="border-t border-zinc-200 pt-8">
          <div className="mb-4 flex items-center gap-2">
            <Brain
              size={16}
              className="text-amber-600"
            />

            <h3 className="font-semibold">
              Low Memory Strength
            </h3>

            <span
              className="
                rounded-full
                bg-amber-50
                px-2
                py-1
                text-[10px]
                text-amber-600
              "
            >
              {lowHalfLife.length}
            </span>
          </div>

          {lowHalfLife.length === 0 ? (
            <div
              className="
                rounded-xl
                border
                border-dashed
                p-6
                text-center
                text-sm
                text-zinc-500
              "
            >
              No weak memory words found.
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() =>
                  scrollLeft(halfRef)
                }
                className="
                  absolute
                  left-0
                  top-1/2
                  z-10
                  -translate-y-1/2
                  rounded-full
                  border
                  bg-white
                  p-2
                  shadow-md
                  hover:bg-zinc-100
                "
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() =>
                  scrollRight(halfRef)
                }
                className="
                  absolute
                  right-0
                  top-1/2
                  z-10
                  -translate-y-1/2
                  rounded-full
                  border
                  bg-white
                  p-2
                  shadow-md
                  hover:bg-zinc-100
                "
              >
                <ChevronRight size={18} />
              </button>

              <div
                ref={halfRef}
                className="
                  flex
                  gap-4
                  overflow-x-auto
                  hide-scrollbar
                  px-4
                  py-2
                "
              >
                {lowHalfLife.map((item) => (
                  <div
                    key={item.id}
                    className="
  w-[220px]
  sm:w-[250px]
  md:w-[250px]
  shrink-0
"
                  >
                    <MainCardWithHalf
                      item={item}
                      mode="half"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}