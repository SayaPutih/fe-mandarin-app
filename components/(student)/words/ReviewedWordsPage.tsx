"use client";

import EmptyReviewedWords from "./EmptyReviewedWords";
import ReviewedWordsGrid from "./ReviewedWordsGrid";
import ReviewedWordsHeader from "./ReviewedWordsHeader";
import ReviewedWordsLoading from "./ReviewedWordsLoading";
import ReviewedWordsPagination from "./ReviewedWordsPagination";
import ReviewedWordsStats from "./ReviewedWordsStats";

import { useReviewedWords } from "@/hooks/useReviewedWords";

export default function ReviewedWordsPage() {
  const {
    loading,
    words,
    page,
    setPage,
    pagination,
    flippedCard,
    setFlippedCard,
  } = useReviewedWords();

  if (loading) {
    return (
      <ReviewedWordsLoading />
    );
  }

  return (
    <div className="min-h-[calc(110vh-200px)] rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 p-4">

      <ReviewedWordsHeader />

      <ReviewedWordsStats
        total={
          pagination?.total ||
          words.length
        }
      />

      <ReviewedWordsGrid
        words={words}
        flippedCard={
          flippedCard
        }
        setFlippedCard={
          setFlippedCard
        }
      />

      {words.length === 0 && (
        <EmptyReviewedWords />
      )}

      <ReviewedWordsPagination
        page={page}
        totalPages={
          pagination
            ?.totalPages || 1
        }
        setPage={setPage}
      />

    </div>
  );
}