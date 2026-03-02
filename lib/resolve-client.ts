import type { TimeInterpretation } from '@/components/time-result';

export async function resolveTimeInput(input: string): Promise<TimeInterpretation> {
  // Capture current local context to send with the request
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM
  const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // e.g. "Europe/Berlin"

  const res = await fetch('/api/resolve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input,
      currentDate,
      currentTime,
      currentTimezone,
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Resolver failed with status ${res.status}`);
  }

  return res.json();
}
