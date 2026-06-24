"use client";

import { useEffect, useState } from "react";
import { flashCard,FlashCardAnswerDTO } from "@/types/flash-card.type";
import { AnswerFlashCardQuestion } from "@/services/flash-card/flash-card-answer.service";
import { ButtonPrimary } from "@/components/ui/Buttons";
import FlashCardWordQuestion from "./InitiateFlashCardWordQuestion";
import { TimerIcon } from "@/components/ui/Timer";
import { LoadingBar } from "@/components/ui/Loading";
import { GraduationCap } from "lucide-react";
import { GetFlashCardInitiateQuestion } from "@/services/flash-card/flash-card-question.service";
import { flashCardQuestions } from "@/types/flash-card.type";
import {GetFlashCardNewInitiateQuestion} from "@/services/flash-card/flash-card-new-initiate.service";


export default function InitiateFlashCard() {
    const [questions, setQuestions] = useState<flashCard[]>([]);
    const [answers, setAnswers] = useState<any[]>([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);

    const hasQuestions = questions.length > 0;

    const totalWords = questions.length;

    const currentWord =
        questions[currentIndex];

    const currentExpectedAnswer =
        currentWord?.expectedAnswer ?? "";

    const getFlashCardQuestions = async () => {
        try {

            const result =
                await GetFlashCardNewInitiateQuestion();

            setQuestions(
                result.data ?? []
            );

        } catch (err) {

            console.log(err);

        }
    };

    useEffect(() => {

        getFlashCardQuestions();

    }, []);

    const nextQuestion = () => {

        setCurrentIndex(
            prev => prev + 1
        );

        setSelectedAnswer("");

    };

    useEffect(() => {

        setQuestionStartTime(
            Date.now()
        );

        setElapsedTime(0);

    }, [currentIndex]);

    const SubmitAllAnswers = async (
        allAnswers: any[]
    ) => {

        try {

            setIsSubmitting(true);

            console.log(
                "SUBMITTING ALL ANSWERS"
            );

            console.log(
                allAnswers
            );

            await AnswerFlashCardQuestion({
                answers: allAnswers,
            });

            setIsDone(true);

        } catch (err) {

            console.log(err);

        } finally {

            setIsSubmitting(false);

        }

    };

    const SubmitFlashCardAnswer = async (
        answer: string
    ) => {

        if (!currentWord) return;

        setSelectedAnswer(answer);

        const answerData = {
            wordId: currentWord.id,
            answer,
            expected_answer:
                currentExpectedAnswer,
            answerTimeMs:
                Date.now() -
                questionStartTime,
        };

        const updatedAnswers = [
            ...answers,
            answerData,
        ];

        setAnswers(updatedAnswers);

        console.log(
            "ANSWER ADDED"
        );

        console.log(
            updatedAnswers
        );

        if (
            currentIndex >=
            questions.length - 1
        ) {

            await SubmitAllAnswers(
                updatedAnswers
            );

            return;
        }

        nextQuestion();

    };

    useEffect(() => {

        console.log(
            "ANSWERS CHANGED"
        );

        console.log(
            answers
        );

    }, [answers]);

    useEffect(() => {

        if (
            isSubmitting ||
            isDone
        ) return;

        const interval =
            setInterval(() => {

                setElapsedTime(
                    Math.floor(
                        (
                            Date.now() -
                            questionStartTime
                        ) / 1000
                    )
                );

            }, 100);

        return () =>
            clearInterval(interval);

    }, [
        questionStartTime,
        isSubmitting,
        isDone,
    ]);

    return (
        <section
            className="
                flex flex-col flex-1
                items-center justify-start
                font-sans
                bg-white
                h-full relative
                py-4 space-y-4
                w-full rounded-3xl
            "
        >

            {!hasQuestions ? (

                <div
                    className="
                        flex flex-1
                        flex-col
                        items-center
                        justify-center
                        text-center
                        px-6
                    "
                >
                    <h1
                        className="
                            text-2xl
                            font-bold
                            text-gray-800
                            mb-2
                        "
                    >
                        No Questions Available
                    </h1>

                    <p
                        className="
                            text-gray-500
                            mb-6
                        "
                    >
                        No initiation questions found the data is already collected!.
                    </p>

                    <ButtonPrimary
                        label="Back To Home"
                        onClick={() =>
                            (
                                window.location.href =
                                "/home"
                            )
                        }
                    />

                </div>

            ) : (

                <>
                    <div
                        className="
                            text-sm
                            text-gray-500
                            font-bold
                            text-center
                            flex items-center
                            justify-between
                            gap-8
                            px-8
                            w-full
                        "
                    >

                        <GraduationCap
                            width={55}
                            height={55}
                        />

                        <LoadingBar
                            index={currentIndex}
                            total={totalWords}
                            done={isDone}
                        />

                        <TimerIcon
                            elapseTime={
                                elapsedTime
                            }
                            done={isDone}
                        />

                    </div>

                    <div
                        className="
                            flex flex-col
                            items-center
                            justify-center
                            w-full
                            flex-1
                            gap-6
                            px-8
                        "
                    >

                        {!isDone &&
                            currentWord &&
                            !isSubmitting && (

                                <FlashCardWordQuestion
                                    currentWord={
                                        currentWord
                                    }
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

                        {isSubmitting && (

                            <div
                                className="
                                    flex flex-col
                                    items-center
                                    justify-center
                                    gap-6
                                    flex-1
                                "
                            >
                                <div
                                    className="
                                        h-20
                                        w-20
                                        rounded-full
                                        border-4
                                        border-gray-200
                                        border-t-black
                                        animate-spin
                                    "
                                />

                                <div
                                    className="
                                        text-center
                                    "
                                >
                                    <h2
                                        className="
                                            text-2xl
                                            font-bold
                                        "
                                    >
                                        Processing Answer
                                    </h2>

                                    <p
                                        className="
                                            text-gray-500
                                            mt-2
                                        "
                                    >
                                        Model Is Calculating Your Next Review...
                                    </p>
                                </div>

                            </div>

                        )}

                        {isDone && (

                            <div
                                className="
                                    flex flex-col
                                    items-center
                                    justify-center
                                    gap-4
                                "
                            >
                                <h1
                                    className="
                                        text-3xl
                                        font-bold
                                        
                                    "
                                >
                                    🎉 Initiation Complete
                                </h1>

                                <p
                                    className="
                                        text-gray-500
                                    "
                                >
                                    You have completed all
                                    initiation questions.
                                </p>

                                <ButtonPrimary
                                    label="Go To Dashboard"
                                    onClick={() =>
                                        (
                                            window.location.href =
                                            "/home"
                                        )
                                    }
                                />

                            </div>

                        )}

                    </div>
                </>
            )}

        </section>
    );
}