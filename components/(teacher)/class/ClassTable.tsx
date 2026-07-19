//EE 2

"use client";
import TeacherButton from "@/components/ui/TeacherButton";
import { TableContainer,TableHeader,TableCell } from "@/components/ui/Table";
import { TeacherClass } from "@/types/class";
import Link from "next/link";

interface ClassTableProps {
  classes: TeacherClass[];
  onDelete: (id: string) => void;
}

export default function ClassTable({
  classes,
  onDelete,
}: ClassTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <TableContainer>
        <thead className="bg-gray-100">
          <tr className="text-left text-sm text-gray-700">
            <TableHeader className="px-6 py-4">Class Name</TableHeader>
            <TableHeader className="px-6 py-4">Description</TableHeader>
            <TableHeader className="px-6 py-4">Enrolled</TableHeader>
            <TableHeader className="px-6 py-4">Created</TableHeader>
            <TableHeader className="px-6 py-4 text-center">Actions</TableHeader>
          </tr>
        </thead>

        <tbody>
          {classes.map((item) => (
            <tr
              key={item.id}
              className="border-t hover:bg-gray-50 border-zinc-200"
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
                  <TeacherButton
                    label="View"
                    href={`/teacher/class/${item.id}`}
                  />

                  <TeacherButton
                    label="Delete"
                    variant="red"
                    onClick={() => onDelete(item.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </div>
  );
}