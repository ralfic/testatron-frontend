'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useTestStore } from '@/store/useTestStore';
import parse from 'html-react-parser';
import { useState } from 'react';
import { TestSettingsOptions } from '../settings/TestSettingsOptions';
import { usePublishTest } from '@/hooks/usePublishTest';
import { TestPublishExpireAt } from './TestPublishExpireAt';

const maxExpiryDays = 30;

export function TestPublishModal() {
  const { handelPublishTest, isPending } = usePublishTest();
  const { test } = useTestStore();
  const [isOpen, setIsOpen] = useState(false);

  const expiryOptionsDays = Array.from(
    { length: maxExpiryDays },
    (_, i) => new Date().setHours(0, 0, 0, 0) + i * 24 * 60 * 60 * 1000
  );

  const expiryOptionsHours = [...Array(24)].map((_, i) => i * 60 * 60 * 1000);

  const [expiresAt, setExpiresAt] = useState({
    day: expiryOptionsDays[0],
    hour: expiryOptionsHours[0],
  });

  if (!test) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480x] p-8">
        <DialogHeader className="border-b pb-2">
          <DialogTitle>Publish test</DialogTitle>
          <DialogDescription>
            Publish test and send it to your students
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div>
            <p>Title</p>
            {parse(test?.title)}
          </div>

          <div>
            <p className="text-gray-500 ">Expires at:</p>
            <TestPublishExpireAt
              setExpiresAtDay={(day) =>
                setExpiresAt((prev) => ({ ...prev, day }))
              }
              setExpiresAtHour={(hour) =>
                setExpiresAt((prev) => ({ ...prev, hour }))
              }
              expiryOptionsDays={expiryOptionsDays}
              expiryOptionsHours={expiryOptionsHours}
            />
          </div>
          <div>
            <p className="text-gray-500">Settings</p>
            <TestSettingsOptions />
          </div>
          <Button
            disabled={isPending}
            onClick={() =>
              handelPublishTest(
                {
                  data: {
                    expiresAt: new Date(expiresAt.day + expiresAt.hour),
                  },
                  id: test.id,
                },
                {
                  onSuccess: () => setIsOpen(false),
                }
              )
            }
          >
            Publish
          </Button>
        </div>
      </DialogContent>
      <DialogTrigger asChild>
        <Button disabled={test.isPublished}>Publish</Button>
      </DialogTrigger>
    </Dialog>
  );
}
