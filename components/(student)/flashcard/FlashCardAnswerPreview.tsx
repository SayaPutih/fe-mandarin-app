"use client";

import { useEffect, useState } from "react";

interface Props{
    isCorrect : boolean;
    expected_asnwer : string;
    onClick : ()=>void;
}

export default function FlashCardAnswerPreview({
    isCorrect,
    expected_asnwer,
    onClick,
} : Props) {


    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-5 shadow-md">

            <div className={`flex h-16 w-16 items-center justify-center rounded-full text-3xl ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>

                {isCorrect ? "🎉" : "📚"}

            </div>

            <div className="text-center">

                <h1 className={`text-2xl font-bold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                    {isCorrect ? "Correct!" : "Wrong"}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    {isCorrect
                        ? "Great job!"
                        : "You'll review this word again."}
                </p>

            </div>

            <div className="w-full rounded-xl bg-gray-50 p-3 text-center">

                <p className="text-xs text-gray-500">
                    Correct Meaning
                </p>

                <h2 className="mt-1 text-lg font-semibold text-gray-800">
                    {expected_asnwer}
                </h2>

            </div>

            <button
                onClick={onClick}
                className="w-full rounded-xl bg-black py-2.5 text-sm font-medium text-white transition hover:scale-[1.02]"
            >
                Next Question
            </button>

        </div>

    );
}