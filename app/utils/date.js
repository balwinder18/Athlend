import { format } from 'date-fns-tz';

export const formatLocalTime = (date, timezone, pattern = 'HH:mm') => {
  return format(new Date(date), pattern, { timeZone: "Asia/Kolkata" });
};