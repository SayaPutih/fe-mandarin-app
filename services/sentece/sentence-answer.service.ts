import { api } from "@/lib/axios";

export const answerSentencePractice =async (body)=>{

    const result = await api.post("/mandarin-sentece/answer",body)

    return result.data;
}