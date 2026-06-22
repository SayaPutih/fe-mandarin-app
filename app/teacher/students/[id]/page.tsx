"use client";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

import {
  getStudentById,
  getStudentRetention,
  getStudentMasteredWords,
  getStudentForgottenWords,
  getStudentReviewSchedule,
} from "@/services/teacher/teacher.service";

export default function StudentDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [student, setStudent] = useState(null);

  const [retention, setRetention] = useState<any>(null);
  const [masteredWords, setMasteredWords] =
    useState<any[]>([]);
  const [forgottenWords, setForgottenWords] =
    useState<any[]>([]);
  const [reviewSchedule, setReviewSchedule] =
    useState<any[]>([]);

const fetchData = async () => {
  const [
    studentData,
    retentionData,
    masteredData,
    forgottenData,
    reviewData,
  ] = await Promise.all([
    getStudentById(id),
    getStudentRetention(id),
    getStudentMasteredWords(id),
    getStudentForgottenWords(id),
    getStudentReviewSchedule(id),
  ]);

  setStudent(studentData);
  setRetention(retentionData);
  setMasteredWords(masteredData || []);
  setForgottenWords(forgottenData || []);
  setReviewSchedule(reviewData || []);
};

useEffect(() => {
  if (id) {
    fetchData();
  }
}, [id]);

  if (!student) {
    return <div className="p-6">Loading...</div>;
  }

return (
  <div className="min-h-screen rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 p-4">
    {/* HEADER */}
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
        {student.name?.[0] || "S"}
      </div>

      <div>
        <h1 className="text-2xl font-bold">
          {student.name}
        </h1>

        <p className="text-xs text-zinc-500">
          {student.email}
        </p>
      </div>
    </div>

    {/* OVERVIEW */}
    <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
      <div className="rounded-lg border bg-white p-3 shadow-sm">
        <p className="text-[10px] text-zinc-500">
          Words Learned
        </p>

        <h2 className="mt-1 text-2xl font-bold">
          {student.memoryStates?.length || 0}
        </h2>
      </div>

      <div className="rounded-lg border bg-white p-3 shadow-sm">
        <p className="text-[10px] text-zinc-500">
          Attempts
        </p>

        <h2 className="mt-1 text-2xl font-bold">
          {student.attempts?.length || 0}
        </h2>
      </div>

      <div className="rounded-lg border bg-white p-3 shadow-sm">
        <p className="text-[10px] text-zinc-500">
          Recall
        </p>

        <h2 className="mt-1 text-2xl font-bold">
          {(
            (retention?._avg?.predictedRecall || 0) *
            100
          ).toFixed(1)}
          %
        </h2>
      </div>

      <div className="rounded-lg border bg-white p-3 shadow-sm">
        <p className="text-[10px] text-zinc-500">
          Half Life
        </p>

        <h2 className="mt-1 text-2xl font-bold">
          {(
            retention?._avg?.predictedHalfLife ||
            0
          ).toFixed(1)}
        </h2>
      </div>
    </div>

    {/* RETENTION */}
    <div className="mb-4 rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">
        Learning Performance
      </h2>

      <div className="mb-1 flex justify-between text-sm">
        <span>Average Retention</span>

        <span>
          {(
            (retention?._avg?.predictedRecall ||
              0) * 100
          ).toFixed(1)}
          %
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
        <div
          className="h-full bg-black"
          style={{
            width: `${(
              retention?._avg
                ?.predictedRecall || 0
            ) * 100}%`,
          }}
        />
      </div>
    </div>

    {/* WORD STATS */}
    <div className="mb-4 grid grid-cols-2 gap-3">
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold">
          Mastered Vocabulary
        </h2>

        <div className="mt-1 text-3xl font-bold">
          {masteredWords.length}
        </div>
      </div>

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold">
          At Risk Vocabulary
        </h2>

        <div className="mt-1 text-3xl font-bold">
          {forgottenWords.length}
        </div>
      </div>
    </div>

    {/* MASTERED + FORGOTTEN */}
    <div className="mb-4 grid gap-3 lg:grid-cols-2">
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">
          Top Mastered
        </h2>

        <div className="space-y-2">
          {masteredWords
            .slice(0, 5)
            .map((item: any) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded border px-3 py-2"
              >
                <div>
                  <div className="text-sm font-semibold">
                    {item.word?.simplified}
                  </div>

                  <div className="text-xs text-zinc-500">
                    {item.word?.pinyin}
                  </div>
                </div>

                <span className="text-xs font-medium text-green-600">
                  {(
                    (item.predictedRecall ||
                      0) * 100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            ))}
        </div>
      </div>

      <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">
            At Risk
          </h2>

          {forgottenWords.length > 0 ? (
            <div className="space-y-2">
              {forgottenWords
                .slice(0, 5)
                .map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded border px-3 py-2"
                  >
                    <div>
                      <div className="text-sm font-semibold">
                        {item.word?.simplified}
                      </div>

                      <div className="text-xs text-zinc-500">
                        {item.word?.pinyin}
                      </div>
                    </div>

                    <span className="text-xs font-medium text-red-600">
                      {(
                        (item.predictedRecall || 0) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded border border-dashed text-sm text-zinc-500">
              No at-risk vocabulary
            </div>
          )}
        </div>
    </div>
    {/* REVIEW TABLE */}
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">
        Review Schedule
      </h2>

      <table className="w-full table-fixed text-sm">
        <thead>
          <tr className="border-b">
            <th className="w-1/3 pb-2 text-left">
              Hanzi
            </th>

            <th className="w-1/3 pb-2 text-left">
              Review
            </th>

            <th className="w-1/3 pb-2 text-left">
              Recall
            </th>
          </tr>
        </thead>

        <tbody>
          {reviewSchedule
            .slice(0, 5)
            .map((item: any) => (
              <tr
                key={item.id}
                className="border-b"
              >
                <td className="py-2 font-semibold">
                  {item.word?.simplified}
                </td>

                <td className="py-2 text-xs">
                  {item.nextReviewAt
                    ? new Date(
                        item.nextReviewAt
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="py-2">
                  {(
                    (item.predictedRecall ||
                      0) * 100
                  ).toFixed(1)}
                  %
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
);
}