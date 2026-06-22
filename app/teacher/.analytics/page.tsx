"use client";

import { useEffect, useState } from "react";

import {
  getRetentionAnalytics,
  getHardestVocabulary,
  getHSKDistribution,
} from "@/services/teacher/teacher.service";

export default function AnalyticsPage() {
  const [retention, setRetention] = useState<any>(null);
  const [hardestWords, setHardestWords] = useState<any>([]);
  const [hskDistribution, setHskDistribution] = useState<any>([]);

  const fetchData = async () => {
    try {
      const [
        retentionData,
        hardestVocabularyData,
        hskDistributionData,
      ] = await Promise.all([
        getRetentionAnalytics(),
        getHardestVocabulary(),
        getHSKDistribution(),
      ]);

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

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Learning Analytics
        </h1>

        <p className="text-muted-foreground">
          Student retention and vocabulary analytics
        </p>
      </div>

      {/* RETENTION ANALYTICS */}
      <div className="rounded-xl border p-5">
        <h2 className="mb-4 text-xl font-semibold">
          Retention Analytics
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">
              Average Recall
            </p>

            <h3 className="text-3xl font-bold">
              {(
                (retention?._avg?.predictedRecall || 0) *
                100
              ).toFixed(1)}
              %
            </h3>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">
              Lowest Recall
            </p>

            <h3 className="text-3xl font-bold">
              {(
                (retention?._min?.predictedRecall || 0) *
                100
              ).toFixed(1)}
              %
            </h3>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">
              Highest Recall
            </p>

            <h3 className="text-3xl font-bold">
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
      <div className="rounded-xl border p-5">
        <h2 className="mb-4 text-xl font-semibold">
          HSK Vocabulary Distribution
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">
                HSK Level
              </th>

              <th className="py-2 text-left">
                Total Vocabulary
              </th>
            </tr>
          </thead>

          <tbody>
            {hskDistribution?.map((item: any) => (
              <tr
                key={item.hskLevel}
                className="border-b"
              >
                <td className="py-3">
                  HSK {item.hskLevel}
                </td>

                <td className="py-3">
                  {item._count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* HARDEST VOCABULARY */}
      <div className="rounded-xl border p-5">
        <h2 className="mb-4 text-xl font-semibold">
          Hardest Vocabulary
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">
                Hanzi
              </th>

              <th className="py-2 text-left">
                Pinyin
              </th>

              <th className="py-2 text-left">
                Correct Reviews
              </th>

              <th className="py-2 text-left">
                Total Reviews
              </th>
            </tr>
          </thead>

          <tbody>
            {hardestWords?.map((item: any) => (
              <tr
                key={item.id}
                className="border-b"
              >
                <td className="py-3">
                  {item.word?.simplified}
                </td>

                <td className="py-3">
                  {item.word?.pinyin}
                </td>

                <td className="py-3">
                  {item.correctReviews}
                </td>

                <td className="py-3">
                  {item.totalReviews}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}