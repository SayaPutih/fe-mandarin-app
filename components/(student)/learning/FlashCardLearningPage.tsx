"use client";

import { useEffect, useState } from "react";

import { flashCard } from "@/types/flash-card.type";
import { GetFlashCardReviewQuestions } from "@/services/flash-card/flash-card-review.service";
import FlashCardReviewPreview from "@/components/(student)/review/FlashCardReviewPreview";
import FlashCardReviewQuestion from "@/components/(student)/review/FlashCardReviewQuestion";
import NoReviewModal from "@/components/(student)/review/noReviewModal";

import { GetFlashCardQuestions } from "@/services/flash-card/flash-card-question.service";

import { PreviewModal } from "@/components/ui/Modals";
import FlashCardLearningQuestionPage from "./FlashCardLearningQuestion";
import CompleteModal from "./completeModal";

export default function FlashCardRLearningPage() {
    
    const[flashCardLearningBatch , setFlashCardLearningBatch] = useState<flashCard[]>([]);
    const[loading,setLoading] = useState(true);

    const[state,setState] = useState<"preview" | "question" | "noReview">("preview");

    const getLearningQuestions =async ()=>{
        try {
            const res = await GetFlashCardQuestions();
            console.log(res);
            setFlashCardLearningBatch(res.data);

           

        } finally {
            setLoading(false);
        }
    }

    const goToQuestion =()=>{
        setState("question")
    }

    useEffect(()=>{
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
            
            {state === "preview" ? (
                <PreviewModal onFinish={goToQuestion} />
            ) : state === "question" ? (
                <FlashCardLearningQuestionPage flashCardLearningBatchProps={flashCardLearningBatch} onClick={()=>setState("noReview")} />
            ) : state === "noReview" ? (
                <CompleteModal />
            ) : (
                <CompleteModal />
            )
            }
           
        </section>
    );
}