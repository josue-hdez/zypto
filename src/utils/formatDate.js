/**
 * Formats a JavaScript Date object into a human-readable string.
 *
 * @param {Date} date - The date to format.
 * @param {boolean} [includeTime=false] - Whether to include the time in the formatted output.
 * @returns {string} A formatted date string in "MMM DD, YYYY" format, with optional time as "HH:MM:SS" (24-hour format).
 *                   Returns "-" if the input is not a valid Date object.
 *
 * @example
 * formatDate(new Date("2025-08-07")); // "Aug 7, 2025"
 * formatDate(new Date("2025-08-07T15:30:00Z"), true); // "Aug 7, 2025, 15:30:00"
 * formatDate("not a date"); // "-"
 **/
export function formatDate(date, includeTime = false) {
  if (!(date instanceof Date) || isNaN(date)) return "-";

  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  if (includeTime) {
    options = { ...options, hour: "2-digit", minute: "2-digit", hour12: false };
  }

  return date.toLocaleDateString("en-US", options);
}
