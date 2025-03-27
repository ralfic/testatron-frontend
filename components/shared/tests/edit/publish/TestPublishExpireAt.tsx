'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';

interface Props {
  setExpiresAtHour: (hour: number) => void;
  setExpiresAtDay: (day: number) => void;
  expiryOptionsDays: number[];
  expiryOptionsHours: number[];
}

export function TestPublishExpireAt({
  setExpiresAtDay,
  setExpiresAtHour,
  expiryOptionsDays,
  expiryOptionsHours,
}: Props) {
  const expiryOptionsDaysFormatted = expiryOptionsDays.map((day) =>
    format(day, 'dd MMM')
  );
  const expiryOptionsHoursFormatted = expiryOptionsHours
    .map((hour) => format(hour, 'HH:mm'))
    .sort();
  return (
    <div className="flex gap-2 mt-1">
      <Select onValueChange={(value) => setExpiresAtDay(parseInt(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue
            defaultValue={expiryOptionsDays[0]}
            placeholder={expiryOptionsDaysFormatted[0]}
          />
        </SelectTrigger>
        <SelectContent>
          {expiryOptionsDays.map((date, i) => (
            <SelectItem key={date} value={date.toString()}>
              {expiryOptionsDaysFormatted[i]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setExpiresAtHour(parseInt(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue
            defaultValue={expiryOptionsHours[0]}
            placeholder={expiryOptionsHoursFormatted[0]}
          />
        </SelectTrigger>
        <SelectContent>
          {expiryOptionsHours.map((hour, index) => (
            <SelectItem key={hour} value={hour.toString()}>
              {expiryOptionsHoursFormatted[index]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
