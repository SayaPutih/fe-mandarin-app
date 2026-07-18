import { LoadingSpinner } from "@/components/ui/Loading";

interface UserTableLoadingProps {
  colSpan?: number;
  text?: string;
}

export default function UserTableLoading({
  colSpan = 5,
  text = "Loading users...",
}: UserTableLoadingProps) {
  return (
    <tbody>
      <tr>
        <td
          colSpan={colSpan}
          className="py-2"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="flex min-h-[calc(55vh-100px)] flex-col items-center justify-center gap-4">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-200 animate-bounce" />
                <div
                  className="h-3 w-3 rounded-full bg-gray-200 animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                />
                <div
                  className="h-3 w-3 rounded-full bg-gray-200 animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>

              <p className="text-sm text-gray-500">
                {text ? text : "Loading..."}
              </p>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  );
}