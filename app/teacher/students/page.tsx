"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getAllStudents } from "@/services/teacher/teacher.service";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    const data = await getAllStudents();

    if (data) {
      setStudents(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      `${student.name ?? ""} ${student.email ?? ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [students, search]);

  if (loading) {
    return (
      <div className="p-8">
        Loading Students...
      </div>
    );
  }

return (
  <div className="min-h-screen rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 p-4">
    {/* HEADER */}
    <div className="mb-4">
      <h1 className="text-2xl font-bold">
        Students
      </h1>

      <p className="mt-1 text-xs text-zinc-500">
        Monitor student learning progress,
        vocabulary mastery, and retention.
      </p>
    </div>

    {/* STATS */}
    <div className="mb-4 grid gap-3 md:grid-cols-3">
      <div className="rounded-lg border bg-white p-3 shadow-sm">
        <p className="text-xs text-zinc-500">
          Total Students
        </p>

        <h2 className="mt-1 text-2xl font-bold">
          {students.length}
        </h2>
      </div>

      <div className="rounded-lg border bg-white p-3 shadow-sm">
        <p className="text-xs text-zinc-500">
          Vocabulary Learned
        </p>

        <h2 className="mt-1 text-2xl font-bold">
          {students.reduce(
            (acc, student) =>
              acc +
              (student.memoryStates?.length || 0),
            0
          )}
        </h2>
      </div>

      <div className="rounded-lg border bg-white p-3 shadow-sm">
        <p className="text-xs text-zinc-500">
          Active Learners
        </p>

        <h2 className="mt-1 text-2xl font-bold">
          {students.length}
        </h2>
      </div>
    </div>

    {/* SEARCH */}
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
      />
    </div>

    {/* STUDENTS */}
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {filteredStudents.map((student) => (
        <div
          key={student.id}
          className="rounded-lg border bg-white p-3 shadow-sm"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
              {student.name?.[0] || "S"}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold">
                {student.name}
              </h2>

              <p className="truncate text-xs text-zinc-500">
                {student.email}
              </p>
            </div>
          </div>

          <div className="mb-3 grid grid-cols-2 gap-2">
            <div>
              <p className="text-[10px] text-zinc-500">
                Words Learned
              </p>

              <p className="text-lg font-bold">
                {student.memoryStates
                  ?.length || 0}
              </p>
            </div>

            <div>
              <p className="text-[10px] text-zinc-500">
                Status
              </p>

              <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-medium text-green-700">
                Active
              </span>
            </div>
          </div>

          <Link
            href={`/teacher/students/${student.id}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-black px-3 py-2 text-xs font-medium text-white"
          >
            Analytics
          </Link>
        </div>
      ))}
    </div>

    {filteredStudents.length === 0 && (
      <div className="rounded-lg border bg-white p-6 text-center text-sm text-zinc-500">
        No students found.
      </div>
    )}
  </div>
);
}