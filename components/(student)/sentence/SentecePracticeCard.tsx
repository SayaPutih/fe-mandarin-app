"use client";

import React,{useState,useEffect} from "react";

interface Props{
    englishTranslation : string;
    hskLevel : number;
    mandarinText : string;
}

export const SentencePracticeCard =({
    englishTranslation,
    hskLevel,
    mandarinText,
} : Props)=>{

    const getLevel =(level : number)=>{
        if(level > 7) return "bg-red-100 text-red-700"
        if(level > 5) return "bg-orange-100 text-orange-700"
        if(level > 3) return "bg-yellow-100 text-yellow-700"
        return "bg-green-100 text-green-700"
    }

    return(
        <div 
            className="
                bg-white rounded-3xl shadow-md leading-relaxed w-full max-w-3xl
                flex flex-col min-h-64 p-6 border border-slate-200
                 relative shadow-gray-500 items-center
            "
        >   

            <div className="flex justify-end w-full">
            <p className={`p-2 rounded-xl ${getLevel(hskLevel)}`}
            >HSK {hskLevel}</p>
            </div>

            <h1 className="font-bold text-4xl text-black text-center max-w-[90%] leading-relaxed wrap-break-words  "
            >{mandarinText}</h1>

        </div>
    )
}