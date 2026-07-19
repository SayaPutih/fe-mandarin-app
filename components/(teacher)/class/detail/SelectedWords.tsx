"use client";

import TeacherButton from "@/components/ui/TeacherButton";
import type {MandarinWord,} from "@/types/teacher";

interface Props {
  words: MandarinWord[];
  onRemove: (
    id: string
  ) => void;
}

export default function SelectedWords({
  words,
  onRemove,
}: Props) {

  if (
    words.length === 0
  ) {
    return null;
  }

  return (

    <div className="rounded-xl border border-zinc-200 bg-white p-5">

      <div className="mb-4 flex items-center justify-between">

        <h3 className="font-semibold">
          Selected Cards
        </h3>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
          {words.length} Selected
        </span>

      </div>

      <div className="flex flex-wrap gap-3">
        {words.map((word) => (
          <div
            key={word.id}
            className="flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-3"
          >
            <div>
              <p className="font-medium">
                {word.simplified}
              </p>
              <p className="text-xs text-gray-500">
                {word.pinyin}
              </p>
              <p className="text-xs text-gray-500">
                {word.meanings
                  ?.map(
                    (m) =>
                      m.meaning
                  )
                  .join(", ")}
              </p>
            </div>

            <TeacherButton
              label="✕"
              onClick={() =>
                onRemove(
                  word.id
                )
              }
              variant="red"
              style="px-2 py-1 text-xs"
            />

          </div>

        ))}

      </div>

    </div>

  );

}