import { format } from "date-fns";

export const formatScheduleDate = (
  date: Date
) =>
  format(
    date,
    "yyyy-MM-dd"
  );