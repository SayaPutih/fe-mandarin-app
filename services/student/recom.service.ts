import { api } from "@/lib/axios";

export const getRecom =
  async (
  ) => {
    try {
      const response = await api.get(
        `/student/recom`
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };