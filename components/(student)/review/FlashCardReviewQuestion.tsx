"use client";

import { useEffect, useState } from "react";

import { flashCard } from "@/types/flash-card.type";
import { AnswerFlashCardQuestion } from "@/services/flash-card/flash-card-answer.service";
import FlashCardWordQuestion from "@/components/(student)/flashcard/FlashCardWordQuestion";
import LoadingModel from "@/components/(student)/flashcard/isSubmitingModal";
import DoneModal from "../flashcard/doneModal";
import { TimerIcon } from "@/components/ui/Timer";
import { LoadingBar } from "@/components/ui/Loading";
import { GraduationCap } from "lucide-react";

interface Props{
    flashCardReviewBatchProps : flashCard[];
    onClick : ()=>void;
}

export default function FlashCardReviewPage({
    flashCardReviewBatchProps,
    onClick
} : Props) {

    const [flashCardReviewBatch, setFlashCardReviewBatch] = useState<flashCard[]>([]);
    const [answers, setAnswers] = useState<any[]>([]);
    const [flashCardCurrent, setFlashCardCurrent] = useState<flashCard>();
    const [currentExpectedAnswer ,setCurrentExpectedAnswer] = useState("");

    const [state, setState] = useState<"question" | "answer">("question");
    const [isDone,setIsDone] = useState(false);

    const [showAnswer, setShowAnswer] = useState(false);
    const [isSubmiting , setIsSubmiting] = useState(false);

    const [myAnswer , setMyAnswer] = useState("");
    const [myAnswerTime, setMyAnswerTime] = useState(0); 
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    
    const[currentIndex , setCurrentIndex] = useState(0);
    const[total, setCurrrentTotal] = useState(0);

    const SubmitFlashCardAnswer = async (
        answer: string
    ) => {

        if (!flashCardCurrent) return;

        const answerTimeMs =
            Date.now() - questionStartTime;

        setMyAnswer(answer);
        setShowAnswer(true);
        setIsSubmiting(true);

        const newAnswer = {
            wordId: flashCardCurrent.id,
            answer,
            expected_answer:
                flashCardCurrent.expected_answer,
            answerTimeMs,
        };

        const updatedAnswers = [
            ...answers,
            newAnswer,
        ];

        setAnswers(updatedAnswers);

        await new Promise(resolve =>
            setTimeout(resolve, 500)
        );

        const nextIndex =
            currentIndex + 1;

        // SOAL TERAKHIR
        if (nextIndex >= total) {

            try {

                console.log(
                    "SUBMIT BULK"
                );

                console.log(
                    updatedAnswers
                );

                await AnswerFlashCardQuestion({
                    answers:
                        updatedAnswers,
                });

                setIsDone(true);

            } catch (err) {

                console.log(err);

            } finally {

                setIsSubmiting(false);

            }

            return;
        }

        setCurrentIndex(nextIndex);

        setFlashCardCurrent(
            flashCardReviewBatch[nextIndex]
        );

        setCurrentExpectedAnswer(
            flashCardReviewBatch[nextIndex]
                ?.expected_answer ?? ""
        );

        setQuestionStartTime(
            Date.now()
        );

        setMyAnswerTime(0);

        setMyAnswer("");
        setShowAnswer(false);
        setIsSubmiting(false);
    };

    useEffect(() => {

        if (
            flashCardReviewBatchProps.length === 0
        ) return;

        setAnswers([]);

        setFlashCardReviewBatch(
            flashCardReviewBatchProps
        );

        setCurrentIndex(0);

        setCurrrentTotal(
            flashCardReviewBatchProps.length
        );

        setCurrentExpectedAnswer(
            flashCardReviewBatchProps[0]
                .expected_answer
        );

        setFlashCardCurrent(
            flashCardReviewBatchProps[0]
        );

        setQuestionStartTime(
            Date.now()
        );

        setMyAnswerTime(0);

    }, [flashCardReviewBatchProps]);

    useEffect(()=>{

        if(!flashCardCurrent || isDone) return;

        const interval = setInterval(()=>{

            setMyAnswerTime(
                Math.floor(
                    (Date.now() - questionStartTime) / 1000
                )
            );

        },100);

        return ()=>clearInterval(interval);

    },[
        flashCardCurrent,
        questionStartTime,
        isDone
    ]);
    
    if (
        flashCardReviewBatch.length === 0
    ) {
        return (
            <section className="flex flex-col flex-1 items-center justify-center bg-white rounded-3xl">
                <h1 className="text-xl font-bold">
                    Loading...
                </h1>
            </section>
        );
    }

    return (
        <section className="flex flex-col flex-1 items-center justify-start font-sans bg-white h-full relative py-4 space-y-4 w-full rounded-3xl">

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

            <div className="flex items-center justify-center flex-col w-full gap-4 h-full">
                {flashCardCurrent && !isDone && !isSubmiting && (
                    <FlashCardWordQuestion 
                        currentWord={flashCardCurrent}
                        currentExpectedAnswer={currentExpectedAnswer}
                        selectedAnswer={myAnswer}
                        setAnswer={SubmitFlashCardAnswer}
                    />
                )}

                {isSubmiting && (
                    <LoadingModel />
                )}

                {isDone && (
                    <DoneModal btnLabel="Done" onClick={onClick} />
                )}
            </div>

        </section>
    );
}