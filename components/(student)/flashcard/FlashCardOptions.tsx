"use client";

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

    const getColor = (option: string) => {
        if (!selectedAnswer)
            return "bg-gray-300";

        const isSelected =
            option === selectedAnswer;

        const isCorrect =
            option === correctOption;

        if (isCorrect)
            return "bg-green-300 text-green-900";

        if (isSelected)
            return "bg-red-300 text-red-900";

        return "bg-gray-300";
    };

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
