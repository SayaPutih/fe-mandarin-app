import type {
  HardestVocabulary as HardestVocabularyType,
} from "@/types/teacher";

interface HardestVocabularyProps {
  words: HardestVocabularyType[];
}

export default function HardestVocabulary({
  words,
}: HardestVocabularyProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Hardest Vocabulary
      </h2>

      <table className="w-full table-fixed text-sm">
        <thead>
          <tr className="border-b">
            <th className="w-[20%] pb-2 text-left text-xs font-medium text-zinc-500">
              Hanzi
            </th>

            <th className="w-[40%] pb-2 text-left text-xs font-medium text-zinc-500">
              Pinyin
            </th>

            <th className="w-[20%] pb-2 text-left text-xs font-medium text-zinc-500">
              Correct
            </th>

            <th className="w-[20%] pb-2 text-left text-xs font-medium text-zinc-500">
              Reviews
            </th>
          </tr>
        </thead>

        <tbody>
          {words
            .slice(0, 10)
            .map((word) => (
              <tr
                key={word.id}
                className="border-b last:border-none"
              >
                <td className="py-2 font-semibold">
                  {
                    word.word
                      ?.simplified
                  }
                </td>

                <td className="truncate py-2">
                  {
                    word.word
                      ?.pinyin
                  }
                </td>

                <td className="py-2">
                  {
                    word.correctReviews
                  }
                </td>

                <td className="py-2">
                  {
                    word.totalReviews
                  }
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}