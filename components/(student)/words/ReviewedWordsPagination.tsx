interface ReviewedWordsPaginationProps {
  page: number;

  totalPages: number;

  setPage: React.Dispatch<
    React.SetStateAction<number>
  >;
}

export default function ReviewedWordsPagination({
  page,
  totalPages,
  setPage,
}: ReviewedWordsPaginationProps) {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button
        disabled={page === 1}
        onClick={() =>
          setPage((p) => p - 1)
        }
        className="
          rounded-lg
          border
          px-3
          py-1
          text-xs
          disabled:opacity-50
        "
      >
        Prev
      </button>

      <span className="text-xs">
        Page {page} of{" "}
        {totalPages}
      </span>

      <button
        disabled={
          page >= totalPages
        }
        onClick={() =>
          setPage((p) => p + 1)
        }
        className="
          rounded-lg
          border
          px-3
          py-1
          text-xs
          disabled:opacity-50
        "
      >
        Next
      </button>
    </div>
  );
}