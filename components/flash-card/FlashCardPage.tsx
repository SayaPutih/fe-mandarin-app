"use client";

import { useEffect, useState } from "react";

import { GetFlashCardSingleQuestion } from "@/services/flash-card/flash-card-question.service";
import { AnswerFlashCardQuestion } from "@/services/flash-card/flash-card-answer.service";

import { flashCard } from "@/types/flash-card.type";

import FlashCardWordPreview from "./FlashCardWordPreview";
import FlashCardWordQuestion from "./FlashCardWordQuestion";

import { LoadingBar } from "../ui/Loading";
import { TimerIcon } from "../ui/Timer";

import { GraduationCap } from "lucide-react";

export default function FlashCardPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalWords, setTotalWords] = useState(0);

    const [isDone, setIsDone] = useState(false);

    const [mode, setMode] = useState<"preview" | "question">(
        "preview"
    );

    const [currentWord, setCurrentWord] =
        useState<flashCard>();

    const [currentExpectedAnswer, setCurrentExpectedAnswer] =
        useState("");

    const [flashCardQuestions, setFlashCardQuestions] =
        useState<flashCard[]>([]);

    const [selectedAnswer, setSelectedAnswer] =
        useState("");

    const [isCorrect, setIsCorrect] =
        useState<boolean | null>(null);

    const [questionStartTime, setQuestionStartTime] =
        useState(() => Date.now());

    const [elapsedTime, setElapsedTime] = useState(0);

    const ContinueToQuestion = () => {
        setMode("question");
    };

    const nextQuestion = () => {
        if (currentIndex >= totalWords - 1) {
        setIsDone(true);
        return;
        }

        const nextIndex = currentIndex + 1;

        setCurrentIndex(nextIndex);

        setCurrentWord(
        flashCardQuestions[nextIndex]
        );

        setCurrentExpectedAnswer(
        flashCardQuestions[nextIndex].expected_answer
        );

        setQuestionStartTime(Date.now());

        setSelectedAnswer("");

        setIsCorrect(null);

        setMode("preview");
    };

    const SubmitFlashCardAnswer = async (
        answer: string
    ) => {
        if (!currentWord) {
        alert("Something is Wrong");
        return;
        }

        setSelectedAnswer(answer);

        try {
        const res =
            await AnswerFlashCardQuestion({
            wordId: currentWord.id,
            answer,
            expected_answer:
                currentExpectedAnswer,
            answerTimeMs:
                Date.now() - questionStartTime,
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
        if (isDone) return;

        const interval = setInterval(() => {
        setElapsedTime(
            Math.floor(
            (Date.now() - questionStartTime) / 1000
            )
        );
        }, 100);

        return () => clearInterval(interval);
    }, [questionStartTime, isDone]);

    useEffect(() => {
        const GetQuestion = async () => {
        try {
            const res =
            await GetFlashCardSingleQuestion();

            console.log(res.data);

            setFlashCardQuestions(res.data);

            setTotalWords(res.data.length);

            setCurrentWord(res.data[0]);

            setCurrentExpectedAnswer(
                res.data[0].expected_answer
            );

            setQuestionStartTime(Date.now());
        } catch (err) {
            console.log(err);
        }
        };

        GetQuestion();
    }, []);

    return (
        <section
        className="
            flex flex-col flex-1
            items-center justify-start
            font-sans
            bg-white
            h-full
            relative
            py-4
            space-y-4
            w-full
            rounded-3xl
        "
        >
        <div
            className="
            text-sm
            text-gray-500
            font-bold
            text-center
            flex-row
            items-center
            justify-between
            flex
            px-8
            gap-10
            w-full
            "
        >
            <GraduationCap
            width={55}
            height={55}
            />

            <TimerIcon
            elapseTime={elapsedTime}
            done={isDone}
            />
        </div>

        <div
            className="
            flex
            flex-col
            items-center
            justify-center
            w-full
            gap-4
            py-4
            px-8
            flex-1
            "
        >
            {currentWord &&
            !isDone &&
            mode === "preview" && (
                <FlashCardWordPreview
                hanzi={currentWord.hanzi}
                pinyin={currentWord.pinyin}
                meaning={currentWord.meaning}
                hsk_level={
                    currentWord.hsk_level
                }
                onContinue={
                    ContinueToQuestion
                }
                />
            )}

            {currentWord &&
            !isDone &&
            mode === "question" && (
                <FlashCardWordQuestion
                currentWord={currentWord}
                currentExpectedAnswer={
                    currentExpectedAnswer
                }
                selectedAnswer={
                    selectedAnswer
                }
                SubmitFlashCardAnswer={
                    SubmitFlashCardAnswer
                }
                />
            )}

            {isDone && (
            <div
                className="
                flex
                flex-col
                items-center
                gap-4
                "
            >
                <GraduationCap
                size={80}
                />

                <h1
                className="
                    text-3xl
                    font-bold
                "
                >
                Flash Card Finished 🎉
                </h1>

                <p
                className="
                    text-gray-500
                "
                >
                Great Job!
                </p>
            </div>
            )}
        </div>
        </section>
    );
}