interface Props{
    hanzi : string;
    pinyin : string;
    meaning : string;
    hsk_level : number;
    difficulty : number;
}

export const FlashCard =({
    hanzi,
    pinyin,
    meaning,
    hsk_level,
    difficulty,
} : Props)=>{

    

    const getDifficultyInfo = (difficulty:number) => {

        if (difficulty < -0.75)
            return {
                label: "Easy",
                color: "bg-green-100 text-green-700"
            };

        if (difficulty < 0.5)
            return {
                label: "Medium",
                color: "bg-blue-100 text-blue-700"
            };

        if (difficulty < 1.5)
            return {
                label: "Hard",
                color: "bg-orange-100 text-orange-700"
            };

        return {
            label: "Expert",
            color: "bg-red-100 text-red-700"
        };
    };
    const diffInfo = getDifficultyInfo(difficulty);

    const getLevelColor = (level: number) => {

        if (level >= 6)
            return "bg-red-100 text-red-700";

        if (level >= 5)
            return "bg-orange-100 text-orange-700";

        if (level >= 4)
            return "bg-yellow-100 text-yellow-700";

        if (level >= 3)
            return "bg-green-100 text-green-700";

        if (level >= 2)
            return "bg-blue-100 text-blue-700";

        return "bg-purple-100 text-purple-700";
    };

    // const hanziNoWanted = ["我","我"]
    // const hanziWarning =(word : string)=>{
    //     if(hanziNoWanted.includes(word)) return "text-red-500";
    //     return "text-green-500";
    // }

    //Eva : ALbert,kerlyn,evander,vayung,fikri,indah
    //Ton : Tony,Credi,Jojo,Heryihanti,Joshia,kendy
    //Vir : Virgi,Yulianto,tristan

    return(
        <div className="
            rounded-3xl 
            flex items-center justify-between
            flex-col w-72 h-64 space-y-4 
            bg-white shadow-gray-500 shadow-md
        ">
            <h1 className={`text-6xl mt-8`}>{hanzi}</h1>

            <div className="
                flex items-center justify-center 
                flex-col p-2 
            ">
                <p className="text-xl">{pinyin}</p>
                <p className="text-md">{meaning}</p>   
            </div> 


            <div className="
                flex flex-row items-center 
                justify-around w-full bg-gray-300
                rounded-b-3xl p-1
            ">

                <p className={`
                    text-xs rounded-md 
                     p-0.1 px-2
                    ${getLevelColor(hsk_level)}
                `}>HSK {hsk_level == 7 ? "+7" : hsk_level}</p>


                <p className={`
                    text-xs rounded-md p-0.5 px-2
                    ${diffInfo.color}
                `}>
                    {diffInfo.label}</p>
            </div>
        </div>
    )
}
