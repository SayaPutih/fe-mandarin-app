"use client";

import Link from "next/link";
import { useState } from "react";
import { Trash2, Eye } from "lucide-react";

import { ConfirmationModal } from "./DetailModal";
import { useRemoveAssignment } from "@/hooks/useTeacherAssignmentClass";

interface Props {
  classId: string;
  loading: boolean;
  assignments: any[];
  refresh: () => void;
}

export default function AssignmentTable({
  classId,
  loading,
  assignments,
  refresh,
}: Props) {
  const [selectedAssignment, setSelectedAssignment] =
    useState<any>(null);

  const [showModal, setShowModal] =
    useState(false);

  const {
    loading: removing,
    handleRemoveAssignment,
  } = useRemoveAssignment();

  const handleDelete = async () => {
    if (!selectedAssignment) return;

    const res =
      await handleRemoveAssignment(selectedAssignment.id);

    if (res) {
      refresh();
      setShowModal(false);
      setSelectedAssignment(null);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500">
        Loading assignments...
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        No assignments found.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr className="text-left text-sm font-semibold text-gray-700">

              <th className="px-6 py-4">
                Title
              </th>

              <th className="px-6 py-4">
                Cards
              </th>

              <th className="px-6 py-4">
                Due Date
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {assignments.map((item) => (

              <tr
                key={item.id}
                className="border-t transition hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">
                  {item.title}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    {item.assignmentCards?.length ?? 0} cards
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {item.dueDate
                    ? new Date(item.dueDate).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <Link
                      href={`/teacher/class/${classId}/assignment/${item.id}`}
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
                    >
                      <Eye size={16} />
                      View
                    </Link>

                    <button
                      onClick={() => {
                        setSelectedAssignment(item);
                        setShowModal(true);
                      }}
                      className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </div>

                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {showModal && (
        <ConfirmationModal
          title="Delete Assignment"
          message={`Are you sure you want to delete "${selectedAssignment?.title}"? This action cannot be undone.`}
          loading={removing}
          onConfirm={handleDelete}
          onClose={() => {
            setShowModal(false);
            setSelectedAssignment(null);
          }}
        />
      )}
    </>
  );
}