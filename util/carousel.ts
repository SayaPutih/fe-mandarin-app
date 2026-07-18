import React from "react";

export const scrollLeft = (
    ref: React.RefObject<HTMLDivElement | null>
) => {
    ref.current?.scrollBy({
        left: -700,
        behavior: "smooth",
    });
};

export const scrollRight = (
    ref: React.RefObject<HTMLDivElement | null>
) => {
    ref.current?.scrollBy({
        left: 700,
        behavior: "smooth",
    });
};