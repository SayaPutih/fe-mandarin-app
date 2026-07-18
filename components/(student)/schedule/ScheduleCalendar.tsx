"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { format } from "date-fns";

interface Props {
  date: Date;
  calendarData: Record<
    string,
    number
  >;

  onDateClick: (
    date: Date
  ) => void;
}

export default function ScheduleCalendar({
  date,
  calendarData,
  onDateClick,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <Calendar
        value={date}
        onClickDay={onDateClick}
        tileContent={({
          date,
          view,
        }) => {
          if (view !== "month")
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
              <span className="review-badge">
                {count}
              </span>
            </div>
          );
        }}
      />
    </div>
  );
}