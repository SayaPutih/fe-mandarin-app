import { api } from "@/lib/axios";
import { flashCard } from "@/types/flash-card.type";

export const GetFlashCardQuestions = async ()=>{
    console.log("api got")
    const response = await api.get("flash-card/questions");
    return response.data;
}