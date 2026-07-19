//EE 2

import type { StudentDetail } from "@/types/teacher";
import TeacherButton from "@/components/ui/TeacherButton";
interface StudentHeaderProps {
  student: StudentDetail;
}

export default function StudentHeader({
  student,
}: StudentHeaderProps) {
  return (
    <div className="mb-4 flex items-start gap-3 justify-between  p-2">
      
      <div className="flex items-start sm:items-center sm:flex-row flex-col gap-3  justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
          {student.name?.[0] || "S"}
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            {student.name}
          </h1>

          <p className="text-xs text-zinc-500">
            {student.email}
          </p>
        </div>
      </div>

      <TeacherButton
            label="Back"
            variant="gray"
            href="/teacher/students"
        />
    </div>
  );
}