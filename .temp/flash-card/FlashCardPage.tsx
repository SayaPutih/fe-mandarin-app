// "use client";

// import { useEffect, useState } from "react";

// import { GetFlashCardSingleQuestion } from "@/services/flash-card/flash-card-question.service";
// import { AnswerFlashCardQuestion } from "@/services/flash-card/flash-card-answer.service";
// import {GetFlashCardReviewQuestions} from "@/services/flash-card/flash-card-review.service.js";

// import {PreviewModal} from "@/components/ui/Modals";
// import { flashCard } from "@/types/flash-card.type";

// import FlashCardWordPreview from "./FlashCardWordPreview";
// import FlashCardWordQuestion from "./FlashCardWordQuestion";

// import { TimerIcon } from "../../ui/Timer";

// import { GraduationCap } from "lucide-react";

// export default function FlashCardPage() {
    
//     const [mode, setMode] = useState<"start" | "preview" | "question">("preview");
//     const [isSubmitting, setIsSubmiting] = useState(false);
//     const [currentWord, setCurrentWord] = useState<flashCard>();
//     const [currentExpectedAnswer, setCurrentExpectedAnswer] = useState("");
//     const [selectedAnswer, setSelectedAnswer] = useState("");
//     const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//     const [showResult, setShowResult] = useState(false);
//     const [questionStartTime, setQuestionStartTime] = useState(() => Date.now());
//     const [elapsedTime, setElapsedTime] = useState(0);
//     const [showPreview, setShowPreview] = useState(true);

//     const LoadQuestion = async () => {
//         try {
//             const res =
//                 await GetFlashCardSingleQuestion();

//             const question = res.data;

//             setCurrentWord(question);

//             setCurrentExpectedAnswer(
//                 question.expected_answer
//             );

//             setSelectedAnswer("");

//             setIsCorrect(null);

//             setShowResult(false);

