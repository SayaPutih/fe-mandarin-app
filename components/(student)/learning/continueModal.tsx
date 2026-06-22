"use client";
import {useRouter} from "next/navigation";


interface Props{
    isCorrect : boolean;
    currentExpectedAnswer : string;
    next : ()=>void
}

export const ContinueModal =({
    isCorrect,
    currentExpectedAnswer,
    next
} : Props)=>{

    const router = useRouter();

    return(
        <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md rounded-3xl border-gray-100 p-8 ">
            <div className={`flex h-24 w-24 items-center justify-center rounded-full text-5xl ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
                {isCorrect ? "🎉" : "📚"}
            </div>

            <div className="text-center">
                <h1 className={`text-4xl font-bold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                    {isCorrect ? "Correct!" : "Wrong Answer"}
                </h1>

                <p className="mt-2 text-gray-500">
                    {isCorrect
                        ? "Great job! Keep going."
                        : "Don't worry, you'll see this word again."}
                </p>
            </div>

            <div className="w-full rounded-2xl bg-gray-50 p-4 text-center">
                <p className="text-sm text-gray-500">
                    Correct Meaning
                </p>

                <h2 className="mt-1 text-2xl font-semibold text-gray-800">
                    {currentExpectedAnswer}
                </h2>
            </div>

            <div className="flex w-full flex-row gap-3 ">
                    

                <button
                    onClick={() => router.push("/home")}
                    className="w-full rounded-xl border border-gray-900 bg-white py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    Finish Session
                </button>
                <button
                    onClick={next}
                    className="w-full rounded-xl bg-black py-3 font-medium text-white transition hover:scale-[1.02]"
                >
                    Continue Learning
                </button>
            </div>

        </div>
    )
}