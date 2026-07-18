"use client";

import type {
  MandarinWord,
} from "@/types/teacher";
import { useRef } from "react";

interface Props {
  loading: boolean;

  words: MandarinWord[];

  selectedWords: MandarinWord[];

  page: number;

  totalPages: number;

  onPageChange: (
    page: number
  ) => void;

  onAdd: (
    word: MandarinWord
  ) => void;

  onRemove: (
    id: string
  ) => void;
}

export default function WordTable({
  loading,
  words,
  selectedWords,
  page,
  totalPages,
  onPageChange,
  onAdd,
  onRemove,
}: Props) {

  const tableRef = useRef<HTMLDivElement>(null);
  const handlePageChange = (newPage: number) => {

    onPageChange(newPage);

    requestAnimationFrame(() => {
      tableRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

  };

  if (loading) {

    return (

      <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
        Loading words...
      </div>

    );

  }

  return (

    <div
      ref={tableRef}
      className="overflow-hidden rounded-xl border bg-white"
    >

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-3 text-left">
              Hanzi
            </th>

            <th className="px-4 py-3 text-left">
              Pinyin
            </th>

            <th className="px-4 py-3 text-left">
              Meaning
            </th>

            <th className="px-4 py-3 text-center">
              HSK
            </th>

            <th className="px-4 py-3 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {words.length === 0 && (

            <tr>

              <td
                colSpan={5}
                className="p-10 text-center text-gray-500"
              >
                No words found.
              </td>

            </tr>

          )}

          {words.map((word) => {

            const selected =
              selectedWords.some(
                (item) =>
                  item.id === word.id
              );

            return (

              <tr
                key={word.id}
                className={`
                  border-t transition

                  ${
                    selected
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }
                `}
              >

                <td className="px-4 py-4 font-medium">
                  {word.simplified}
                </td>

                <td className="px-4 py-4">
                  {word.pinyin}
                </td>

                <td className="px-4 py-4">
                  {word.meanings?.[0]?.meaning ?? "-"}
                </td>

                <td className="px-4 py-4 text-center">
                  HSK {word.hskLevel}
                </td>

                <td className="px-4 py-4 text-center">

                  {selected ? (

                    <button
                      onClick={() =>
                        onRemove(word.id)
                      }
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                    >
                      Selected
                    </button>

                  ) : (

                    <button
                      onClick={() =>
                        onAdd(word)
                      }
                      className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                      Add
                    </button>

                  )}

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

      <div className="flex items-center justify-between border-t bg-gray-50 px-5 py-4">

        <button
          disabled={page === 1}
          onClick={() =>
            handlePageChange(page - 1)
          }
          className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>
            handlePageChange(page + 1)
          }
          className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>

  );

}