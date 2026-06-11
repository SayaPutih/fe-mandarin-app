import { api } from "@/lib/axios";

export const getSentecePractice =async ()=>{

    const result = await api.get("/mandarin-sentece/question")

    return result.data;
}