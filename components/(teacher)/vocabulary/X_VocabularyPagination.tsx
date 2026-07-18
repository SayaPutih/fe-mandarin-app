//EE
import TeacherButton from "@/components/ui/TeacherButton";

interface VocabularyPaginationProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function VocabularyPagination({
  page,
  totalPages,
  setPage,
}: VocabularyPaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <TeacherButton
        label="Previous"
        variant="gray"
        disabled={page === 1}
        onClick={() =>setPage((prev) => prev - 1)}
        style="rounded-lg disabled:opacity-50"
      />

      <span className="sm:text-md text-xs">
        Page {page} of{" "} {totalPages}
      </span>

      <TeacherButton
        label="Next"
        variant="gray"
        disabled={page >= totalPages}
        onClick={() =>setPage((prev) => prev + 1)}
        style="rounded-lg disabled:opacity-50"
      />
    </div>
  );
}