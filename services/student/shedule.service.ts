import { api } from "@/lib/axios";

export const getScheduleCalendar = async (
  start: string,
  end: string
) => {
  try {
    const response = await api.get(
      `/student/calendar`,
      {
        params: {
          start,
          end,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getScheduleWords = async (
  date: string
) => {
  try {
    const response = await api.get(
      `/student/calendar/${date}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};