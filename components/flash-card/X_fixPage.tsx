"use client";

import { useEffect, useState } from "react";
import { FlashCard } from "@/components/flash-card/FlashCard";
import FlashCardOptions from "@/components/flash-card/FlashCardOptions";

import { flashCard } from "@/types/flash-card.type";

import { GetFlashCardQuestions } from "@/services/flash-card/flash-card.service";
import { AnswerFlashCardQuestion } from "@/services/flash-card/flash-card-answer.service";

export default function FlashCardOptionPage() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalWords, setTotalWords] = useState(0);

    const [currentWord, setCurrentWord] =
        useState<flashCard | undefined>();

    const [flashCardQuestions, setFlashCardQuestions] =
        useState<flashCard[]>([]);

    const [selectedAnswer, setSelectedAnswer] =
        useState("");

    const [isCorrect, setIsCorrect] =
        useState<boolean | null>(null);

    const nextQuestion = () => {

        if (currentIndex >= totalWords - 1) {
            console.log("Quiz Finished");
            return;
        }

        const nextIndex = currentIndex + 1;

        setCurrentIndex(nextIndex);
        setCurrentWord(
            flashCardQuestions[nextIndex]
        );

        setSelectedAnswer("");
        setIsCorrect(null);
    };

    const SubmitFlashCardAnswer = async (
        answer: string
    ) => {

        if (!currentWord) {
            return;
        }

        setSelectedAnswer(answer);

        try {

            const res =
                await AnswerFlashCardQuestion({
                    wordId: currentWord.id,
                    answer,
                    answerTimeMs: 100,
                });

            console.log(res);

            setIsCorrect(res.isCorrect);

            setTimeout(() => {
                nextQuestion();
            }, 1000);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {

        const GetQuestion = async () => {

            const res =
                await GetFlashCardQuestions();

            console.log(res.data);

            setFlashCardQuestions(res.data);
            setTotalWords(res.data.length);
            setCurrentWord(res.data[0]);
        };

        GetQuestion();

    }, []);

    return (
        <section
            className="
                flex flex-col flex-1
                items-center justify-center
                font-sans
                bg-white
                h-full
                w-full
                p-8
                rounded-3xl
            "
        >
            <div className="mb-4 text-sm text-gray-500">
                {currentIndex + 1} / {totalWords}
            </div>

            <div className="space-y-4 flex items-center flex-col">

                {currentWord && (
                    <>
                        <FlashCard
                            hanzi={currentWord.hanzi}
                            pinyin={currentWord.pinyin}
                            meaning={currentWord.meaning}
                            hsk_level={currentWord.hsk_level}
                        />

                        <FlashCardOptions
                            options={currentWord.options}

                            // IMPORTANT
                            selectedAnswer={selectedAnswer}

                            correctOption={
                                currentWord.meaning
                            }

                            setAnswer={
                                SubmitFlashCardAnswer
                            }
                        />
                    </>
                )}

                {selectedAnswer && (
                    <div className="text-xl font-semibold">
                        {isCorrect
                            ? "✅ Correct"
                            : "❌ Wrong"}
                    </div>
                )}

            </div>
        </section>
    );
}