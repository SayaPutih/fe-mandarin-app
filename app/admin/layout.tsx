"use client";
import TeacherLayout from "@/components/(teacher)/TeacherLayout";

export default function TeacherLoayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TeacherLayout>
      {children}
    </TeacherLayout>
  );
}