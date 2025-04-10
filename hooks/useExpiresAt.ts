import { format } from 'date-fns';
import { useMemo } from 'react';

export function useExpiresAt() {
  const maxExpiryDays = 30;
  const expiryOptionsDays = useMemo(() => {
    return Array.from(
      { length: maxExpiryDays },
      (_, i) => new Date().setHours(0, 0, 0, 0) + i * 24 * 60 * 60 * 1000
    );
  }, []);
  const expiryOptionsHours = useMemo(() => {
    return [...Array(24)].map((_, i) => i * 60 * 60 * 1000);
  }, []);

  function formatDay(day: number) {
    return format(day, 'dd MMM');
  }

  function formatHour(hour: number) {
    return format(hour, 'HH:mm');
  }

  const expiryOptionsDaysFormatted = expiryOptionsDays.map(formatDay);
  const expiryOptionsHoursFormatted = expiryOptionsHours.map(formatHour).sort();

  return {
    expiryOptionsDays,
    expiryOptionsDaysFormatted,
    expiryOptionsHours,
    expiryOptionsHoursFormatted,
  };
}
