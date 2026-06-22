"use client";

import React from "react";
import {useState,useEffect} from "react";
import { getSentecePractice } from "@/services/sentece/sentece-question.service";
import { SentencePracticeCard } from "./SentecePracticeCard";
import { sentence } from "@/types/sentence.type";
import SentencePracticeForm from "./SentencePracticeForm";
import { answerSentencePractice } from "@/services/sentece/sentence-answer.service";

const SentencePracticePage = ()=>{

    const [currentMandarinText,setCurrentMandarinText] = useState("");
    const [mandarinTexts,setMandarinTexts] = useState<sentence[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalSentence,setTotalSentence] = useState(0);

    const nextQuestion =()=>{
        setCurrentIndex(currentIndex+1);
        console.log(`${currentIndex} / ${totalSentence}`)
        setCurrentMandarinText(mandarinTexts[currentIndex].mandarinText);
    }

    useEffect(()=>{
        
        const getQuestions =async ()=>{
            const result = await getSentecePractice();
            console.log(result.data)
            setMandarinTexts(result.data);
            setTotalSentence(result.data.length);
            setCurrentIndex(0);
            setCurrentMandarinText(result.data[0].mandarinText)
        }   

        getQuestions();

    },[])

    return(
        <section className="
            flex flex-col flex-1 
            items-center justify-start font-sans 
          bg-white h-full relative py-4 space-y-4 
            w-full  rounded-3xl px-4
        ">
            <div className="w-full max-w-3xlself-start px-8">
                <h1 className="text-3xl font-bold text-stale">
                Sentence Practice
                </h1>

                <p className="text-slate-500 mt-1">
                Question {currentIndex + 1} of {totalSentence}
                </p>
            </div>

            <SentencePracticeCard 
                englishTranslation="test"
                hskLevel={0}
                mandarinText={currentMandarinText}
            />

            <SentencePracticeForm />

            
        </section>
    )

}

export default SentencePracticePage;