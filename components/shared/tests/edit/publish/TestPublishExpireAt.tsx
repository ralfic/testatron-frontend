'use client';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useExpiresAt } from '@/hooks/useExpiresAt';
import { Control } from 'react-hook-form';

interface Props {
  fromControl: Control<{
    expiresAt: {
      day: number;
      hour: number;
    };
    showCorrectAnswers: boolean;
    showQuestionScore: boolean;
  }>;
}

export function TestPublishExpireAt({ fromControl }: Props) {
  const {
    expiryOptionsDays,
    expiryOptionsHours,
    expiryOptionsHoursFormatted,
    expiryOptionsDaysFormatted,
  } = useExpiresAt();

  return (
    <div className="flex gap-2 mt-1">
      <FormField
        control={fromControl}
        name="expiresAt.day"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={(value) => field.onChange(Number(value))}>
              <FormControl>
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    defaultValue={expiryOptionsDays[0]}
                    placeholder={expiryOptionsDaysFormatted[0]}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {expiryOptionsDays.map((date, i) => (
                  <SelectItem key={date} value={date.toString()}>
                    {expiryOptionsDaysFormatted[i]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={fromControl}
        name="expiresAt.hour"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={(value) => field.onChange(Number(value))}>
              <FormControl>
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    defaultValue={expiryOptionsHours[0]}
                    placeholder={expiryOptionsHoursFormatted[0]}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {expiryOptionsHours.map((hour, i) => (
                  <SelectItem key={hour} value={hour.toString()}>
                    {expiryOptionsHoursFormatted[i]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
}
