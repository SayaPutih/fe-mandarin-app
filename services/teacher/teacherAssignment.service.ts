import { api } from "@/lib/axios";

export const getWords = async ({
  hanzi,
  pinyin,
  meaning,
  hskLevel,
  page = 1,
  limit = 20,
}: {
  hanzi?: string;
  pinyin?: string;
  meaning?: string;
  hskLevel?: number;
  page?: number;
  limit?: number;
}) => {

  try {

    const response =
      await api.get(
        "/teacher/words",
        {
          params: {
            hanzi,
            pinyin,
            meaning,
            hskLevel,
            page,
            limit,
          },
        }
      );

    return response.data;
  } catch {
    return null;
  }
};

export const getAssignments = async (
  classId: string
) => {
  try {
    const response = await api.get(
      `/teacher/classes/${classId}/assignments`
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

export const createAssignment = async (
  classId: string,
  data: {
    title: string;
    description?: string;
    dueDate?: string;
    wordIds: string[];
  }
) => {
  try {
    const response = await api.post(
      `/teacher/classes/${classId}/assignments`,
      data
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

export const getAssignmentDetail =
async (
  assignmentId: string
) => {

  const response =
    await api.get(
      `/teacher/assignments/${assignmentId}`
    );

  return response.data;

};

export const getAssignmentCards =
async (
  assignmentId :string,
  params : any
) => {

  const response =
    await api.get(
      `/teacher/assignments/${assignmentId}/cards`,
      {
        params,
      }
    );

  return response.data;

};

export const getAssignmentStudents =
async (
  assignmentId : string,
  params : any
) => {

  const response =
    await api.get(
      `/teacher/assignments/${assignmentId}/students`,
      {
        params,
      }
    );

  return response.data;

};


export const removeStudent = async (
  classId: string,
  studentId: string,
) => {
  const response = await api.delete(
    "/teacher/class/remove-student",
    {
      data: {
        classId,
        studentId,
      },
    }
  );
  return response.data;
};

export const removeAssignment = async (
  id: string, 
) => {
  console.log("FE Service")
  const response = await api.delete(
    "/teacher/assignment/remove",
    {
      data: {
        id
      },
    }
  );
  return response.data;
};