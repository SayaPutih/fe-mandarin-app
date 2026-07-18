"use client";

import {
  useEffect,
  useState,
} from "react";

import { getStudentReviewedWords } from "@/services/student/student.service";

import type {
  ReviewedWord,
  ReviewedWordsPagination,
} from "@/types/student";

export function useReviewedWords() {
  const [loading, setLoading] =
    useState(true);

  const [words, setWords] =
    useState<ReviewedWord[]>([]);

  const [page, setPage] =
    useState(1);

  const [pagination, setPagination] =
    useState<ReviewedWordsPagination | null>(
      null
    );

  const [flippedCard, setFlippedCard] =
    useState<string | null>(null);

  const fetchWords =
    async () => {
      try {
        const data =
          await getStudentReviewedWords(
            page
          );

        if (data) {
          setWords(data.data);

          setPagination(
            data.pagination
          );
        }
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchWords();
  }, [page]);

  return {
    loading,

    words,

    page,

    setPage,

    pagination,

    flippedCard,

    setFlippedCard,
  };
}