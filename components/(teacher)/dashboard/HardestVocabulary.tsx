//EE 3
import {TableContainer,TableHeader,TableCell} from "@/components/ui/Table";
import type {HardestVocabulary as HardestVocabularyType,} from "@/types/teacher";

interface HardestVocabularyProps {
  words: HardestVocabularyType[];
}

export default function HardestVocabulary({
  words,
}: HardestVocabularyProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all
        duration-200
        hover:-translate-y-1
        hover:border-black/50
        hover:shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">
        Hardest Vocabulary
      </h2>

      <table className="w-full table-fixed text-sm">
        <thead>
          <tr className="border-b border-zinc-200">
            <TableHeader className="w-[20%] pb-2 text-center text-xs font-medium text-zinc-500">
              Hanzi
            </TableHeader>

            <TableHeader className="w-[40%] pb-2 text-center text-xs font-medium text-zinc-500">
              Pinyin
            </TableHeader>

            <TableHeader className="w-[20%] pb-2 text-center text-xs font-medium text-zinc-500">
              Correct
            </TableHeader>

            <TableHeader className="w-[20%] pb-2 text-center text-xs font-medium text-zinc-500">
              Reviews
            </TableHeader>
          </tr>
        </thead>

        <tbody>
          {words
            .slice(0, 4)
            .map((word) => (
              <tr
                key={word.id}
                className="border-b last:border-none border-zinc-200"
              >
                <TableCell className="py-2 font-semibold text-center">
                  {
                    word.word
                      ?.simplified
                  }
                </TableCell>

                <TableCell className="truncate py-2 text-center">
                  {
                    word.word
                      ?.pinyin
                  }
                </TableCell>

                <TableCell className="py-2 text-center">
                  {
                    word.correctReviews
                  }
                </TableCell>

                <TableCell className="py-2 text-center">
                  {
                    word.totalReviews
                  }
                </TableCell>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}