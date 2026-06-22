"use client";

import { useEffect, useState } from "react";

import {
  GetAnalyticsOverview,
  GetAnalyticsDifficulty,
  GetAnalyticsRecent,
  GetAnalyticsWordProgress,
} from "@/services/analytic/analytic.service";

export default function AnalyticsPage() {

  const [overview,setOverview] = useState<any>();
  const [difficulty,setDifficulty] = useState<any>();
  const [recent,setRecent] = useState<any[]>([]);
  const [words,setWords] = useState<any[]>([]);

  useEffect(() => {

    const load = async () => {

      try {

        const [
          overviewRes,
          difficultyRes,
          recentRes,
          wordsRes,
        ] = await Promise.all([
          GetAnalyticsOverview(),
          GetAnalyticsDifficulty(),
          GetAnalyticsRecent(),
          GetAnalyticsWordProgress(),
        ]);

        setOverview(overviewRes.data);
        setDifficulty(difficultyRes.data);
        setRecent(recentRes.data);
        setWords(wordsRes.data);

      } catch(err){
        console.log(err);
      }
    };

    load();

  }, []);

  return (
    <div className="flex flex-col flex-1 bg-white rounded-3xl p-6 h-full overflow-hidden">
        Analytics Page
    </div>
  );
} 

/* <div className="flex flex-col flex-1 bg-white rounded-3xl p-6 h-full overflow-hidden">

    

    <div className="flex items-start flex-col sm:grid sm:grid-cols-12 gap-6 mt-5 flex-1">
      

      {/* LEFT SIDE 
      <div className="col-span-4 flex flex-col gap-4 h-full">

        <div>
          <h1 className="text-3xl font-bold">
            Learning Analytics
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Analyze learning progress and memory model performance.
          </p>
        </div>

        {/* OVERVIEW *
        <div className="grid grid-cols-2 gap-3">

          <div className="border rounded-2xl p-4">
            <p className="text-xs text-gray-500">
              Learned Words
            </p>

            <h1 className="text-3xl font-bold">
              {overview?.learnedWords ?? 0}
            </h1>
          </div>

          <div className="border rounded-2xl p-4">
            <p className="text-xs text-gray-500">
              Total Reviews
            </p>

            <h1 className="text-3xl font-bold">
              {overview?.totalReviews ?? 0}
            </h1>
          </div>

          <div className="border rounded-2xl p-4">
            <p className="text-xs text-gray-500">
              Recall
            </p>

            <h1 className="text-3xl font-bold">
              {overview?.averageRecall?.toFixed(1) ?? 0}%
            </h1>
          </div>

          <div className="border rounded-2xl p-4">
            <p className="text-xs text-gray-500">
              Half Life
            </p>

            <h1 className="text-3xl font-bold">
              {overview?.averageHalfLife?.toFixed(1) ?? 0}
            </h1>
          </div>

        </div>

        {/* DIFFICULTY 
        <div className="border rounded-2xl p-5">

          <h2 className="font-bold text-lg mb-4">
            Difficulty Distribution
          </h2>

          <div className="grid grid-cols-3 text-center">

            <div>
              <p className="text-sm text-gray-500">
                Easy
              </p>

              <h1 className="text-3xl font-bold">
                {difficulty?.easy ?? 0}
              </h1>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Medium
              </p>

              <h1 className="text-3xl font-bold">
                {difficulty?.medium ?? 0}
              </h1>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Hard
              </p>

              <h1 className="text-3xl font-bold">
                {difficulty?.hard ?? 0}
              </h1>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE 
      <div className="col-span-8 border rounded-2xl p-5 flex flex-col w-full">

        <h2 className="font-bold text-xl mb-4">
          Adaptive Learning Progress
        </h2>

        <div className="flex-1 ">

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Word
                </th>

                <th className="text-left py-3">
                  Difficulty
                </th>

                <th className="text-left py-3">
                  Recall
                </th>

                <th className="text-left py-3">
                  Half-Life
                </th>

                <th className="text-left py-3">
                  Reviews
                </th>

              </tr>

            </thead>

            <tbody>

              {words.slice(0, 7).map((w) => (

                <tr
                  key={w.wordId}
                  className="border-b"
                >

                  <td className="py-4 font-medium">
                    {w.hanzi}
                  </td>

                  <td>
                    {w.difficulty?.toFixed(2)}
                  </td>

                  <td>
                    {(w.recall * 100).toFixed(1)}%
                  </td>

                  <td>
                    {w.halfLife?.toFixed(1)}
                  </td>

                  <td>
                    {w.reviewCount}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </div> */
