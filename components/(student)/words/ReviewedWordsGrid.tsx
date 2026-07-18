"use client";

import ReviewedWordCard from "./ReviewedWordCard";

import type {
  ReviewedWord,
} from "@/types/student";

interface ReviewedWordsGridProps {
  words: ReviewedWord[];

  flippedCard: string | null;

  setFlippedCard: (
    id: string | null
  ) => void;
}

export default function ReviewedWordsGrid({
  words,
  flippedCard,
  setFlippedCard,
}: ReviewedWordsGridProps) {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-3
        sm:grid-cols-4
        md:grid-cols-7
        xl:grid-cols-8
      "
    >
      {words.map((item) => (
        <ReviewedWordCard
          key={item.id}
          item={item}
          flipped={
            flippedCard === item.id
          }
          onFlip={() =>
            setFlippedCard(
              flippedCard === item.id
                ? null
                : item.id
            )
          }
        />
      ))}
    </div>
  );
}