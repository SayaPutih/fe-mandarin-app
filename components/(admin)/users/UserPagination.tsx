interface UserPaginationProps {
  page: number;

  totalPages: number;

  setPage: React.Dispatch<
    React.SetStateAction<number>
  >;
}

export default function UserPagination({
  page,
  totalPages,
  setPage,
}: UserPaginationProps) {
  return (
    <div className="mt-6 flex justify-center gap-3">
      <button
        disabled={page === 1}
        onClick={() =>
          setPage((prev) => prev - 1)
        }
        className="
          rounded-lg
          bg-zinc-800
          px-4
          py-2
          text-white
          disabled:opacity-40
        "
      >
        Previous
      </button>

      <div className="flex items-center text-white">
        {page} / {totalPages}
      </div>

      <button
        disabled={page === totalPages}
        onClick={() =>
          setPage((prev) => prev + 1)
        }
        className="
          rounded-lg
          bg-zinc-800
          px-4
          py-2
          text-white
          disabled:opacity-40
        "
      >
        Next
      </button>
    </div>
  );
}