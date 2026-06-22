"use client";

import { flashCard } from "@/types/flash-card.type";
import { ButtonPrimary } from "@/components/ui/Buttons";

interface Props {
    flashCardReviewBatchProps: flashCard[];
    onClick: () => void;
}

export default function FlashCardReviewPreview({
    flashCardReviewBatchProps,
    onClick,
}: Props) {

    return (
        <section
            className="
                flex flex-col
                w-full h-full
                px-4 py-5
                bg-white
                rounded-3xl
            "
        >
            {/* Header */}
            <div className="text-center space-y-1">
                <h1 className="text-xl font-bold">
                    Review Session
                </h1>

                <p className="text-sm text-gray-500">
                    Time To Review.
                </p>
            </div>

            {/* Stats */}
            <div
                className="
                    mt-4
                    border rounded-xl
                    p-4
                    flex justify-between items-center
                    bg-gray-50
                "
            >
                <div>
                    <p className="text-xs text-gray-500">
                        Words Need Reviewing
                    </p>

                    <h2 className="text-2xl font-bold">
                        {flashCardReviewBatchProps.length}
                    </h2>
                </div>

                <span className="text-3xl">📚</span>
            </div>


            <div className="flex-1 mt-4 overflow-y-auto">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {flashCardReviewBatchProps.map((card) => (
                        <div
                            key={card.hanzi}
                            className="
                                border rounded-lg
                                p-2
                                text-center
                                hover:bg-gray-50
                            "
                        >
                            <p className="text-lg font-semibold">
                                {card.hanzi}
                            </p>

                            <p className="text-[11px] text-gray-800 truncate">
                                {card.pinyin}
                            </p>

                            <p className="text-[10px] text-gray-500 truncate">
                                {card.expected_answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4 items-end flex flex-row sm:justify-center justify-end">
                {/* <div
                    className="
                        bg-blue-50
                        border border-blue-100
                        rounded-lg
                        p-3
                        mb-3
                    "
                >
                    <p className="text-xs text-blue-700">
                        Ingat arti dan pelafalan sebelum membuka jawaban.
                    </p>
                </div> */}

                <ButtonPrimary
                    label={`Start Reviewing`}
                    onClick={onClick}
                />
            </div>
        </section>
    );
}