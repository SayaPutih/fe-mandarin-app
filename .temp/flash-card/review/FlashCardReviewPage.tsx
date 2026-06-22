// "use client";

// import { useEffect, useState } from "react";

// import { flashCard } from "@/types/flash-card.type";
// import Link from "next/link";
// import { AnswerFlashCardQuestion } from "@/services/flash-card/flash-card-answer.service";
// import { GetFlashCardReviewQuestions } from "@/services/flash-card/flash-card-review.service";

// import {ButtonPrimary,ButtonSecondary} from "@/components/ui/Buttons";

// import FlashCardWordPreview from "@/components/(student)/flash-card/FlashCardWordPreview";
// import FlashCardWordQuestion from "@/components/(student)/flash-card/FlashCardWordQuestion";

// import { TimerIcon } from "../../../ui/Timer";
// import { LoadingBar } from "../../../ui/Loading";

// import { GraduationCap } from "lucide-react";

// export default function FlashCardReviewPage() {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [totalWords, setTotalWords] = useState(0);

//     const [isDone, setIsDone] = useState(false);
//     const [needReview, setNeedReview] = useState(false);

//     const [flashCardQuestions, setFlashCardQuestions] = useState<flashCard[]>([]);

//     const [currentWord, setCurrentWord] = useState<flashCard>();
//     const [currentExpectedAnswer, setCurrentExpectedAnswer] = useState("");

//     const [selectedAnswer, setSelectedAnswer] = useState("");
//     const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

//     const [mode, setMode] = useState<"preview" | "question">("preview");

//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const [questionStartTime, setQuestionStartTime] = useState(() => Date.now());
//     const [elapsedTime, setElapsedTime] = useState(0);

//     const nextQuestion = () => {
//         if (currentIndex >= totalWords - 1) {
//             setIsDone(true);
//             return;
//         }

//         const nextIndex = currentIndex + 1;

//         setCurrentIndex(nextIndex);

//         setCurrentWord(
//             flashCardQuestions[nextIndex]
//         );

//         setCurrentExpectedAnswer(
//             flashCardQuestions[nextIndex]
//                 .expected_answer
//         );

//         setSelectedAnswer("");
//         setIsCorrect(null);

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
//             setIsSubmitting(true);

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

//             setIsCorrect(
//                 res.data.isCorrect
//             );

//             setTimeout(() => {
//                 nextQuestion();
//             }, 1000);
//         } catch (err) {
//             console.log(err);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     useEffect(() => {
//         if (
//             mode !== "question" ||
//             isSubmitting ||
//             isDone
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
//         mode,
//         questionStartTime,
//         isSubmitting,
//         isDone,
//     ]);

//     useEffect(() => {
//         const LoadReviewQuestions =
//             async () => {
//                 try {
//                     const res =
//                         await GetFlashCardReviewQuestions();

//                     setNeedReview(
//                         res.hasReview
//                     );

//                     if (
//                         !res.hasReview ||
//                         !res.data?.length
//                     )
//                         return;

//                     setFlashCardQuestions(
//                         res.data
//                     );

//                     setTotalWords(
//                         res.data.length
//                     );

//                     setCurrentWord(
//                         res.data[0]
//                     );

//                     setCurrentExpectedAnswer(
//                         res.data[0]
//                             .expected_answer
//                     );

//                     setMode("preview");
//                 } catch (err) {
//                     console.log(err);
//                 }
//             };

//         LoadReviewQuestions();
//     }, []);

//     return (
//         <section
//             className="
//                 flex flex-col flex-1
//                 items-center justify-start
//                 font-sans
//                 bg-white
//                 h-full relative
//                 py-4 space-y-4
//                 w-full rounded-3xl
//             "
//         >
//             {!needReview ? (
//                 <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
//                     <h1 className="text-2xl font-bold text-gray-800 mb-2">
//                         Nothing to be Reviewed!
//                     </h1>

//                     <p className="text-gray-500 mb-6 max-w-md">
//                         Great job! You don't have any flashcards that need review right now.
//                         Come back later to continue strengthening your memory.
//                     </p>

//                     <ButtonPrimary
//                         label="Back To Home"
//                         onClick={()=>(window.location.href="/home")}
//                     />
//                 </div>
//             ) : (
//                 <>
//                     <div
//                         className="
//                             text-sm text-gray-500
//                             font-bold text-center
//                             flex items-center flex-row
//                             justify-between gap-8
//                             px-8 w-full
//                         "
//                     >
//                         <GraduationCap
//                             width={55}
//                             height={55}
//                         />

//                         <LoadingBar
//                             index={currentIndex}
//                             total={totalWords}
//                             done={isDone}
//                         />

//                         <TimerIcon
//                             elapseTime={
//                                 elapsedTime
//                             }
//                             done={isDone}
//                         />
//                     </div>

//                     <div
//                         className="
//                             flex flex-col
//                             items-center
//                             justify-center
//                             w-full flex-1
//                             gap-6 px-8
//                         "
//                     >
//                         {currentWord &&
//                             !isDone &&
//                             mode ===
//                                 "preview" && (
//                                 <FlashCardWordPreview
//                                     hanzi={
//                                         currentWord.hanzi
//                                     }
//                                     pinyin={
//                                         currentWord.pinyin
//                                     }
//                                     meaning={
//                                         currentWord.meaning
//                                     }
//                                     hsk_level={
//                                         currentWord.hsk_level
//                                     }
//                                     onContinue={
//                                         ContinueToQuestion
//                                     }
//                                 />
//                             )}

//                         {currentWord &&
//                             !isDone &&
//                             mode ===
//                                 "question" &&
//                             !isSubmitting && (
//                                 <FlashCardWordQuestion
//                                     currentWord={
//                                         currentWord
//                                     }
//                                     currentExpectedAnswer={
//                                         currentExpectedAnswer
//                                     }
//                                     selectedAnswer={
//                                         selectedAnswer
//                                     }
//                                     SubmitFlashCardAnswer={
//                                         SubmitFlashCardAnswer
//                                     }
//                                 />
//                             )}

//                         {isSubmitting && (
//                             <div
//                                 className="
//                                     flex flex-col
//                                     items-center
//                                     justify-center
//                                     gap-6 flex-1
//                                 "
//                             >
//                                 <div
//                                     className="
//                                         h-20 w-20
//                                         rounded-full
//                                         border-4
//                                         border-gray-200
//                                         border-t-black
//                                         animate-spin
//                                     "
//                                 />

//                                 <div className="text-center">
//                                     <h2 className="text-2xl font-bold">
//                                         Updating Memory
//                                         Model
//                                     </h2>

//                                     <p className="text-gray-500 mt-2">
//                                         Calculating next
//                                         review
//                                         schedule...
//                                     </p>
//                                 </div>
//                             </div>
//                         )}

//                         {isDone && (
//                             <div
//                                 className="
//                                     flex flex-col
//                                     items-center
//                                     justify-center
//                                     gap-4
//                                 "
//                             >
//                                 <h1 className="text-3xl font-bold">
//                                     🎉 Review
//                                     Complete
//                                 </h1>

//                                 <p className="text-gray-500">
//                                     All scheduled
//                                     reviews have
//                                     been completed.
//                                 </p>
//                             </div>
//                         )}
//                     </div>
//                 </>
//             )}
//         </section>
//     );
// }