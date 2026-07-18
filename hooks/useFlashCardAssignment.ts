"use client";

import { useCallback, useEffect, useState } from "react";

import { flashCard } from "@/types/flash-card.type";

import { GetFlashCardAssignmentQuestions } from "@/services/flash-card/flash-card-question.service";

export function useFlashCardAssignment(wordIds: string[],) {
console.log("--question hook assignment--")
  console.log(wordIds)
  const [loading, setLoading] = useState(true);

  const [cards, setCards] = useState<flashCard[]>([]);

  const fetchQuestions = useCallback(async () => {

    try {

      setLoading(true);

      const res =
        await GetFlashCardAssignmentQuestions(wordIds);

      if (res?.success) {
        setCards(res.data);
      }

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }, [wordIds]);

  useEffect(() => {

    if (wordIds.length > 0) {
        fetchQuestions();
    }

}, [fetchQuestions, wordIds]);

  return {
    loading,
    cards,
    refresh: fetchQuestions,
  };

}