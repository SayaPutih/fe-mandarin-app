interface HardestVocabularyTableProps {
  words: any[];
}

export default function HardestVocabularyTable({
  words,
}: HardestVocabularyTableProps) {
  return (
    <div className="rounded-xl border p-5">
      <h2 className="mb-4 text-xl font-semibold">
        Hardest Vocabulary
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-center text-xs">
              Hanzi
            </th>

            <th className="py-2 text-center text-xs">
              Pinyin
            </th>

            <th className="py-2 text-center text-xs">
              Correct
            </th>

            <th className="py-2 text-center text-xs">
              Total
            </th>
          </tr>
        </thead>

        <tbody>
          {words.map((item) => (
            <tr
              key={item.id}
              className="border-b"
            >
              <td className="py-3 text-center text-xs">
                {item.word?.simplified}
              </td>

              <td className="py-3 text-center text-xs">
                {item.word?.pinyin}
              </td>

              <td className="py-3 text-center text-xs">
                {item.correctReviews}
              </td>

              <td className="py-3 text-center text-xs">
                {item.totalReviews}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}