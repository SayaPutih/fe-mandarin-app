import { api } from "@/lib/axios";

export const getClasses =
  async (
  ) => {
    try {
      const response = await api.get(
        `/student/classes`
      );
      console.log("--Student Class--")
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  export const getAssignmentsByClass = async (
  classId: string,
  page = 1,
  limit = 10,
) => {

  const response = await api.get(
    `/student/classes/${classId}/assignments`,
    {
      params: {
        page,
        limit,
      },
    },
  );

  return response.data;

};

export const getAssignmentCards = async (
  assignmentId: string,
) => {

  const response = await api.get(
    `/student/assignments/${assignmentId}/cards`,
  );

  return response.data;

};