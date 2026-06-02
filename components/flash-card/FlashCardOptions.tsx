"use client";

import { useEffect, useState } from "react";

interface Props{
    options : string[];
    selectedAnswer : string;
    correctOption : string;
    setAnswer : (value : string) => void;
}


const FlashCardOptions =({
    options,
    selectedAnswer,
    correctOption,
    setAnswer,
} : Props)=> {

    const getColor = (option : string)=>{
        if(!selectedAnswer) return "bg-gray-300";
        if(option === correctOption) return "bg-green-300 text-white";
        if(option !== correctOption) return "bg-red-300 text-white";
        return "bg-gray-300"
    }

  return (
    <div className="grid grid-cols-2 gap-4 flex-1 w-full p-2">
        {options.map((a)=>
            <button 
                key={a}  
                disabled={!!selectedAnswer}
                onClick={()=>setAnswer(a)}
                className={`
                    shadow-gray-200 rounded-md py-2
                    px-8 bg-gray-300 shadow-md 
                    text-gray-700 cursor-pointer
                    transition-all duration-300
                    hover:scale-102 active:scale-95
                    ${getColor(a)}
                `}
            >
                {a}
            </button>    
        )}  
    </div>
  );
}

export default FlashCardOptions;

// export default FlashCardOptions;"


// "use client";

// import { useEffect, useState } from "react";

// interface Props{
//     meanings : string[];
//     correct : string;
//     setAnswer : (value : string) => void;
// }

// const Options=({
//     label,
//     onClick, 
// } : {
//     label:string;
//     onClick : () => void;
// })=>{
//     return (
//         <div 
//             onClick={onClick}
//             className="
//                 shadow-gray-200 rounded-md py-2
//                 px-8 bg-gray-300 shadow-md 
//                 active : bg-green
//             "
//         >
//             <h1 className="text-gray-700 ">{label}</h1>
//         </div>
//     );
// } 

// const FlashCardOptions =({
//     meanings,
//     correct,
//     setAnswer,
// } : Props)=> {
//   return (
//     <div className="grid grid-cols-2 gap-2 flex-1 w-full p-2">
//         {meanings.map((a)=>
//             <Options 
//                 key={a} 
//                 label={a} 
//                 onClick={()=>setAnswer(a)}
//             />    
//         )}  
//     </div>
//   );
// }


// export default FlashCardOptions;