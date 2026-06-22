import { api } from "@/lib/axios";

export const getStats = async () => {
    try {
        const response = await api.get("/statistic/stats");
        return response.data;
    } catch (error) {
        return null;
    }
};