"use client";

import Link from "next/link";
import { Assignment } from "@/types/student";

interface Props{
    classId:string;
    assignments:Assignment[];
}

export default function AssignmentTable({
  classId,
  assignments,
}: Props) {
  return (
    <>
      {/* Mobile */}

      <div className="space-y-4 md:hidden">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <h2 className="text-lg font-semibold">
              {assignment.title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {assignment.description ?? "-"}
            </p>

            <div className="mt-5 space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Cards
                </span>

                <span className="font-medium">
                  {assignment._count.assignmentCards}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Due Date
                </span>

                <span>
                  {assignment.dueDate
                    ? new Date(
                        assignment.dueDate
                      ).toLocaleDateString()
                    : "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Progress
                </span>

                <span>
                  {assignment.progress
                    ? `${assignment.progress.completionPercentage}%`
                    : "0%"}
                </span>
              </div>

            </div>

            <Link
              href={`/student/class/${classId}/assignment/${assignment.id}`}
              className="
                mt-5
                flex
                justify-center
                rounded-xl
                bg-gray-900
                px-4
                py-3
                text-sm
                text-white
              "
            >
              Open Assignment
            </Link>
          </div>
        ))}
      </div>

      {/* Desktop */}

      <div className="hidden overflow-hidden rounded-3xl border border-gray-200 bg-white md:block">
        <table className="min-w-full">

          <thead className="border-b bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Title
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Cards
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Due Date
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Progress
              </th>

              <th className="px-6 py-4" />

            </tr>

          </thead>

          <tbody>

            {assignments.map((assignment) => (

              <tr
                key={assignment.id}
                className="border-b last:border-0"
              >

                <td className="px-6 py-5">

                  <p className="font-semibold">
                    {assignment.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    {assignment.description ?? "-"}
                  </p>

                </td>

                <td className="px-6 py-5">
                  {assignment._count.assignmentCards}
                </td>

                <td className="px-6 py-5">
                  {assignment.dueDate
                    ? new Date(
                        assignment.dueDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-5">
                  {assignment.progress
                    ? `${assignment.progress.completionPercentage}%`
                    : "0%"}
                </td>

                <td className="px-6 py-5 text-right">

                  <Link
                    href={`/student/class/${classId}/assignment/${assignment.id}`}
                    className="
                      rounded-lg
                      bg-gray-900
                      px-4
                      py-2
                      text-sm
                      text-white
                    "
                  >
                    Open
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>
    </>
  );
}