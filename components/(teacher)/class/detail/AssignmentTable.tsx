"use client";

import Link from "next/link";
import { useState } from "react";
import { Trash2, Eye } from "lucide-react";

import {
  TableContainer,
  TableHeader,
  TableCell,
} from "@/components/ui/Table";
import TeacherButton from "@/components/ui/TeacherButton";

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
      <div className="rounded-xl border border-zinc-200 bg-white py-12 text-center text-zinc-500">
        Loading assignments...
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">

        <TableContainer>

          <thead className="border-b border-zinc-200 bg-zinc-100">
            <tr>

              <TableHeader className="text-center">
                Title
              </TableHeader>

              <TableHeader className="text-center">
                Cards
              </TableHeader>

              <TableHeader className="text-center">
                Due Date
              </TableHeader>

              <TableHeader className="text-center">
                Actions
              </TableHeader>

            </tr>
          </thead>

          <tbody>

            {assignments.length === 0 && (
              <tr>
                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-zinc-500"
                >
                  No assignments found.
                </TableCell>
              </tr>
            )}

            {assignments.map((item) => (
              <tr
                key={item.id}
                className="border-t border-black/5 transition-colors hover:bg-zinc-50"
              >

                <TableCell className="font-medium text-center">
                  {item.title}
                </TableCell>

                <TableCell>
                  <span className=" flex items-center justify-center text-center">
                    <p className="bg-blue-500 rounded-full px-3 py-1 text-xs text-white ">{item.assignmentCards?.length ?? 0} Cards</p>
                  </span>
                </TableCell>

                <TableCell className="text-zinc-500 text-center">
                  {item.dueDate
                    ? new Date(item.dueDate).toLocaleDateString()
                    : "-"}
                </TableCell>

                <TableCell>

                  <div className="flex justify-center gap-2 text-center">

                    <Link
                      href={`/teacher/class/${classId}/assignment/${item.id}`}
                    >
                      <TeacherButton
                        label="View"
                        icon={<Eye size={16} />}
                        variant="blue"
                      />
                    </Link>

                    <TeacherButton
                      label="Delete"
                      icon={<Trash2 size={16} />}
                      variant="red"
                      onClick={() => {
                        setSelectedAssignment(item);
                        setShowModal(true);
                      }}
                    />

                  </div>

                </TableCell>

              </tr>
            ))}

          </tbody>

        </TableContainer>

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