"use client";

import RecommendationCarousel from "./RecommendationCarousel";

interface Props {
    title: string;
    icon: React.ReactNode;
    badgeColor: "blue" | "amber";
    items: any[];
    mode: "due" | "half";
    emptyText: string;
    withBorder?: boolean;
}

export default function RecommendationGroup({
    title,
    icon,
    badgeColor,
    items,
    mode,
    emptyText,
    withBorder,
}: Props) {
    return (
        <div
            className={
                withBorder
                    ? "border-t border-zinc-200 pt-8"
                    : "mb-10"
            }
        >
            <div className="mb-4 flex items-center gap-2">
                {icon}

                <h3 className="font-semibold">
                    {title}
                </h3>

                <span
                    className={`rounded-full px-2 py-1 text-[10px]
                    ${
                        badgeColor === "blue"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-amber-50 text-amber-600"
                    }`}
                >
                    {items.length}
                </span>
            </div>

            {items.length === 0 ? (
                <div className="rounded-xl border border-dashed p-6 text-center text-sm text-zinc-500">
                    {emptyText}
                </div>
            ) : (
                <RecommendationCarousel
                    items={items}
                    mode={mode}
                />
            )}
        </div>
    );
}