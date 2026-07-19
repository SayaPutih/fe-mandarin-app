"use client";

import { useRef } from "react";

import Pagination from "@/components/ui/Pagination";
import {
  TableContainer,
  TableHeader,
  TableCell,
} from "@/components/ui/Table";

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

      <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center text-zinc-500">
        Loading students...
      </div>

    );

  }

  return (

    <div
      ref={tableRef}
      className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm"
    >

      <TableContainer>

        <thead className="border-b border-zinc-200 bg-zinc-100">

          <tr>

            <TableHeader className="text-center">
              Student
            </TableHeader>

            <TableHeader className="text-center">
              Email
            </TableHeader>

            <TableHeader className="text-center">
              Status
            </TableHeader>

            <TableHeader className="text-center">
              Progress
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

          {students.map((progress: any) => (

            <tr
              key={progress.id}
              className="border-t border-black/5 transition-colors hover:bg-zinc-50"
            >

              <TableCell className="font-medium text-center">
                {progress.student.name}
              </TableCell>

              <TableCell className="text-zinc-600 text-center">
                {progress.student.email}
              </TableCell>

              <TableCell className="text-center">

                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-medium

                    ${
                      progress.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : progress.status === "IN_PROGRESS"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-zinc-100 text-zinc-700"
                    }
                  `}
                >
                  {progress.status.replaceAll("_", " ")}
                </span>

              </TableCell>

              <TableCell className="text-center font-medium">
                {progress.completionPercentage}%
              </TableCell>

            </tr>

          ))}

        </tbody>

      </TableContainer>

      <div className="border-t border-black/5 bg-zinc-50 px-5 py-4">

        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={(value) => {

            if (typeof value === "function") {
              handlePageChange(value(page));
            } else {
              handlePageChange(value);
            }

          }}
        />

      </div>

    </div>

  );

}