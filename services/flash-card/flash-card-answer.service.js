import {api} from "@/lib/axios"

export const AnswerFlashCardQuestion = async (body)=>{
    console.log(localStorage.getItem("token"));
    const response = await api.post("flash-card/answer",body);
    return response.data;
}