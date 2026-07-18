import type {
  StudentMemoryWord,
} from "@/types/teacher";

interface ReviewScheduleTableProps {
  reviewSchedule: StudentMemoryWord[];
}

export default function ReviewScheduleTable({
  reviewSchedule,
}: ReviewScheduleTableProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">
        Review Schedule
      </h2>

      <table className="w-full table-fixed text-sm">
        <thead>
          <tr className="border-b">
            <th className="w-1/3 pb-2 text-left">
              Hanzi
            </th>

            <th className="w-1/3 pb-2 text-left">
              Review
            </th>

            <th className="w-1/3 pb-2 text-left">
              Recall
            </th>
          </tr>
        </thead>

        <tbody>
          {reviewSchedule
            .slice(0, 5)
            .map((item) => (
              <tr
                key={item.id}
                className="border-b"
              >
                <td className="py-2 font-semibold">
                  {item.word?.simplified}
                </td>

                <td className="py-2 text-xs">
                  {item.nextReviewAt
                    ? new Date(
                        item.nextReviewAt
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="py-2">
                  {(
                    (item.predictedRecall ||
                      0) * 100
                  ).toFixed(1)}
                  %
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}