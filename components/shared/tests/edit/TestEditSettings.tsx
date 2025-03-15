'use client';
import { Switch } from '@/components/ui/switch';
import { useTestStore } from '@/store/useTestStore';

export function TestEditSettings() {
  const { test, updateTestStore } = useTestStore();
  return (
    <div className="flex flex-col gap-2 py-4 max-w-[800px] mx-auto pt-28">
      <div className="bg-white py-8 px-8 rounded-xl">
        <h1 className="text-2xl font-semibold">Settings</h1>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-2 justify-between border-b pb-4 px-4">
            <div>
              <p>Graduate</p>
              <p className="text-gray-600 text-sm">
                Set maximum scores, specify answers and automatically send
                feedback
              </p>
            </div>
            <Switch
              onCheckedChange={(checked) =>
                updateTestStore({ isGraduate: checked })
              }
              checked={test?.isGraduate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
