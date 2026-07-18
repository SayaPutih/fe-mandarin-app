"use client";

import { useEffect, useState } from "react";

import { flashCard } from "@/types/flash-card.type";
import { GetFlashCardReviewQuestions } from "@/services/flash-card/flash-card-review.service";
import FlashCardReviewPreview from "./FlashCardReviewPreview";
import FlashCardReviewQuestion from "./FlashCardReviewQuestion";
import NoReviewModal from "./noReviewModal";
import FlashCardLearningQuestionPage from "../learning/FlashCardLearningQuestion";
export default function FlashCardReviewPage() {
    
    const[flashCardReviewBatch , setFlashCardReviewBatch] = useState<flashCard[]>([]);
    const[loading,setLoading] = useState(true);

    const[state,setState] = useState<"preview" | "question" | "noReview">("noReview");

    const getAllReviewQuestions =async ()=>{
        try {
            const res = await GetFlashCardReviewQuestions();
            console.log(res);
            setFlashCardReviewBatch(res.data);

            if(res.total > 0){setState("preview")}

        } finally {
            setLoading(false);
        }
    }

    const goToQuestion =()=>{
        setState("question")
    }

    useEffect(()=>{
        getAllReviewQuestions();
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
                py-4 space-y-4
                w-full rounded-3xl 
                min-h-[calc(110vh-200px)]
            "
        >
            
            {loading ? (
                <div className="flex flex-1 items-center justify-center">
                    <div
                        className="
                            h-12 w-12
                            animate-spin
                            rounded-full
                            border-4
                            border-gray-200
                            border-t-gray-900
                        "
                    />
                </div>
            ) : state === "preview" ? (
                <FlashCardReviewPreview flashCardReviewBatchProps={flashCardReviewBatch} onClick={goToQuestion}/>
            ) : state === "question" ? ( 
                <FlashCardLearningQuestionPage flashCardLearningBatchProps={flashCardReviewBatch} onClick={()=>setState("noReview")} />
            ) : state === "noReview" ? (
                <NoReviewModal />
            ) : (
                <NoReviewModal />
            )
}
           
        </section>
    );
}