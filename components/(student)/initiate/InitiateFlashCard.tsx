interface Props{
    hanzi : string;
    pinyin : string;
    meaning : string;
    hsk_level : number;
}

export const FlashCard =({
    hanzi,
    pinyin,
    meaning,
    hsk_level,
} : Props)=>{
    return(
        <div className="
            rounded-3xl 
            flex items-center justify-between
            flex-col w-72 h-64 space-y-4 
            bg-white shadow-gray-500 shadow-md
        ">
            <h1 className="
                text-6xl mt-8
            ">{hanzi}</h1>

            <div className="
                flex items-center justify-center 
                flex-col p-2 
            ">
                <p className="text-xl">{pinyin}</p>
                {/* <p className="text-md">{meaning}</p>    */}
            </div> 


            <div className="
                flex flex-row items-center 
                justify-around w-full bg-gray-300
                rounded-b-3xl p-1
            ">
                <p className="
                    text-xs rounded-md 
                    bg-red-200 p-0.5 px-2
                    text-red-600
                ">
                   HSK {hsk_level}</p>

                <p className="
                    text-xs rounded-md 
                    bg-yellow-200 p-0.5 px-2
                    text-yellow-600
                ">HSK {hsk_level}</p>

                <p className="
                    text-xs rounded-md 
                    bg-green-200 p-0.1 px-2
                    text-green-600
                ">HSK {hsk_level}</p>
            </div>
        </div>
    )
}
