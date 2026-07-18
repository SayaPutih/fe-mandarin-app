"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {useRouter} from "next/navigation";
import { format } from "date-fns";

import {
  getScheduleCalendar,
  getScheduleWords,
} from "@/services/shedule.service";

import { MainCard } from "@/components/(student)/Card/Card";

export default function Schedule() {

    const router = useRouter();

  const [date, setDate] =
    useState<Date>(new Date());

  const [calendarData, setCalendarData] =
    useState<Record<string, number>>(
      {}
    );

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

  const fetchMonthData = async (
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
        format(start, "yyyy-MM-dd"),
        format(end, "yyyy-MM-dd")
      );

    if (result?.data) {
      setCalendarData(result.data);
    }
  };

  const fetchWords = async (
    selectedDate: Date
  ) => {
    setLoading(true);

    const formatted = format(
      selectedDate,
      "yyyy-MM-dd"
    );

    const result =
      await getScheduleWords(
        formatted
      );

    setWords(result?.data || []);

    setLoading(false);
  };

  const handleDateClick = async (
    value: Date
  ) => {
    setDate(value);

    await fetchWords(value);
  };

  return (
    <div className="space-y-6 p-8 bg-white rounded-lg ">
      <div className="flex items-center justify-between">
        <div className="">
            <h1 className="text-3xl font-bold">
            Review Schedule
            </h1>

            <p className="text-sm text-zinc-500">
            Review calendar generated
            from GRU-HLR prediction.
            </p>
        </div>

        <button
                onClick={() => router.push("/home")}
                className="
                rounded-lg
                border
                border-zinc-300
                bg-white
                px-4
                py-2
                text-sm
                font-medium
                transition
                hover:bg-zinc-100
                "
            >
                ← Back
            </button>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <Calendar
          value={date}
          onClickDay={
            handleDateClick
          }
          tileContent={({
            date,
            view,
          }) => {
            if (
              view !== "month"
            )
              return null;

            const key = format(
              date,
              "yyyy-MM-dd"
            );

            const count =
              calendarData[key];

            if (!count)
              return null;

            return (
              <div className="mt-1 flex justify-center">
                <span
                  className="
                    review-badge
                  "
                >
                  {count}
                </span>
              </div>
            );
          }}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Words Scheduled on{" "}
          {format(
            date,
            "dd MMM yyyy"
          )}
        </h2>

        {loading && (
          <p>Loading...</p>
        )}

        {!loading &&
          words.length === 0 && (
            <div className="rounded-xl border border-dashed p-8 text-center text-zinc-500">
              No reviews scheduled.
            </div>
          )}

        <div
          className="
            grid
            grid-cols-2
            gap-4
            md:grid-cols-8
          "
        >
          {words.map((word) => (
            <MainCard
              key={word.id}
              item={{
                word,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}