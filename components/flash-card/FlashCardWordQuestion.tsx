"use client";

import { FlashCard } from "@/components/flash-card/FlashCard";
import FlashCardOptions from "@/components/flash-card/FlashCardOptions";

type Props = {
  currentWord: any;
  currentExpectedAnswer: string;
  selectedAnswer: string;
  SubmitFlashCardAnswer: (answer: string) => void;
};

export default function FlashCardWordQuestion({
  currentWord,
  currentExpectedAnswer,
  selectedAnswer,
  SubmitFlashCardAnswer,
}: Props) {
  return (
    <>
      <FlashCard
        hanzi={currentWord.hanzi}
        pinyin={currentWord.pinyin}
        meaning={currentExpectedAnswer}
        hsk_level={currentWord.hsk_level}
      />

      <FlashCardOptions
        options={currentWord.options}
        selectedAnswer={selectedAnswer}
        correctOption={currentExpectedAnswer}
        setAnswer={SubmitFlashCardAnswer}
      />
    </>
  );
}