"use client";

import { FlashCard } from "@/components/(student)/flashcard/FlashCard";
import { useEffect } from "react";
import FlashCardOptions from "@/components/(student)/flashcard/FlashCardOptions";

type Props = {
    currentWord: any;
    currentExpectedAnswer: string;
    selectedAnswer: string;
    setAnswer: (answer: string) => void;
};

export default function FlashCardWordQuestion({
    currentWord,
    currentExpectedAnswer,
    selectedAnswer,
    setAnswer,
}: Props) {

    useEffect(()=>{
        console.log(currentWord)
    },[currentWord])

    return (
        <>
            <FlashCard
                hanzi={currentWord.hanzi}
                pinyin={currentWord.pinyin}
                meaning=""
                difficulty={currentWord.lexicalDifficulty}
                hsk_level={currentWord.hskLevel}
            />

            <FlashCardOptions
                options={currentWord.options}
                selectedAnswer={selectedAnswer}
                correctOption={currentExpectedAnswer}
                setAnswer={setAnswer}
            />
        </>
    );
}