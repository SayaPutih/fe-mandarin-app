//EE 2
"use client";

import type { MandarinWord } from "@/types/teacher";
import { useRef } from "react";

import Pagination from "@/components/ui/Pagination";
import {
  TableCell,
  TableContainer,
  TableHeader,
} from "@/components/ui/Table";
import TeacherButton from "@/components/ui/TeacherButton";
import { LoadingSpinner } from "@/components/ui/Loading";

interface Props {
  loading: boolean;
  words: MandarinWord[];
  selectedWords: MandarinWord[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onAdd: (word: MandarinWord) => void;
  onRemove: (id: string) => void;
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
      <LoadingSpinner label="Loading Words..."/>
    );
  }

  return (
    <div ref={tableRef} className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">

      <TableContainer>
        <thead className="border-b border-zinc-200 bg-zinc-100">
          <tr>
            <TableHeader className="text-center">Hanzi</TableHeader>
            <TableHeader className="text-center">Pinyin</TableHeader>
            <TableHeader className="text-center">Meaning</TableHeader>
            <TableHeader className="text-center">HSK</TableHeader>
            <TableHeader className="text-center">Action</TableHeader>
          </tr>

        </thead>

        <tbody>

          {words.length === 0 && (
            <tr>
              <TableCell
                colSpan={5}
                className="py-10 text-center text-zinc-500"
              >
                No words found.
              </TableCell>
            </tr>
          )}

          {words.map((word) => {
            const selected = selectedWords.some((item) => item.id === word.id);
            return (
              <tr
                key={word.id}
                className={`
                  border-t
                  border-zinc-200
                  transition-colors
                  ${
                    selected
                      ? "bg-blue-50"
                      : "hover:bg-zinc-50"
                  }
                `}
              >

                <TableCell className="font-medium text-center">
                  {word.simplified}
                </TableCell>

                <TableCell className="text-center">
                  {word.pinyin}
                </TableCell>

                <TableCell className="text-center">
                  {word.meanings?.[0]?.meaning ?? "-"}
                </TableCell>

                <TableCell className="text-center">
                  HSK {word.hskLevel}
                </TableCell>

                <TableCell className="text-center">
                  {selected ? (
                    <TeacherButton
                      label="Selected"
                      variant="blue"
                      onClick={() =>onRemove(word.id)}/>
                  ) : (
                    <TeacherButton
                      label="Add"
                      variant="green"
                      onClick={() =>onAdd(word)}
                    />
                  )}
                </TableCell>

              </tr>

            );

          })}

        </tbody>

      </TableContainer>

      <div className="border-t border-zinc-200 bg-zinc-50 px-5 py-4">
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