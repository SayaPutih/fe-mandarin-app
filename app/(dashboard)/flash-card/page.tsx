"use client";

import { useEffect, useState } from "react";

import FlashCardRLearningPage from "@/components/(student)/learning/FlashCardLearningPage";

interface Props{
  cheatLevel : number;
}

export default function FlashCardPage({
  cheatLevel 
} : Props) {

  const [] = useState([]);

  const [token, setToken] = useState("");

//   useEffect(() => {
//     const storedToken = window.localStorage.getItem("token");

//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

  return (
    // <div className="flex flex-col flex-1 items-center justify-center  font-sans dark:bg-black bg-white h-full w-full p-8 rounded-3xl">
    //   <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16  dark:bg-black sm:items-start">
    //     <FlashCard 
    //         hanzi="丑人"
    //         pinyin="Hello"
    //         meaning="Hello"
    //     />
    //     <FlashCardOptions />
    //   </main>
    // </div>

      <FlashCardRLearningPage hskLevel={1}/>
    );
}
