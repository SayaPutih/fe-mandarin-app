//EE
import { FormField } from "@/components/ui/form/FormField";

interface StudentSearchProps {
  search: string;

  setSearch: (
    value: string
  ) => void;
}

export default function StudentSearch({
  search,
  setSearch,
}: StudentSearchProps) {
  return (
    <div className="mb-4">
      {/* <input
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="
          w-full
          rounded-lg
          border
          bg-white
          px-3
          py-2
          text-sm
          outline-none
          focus:ring-1
          focus:ring-black
        "
      /> */}

      <FormField
          placeholder="Search students..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
      />
    </div>
  );
}