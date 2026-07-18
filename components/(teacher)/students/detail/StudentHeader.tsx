import type { StudentDetail } from "@/types/teacher";

interface StudentHeaderProps {
  student: StudentDetail;
}

export default function StudentHeader({
  student,
}: StudentHeaderProps) {
  return (
    <div className="mb-4 flex items-center gap-3">
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
  );
}