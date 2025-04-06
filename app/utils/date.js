// import { format } from 'date-fns-tz';

// export const formatLocalTime = (date, timezone, pattern = 'HH:mm') => {
//   return format(new Date(date), pattern, { timeZone: "Asia/Kolkata" });
// };


export const formatLocalTime = (isoString) => {
  const date = new Date(isoString);
  
  // Convert to IST timezone with 24-hour format
  return date.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });
};
