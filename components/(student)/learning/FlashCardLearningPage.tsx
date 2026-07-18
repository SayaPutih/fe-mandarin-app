"use client";

import { useEffect, useState } from "react";

import { flashCard } from "@/types/flash-card.type";
import { GetFlashCardReviewQuestions } from "@/services/flash-card/flash-card-review.service";
import FlashCardReviewPreview from "@/components/(student)/review/FlashCardReviewPreview";
import FlashCardReviewQuestion from "@/components/(student)/review/FlashCardReviewQuestion";
import NoReviewModal from "@/components/(student)/review/noReviewModal";
import InvalidModal from "./invalidModal";
import { GetFlashCardQuestions } from "@/services/flash-card/flash-card-question.service";

import { LoadingSpinner } from "@/components/ui/Loading";

import { PreviewModal } from "@/components/ui/Modals";
import FlashCardLearningQuestionPage from "./FlashCardLearningQuestion";
import CompleteModal from "./completeModal";

interface Props{
    hskLevel : number;
}

export default function FlashCardRLearningPage({
    hskLevel
} : Props) {
    
    const[flashCardLearningBatch , setFlashCardLearningBatch] = useState<flashCard[]>([]);
    const[loading,setLoading] = useState(true);

    const[state,setState] = useState<"loading" | "preview" | "question" | "noReview" | "invalid">("loading");

    const getLearningQuestions = async () => {
        try {

            const res =
            await GetFlashCardQuestions(
                hskLevel
            );

            if (
            !res?.data ||
            res.data.length === 0
            ) {
            setState("invalid");
            return;
            }

            setFlashCardLearningBatch(
            res.data
            );

            setState("preview");

        } catch (err) {

            console.log(err);

            setState("invalid");

        } finally {

            setLoading(false);

        }
        };

    const goToQuestion = () => {

  if (
    flashCardLearningBatch.length === 0
  ) {
    setState("invalid");
    return;
  }

  setState("question");
};

    useEffect(()=>{
        console.log("FETCH------------------");
        getLearningQuestions();
        console.log("Use Effected")
    },[])

    return (
        <section
            className="
                flex flex-col flex-1
                items-center justify-start
                font-sans
                bg-white
                h-full relative
                p-4 space-y-4
                w-full rounded-3xl
                min-h-[calc(110vh-200px)]
               
            "
        >
            
            {state === "loading" ? ( 
                <LoadingSpinner />
            ) : state === "preview" ? (
                <PreviewModal onFinish={goToQuestion} />
            ) : state === "question" ? (
                <FlashCardLearningQuestionPage flashCardLearningBatchProps={flashCardLearningBatch} onClick={()=>setState("noReview")} />
            ) : state === "noReview" ? (
                <CompleteModal />
            ) : state === "invalid" ? (
                <InvalidModal />
            ) :(
                <CompleteModal />
            )
            }
           
        </section>
    );
}