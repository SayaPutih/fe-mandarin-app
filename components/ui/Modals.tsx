"use client";
import { useState } from "react";
import { slides,initiateSlides } from "@/data/constant/slides";
import Image from "next/image";


interface ErrorModalProps {
    msg: string;
    onClick: () => void;
}

export function ErrorModal({
    msg,
    onClick,
}: ErrorModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-xl font-semibold text-red-600">
                    Error
                </h2>

                <p className="mt-3 text-slate-600">
                    {msg}
                </p>

                <button
                    onClick={onClick}
                    className="mt-6 w-full rounded-lg bg-red-500 py-2 text-white transition hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
}


interface PreviewModalProps {
    onFinish: () => void;
}

export function PreviewModal({
    onFinish,
}: PreviewModalProps) {
    const [currentSlide, setCurrentSlide] =
        useState(0);

    const isLastSlide =
        currentSlide === slides.length - 1;

    const slide = slides[currentSlide];

    return (
        <div
            className="
                p-4
                fixed inset-0 z-50
                flex items-center justify-center
                bg-black/50
            "
        >
            <div
                className="
                    w-full max-w-xl
                    rounded-3xl
                    bg-white
                    p-8
                    shadow-2xl
                "
            >
                <Image
                    src={slide.image}
                    alt={slide.title}
                    className="
                        h-64 w-full
                        rounded-2xl
                        object-contain 
                        aspect-video
                    "
                />

                <h1
                    className="
                        mt-6
                        text-3xl
                        font-bold
                    "
                >
                    {slide.title}
                </h1>

                <p
                    className="
                        mt-3
                        text-gray-500
                    "
                >
                    {slide.description}
                </p>

                <div
                    className="
                        mt-6
                        flex
                        justify-center
                        gap-2
                    "
                >
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`
                                h-2
                                rounded-full
                                transition-all
                                ${
                                    currentSlide ===
                                    index
                                        ? "w-8 bg-black"
                                        : "w-2 bg-gray-300"
                                }
                            `}
                        />
                    ))}
                </div>

                <div
                    className="
                        mt-8
                        flex
                        justify-between
                    "
                >
                    <button
                        disabled={
                            currentSlide === 0
                        }
                        onClick={() =>
                            setCurrentSlide(
                                currentSlide - 1
                            )
                        }
                        className="
                            rounded-xl
                            bg-gray-200
                            px-5 py-2
                            disabled:opacity-50
                        "
                    >
                        Back
                    </button>

                    {isLastSlide ? (
                        <button
                            onClick={onFinish}
                            className="
                                rounded-xl
                                bg-black
                                px-5 py-2
                                text-white
                            "
                        >
                            Get Started
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                setCurrentSlide(
                                    currentSlide + 1
                                )
                            }
                            className="
                                rounded-xl
                                bg-black
                                px-5 py-2
                                text-white
                            "
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export function InitiatePreviewModal({
    onFinish,
}: PreviewModalProps) {
    const [currentSlide, setCurrentSlide] =
        useState(0);

    const isLastSlide =
        currentSlide === initiateSlides.length - 1;

    const slide = initiateSlides[currentSlide];

    return (
        <div
            className="
                p-4
                fixed inset-0 z-50
                flex items-center justify-center
                bg-black/50
            "
        >
            <div
                className="
                    w-full max-w-xl
                    rounded-3xl
                    bg-white
                    p-8
                    shadow-2xl
                "
            >
                <div className="flex justify-center">
                    {slide.image ? (
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            className="
                                h-64
                                w-full
                                object-contain
                            "
                        />
                    ) : (
                        <div
                            className="
                                flex
                                h-64
                                items-center
                                justify-center
                            "
                        >
                            <h2
                                className="
                                    text-6xl
                                    font-bold
                                "
                            >
                                ⏳
                            </h2>
                        </div>
                    )}
                </div>

                <h1
                    className="
                        mt-6
                        text-3xl
                        font-bold
                    "
                >
                    {slide.title}
                </h1>

                <p
                    className="
                        mt-3
                        text-gray-500
                    "
                >
                    {slide.description}
                </p>

                <div
                    className="
                        mt-6
                        flex
                        justify-center
                        gap-2
                    "
                >
                    {initiateSlides.map((_, index) => (
                        <div
                            key={index}
                            className={`
                                h-2
                                rounded-full
                                transition-all
                                ${
                                    currentSlide ===
                                    index
                                        ? "w-8 bg-black"
                                        : "w-2 bg-gray-300"
                                }
                            `}
                        />
                    ))}
                </div>

                <div
                    className="
                        mt-8
                        flex
                        justify-between
                    "
                >
                    <button
                        disabled={
                            currentSlide === 0
                        }
                        onClick={() =>
                            setCurrentSlide(
                                currentSlide - 1
                            )
                        }
                        className="
                            rounded-xl
                            bg-gray-200
                            px-5 py-2
                            disabled:opacity-50
                        "
                    >
                        Back
                    </button>

                    {isLastSlide ? (
                        <button
                            onClick={onFinish}
                            className="
                                rounded-xl
                                bg-black
                                px-5 py-2
                                text-white
                            "
                        >
                            Get Started
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                setCurrentSlide(
                                    currentSlide + 1
                                )
                            }
                            className="
                                rounded-xl
                                bg-black
                                px-5 py-2
                                text-white
                            "
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}