"use client";

import { useState } from "react";

import DeleteStudentModal from "./DeleteStudentModal";

interface Props {
  loading: boolean;
  students: any[];

  classId: string;

  refresh: () => void;
}

export default function StudentTable({
  loading,
  students,
  classId,
  refresh,
}: Props) {
  const [selectedStudent, setSelectedStudent] =
    useState<any>(null);

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500">
        Loading students...
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        No students found.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-700">
              <th className="px-6 py-4">
                Student Name
              </th>

              <th className="px-6 py-4">
                Email
              </th>

              <th className="px-6 py-4">
                Joined
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map((item: any) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">
                  {item.student.name}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {item.student.email}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {new Date(
                    item.joinedAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2"> 
                    <button
                      onClick={() =>
                        setSelectedStudent(item)
                      }
                      className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteStudentModal
        open={selectedStudent !== null}
        onClose={() =>
          setSelectedStudent(null)
        }
        classId={classId}
        studentId={
          selectedStudent?.student.id ?? ""
        }
        studentName={
          selectedStudent?.student.name ?? ""
        }
        refresh={refresh}
      />
    </>
  );
}