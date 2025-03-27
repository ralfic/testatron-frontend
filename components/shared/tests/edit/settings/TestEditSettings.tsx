'use client';
import { Button } from '@/components/ui/button';
import { useDeleteTest } from '@/hooks/useDeleteTest';
import { useTestStore } from '@/store/useTestStore';
import { TestSettingsOptions } from './TestSettingsOptions';

export function TestEditSettings() {
  const { handleDelete, isPending } = useDeleteTest();
  const test = useTestStore((store) => store.test);

  return (
    <div className="flex flex-col gap-2 py-4 max-w-[800px] mx-auto pt-28">
      <div className="bg-white py-8 px-8 rounded-xl">
        <h1 className="text-2xl font-semibold">Settings</h1>
        {!test && <p className="text-gray-500">No test found</p>}
        {test && (
          <div className="flex flex-col gap-2 mt-4 ">
            <div className="px-4 border-b">
              <TestSettingsOptions />
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
        )}
      </div>
    </div>
  );
}
