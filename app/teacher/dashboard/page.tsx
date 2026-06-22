"use client";

import { useEffect, useState } from "react";

import {
  getTeacherDashboard,
  getRetentionAnalytics,
  getHardestVocabulary,
  getHSKDistribution,
} from "@/services/teacher/teacher.service";

export default function TeacherDashboardPage() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [retention, setRetention] = useState<any>(null);
  const [hardestWords, setHardestWords] = useState<any>([]);
  const [hskDistribution, setHskDistribution] = useState<any>([]);

  const fetchData = async () => {
    try {
      const [
        dashboardData,
        retentionData,
        hardestVocabularyData,
        hskDistributionData,
      ] = await Promise.all([
        getTeacherDashboard(),
        getRetentionAnalytics(),
        getHardestVocabulary(),
        getHSKDistribution(),
      ]);

      setDashboard(dashboardData);
      setRetention(retentionData);
      setHardestWords(hardestVocabularyData);
      setHskDistribution(hskDistributionData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!dashboard) {
    return <div>Loading...</div>;
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 p-5 rounded-xl">
    {/* HEADER */}
    <div className="mb-5">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        Teacher Dashboard
      </h1>

      <p className="mt-1 text-sm text-zinc-500">
        Monitor student performance, retention, and HSK vocabulary statistics.
      </p>
    </div>

    {/* STATS */}
    <div className="mb-5 grid grid-cols-2 gap-4 xl:grid-cols-4">
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <p className="text-xs text-zinc-500">
          Total Students
        </p>

        <h2 className="mt-1 text-3xl font-bold">
          {dashboard.totalStudents}
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <p className="text-xs text-zinc-500">
          Total Vocabulary
        </p>

        <h2 className="mt-1 text-3xl font-bold">
          {dashboard.totalVocabulary.toLocaleString()}
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <p className="text-xs text-zinc-500">
          Total Reviews
        </p>

        <h2 className="mt-1 text-3xl font-bold">
          {dashboard.totalReviewsToday}
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <p className="text-xs text-zinc-500">
          Average Retention
        </p>

        <h2 className="mt-1 text-3xl font-bold">
          {(
            (dashboard.averageRetention || 0) *
            100
          ).toFixed(1)}
          %
        </h2>
      </div>
    </div>

    {/* RETENTION */}
    <div className="mb-5 rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Retention Analytics
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-zinc-500">
            Average Recall
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            {(
              (retention?._avg?.predictedRecall || 0) *
              100
            ).toFixed(1)}
            %
          </h3>
        </div>

        <div>
          <p className="text-xs text-zinc-500">
            Lowest Recall
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            {(
              (retention?._min?.predictedRecall || 0) *
              100
            ).toFixed(1)}
            %
          </h3>
        </div>

        <div>
          <p className="text-xs text-zinc-500">
            Highest Recall
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            {(
              (retention?._max?.predictedRecall || 0) *
              100
            ).toFixed(1)}
            %
          </h3>
        </div>
      </div>
    </div>

    {/* LOWER GRID */}
    <div className="grid gap-5 lg:grid-cols-2">
      {/* HSK DISTRIBUTION */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          HSK Distribution
        </h2>

        <div className="space-y-3">
          {hskDistribution?.map((item: any) => {
            const max =
              Math.max(
                ...hskDistribution.map(
                  (x: any) => x._count
                )
              ) || 1;

            const width =
              (item._count / max) * 100;

            return (
              <div key={item.hskLevel}>
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

      {/* HARDEST WORDS */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Hardest Vocabulary
        </h2>

        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b">
              <th className="w-[20%] pb-2 text-left text-xs font-medium text-zinc-500">
                Hanzi
              </th>

              <th className="w-[40%] pb-2 text-left text-xs font-medium text-zinc-500">
                Pinyin
              </th>

              <th className="w-[20%] pb-2 text-left text-xs font-medium text-zinc-500">
                Correct
              </th>

              <th className="w-[20%] pb-2 text-left text-xs font-medium text-zinc-500">
                Reviews
              </th>
            </tr>
          </thead>

          <tbody>
            {hardestWords
              ?.slice(0, 10)
              .map((word: any) => (
                <tr
                  key={word.id}
                  className="border-b last:border-none"
                >
                  <td className="py-2 font-semibold">
                    {word.word?.simplified}
                  </td>

                  <td className="truncate py-2">
                    {word.word?.pinyin}
                  </td>

                  <td className="py-2">
                    {word.correctReviews}
                  </td>

                  <td className="py-2">
                    {word.totalReviews}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}