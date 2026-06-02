import {api} from "@/lib/axios"

export const AnswerFlashCardQuestion = async (body)=>{
    const response = await api.post("flash-card/answer",body);
    return response.data;
}