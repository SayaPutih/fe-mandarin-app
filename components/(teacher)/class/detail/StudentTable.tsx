"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import DeleteStudentModal from "./DeleteStudentModal";

import TeacherButton from "@/components/ui/TeacherButton";
import {
  TableContainer,
  TableHeader,
  TableCell,
} from "@/components/ui/Table";

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
      <div className="rounded-xl border border-zinc-200 bg-white py-12 text-center text-zinc-500">
        Loading students...
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
                Student Name
              </TableHeader>

              <TableHeader className="text-center">
                Email
              </TableHeader>

              <TableHeader className="text-center">
                Joined
              </TableHeader>

              <TableHeader className="text-center">
                Actions
              </TableHeader>

            </tr>

          </thead>

          <tbody>

            {students.length === 0 && (
              <tr>

                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-zinc-500"
                >
                  No students found.
                </TableCell>

              </tr>
            )}

            {students.map((item) => (

              <tr
                key={item.id}
                className="border-t border-black/5 transition-colors hover:bg-zinc-50"
              >

                <TableCell className="font-medium text-center">
                  {item.student.name}
                </TableCell>

                <TableCell className="text-zinc-600 text-center">
                  {item.student.email}
                </TableCell>

                <TableCell className="text-zinc-500 text-center">
                  {new Date(
                    item.joinedAt
                  ).toLocaleDateString()}
                </TableCell>

                <TableCell>

                  <div className="flex justify-center">

                    <TeacherButton
                      label="Remove"
                      icon={<Trash2 size={16} />}
                      variant="red"
                      onClick={() =>
                        setSelectedStudent(item)
                      }
                    />

                  </div>

                </TableCell>

              </tr>

            ))}

          </tbody>

        </TableContainer>

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