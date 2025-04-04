// import { format } from 'date-fns-tz';

// export const formatLocalTime = (date, timezone, pattern = 'HH:mm') => {
//   return format(new Date(date), pattern, { timeZone: "Asia/Kolkata" });
// };


export const formatLocalTime = (isoString)=> {
  const date = new Date(isoString);
  
  // Get UTC hours and minutes (since ISO strings are always UTC)
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  
  return `${hours}:${minutes}`;
}

