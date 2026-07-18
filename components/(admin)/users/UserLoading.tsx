import {
  LoadingSpinner,
} from "@/components/ui/Loading";

export default function UserLoading() {
  return (
    <div
      className="
        flex
        min-h-[500px]
        flex-col
        items-center
        justify-center
        gap-3
      "
    >
      <LoadingSpinner label={"Loading users..."} />
    </div>
  );
}