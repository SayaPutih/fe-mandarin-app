"use client";

import { useRef } from "react";

import Pagination from "@/components/ui/Pagination";
import {
  TableContainer,
  TableHeader,
  TableCell,
} from "@/components/ui/Table";

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

      <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center text-zinc-500">
        Loading flashcards...
      </div>

    );

  }

  return (

    <div
      ref={tableRef}
      className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm"
    >

      <TableContainer>

        <thead className="border-b border-zinc-200 bg-zinc-100">

          <tr>

            <TableHeader className="text-center">
              Hanzi
            </TableHeader>

            <TableHeader className="text-center">
              Pinyin
            </TableHeader>

            <TableHeader className="text-center">
              Meaning
            </TableHeader>

            <TableHeader className="text-center">
              HSK
            </TableHeader>

          </tr>

        </thead>

        <tbody>

          {cards.length === 0 && (

            <tr>

              <TableCell
                colSpan={4}
                className="py-10 text-center text-zinc-500"
              >
                No flashcards found.
              </TableCell>

            </tr>

          )}

          {cards.map((card) => (

            <tr
              key={card.id}
              className="border-t border-black/5 transition-colors hover:bg-zinc-50"
            >

              <TableCell className="font-medium  text-center">
                {card.word.simplified}
              </TableCell>

              <TableCell className=" text-center">
                {card.word.pinyin}
              </TableCell>

              <TableCell className=" text-center">
                {card.word.meanings?.[0]?.meaning ?? "-"}
              </TableCell>

              <TableCell className="text-center">
                HSK {card.word.hskLevel}
              </TableCell>

            </tr>

          ))}

        </tbody>

      </TableContainer>

      <div className="border-t border-black/5 bg-zinc-50 px-5 py-4">

        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={(value) => {

            if (typeof value === "function") {
              handlePageChange(value(page));
            } else {
              handlePageChange(value);
            }

          }}
        />

      </div>

    </div>

  );

}