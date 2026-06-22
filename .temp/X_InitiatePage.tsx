// "use client";

// import { useEffect, useState } from "react";
// import {useRouter} from "next/navigation";
// import { GetFlashCardInitiateQuestion } from "@/services/flash-card/flash-card-question.service";
// import { flashCard,flashCardQuestions } from "@/types/flash-card.type";
// import { AnswerFlashCardQuestion } from "@/services/flash-card/flash-card-answer.service";
// import InitiatePreview from "./InitiatePreview";
// import FlashCardReviewPage from "./flash-card/FlashCardMultipleChoice";
// import { Mode } from "fs";

// export default function InitiatePage() {
    
//     const [mode, setMode] = useState<"start" | "question" | "result">("start");

//     const [questions,setQuestions] = useState<flashCard[]>([])

//     const router = useRouter();
//     const getFlashCardQuestions = async ()=>{
//         const result = await GetFlashCardInitiateQuestion();
//         setQuestions(result.data)
//     }

//     const nextMode =()=>{
//       setMode("question")
//     }

//     useEffect(() => {

//       const token = localStorage.getItem("token");
    
//       if (!token) {

//         router.replace("/login");
//         return;

//       }
    
//       try {
//         const payload = JSON.parse(atob(token.split(".")[1]));
    
//         const currentTime = Math.floor(Date.now() / 1000);
    
//         if (payload.exp && payload.exp < currentTime) {
//             localStorage.removeItem("token");
//             router.replace("/login");
//         }

//         if(token){
//           getFlashCardQuestions();
//         }

//       } catch (error) {

//         console.error("Invalid token:", error);
//         localStorage.removeItem("token");
//         router.replace("/login");

//       }

//     }, [router]);

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

//           {mode == "start" ? (
//               <InitiatePreview onClick={()=>nextMode()} />
//           ) : ( 
//            mode == "question" ? (
//               <FlashCardReviewPage 
//                  flashCardBank={questions}
//               />
//           ) : (
//               <div>Question</div>
//           ))}
            
//         </section>
//     );
// }