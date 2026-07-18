import {LoadingSpinner} from "@/components/ui/Loading"

export default function DashboardLoading() {
  return (
    <div
      className="
        flex
        min-h-[500px]
        items-center
        justify-center 
        flex-col
        gap-3
      "
    >
      <LoadingSpinner label="Loading dashboard..."/>

    </div>
  );
}