"use client";

import { format } from "date-fns";

import { useSchedule } from "@/hooks/useSchedule";

import ScheduleHeader from "./ScheduleHeader";
import ScheduleCalendar from "./ScheduleCalendar";
import ScheduleLoading from "./ScheduleLoading";
import ScheduleEmpty from "./ScheduleEmpty";
import ScheduleWordGrid from "./ScheduleWordGrid";

export default function SchedulePage() {
  const {
    date,
    words,
    loading,
    calendarData,
    handleDateClick,
  } = useSchedule();

  return (
    <div className="space-y-6 rounded-lg bg-white p-8">
      <ScheduleHeader />

      <ScheduleCalendar
        date={date}
        calendarData={calendarData}
        onDateClick={handleDateClick}
      />

      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Words Scheduled on{" "}
          {format(date, "dd MMM yyyy")}
        </h2>

        {loading ? (
          <ScheduleLoading />
        ) : words.length === 0 ? (
          <ScheduleEmpty />
        ) : (
          <ScheduleWordGrid words={words} />
        )}
      </div>
    </div>
  );
}