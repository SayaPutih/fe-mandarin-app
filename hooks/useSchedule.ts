"use client";

import {
  useEffect,
  useState,
} from "react";

import { format } from "date-fns";

import {
  getScheduleCalendar,
  getScheduleWords,
} from "@/services/student/shedule.service";

export function useSchedule() {
  const [date, setDate] =
    useState(new Date());

  const [
    calendarData,
    setCalendarData,
  ] = useState<
    Record<string, number>
  >({});

  const [words, setWords] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchMonthData(
      date.getFullYear(),
      date.getMonth()
    );
  }, []);

  const fetchMonthData =
    async (
      year: number,
      month: number
    ) => {
      const start = new Date(
        year,
        month,
        1
      );

      const end = new Date(
        year,
        month + 1,
        0
      );

      const result =
        await getScheduleCalendar(
          format(
            start,
            "yyyy-MM-dd"
          ),
          format(
            end,
            "yyyy-MM-dd"
          )
        );

      if (result?.data) {
        setCalendarData(
          result.data
        );
      }
    };

  const fetchWords =
    async (
      selectedDate: Date
    ) => {
      setLoading(true);

      const result =
        await getScheduleWords(
          format(
            selectedDate,
            "yyyy-MM-dd"
          )
        );

      setWords(
        result?.data || []
      );

      setLoading(false);
    };

  const handleDateClick =
    async (value: Date) => {
      setDate(value);

      await fetchWords(value);
    };

  console.log({
    date,
    words,
    loading,
    calendarData,
    handleDateClick,
  })

  return {
    date,
    words,
    loading,
    calendarData,
    handleDateClick,
  };
}