"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {LoadingSpinner} from "@/components/ui/Loading";
import RecomendedSection from "@/components/(student)/recommended/RecommendPage";
import {
  getStudentReviewedWords,
} from "@/services/student/student.service";

export default function ReviewWordsPage() {
    const router = useRouter();
  const [words, setWords] = useState<any[]>([]);
  const [loading, setLoading] =
    useState(true);

  const [page, setPage] = useState(1);
  const [flippedCard, setFlippedCard] =
  useState<string | null>(null);

    const [pagination, setPagination] =
    useState<any>(null);

    const fetchWords = async () => {
    const data =
        await getStudentReviewedWords(page);

    if (data) {
        setWords(data.data);
        setPagination(data.pagination);
    }

    setLoading(false);
    };

    useEffect(() => {
        fetchWords();
    }, [page]);

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    return (
    <section className=" rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 p-4 min-h-[calc(110vh-200px)]">
        <RecomendedSection />
    </section>
    );
}