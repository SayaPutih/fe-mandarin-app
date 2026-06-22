import { api } from "@/lib/axios";
import { flashCard } from "@/types/flash-card.type";

export const GetFlashCardReviewQuestions = async () => {
  const response = await api.get("flash-card/questions/review");
  return response.data;
};
