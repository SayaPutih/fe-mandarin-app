"use client";

import {
    useEffect,
    useState,
} from "react";

import { getRecom } from "@/services/student/recom.service";

export function useRecommendation() {
    const [dueReview, setDueReview] =
        useState<any[]>([]);

    const [
        lowHalfLife,
        setLowHalfLife,
    ] = useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data =
                await getRecom();

            if (data?.data) {
                setDueReview(
                    data.data.dueReview || []
                );

                setLowHalfLife(
                    data.data.lowHalfLife || []
                );
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    return {
        dueReview,
        lowHalfLife,
        loading,
    };
}