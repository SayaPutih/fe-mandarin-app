import { api } from "@/lib/axios";
import { flashCard } from "@/types/flash-card.type";



export const GetFlashCardNewInitiateQuestion = async () => {
  const response = await api.get("/new/initiate/new-initiate");
  return response.data;
};
