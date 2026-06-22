import { api } from "@/lib/axios";

// =========================
// DASHBOARD
// =========================

export const getTeacherDashboard = async () => {
  try {
    const response = await api.get("/teacher/dashboard");
    return response.data;
  } catch (error) {
    return null;
  }
};

// =========================
// VOCABULARY
// =========================

export const getAllVocabulary = async (
  page = 1,
  limit = 20
) => {
  try {
    const response = await api.get(
      `/teacher/vocabulary?page=${page}&limit=${limit}`
    );

    return response.data;
  } catch {
    return null;
  }
};

export const createVocabulary = async (
  data: any
) => {
  const response = await api.post(
    "/teacher/vocabulary",
    data
  );

  return response.data;
};

export const updateVocabulary = async (
  id: string,
  data: any
) => {
  const response = await api.put(
    `/teacher/vocabulary/${id}`,
    data
  );

  return response.data;
};

export const deleteVocabulary = async (
  id: string
) => {
  const response = await api.delete(
    `/teacher/vocabulary/${id}`
  );

  return response.data;
};

export const getVocabularyById = async (
  id: string
) => {
  try {
    const response = await api.get(
      `/teacher/vocabulary/${id}`
    );

    return response.data;
  } catch (error) {
    return null;
  }
};
// =========================
// STUDENTS
// =========================

export const getAllStudents = async () => {
  try {
    const response = await api.get("/teacher/students");
    return response.data;
  } catch (error) {
    return null;
  }
};


export const getStudentById = async (id: string) => {
  try {
    const response = await api.get(`/teacher/students/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

// =========================
// RETENTION
// =========================

export const getStudentRetention = async (id: string) => {
  try {
    const response = await api.get(
      `/teacher/students/${id}/retention`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

// =========================
// MASTERED WORDS
// =========================

export const getStudentMasteredWords = async (
  id: string
) => {
  try {
    const response = await api.get(
      `/teacher/students/${id}/mastered-words`
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

// =========================
// FORGOTTEN WORDS
// =========================

export const getStudentForgottenWords = async (
  id: string
) => {
  try {
    const response = await api.get(
      `/teacher/students/${id}/forgotten-words`
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

// =========================
// REVIEW SCHEDULE
// =========================

export const getStudentReviewSchedule = async (
  id: string
) => {
  try {
    const response = await api.get(
      `/teacher/students/${id}/review-schedule`
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

// =========================
// ANALYTICS
// =========================

export const getRetentionAnalytics = async () => {
  try {
    const response = await api.get(
      "/teacher/analytics/retention"
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

export const getHardestVocabulary = async () => {
  try {
    const response = await api.get(
      "/teacher/analytics/hardest-vocabulary"
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

export const getHSKDistribution = async () => {
  try {
    const response = await api.get(
      "/teacher/analytics/hsk-distribution"
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

// =========================
// AUTH CHECK
// =========================

export const confirmTeacher = async () => {
  try {
    const response = await api.get(
      "/teacher/confirm-teacher"
    );

    return response.data;
  } catch (error) {
    return null;
  }
};