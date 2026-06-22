import { api } from "@/lib/axios";
import { Notification } from "@/types/notification.type";

export const getNotification  =async ()=>{

    const result = await api.get("/notification/get-all")

    return result.data;
}