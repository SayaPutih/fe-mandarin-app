import { api } from "@/lib/axios";

export const getStudentReviewedWords =
  async (
    page = 1,
    limit = 10
  ) => {
    try {
      const response = await api.get(
        `/student/students/reviewed-words?page=${page}&limit=${limit}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };