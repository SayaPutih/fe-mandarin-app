import { api } from "@/lib/axios";
import { flashCard } from "@/types/flash-card.type";

export const GetFlashCardQuestions = async ()=>{

    const response = await api.get("flash-card/questions");
    return response.data;
}


export const GetFlashCardSingleQuestion = async ()=>{

    const response = await api.get("flash-card/single-question");
    return response.data;
}


export const GetFlashCardInitiateQuestion = async ()=>{

    const response = await api.get("flash-card/initiate");
    return response.data;
}