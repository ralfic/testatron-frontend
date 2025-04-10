'use client';
import { FormControl, FormField } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { ITest } from '@/types';

interface Props {
  test: ITest;
}

export function TestSettingsOptions({ test }: Props) {
  return (
    <div className="flex flex-col  gap-2 pb-4 ">
      <div className="flex items-center gap-2 justify-between">
        <div>
          <p>Correct answers</p>
          <p className="text-sm text-gray-500">
            Show correct answers after submission
          </p>
        </div>
        <FormField
          name="showCorrectAnswers"
          control={null}
          render={({ field }) => (
            <FormControl>
              <Switch
                onCheckedChange={(checked) => field.onChange(checked)}
                checked={field.value}
              />
            </FormControl>
          )}
        />
      </div>
      <div className="flex items-center gap-2 justify-between">
        <div>
          <p>Score for answers</p>
          <p className="text-sm text-gray-500">Show score for each answer</p>
        </div>
        <Switch
          onCheckedChange={(checked) => {}}
          checked={test.showOptionsScore}
        />
      </div>
    </div>
  );
}
