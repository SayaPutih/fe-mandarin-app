interface UserSearchProps {
  search: string;

  setSearch: React.Dispatch<
    React.SetStateAction<string>
  >;
}

export default function UserSearch({
  search,
  setSearch,
}: UserSearchProps) {
  return (
    <div className="mb-5">
      <input
        placeholder="Search user..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          rounded-lg
          border
          border-zinc-700
          bg-zinc-800
          px-4
          py-2
          text-white
          outline-none
        "
      />
    </div>
  );
}