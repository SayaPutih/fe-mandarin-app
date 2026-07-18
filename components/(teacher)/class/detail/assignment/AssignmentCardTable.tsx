"use client";

import { useRef } from "react";

interface Props {
  loading: boolean;

  cards: any[];

  page: number;

  totalPages: number;

  onPageChange: (
    page: number
  ) => void;
}

export default function AssignmentCardTable({
  loading,
  cards,
  page,
  totalPages,
  onPageChange,
}: Props) {

  const tableRef =
    useRef<HTMLDivElement>(null);

  const handlePageChange = (
    newPage: number
  ) => {

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
        Loading flashcards...
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

          </tr>

        </thead>

        <tbody>

          {cards.length === 0 && (

            <tr>

              <td
                colSpan={4}
                className="p-10 text-center text-gray-500"
              >
                No flashcards found.
              </td>

            </tr>

          )}

          {cards.map((card: any) => (

            <tr
              key={card.id}
              className="border-t hover:bg-gray-50"
            >

              <td className="px-4 py-4 font-medium">
                {card.word.simplified}
              </td>

              <td className="px-4 py-4">
                {card.word.pinyin}
              </td>

              <td className="px-4 py-4">
                {card.word.meanings?.[0]?.meaning ?? "-"}
              </td>

              <td className="px-4 py-4 text-center">
                HSK {card.word.hskLevel}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="flex items-center justify-between border-t bg-gray-50 px-5 py-4">

        <button
          disabled={page === 1}
          onClick={() =>
            handlePageChange(
              page - 1
            )
          }
          className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={
            page === totalPages
          }
          onClick={() =>
            handlePageChange(
              page + 1
            )
          }
          className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>

  );

}