"use client";

import { useEffect, useState } from "react";
import {FlashCard} from "@/components/flash-card/FlashCard"
import FlashCardOptions from "@/components/flash-card/FlashCardOptions"
import {words} from "@/components/flash-card/FlashCardOptionsExample"
import {hanzi,flashCardQuestions,flashCard} from "@/types/flash-card.type"
import {ButtonNext} from "@/components/ui/Buttons"
import { GetFlashCardQuestions } from "@/services/flash-card/flash-card-question.service";
import { AnswerFlashCardQuestion} from "@/services/flash-card/flash-card-answer.service";
import { AnimatePresence, motion } from "framer-motion";
import { Timer } from 'lucide-react';
import { TimerIcon } from "../ui/Timer";
import { LoadingBar } from "../ui/Loading";
import { GraduationCap } from 'lucide-react';

export default function FlashCardOptionPage() {

    const[currentIndex, setCurrentIndex] = useState(0);
    const[totalWords,setTotalWords] = useState(0);
    const[isDone,setIsDone] = useState(false);

    const[currentWord,setCurrentWord] = useState<flashCard | undefined>();
    const[currentExpectedAnswer,setCurrentExpectedAnswer] = useState("");
    const[flashCardQuestions , setFlashCardQuestions] = useState<flashCard[]>([]);

    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const [questionStartTime,setQuestionStartTime] = useState(() => Date.now());
    const [elapsedTime,setElapseTime] = useState(0);

    const nextQuestion =()=>{

        if(currentIndex >= totalWords - 1){
            setIsDone(true);
            return;
        }

        const nextIndex = currentIndex + 1;

        if(currentIndex < totalWords -1){
            setCurrentIndex(nextIndex);
            setCurrentWord(flashCardQuestions[nextIndex]); 
            setCurrentExpectedAnswer(flashCardQuestions[nextIndex].expected_answer);    
            setQuestionStartTime(Date.now());
        }

        setSelectedAnswer("");
        setIsCorrect(null);

    }

    const SubmitFlashCardAnswer = async (answer : string)=>{
        
        if(!currentWord) return alert("Something is Wrong")
        setSelectedAnswer(answer);

        try{

            const res = await AnswerFlashCardQuestion({
                wordId : currentWord.id,
                answer,
                expected_answer : currentExpectedAnswer,
                answerTimeMs : Date.now()-questionStartTime,
            })    

            console.log(res);
            //setIsCorrect(res.data.isCorrect)

            setTimeout(()=>{
                nextQuestion();
            },1000)

        }catch(err){
            console.log(err);
        }

    }

    useEffect(()=>{
        
        if(isDone) return;

        const interval = setInterval(()=>{

            setElapseTime(
                Math.floor((Date.now() - questionStartTime)/1000)
            )

        },100)

        return ()=>clearInterval(interval);

    },[questionStartTime,isDone])

    useEffect(()=>{
        
        
        const GetQuestion = async ()=>{
            console.log("Use Effect")
            const res = await GetFlashCardQuestions();

            console.log(res.data);

            setFlashCardQuestions(res.data);
            setTotalWords(res.data.length);
            setCurrentWord(res.data[0]);
            setCurrentExpectedAnswer(res.data[0].expected_answer)
            setQuestionStartTime(Date.now());
        }

        GetQuestion();

    },[])

  return (
        <section className="
            flex flex-col flex-1 
            items-center justify-start font-sans 
          bg-white h-full relative py-4 space-y-4 
            w-full  rounded-3xl
        ">
            <div className="text-sm text-gray-500 font-bold text-center flex-row items-center flex justify-arround  px-4 gap-10 w-full">
                <GraduationCap width={55} height={55}/>
                <LoadingBar index={currentIndex} total={totalWords} done={isDone} />
                <TimerIcon elapseTime={elapsedTime} done={isDone}/>
            </div>
            <div className="space-y-4 flex items-center flex-col ">

                
                {currentWord && !isDone &&(
                    <>
                        <FlashCard 
                            hanzi={currentWord?.hanzi ?? ""}
                            pinyin={currentWord?.pinyin ?? ""}
                            meaning={currentWord?.meaning ?? ""}
                            hsk_level={currentWord?.hsk_level ?? ""}
                        />
                        <FlashCardOptions 
                            options = {currentWord.options} 
                            selectedAnswer={selectedAnswer}
                            correctOption = {currentWord.meaning}
                            setAnswer = {SubmitFlashCardAnswer}
                        />
                    </>
                )}

                {isDone && (
                    <div className="text-xl font-bold text-gray-400">Done</div>
                )}
            </div>
        </section>
    );
}



// "use client";

// import { useEffect, useState } from "react";
// import {FlashCard} from "@/components/flash-card/FlashCard"
// import FlashCardOptions from "@/components/flash-card/FlashCardOptions"
// import {words} from "@/components/flash-card/FlashCardOptionsExample"
// import {hanzi,flashCardQuestions,flashCard} from "@/types/flash-card.type"
// import {ButtonNext} from "@/components/ui/Buttons"
// import { GetFlashCardQuestions } from "@/services/flash-card/flash-card.service";
// import { AnswerFlashCardQuestion} from "@/services/flash-card/flash-card-answer.service";

// export default function FlashCardOptionPage() {

//     const[currentIndex, setCurrentIndex] = useState(0);
//     const[totalWords,setTotalWords] = useState(0);

//     const[currentWord,setCurrentWord] = useState<flashCard | undefined>();
//     const[flashCardQuestions , setFlashCardQuestions] = useState<flashCard[]>([]);

//     const [selectedAnswer, setSelectedAnswer] = useState("");
//     const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

//     const nextQuestion =()=>{
//         if(currentIndex < totalWords -1){
//             const nextIndex = currentIndex + 1;
//             setCurrentIndex(nextIndex);
//             setCurrentWord(flashCardQuestions[nextIndex]);        
//         }

//         setSelectedAnswer("");
//         setIsCorrect(null);
//     }

//     const SubmitFlashCardAnswer = async (answer : string)=>{
//         if(!currentWord) return alert("Something is Wrong")
//         setSelectedAnswer(answer);


//     }

//     useEffect(()=>{
        
        
//         const GetQuestion = async ()=>{
//             console.log("Use Effect")
//             const res = await GetFlashCardQuestions();
//             console.log(res.data);
//             setFlashCardQuestions(res.data);
//             setTotalWords(res.data.length);
//             setCurrentWord(res.data[0]);
//         }

//         GetQuestion();

//     },[])

//   return (
//         <section className="
//             flex flex-col flex-1 
//             items-center justify-center font-sans 
//          bg-white h-full 
//             w-full p-8 rounded-3xl
//         ">
//             <div className="space-y-4 flex items-center flex-col">

//                 {currentWord && (
//                     <>
//                         <FlashCard 
//                             hanzi={currentWord?.hanzi ?? ""}
//                             pinyin={currentWord?.pinyin ?? ""}
//                             meaning={currentWord?.meaning ?? ""}
//                             hsk_level={currentWord?.hsk_level ?? ""}
//                         />
//                         <FlashCardOptions 
//                             meanings={currentWord.options} 
//                             correct = {currentWord.meaning}
//                             setAnswer = {setAnswer}
//                         />
//                     </>
//                 )}
//             </div>
//         </section>
//     );
// }
