'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useDeleteTest } from '@/hooks/useDeleteTest';
import { useTestStore } from '@/store/useTestStore';

export function TestEditSettings() {
  const test = useTestStore((state) => state.test);
  const updateTestStore = useTestStore((state) => state.updateTestStore);
  const { handleDelete, isPending } = useDeleteTest();

  return (
    <div className="flex flex-col gap-2 py-4 max-w-[800px] mx-auto pt-28">
      <div className="bg-white py-8 px-8 rounded-xl">
        <h1 className="text-2xl font-semibold">Settings</h1>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex flex-col  gap-2 border-b pb-4 px-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="font-medium text-xl">Test</h2>
                <p className="text-gray-600 text-sm">
                  Set maximum scores, specify answers and automatically send
                  feedback
                </p>
              </div>
            </div>
            <div className="pl-10 flex flex-col gap-2">
              <div className="flex flex-col gap-3">
                <h3 className="text-gray-500">Publish score</h3>
                <RadioGroup defaultValue="item-1">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 py-2">
                      <RadioGroupItem value="item-1" />
                      <Label htmlFor="item-1">
                        Immediately after submission
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <RadioGroupItem value="item-2" />
                      <Label htmlFor="item-2">After manual verification</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-gray-500">Settings for respondents</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 justify-between">
                    <div>
                      <p>Incorrect answers</p>
                      <p className="text-sm text-gray-500">
                        Show incorrect answers
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center gap-2 justify-between">
                    <div>
                      <p>Correct answers</p>
                      <p className="text-sm text-gray-500">
                        Show correct answers
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center gap-2 justify-between">
                    <div>
                      <p>Score for answers</p>
                      <p className="text-sm text-gray-500">
                        Show score for each answer
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3>Maximum score</h3>
                  <p className="text-sm text-gray-500">
                    Maximum score for the question by default
                  </p>
                </div>
                <Input className="w-20" type="number" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-between border-b pb-4 px-4">
            <div>
              <h2>Delete Test</h2>
              <p className="text-gray-600 text-sm">
                Delete test and all related data
              </p>
            </div>
            <Button
              disabled={isPending}
              onClick={() => handleDelete()}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
