//EE
"use client";

import type { Vocabulary } from "@/types/teacher";
import { TableContainer,TableHeader,TableCell } from "@/components/ui/Table";
import TeacherButton from "@/components/ui/TeacherButton";
interface VocabularyTableProps {
  words: Vocabulary[];
  search: string;
}

export default function VocabularyTable({
  words,
  search,
}: VocabularyTableProps) {
  const filteredWords = words.filter(
    (word) =>
      word.simplified
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      word.pinyin
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
      <TableContainer>
        <thead className="bg-gray-100">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <TableHeader>Hanzi</TableHeader>
            <TableHeader>Pinyin</TableHeader>
            <TableHeader>HSK</TableHeader>
            <TableHeader>Meanings</TableHeader>
            <TableHeader className="text-center">Actions</TableHeader>
          </tr>
        </thead>

        <tbody>
          {filteredWords.map((word) => (
            <tr key={word.id}className="border-t transition hover:bg-gray-50">
              <TableCell className="text-xl font-bold">{word.simplified}</TableCell>

              <TableCell>{word.pinyin}</TableCell>

              <TableCell>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  <span className="sm:inline hidden">HSK</span> {word.hskLevel}
                </span>
              </TableCell>

              <TableCell>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                  {word.meanings?.length} <span className="sm:inline hidden">meanings</span>
                </span>
              </TableCell>

              <TableCell>
                <div className="flex justify-center gap-2">
                  <TeacherButton
                    href={`/teacher/vocabulary/${word.id}`}
                    label="view" 
                  />
                  <TeacherButton
                    label="Edit" 
                    variant="yellow"
                  />
                </div>
              </TableCell>
            </tr>
          ))}

          {filteredWords.length === 0 && (
            <tr>
              <TableCell
                colSpan={5}
                className="text-center text-gray-500"
              >
                No vocabulary found.
              </TableCell>
            </tr>
          )}
        </tbody>
      </TableContainer>
  );
}