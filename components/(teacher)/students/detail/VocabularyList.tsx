import type {
  StudentMemoryWord,
} from "@/types/teacher";

interface VocabularyListProps {
  title: string;

  words: StudentMemoryWord[];

  color:
    | "green"
    | "red";

  emptyText: string;
}

export default function VocabularyList({
  title,
  words,
  color,
  emptyText,
}: VocabularyListProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">
        {title}
      </h2>

      {words.length > 0 ? (
        <div className="space-y-2">
          {words
            .slice(0, 5)
            .map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded border px-3 py-2"
              >
                <div>
                  <div className="text-sm font-semibold">
                    {item.word?.simplified}
                  </div>

                  <div className="text-xs text-zinc-500">
                    {item.word?.pinyin}
                  </div>
                </div>

                <span
                  className={`text-xs font-medium ${
                    color === "green"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {(
                    (item.predictedRecall ||
                      0) * 100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex h-32 items-center justify-center rounded border border-dashed text-sm text-zinc-500">
          {emptyText}
        </div>
      )}
    </div>
  );
}