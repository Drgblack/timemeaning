// Y2K38 safety utilities

// The maximum value for a 32-bit signed integer
export const MAX_32BIT_SIGNED = 2147483647;

// The Y2K38 overflow date: 2038-01-19T03:14:07Z
export const Y2K38_DATE = new Date(MAX_32BIT_SIGNED * 1000);
export const Y2K38_ISO = "2038-01-19T03:14:07Z";

// Check if a Unix timestamp exceeds the 32-bit limit
export function isY2K38Unsafe(unixTimestamp: number): boolean {
  return unixTimestamp > MAX_32BIT_SIGNED;
}

// Check if a date exceeds the 32-bit limit
export function isDateY2K38Unsafe(date: Date): boolean {
  const unixTimestamp = Math.floor(date.getTime() / 1000);
  return isY2K38Unsafe(unixTimestamp);
}

// Calculate the overflow margin
export function getOverflowMargin(unixTimestamp: number): {
  seconds: number;
  days: number;
  years: number;
  formatted: string;
} {
  const difference = unixTimestamp - MAX_32BIT_SIGNED;
  const days = Math.floor(difference / 86400);
  const years = Math.floor(days / 365.25);
  const remainingDays = Math.floor(days % 365.25);
  
  return {
    seconds: difference,
    days,
    years,
    formatted: years > 0 
      ? `${years} years and ${remainingDays} days beyond 32-bit limit`
      : `${days} days beyond 32-bit limit`,
  };
}

// Get Unix epoch offset info for any timestamp
export function getUnixEpochInfo(unixTimestamp: number): {
  seconds: number;
  days: number;
  years: number;
  formatted: string;
} {
  const days = Math.floor(unixTimestamp / 86400);
  const years = (unixTimestamp / (365.25 * 86400)).toFixed(2);
  
  return {
    seconds: unixTimestamp,
    days,
    years: parseFloat(years),
    formatted: `${unixTimestamp.toLocaleString()} seconds · ${days.toLocaleString()} days · ${years} years from 1970-01-01T00:00:00Z`,
  };
}

// Calculate percentage through 32-bit Unix time range
export function get32BitPercentage(unixTimestamp: number): number {
  return (unixTimestamp / MAX_32BIT_SIGNED) * 100;
}
