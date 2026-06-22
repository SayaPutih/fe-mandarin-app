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
    <div className="space-y-8 p-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Teacher Dashboard
        </h1>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg border p-4">
          <p>Total Students</p>
          <h2 className="text-3xl font-bold">
            {dashboard.totalStudents}
          </h2>
        </div>

        <div className="rounded-lg border p-4">
          <p>Total Vocabulary</p>
          <h2 className="text-3xl font-bold">
            {dashboard.totalVocabulary}
          </h2>
        </div>

        <div className="rounded-lg border p-4">
          <p>Total Reviews</p>
          <h2 className="text-3xl font-bold">
            {dashboard.totalReviewsToday}
          </h2>
        </div>

        <div className="rounded-lg border p-4">
          <p>Average Retention</p>
          <h2 className="text-3xl font-bold">
            {(
              (dashboard.averageRetention || 0) * 100
            ).toFixed(1)}
            %
          </h2>
        </div>
      </div>

      {/* RETENTION */}
      <div className="rounded-lg border p-4">
        <h2 className="mb-4 text-xl font-bold">
          Retention Analytics
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <p>Average Recall</p>
            <h3 className="text-2xl font-bold">
              {(
                (retention?._avg?.predictedRecall || 0) *
                100
              ).toFixed(1)}
              %
            </h3>
          </div>

          <div>
            <p>Lowest Recall</p>
            <h3 className="text-2xl font-bold">
              {(
                (retention?._min?.predictedRecall || 0) *
                100
              ).toFixed(1)}
              %
            </h3>
          </div>

          <div>
            <p>Highest Recall</p>
            <h3 className="text-2xl font-bold">
              {(
                (retention?._max?.predictedRecall || 0) *
                100
              ).toFixed(1)}
              %
            </h3>
          </div>
        </div>
      </div>

      {/* HSK DISTRIBUTION */}
      <div className="rounded-lg border p-4">
        <h2 className="mb-4 text-xl font-bold">
          HSK Distribution
        </h2>

        <div className="space-y-2">
          {hskDistribution?.map((item: any) => (
            <div
              key={item.hskLevel}
              className="flex justify-between"
            >
              <span>
                HSK {item.hskLevel}
              </span>

              <span>
                {item._count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* HARDEST WORDS */}
      <div className="rounded-lg border p-4">
        <h2 className="mb-4 text-xl font-bold">
          Hardest Vocabulary
        </h2>

        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">
                Hanzi
              </th>

              <th className="text-left">
                Pinyin
              </th>

              <th className="text-left">
                Correct Reviews
              </th>

              <th className="text-left">
                Total Reviews
              </th>
            </tr>
          </thead>

          <tbody>
            {hardestWords?.map((word: any) => (
              <tr key={word.id}>
                <td>
                  {word.word?.simplified}
                </td>

                <td>
                  {word.word?.pinyin}
                </td>

                <td>
                  {word.correctReviews}
                </td>

                <td>
                  {word.totalReviews}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}