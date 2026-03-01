// City timezone data for the 50 most common global business cities
// Offset is in minutes from UTC (positive = east of UTC)

export interface CityData {
  name: string;
  timezone: string;
  offset: number; // minutes from UTC
  dstOffset?: number; // summer offset if DST applies
}

export const cities: CityData[] = [
  { name: "London", timezone: "Europe/London", offset: 0, dstOffset: 60 },
  { name: "New York", timezone: "America/New_York", offset: -300, dstOffset: -240 },
  { name: "Berlin", timezone: "Europe/Berlin", offset: 60, dstOffset: 120 },
  { name: "Singapore", timezone: "Asia/Singapore", offset: 480 },
  { name: "Sydney", timezone: "Australia/Sydney", offset: 600, dstOffset: 660 },
  { name: "Toronto", timezone: "America/Toronto", offset: -300, dstOffset: -240 },
  { name: "Dubai", timezone: "Asia/Dubai", offset: 240 },
  { name: "Tokyo", timezone: "Asia/Tokyo", offset: 540 },
  { name: "Mumbai", timezone: "Asia/Kolkata", offset: 330 },
  { name: "São Paulo", timezone: "America/Sao_Paulo", offset: -180 },
  { name: "Chicago", timezone: "America/Chicago", offset: -360, dstOffset: -300 },
  { name: "Los Angeles", timezone: "America/Los_Angeles", offset: -480, dstOffset: -420 },
  { name: "Paris", timezone: "Europe/Paris", offset: 60, dstOffset: 120 },
  { name: "Amsterdam", timezone: "Europe/Amsterdam", offset: 60, dstOffset: 120 },
  { name: "Dublin", timezone: "Europe/Dublin", offset: 0, dstOffset: 60 },
  { name: "Zurich", timezone: "Europe/Zurich", offset: 60, dstOffset: 120 },
  { name: "Stockholm", timezone: "Europe/Stockholm", offset: 60, dstOffset: 120 },
  { name: "Warsaw", timezone: "Europe/Warsaw", offset: 60, dstOffset: 120 },
  { name: "Johannesburg", timezone: "Africa/Johannesburg", offset: 120 },
  { name: "Hong Kong", timezone: "Asia/Hong_Kong", offset: 480 },
  { name: "Seoul", timezone: "Asia/Seoul", offset: 540 },
  { name: "Shanghai", timezone: "Asia/Shanghai", offset: 480 },
  { name: "Beijing", timezone: "Asia/Shanghai", offset: 480 },
  { name: "Melbourne", timezone: "Australia/Melbourne", offset: 600, dstOffset: 660 },
  { name: "Auckland", timezone: "Pacific/Auckland", offset: 720, dstOffset: 780 },
  { name: "Nairobi", timezone: "Africa/Nairobi", offset: 180 },
  { name: "Lagos", timezone: "Africa/Lagos", offset: 60 },
  { name: "Cape Town", timezone: "Africa/Johannesburg", offset: 120 },
  { name: "Bangalore", timezone: "Asia/Kolkata", offset: 330 },
  { name: "Hyderabad", timezone: "Asia/Kolkata", offset: 330 },
  { name: "Manila", timezone: "Asia/Manila", offset: 480 },
  { name: "Bangkok", timezone: "Asia/Bangkok", offset: 420 },
  { name: "Kuala Lumpur", timezone: "Asia/Kuala_Lumpur", offset: 480 },
  { name: "Jakarta", timezone: "Asia/Jakarta", offset: 420 },
  { name: "Mexico City", timezone: "America/Mexico_City", offset: -360, dstOffset: -300 },
  { name: "Buenos Aires", timezone: "America/Argentina/Buenos_Aires", offset: -180 },
  { name: "Santiago", timezone: "America/Santiago", offset: -240, dstOffset: -180 },
  { name: "Lima", timezone: "America/Lima", offset: -300 },
  { name: "Bogotá", timezone: "America/Bogota", offset: -300 },
  { name: "Cairo", timezone: "Africa/Cairo", offset: 120 },
  { name: "Riyadh", timezone: "Asia/Riyadh", offset: 180 },
  { name: "Istanbul", timezone: "Europe/Istanbul", offset: 180 },
  { name: "Tel Aviv", timezone: "Asia/Jerusalem", offset: 120, dstOffset: 180 },
  { name: "Kyiv", timezone: "Europe/Kiev", offset: 120, dstOffset: 180 },
  { name: "Prague", timezone: "Europe/Prague", offset: 60, dstOffset: 120 },
  { name: "Vienna", timezone: "Europe/Vienna", offset: 60, dstOffset: 120 },
  { name: "Budapest", timezone: "Europe/Budapest", offset: 60, dstOffset: 120 },
  { name: "Lisbon", timezone: "Europe/Lisbon", offset: 0, dstOffset: 60 },
  { name: "Brussels", timezone: "Europe/Brussels", offset: 60, dstOffset: 120 },
  { name: "Copenhagen", timezone: "Europe/Copenhagen", offset: 60, dstOffset: 120 },
];

export function getCityNames(): string[] {
  return cities.map(c => c.name);
}

export function findCity(name: string): CityData | undefined {
  return cities.find(c => c.name.toLowerCase() === name.toLowerCase());
}

// Get current offset for a city (simplified - doesn't account for exact DST dates)
export function getCurrentOffset(city: CityData): number {
  // For this demo, we'll use standard time offset
  // In production, you'd check the current date against DST rules
  return city.offset;
}

// Format offset as string
export function formatOffset(minutes: number): string {
  const sign = minutes >= 0 ? "+" : "−";
  const absMinutes = Math.abs(minutes);
  const hours = Math.floor(absMinutes / 60);
  const mins = absMinutes % 60;
  return mins === 0 ? `UTC${sign}${hours}` : `UTC${sign}${hours}:${mins.toString().padStart(2, '0')}`;
}

// Get local hour for a given UTC hour
export function getLocalHour(utcHour: number, offsetMinutes: number): number {
  const localHour = utcHour + offsetMinutes / 60;
  return ((localHour % 24) + 24) % 24;
}
