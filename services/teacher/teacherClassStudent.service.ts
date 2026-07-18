import { api } from "@/lib/axios";

export const getStudentsByClass = async (
  classId: string
) => {
  const res = await api.get(
    `/teacher/classes/${classId}/students`
  );

  return res;
};

export const addStudentToClass = async (
  classId: string,
  studentIds: string[]
) => {
  const res = await api.post(
    `/teacher/classes/${classId}/students`,
    {
      studentIds,
    }
  );

  return res;
};

export const getAvailableStudents = async (
  classId: string,
  search?: string
) => {

  const res = await api.get(
    `/teacher/classes/${classId}/available-students`,
    {
      params: {
        search,
      },
    }
  );

  return res;
};

export const removeStudentFromClass = async (
  classId: string,
  studentId: string
) => {

  const res = await api.delete(
    `/teacher/classes/${classId}/students`,
    {
      data: {
        studentId,
      },
    }
  );

  return res;

};
