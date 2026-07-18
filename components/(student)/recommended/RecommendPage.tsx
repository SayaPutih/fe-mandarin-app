"use client";

import { Brain, Clock3 } from "lucide-react";

import { useRecommendation } from "@/hooks/useRecommendation";

import RecommendedHeader from "./RecommendedHeader";
import RecommendationGroup from "./RecommendationGroup";
import RecommendationLoading from "./RecommendationLoading";
import RecommendationEmpty from "./RecommendationEmpty";

export default function RecommendedPage() {
    const {
        loading,
        dueReview,
        lowHalfLife,
    } = useRecommendation();

    return (
        <div className="rounded-2xl bg-white p-4">
            <RecommendedHeader />

            {loading ? (
                <RecommendationLoading />
            ) : dueReview.length === 0 &&
              lowHalfLife.length === 0 ? (
                <RecommendationEmpty />
            ) : (
                <>
                    <RecommendationGroup
                        title="Upcoming Reviews"
                        icon={
                            <Clock3
                                size={16}
                                className="text-blue-600"
                            />
                        }
                        badgeColor="blue"
                        items={dueReview}
                        mode="due"
                        emptyText="No upcoming reviews 🎉"
                    />

                    <RecommendationGroup
                        title="Low Memory Strength"
                        icon={
                            <Brain
                                size={16}
                                className="text-amber-600"
                            />
                        }
                        badgeColor="amber"
                        items={lowHalfLife}
                        mode="half"
                        emptyText="No weak memory words found."
                        withBorder
                    />
                </>
            )}
        </div>
    );
}
