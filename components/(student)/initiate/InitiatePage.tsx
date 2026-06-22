"use client";

import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";

import InitiatePreview from "./InitiatePreview";
import InitiateFlashCard from "./InitiateFlashCardBatch";

export default function InitiatePage() {
    
    const [mode, setMode] = useState<"start" | "question" | "result">("start");
    const router = useRouter();
    
    const nextMode =()=>{
      setMode("question")
    }

    useEffect(() => {

      const token = localStorage.getItem("token");
    
      if (!token) {

        router.replace("/login");
        return;

      }
    
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
    
        const currentTime = Math.floor(Date.now() / 1000);
    
        if (payload.exp && payload.exp < currentTime) {
            localStorage.removeItem("token");
            router.replace("/login");
        }

      } catch (error) {

        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        router.replace("/login");

      }

    }, [router]);

    return (
        <section
            className="
                flex flex-col flex-1
                items-center justify-start
                font-sans
                bg-white
                h-full
                relative
                py-4
                space-y-4
                w-full
                rounded-3xl
            "
        >

          {mode == "start" ? (
              <InitiatePreview onClick={()=>nextMode()} />
          ) : ( 
           mode == "question" ? (
              <InitiateFlashCard  />
          ) : (
              <div>Question</div>
          ))}
            
        </section>
    );
}