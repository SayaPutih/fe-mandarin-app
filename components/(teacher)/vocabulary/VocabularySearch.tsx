//EE 2
interface Props {
  search: string;

  setSearch: (
    value: string
  ) => void;

  total: number;
}

export default function VocabularySearch({
  search,
  setSearch,
  total,
}: Props) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div className="relative w-full rounded-md ">
        <input
          type="text"
          placeholder="Search Hanzi or Pinyin..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            w-full
            rounded-xl
            border
            border-zinc-200
            bg-zinc-50
            px-4
            py-3
            pl-11
            outline-none
            transition
            focus:border-black
            focus:bg-white
          "
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0011.15 11.15z"
          />
        </svg>
      </div>

      {/* <div className="rounded-xl bg-zinc-100 px-4 py-3 text-sm font-medium text-zinc-600">
        {total} Results
      </div> */}
    </div>
  );
}