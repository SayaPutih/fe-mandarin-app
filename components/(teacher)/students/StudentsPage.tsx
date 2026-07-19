"use client";

import StudentCard from "./StudentCard";
import EmptyStudents from "./EmptyStudents";
import StudentsHeader from "./StudentsHeader";
import { LoadingSpinner } from "@/components/ui/Loading";
// import StudentsLoading from "./StudentsLoading";
import StudentsStats from "./StudentsStats";
import StudentSearch from "./StudentSearch";

import { useStudents } from "@/hooks/useStudents";

export default function StudentsPage() {
  const {
    loading,
    students,
    filteredStudents,
    search,
    setSearch,
  } = useStudents();

  if (loading) {
    return <LoadingSpinner label="Loading Students" />;
  }

  return (
    <div className="min-h-screen rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 p-4">
      <StudentsHeader />
      <StudentsStats students={students}/>

      <StudentSearch
        search={search}
        setSearch={setSearch}
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {filteredStudents.map(
          (student) => (
            <StudentCard
              key={student.id}
              student={student}
            />
          )
        )}
      </div>

      {filteredStudents.length ===
        0 && <EmptyStudents />}
    </div>
  );
}