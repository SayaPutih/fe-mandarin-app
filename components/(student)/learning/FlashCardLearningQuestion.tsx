"use client";

import { useEffect, useState } from "react";

import { flashCard,FlashCardAnswerDTO } from "@/types/flash-card.type";
import { AnswerFlashCardQuestion } from "@/services/flash-card/flash-card-answer.service";
import FlashCardWordQuestion from "@/components/(student)/flashcard/FlashCardWordQuestion";
import LoadingModel from "@/components/(student)/flashcard/isSubmitingModal";
import DoneModal from "../flashcard/doneModal";
import { TimerIcon } from "@/components/ui/Timer";
import { LoadingBar } from "@/components/ui/Loading";
import { GraduationCap } from "lucide-react";
import FlashCardWordPreview from "./FlashCardWordPreview";
import { ContinueModal } from "./continueModal";
import CompleteModal from "./completeModal";

interface Props{
    flashCardLearningBatchProps : flashCard[];
    onClick : ()=>void;
}

export default function FlashCardLearningQuestionPage({
    flashCardLearningBatchProps,
    onClick
} : Props) {

    const [answers, setAnswers] = useState<FlashCardAnswerDTO[]>([]);

    const [flashCardReviewBatch, setFlashCardReviewBatch] =
        useState<flashCard[]>([]);

    const [flashCardCurrent, setFlashCardCurrent] =
        useState<flashCard>();

    const [currentExpectedAnswer, setCurrentExpectedAnswer] =
        useState("");

    const [latestAnswers, setLatestAnswers] =
        useState<FlashCardAnswerDTO[]>([]);

    const [state, setState] =
        useState<"preview" | "question" | "answer" | "loading" |  "done">(
            "question"
        );

    const [isDone, setIsDone] =
        useState(false);

    const [showAnswer, setShowAnswer] =
        useState(false);

    const [isSubmiting, setIsSubmiting] =
        useState(false);

    const [myAnswer, setMyAnswer] =
        useState("");

    const [myAnswerTime, setMyAnswerTime] =
        useState(0);

    const [questionStartTime, setQuestionStartTime] =
        useState(Date.now());

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [total, setCurrrentTotal] =
        useState(0);

    const StartQuestion = () => {

        setQuestionStartTime(
            Date.now()
        );

        setMyAnswerTime(0);

        setState("question");

    };

    const ContinueNextWord = async () => {

        const nextIndex =
            currentIndex + 1;

        if (
            nextIndex >= total
        ) {

            try {

                setIsSubmiting(true);

                console.log(
                    "SUBMIT BULK"
                );

                setState("loading");

                console.log(
                    latestAnswers
                );

                await AnswerFlashCardQuestion({
                    answers:
                        latestAnswers,
                });

                setIsDone(true);

                setState("done");

            } catch (err) {

                console.log(err);

            } finally {

                setIsSubmiting(false);

            }

            return;
        }

        setCurrentIndex(
            nextIndex
        );

        setFlashCardCurrent(
            flashCardReviewBatch[
                nextIndex
            ]
        );

        setCurrentExpectedAnswer(
            flashCardReviewBatch[
                nextIndex
            ]?.expected_answer ?? ""
        );

        setMyAnswer("");

        setShowAnswer(false);

        setState("question");

    };

    const SubmitFlashCardAnswer = async (
        answer: string
    ) => {

        if (!flashCardCurrent)
            return;

        const answerTimeMs =
            Date.now() -
            questionStartTime;

        setMyAnswer(answer);

        const newAnswer: FlashCardAnswerDTO = {
            wordId:
                flashCardCurrent.id,
            answer,
            expected_answer:
                currentExpectedAnswer,
            answerTimeMs,
        };

        setAnswers(prev => {

            const updatedAnswers = [
                ...prev,
                newAnswer,
            ];

            setLatestAnswers(
                updatedAnswers
            );

            console.log(
                "UPDATED ANSWERS"
            );

            console.log(
                updatedAnswers
            );

            return updatedAnswers;
        });

        setState("answer");

    };

    useEffect(() => {

        if (
            flashCardLearningBatchProps
                .length === 0
        )
            return;

        setFlashCardReviewBatch(
            flashCardLearningBatchProps
        );

        setCurrentIndex(0);

        setCurrrentTotal(
            flashCardLearningBatchProps
                .length
        );

        setCurrentExpectedAnswer(
            flashCardLearningBatchProps[0]
                .expected_answer
        );

        setFlashCardCurrent(
            flashCardLearningBatchProps[0]
        );

        setQuestionStartTime(
            Date.now()
        );

        setMyAnswerTime(0);

    }, [
        flashCardLearningBatchProps,
    ]);

    useEffect(() => {

        if (
            state !==
                "question" ||
            !flashCardCurrent ||
            isDone
        )
            return;

        const interval =
            setInterval(() => {

                setMyAnswerTime(
                    Math.floor(
                        (
                            Date.now() -
                            questionStartTime
                        ) / 1000
                    )
                );

            }, 100);

        return () =>
            clearInterval(
                interval
            );

    }, [
        state,
        flashCardCurrent,
        questionStartTime,
        isDone,
    ]);

    useEffect(() => {

        console.log(
            "ANSWERS CHANGED"
        );

        console.log(
            answers
        );

    }, [answers]);


    return (
        <section className="flex flex-col items-center justify-start font-sans bg-white xmin-h-[calc(110vh-200px)] relative py-2 space-y-2 w-full rounded-3xl">

            <div className="text-sm text-gray-500 font-bold text-center flex items-center justify-between gap-4 px-8 w-full">

                <GraduationCap
                    width={55}
                    height={55}
                />

                {total > 1 && <LoadingBar index={currentIndex} total={total} done={isDone} />}

                <TimerIcon
                    elapseTime={myAnswerTime}
                    done={isDone}
                />

            </div>

            <div className="flex items-center justify-center flex-col w-full gap-4 min-h-[calc(100vh-200px)]">

                {state == "preview" && (
                    <FlashCardWordPreview 
                        hanzi = {flashCardCurrent?.hanzi}
                        pinyin= {flashCardCurrent?.pinyin}
                        meaning={flashCardCurrent?.meaning}
                        hsk_level={flashCardCurrent?.hsk_level}
                        onContinue={StartQuestion}
                    />
                )}

                {state == "question" && flashCardCurrent && !isDone && !isSubmiting && (
                    <FlashCardWordQuestion 
                        currentWord={flashCardCurrent}
                        currentExpectedAnswer={currentExpectedAnswer}
                        selectedAnswer={myAnswer}
                        setAnswer={SubmitFlashCardAnswer}
                    />
                )}

                

                {state == "answer" && (
                    <ContinueModal 
                        isCorrect={(myAnswer == currentExpectedAnswer)} 
                        currentExpectedAnswer={currentExpectedAnswer} 
                        next={ContinueNextWord} 
                    />
                )}

                {isSubmiting && state == "loading" && (
                    <LoadingModel />
                )}


                {state == "done" && isDone && (
                    <CompleteModal  />
                )}
            </div>

        </section>
    );
}