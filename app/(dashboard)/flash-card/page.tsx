"use client";

import { useEffect, useState } from "react";
import {FlashCard} from "@/components/flash-card/Card"
import FlashCardOptions from "@/components/flash-card/Options"
import FlashCardOptionPage from "@/components/flash-card/FlashCardPage";

export default function FlashCardPage() {

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

    <FlashCardOptionPage />

        // <div className="flex flex-col flex-1 items-center justify-center    font-sans dark:bg-black bg-white h-full w-full p-8 rounded-3xl">
        // <main className="space-y-4 w-1/2 flex items-center justify-center flex-col">
        //     <FlashCard 
        //         hanzi="丑人"
        //         pinyin="Hello"
        //         meaning="Hello"
        //     />
        //     <FlashCardOptions />
        // </main>
        // </div>
    );
}
