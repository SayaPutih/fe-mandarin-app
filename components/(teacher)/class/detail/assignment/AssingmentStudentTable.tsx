"use client";

import { useRef } from "react";

interface Props {
  loading: boolean;

  students: any[];

  page: number;

  totalPages: number;

  onPageChange: (
    page: number
  ) => void;
}

export default function AssignmentStudentTable({
  loading,
  students,
  page,
  totalPages,
  onPageChange,
}: Props) {

  const tableRef =
    useRef<HTMLDivElement>(null);

  const handlePageChange = (
    newPage: number
  ) => {

    onPageChange(newPage);

    requestAnimationFrame(() => {

      tableRef.current?.scrollIntoView({

        behavior: "smooth",

        block: "start",

      });

    });

  };

  if (loading) {

    return (

      <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
        Loading students...
      </div>

    );

  }

  return (

    <div
      ref={tableRef}
      className="overflow-hidden rounded-xl border bg-white"
    >

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-3 text-left">
              Student
            </th>

            <th className="px-4 py-3 text-left">
              Email
            </th>

            <th className="px-4 py-3 text-center">
              Status
            </th>

            <th className="px-4 py-3 text-center">
              Progress
            </th>

          </tr>

        </thead>

        <tbody>

          {students.length === 0 && (

            <tr>

              <td
                colSpan={4}
                className="p-10 text-center text-gray-500"
              >
                No students found.
              </td>

            </tr>

          )}

          {students.map((progress: any) => (

            <tr
              key={progress.id}
              className="border-t hover:bg-gray-50"
            >

              <td className="px-4 py-4 font-medium">
                {progress.student.name}
              </td>

              <td className="px-4 py-4">
                {progress.student.email}
              </td>

              <td className="px-4 py-4 text-center">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    progress.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : progress.status === "IN_PROGRESS"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {progress.status.replaceAll("_", " ")}
                </span>

              </td>

              <td className="px-4 py-4 text-center">
                {progress.completionPercentage}%
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="flex items-center justify-between border-t bg-gray-50 px-5 py-4">

        <button
          disabled={page === 1}
          onClick={() =>
            handlePageChange(
              page - 1
            )
          }
          className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={
            page === totalPages
          }
          onClick={() =>
            handlePageChange(
              page + 1
            )
          }
          className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>

  );

}