//             setMode("preview");
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     const ContinueToPreview = () => {
//         setMode("preview");
//     };

//     const ContinueToQuestion = () => {
//         setMode("question");
//         setQuestionStartTime(Date.now());
//     };

//     const SubmitFlashCardAnswer = async (
//         answer: string
//     ) => {
//         if (!currentWord) return;

//         try {
//             setIsSubmiting(true);
//             setSelectedAnswer(answer);

//             const res =
//                 await AnswerFlashCardQuestion({
//                     wordId: currentWord.id,
//                     answer,
//                     expected_answer:
//                         currentExpectedAnswer,
//                     answerTimeMs:
//                         Date.now() -
//                         questionStartTime,
//                 });

//             //console.log(res.data.isCorrect);

//             setIsCorrect(res.data.isCorrect);
//             setShowResult(true);
            
//             setTimeout(()=>{
//                 setShowResult(true);
//             },1500)
//         } catch (err) {
//             console.log(err);
//         }finally{
//             setIsSubmiting(false);
//         }
//     };

//     const FinishLearningSession = async ()=>{
//         try{

//             const review = await GetFlashCardReviewQuestions();
//             if (review.hasReview) {

//                 window.location.href =  "/review";

//                 return;
//             }

//             window.location.href =  "/review";

//         }catch(err){
//             console.log(err);
//             window.location.href =  "/home";
//         }
//     }

//     useEffect(() => {
//         setMode("start");
//         LoadQuestion();
//     }, []);

//     useEffect(() => {
//         if (
//             mode !== "question" ||
//             isSubmitting ||
//             showResult
//         )
//             return;

//         const interval = setInterval(() => {
//             setElapsedTime(
//                 Math.floor(
//                     (Date.now() -
//                         questionStartTime) /
//                         1000
//                 )
//             );
//         }, 100);

//         return () => clearInterval(interval);
//     }, [
//         questionStartTime,
//         mode,
//         isSubmitting,
//         showResult,
//     ]);

//     return (
//         <section
//             className="
//                 flex flex-col flex-1
//                 items-center justify-start
//                 font-sans
//                 bg-white
//                 h-full
//                 relative
//                 py-4
//                 space-y-4
//                 w-full
//                 rounded-3xl
//             "
//         >
//             <div
//                 className="
//                     text-sm
//                     text-gray-500
//                     font-bold
//                     text-center
//                     flex
//                     items-center
//                     justify-between
//                     px-8
//                     w-full
//                 "
//             >
//                 <GraduationCap
//                     width={55}
//                     height={55}
//                 />

//                 <TimerIcon
//                     elapseTime={elapsedTime}
//                     done={false}
//                 />
//             </div>

//             <div
//                 className="
//                     flex flex-col
//                     items-center
//                     justify-center
//                     w-full
//                     flex-1
//                     gap-6
//                     px-8
//                 "
//             >
//                 {showPreview && (
//                         <PreviewModal
//                             onFinish={() => {
//                                 setShowPreview(false);
//                                 ContinueToPreview();
//                             }}
//                         />
//                     )}

//                 {currentWord &&
//                     mode === "preview" &&
//                     !showResult && (
//                         <FlashCardWordPreview
//                             hanzi={currentWord.hanzi}
//                             pinyin={currentWord.pinyin}
//                             meaning={currentWord.meaning}
//                             hsk_level={
//                                 currentWord.hsk_level
//                             }
//                             onContinue={
//                                 ContinueToQuestion
//                             }
//                         />
//                     )}

//                 {currentWord &&
//                     mode === "question" &&
//                     !showResult &&
//                     !isSubmitting &&  (
//                         <FlashCardWordQuestion
//                             currentWord={
//                                 currentWord
//                             }
//                             currentExpectedAnswer={
//                                 currentExpectedAnswer
//                             }
//                             selectedAnswer={
//                                 selectedAnswer
//                             }
//                             SubmitFlashCardAnswer={
//                                 SubmitFlashCardAnswer
//                             }
//                         />
//                     )}

//                     {isSubmitting && (
//                         <div
//                             className="
//                                 flex flex-col
//                                 items-center
//                                 justify-center
//                                 gap-6
//                                 flex-1
//                             "
//                         >
//                             <div
//                                 className="
//                                     h-20 w-20
//                                     rounded-full
//                                     border-4
//                                     border-gray-200
//                                     border-t-black
//                                     animate-spin
//                                 "
//                             />

//                             <div className="text-center">
//                                 <h2 className="text-2xl font-bold">
//                                     Updating Memory Model
//                                 </h2>

//                                 <p className="text-gray-500 mt-2">
//                                     Calculating next review schedule...
//                                 </p>
//                             </div>
//                         </div>
//                     )}

//                 {showResult && (
//                     <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-lg">
//                         <div className={`flex h-24 w-24 items-center justify-center rounded-full text-5xl ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
//                             {isCorrect ? "🎉" : "📚"}
//                         </div>

//                         <div className="text-center">
//                             <h1 className={`text-4xl font-bold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
//                                 {isCorrect ? "Correct!" : "Wrong Answer"}
//                             </h1>

//                             <p className="mt-2 text-gray-500">
//                                 {isCorrect
//                                     ? "Great job! Keep going."
//                                     : "Don't worry, you'll see this word again."}
//                             </p>
//                         </div>

//                         <div className="w-full rounded-2xl bg-gray-50 p-4 text-center">
//                             <p className="text-sm text-gray-500">
//                                 Correct Meaning
//                             </p>

//                             <h2 className="mt-1 text-2xl font-semibold text-gray-800">
//                                 {currentExpectedAnswer}
//                             </h2>
//                         </div>

//                         <div className="flex w-full flex-row gap-3 ">
                            

//                             <button
//                                 onClick={() => FinishLearningSession()}
//                                 className="w-full rounded-xl border border-gray-900 bg-white py-3 font-medium text-gray-700 transition hover:bg-gray-50"
//                             >
//                                 Finish Session
//                             </button>
//                             <button
//                                 onClick={LoadQuestion}
//                                 className="w-full rounded-xl bg-black py-3 font-medium text-white transition hover:scale-[1.02]"
//                             >
//                                 Continue Learning
//                             </button>
//                         </div>

//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }