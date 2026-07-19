"use client";

import Header from "@/components/(student)/class/Header";
import ClassGrid from "@/components/(student)/class/ClassGrid";
import ClassGridSkeleton from "@/components/(student)/class/ClassGridSekeleton";

import { useGetClasses } from "@/hooks/useStudentClass";

export default function StudentClassPage() {
  const {
    loading,
    classes,
  } = useGetClasses();

  return (
    <main className="mx-auto max-w-7xl p-6">

      <Header totalClasses={classes.length}/>

      {loading ? (
        <ClassGridSkeleton />
      ) : (
        <ClassGrid
          classes={classes}
        />
      )}

    </main>
  );
}