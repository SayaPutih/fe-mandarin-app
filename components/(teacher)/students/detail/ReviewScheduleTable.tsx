//EE 2
import { TableContainer,TableHeader,TableCell } from "@/components/ui/Table";
import type {StudentMemoryWord} from "@/types/teacher";

interface ReviewScheduleTableProps {
  reviewSchedule: StudentMemoryWord[];
}

export default function ReviewScheduleTable({
  reviewSchedule,
}: ReviewScheduleTableProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white shadow-sm transition-all
        duration-200
        hover:-translate-y-1
        hover:border-black/50
        hover:shadow-lg">
      <div className="bg-zinc-200 w-full rounded-t-md p-2">
        <h2 className="text-lg font-semibold text-black text-center">
          Recently Reviewd
        </h2>
      </div>

      <TableContainer>
        <thead>
          <tr className="border-b border-zinc-200">
            <TableHeader className="w-1/3 pb-2 text-center">
              Hanzi
            </TableHeader>

            <TableHeader className="w-1/3 pb-2 text-center">
              Review
            </TableHeader>

            {/* <TableHeader className="w-1/3 pb-2 text-center">
              Recall
            </TableHeader> */}
          </tr>
        </thead>

        <tbody>
          {reviewSchedule
            .slice(0, 5)
            .map((item) => (
              <tr
                key={item.id}
                className="border-b border-zinc-200"
              >
                <TableCell className="py-2 font-semibold text-center">
                  {item.word?.simplified}
                </TableCell>

                <TableCell className="py-2 text-xs text-center">
                  {item.nextReviewAt
                    ? new Date(
                        item.nextReviewAt
                      ).toLocaleDateString()
                    : "-"}
                </TableCell>

                {/* <TableCell className="py-2 text-center">
                  {(
                    (item.predictedRecall ||
                      0) * 100
                  ).toFixed(1)}
                  %
                </TableCell> */}
              </tr>
            ))}
        </tbody>
      </TableContainer>
    </div>
  );
}