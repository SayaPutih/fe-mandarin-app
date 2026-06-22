"use client"

import React,{useState,useEffect} from "react";
import { ButtonSubmit } from "@/components/ui/Buttons";
import {TextArea} from "@/components/ui/Input";

interface Props{
    submit : ()=>void;
}

const SentencePracticeForm =()=>{

    const [answer ,setAnswer] = useState("")

    const handleSubmit =(
        e:React.FormEvent<HTMLFormElement>
    )=>{
        e.preventDefault();
        console.log(answer);
    }

    return(
        <div className="
            w-full flex items-center justify-center px-8 border border-slate-300
            rounded-xl max-w-2xl flex-col py-4 space-y-4
            
        ">
            <h1 className="self-start text-slate-500 font-bold text-xl">Input English Translation</h1>

            <form
                onSubmit={handleSubmit}
                className="w-full  space-y-4  flex items-center justify-center flex-col"
            >
                <TextArea 
                    value={answer}
                    onChange={(e)=>setAnswer(e.target.value)}
                />
                
                <div className="self-end">
                    <ButtonSubmit label="Submit" onClick={()=>console.log("clicked")}/>
                </div>

            </form>
        </div>
    )
}

export default SentencePracticeForm;