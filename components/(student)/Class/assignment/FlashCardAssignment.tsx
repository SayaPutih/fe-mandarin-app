"use client";

import { useEffect, useState } from "react";

import { flashCard } from "@/types/flash-card.type";

import { LoadingSpinner } from "@/components/ui/Loading";
import { PreviewModal } from "@/components/ui/Modals";

import FlashCardLearningQuestionPage from "@/components/(student)/learning/FlashCardLearningQuestion";

import CompleteModal from "@/components/(student)/learning/completeModal";
import InvalidModal from "@/components/(student)/learning/invalidModal";

interface Props{
    cards: flashCard[];
}

export default function FlashCardAssignment({
    cards,
}:Props){

    const[
        flashCardBatch,
        setFlashCardBatch
    ]=useState<flashCard[]>([]);

    const[
        state,
        setState
    ]=useState<
        "loading"
        |"preview"
        |"question"
        |"complete"
        |"invalid"
    >("loading");

    useEffect(()=>{

        if(
            !cards ||
            cards.length===0
        ){
            setState("invalid");
            return;
        }

        setFlashCardBatch(cards);

        setState("preview");

    },[cards]);

    const goToQuestion=()=>{

        if(
            flashCardBatch.length===0
        ){
            setState("invalid");
            return;
        }

        setState("question");

    }

    return(

        <section
            className="
                flex flex-1
                min-h-[calc(110vh-200px)]
                w-full
                flex-col
                items-center
                justify-start
                rounded-3xl
                bg-white
                p-4
            "
        >

            {
                state==="loading"
                ?(
                    <LoadingSpinner/>
                )
                :state==="preview"
                ?(
                    <PreviewModal
                        onFinish={goToQuestion}
                    />
                )
                :state==="question"
                ?(
                    <FlashCardLearningQuestionPage
                        flashCardLearningBatchProps={
                            flashCardBatch
                        }
                        onClick={()=>
                            setState("complete")
                        }
                    />
                )
                :state==="complete"
                ?(
                    <CompleteModal/>
                )
                :(
                    <InvalidModal/>
                )
            }

        </section>

    )

}