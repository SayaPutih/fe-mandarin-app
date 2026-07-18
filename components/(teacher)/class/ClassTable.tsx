"use client";

import { TeacherClass } from "@/types/class";
import Link from "next/link";

interface ClassTableProps {
  classes: TeacherClass[];
}

export default function ClassTable({
  classes,
}: ClassTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm text-gray-700">
            <th className="px-6 py-4">Class Name</th>
            <th className="px-6 py-4">Description</th>
            <th className="px-6 py-4">Enrolled</th>
            <th className="px-6 py-4">Created</th>
            <th className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {classes.map((item) => (
            <tr
              key={item.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-6 py-4 font-medium">
                {item.name}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {item.description}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {item._count.enrollments}
              </td>

              <td className="px-6 py-4 text-gray-500">
                {new Date(
                  item.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button
                    className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                  >
                    <Link
                        href={`/teacher/class/${item.id}`}
                        className=""
                    >
                        View
                    </Link>
                  </button>

                  <button
                    className="rounded-lg bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}