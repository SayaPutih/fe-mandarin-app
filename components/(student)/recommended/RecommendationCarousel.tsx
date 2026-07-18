"use client";

import { useRef } from "react";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { MainCardWithHalf } from "../Card/Card";

import {
    scrollLeft,
    scrollRight,
} from "@/util/carousel";

interface Props {
    items: any[];
    mode: "due" | "half";
}

export default function RecommendationCarousel({
    items,
    mode,
}: Props) {
    const ref =
        useRef<HTMLDivElement>(null);

    return (
        <div className="relative">
            <button
                onClick={() =>
                    scrollLeft(ref)
                }
                className="absolute -left-7 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-white p-2 shadow-md hover:bg-zinc-100"
            >
                <ChevronLeft size={18} />
            </button>

            <button
                onClick={() =>
                    scrollRight(ref)
                }
                className="absolute -right-7 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-white p-2 shadow-md hover:bg-zinc-100"
            >
                <ChevronRight size={18} />
            </button>

            <div
                ref={ref}
                className="flex gap-4 overflow-x-auto hide-scrollbar px-4 py-2"
            >
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="w-[220px] shrink-0 sm:w-[250px]"
                    >
                        <MainCardWithHalf
                            item={item}
                            mode={mode}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}