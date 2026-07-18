"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";

import { LoadingSpinner } from "@/components/ui/Loading";

import FlashCardAssignment from "./FlashCardAssignment";

import { useAssignmentCards } from "@/hooks/useStudentClass";
import { useFlashCardAssignment } from "@/hooks/useFlashCardAssignment";

export default function AssignmentPage() {

    const params = useParams();

    const assignmentId = params.assignmentId as string;

    const {
        loading: loadingAssignment,
        cards,
    } = useAssignmentCards(
        assignmentId,
    );

    const wordIds = useMemo(() => {

        return cards.map(
            (card: any) => card.word.id
        );

    }, [cards]);

    const {
        loading: loadingQuestions,
        cards: flashcards,
    } = useFlashCardAssignment(
        wordIds,
    );

    if (
        loadingAssignment ||
        loadingQuestions
    ) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <LoadingSpinner />
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-7xl p-6">

            <FlashCardAssignment
                cards={flashcards}
            />

        </main>
    );

}