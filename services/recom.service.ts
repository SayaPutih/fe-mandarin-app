import { api } from "@/lib/axios";

export const getRecom =
  async (
  ) => {
    try {
      const response = await api.get(
        `/recom/recom`
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };