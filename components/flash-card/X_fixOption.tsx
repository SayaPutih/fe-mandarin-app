"use client";

interface Props {
    options: string[];
    selectedAnswer: string;
    correctOption: string;
    setAnswer: (value: string) => void;
}

const FlashCardOptions = ({
    options,
    selectedAnswer,
    correctOption,
    setAnswer,
}: Props) => {

    const getColor = (
        option: string
    ) => {

        if (!selectedAnswer) {
            return "bg-gray-300";
        }

        // jawaban benar
        if (
            option === correctOption
        ) {
            return "bg-green-500 text-white";
        }

        // jawaban yang dipilih user
        // tapi salah
        if (
            option === selectedAnswer &&
            selectedAnswer !== correctOption
        ) {
            return "bg-red-500 text-white";
        }

        return "bg-gray-300";
    };

    return (
        <div
            className="
                grid
                grid-cols-2
                gap-2
                flex-1
                w-full
                p-2
                
            "
        >
            {options.map((option) => (

                <button
                    key={option}

                    disabled={
                        !!selectedAnswer
                    }

                    onClick={() =>
                        setAnswer(option)
                    }

                    className={`
                        rounded-md
                        py-3
                        px-8
                        shadow-md
                        transition-all
                        cursor-pointer
                        ${getColor(option)}
                    `}
                >
                    {option}
                </button>

            ))}
        </div>
    );
};

export default FlashCardOptions;