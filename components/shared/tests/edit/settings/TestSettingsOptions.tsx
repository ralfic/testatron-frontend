'use client';
import { Switch } from '@/components/ui/switch';
import { useTestStore } from '@/store/useTestStore';

export function TestSettingsOptions() {
  const updateTestStore = useTestStore((store) => store.updateTestStore);
  const test = useTestStore((store) => store.test);

  if (!test) return null;

  return (
    <div className="flex flex-col  gap-2 pb-4 ">
      <div className="flex items-center gap-2 justify-between">
        <div>
          <p>Correct answers</p>
          <p className="text-sm text-gray-500">
            Show correct answers after submission
          </p>
        </div>
        <Switch
          onCheckedChange={(checked) => {
            updateTestStore({
              showCorrectAnswers: checked,
            });
          }}
          checked={test.showCorrectAnswers}
        />
      </div>
      <div className="flex items-center gap-2 justify-between">
        <div>
          <p>Score for answers</p>
          <p className="text-sm text-gray-500">Show score for each answer</p>
        </div>
        <Switch
          onCheckedChange={(checked) =>
            updateTestStore({ showOptionsScore: checked })
          }
          checked={test.showOptionsScore}
        />
      </div>
    </div>
  );
}
