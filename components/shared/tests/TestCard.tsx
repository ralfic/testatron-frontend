'use client';
import { ITest, TestStatus } from '@/types';
import { Home, Trash } from 'lucide-react';
import parser from 'html-react-parser';
import Link from 'next/link';
import { format } from 'date-fns';
import { RiDraftLine } from 'react-icons/ri';
import { FcExpired } from 'react-icons/fc';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RiShareForwardFill } from 'react-icons/ri';
import { AiFillEdit } from 'react-icons/ai';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useDeleteTest } from '@/hooks/useDeleteTest';

interface Props {
  test: Omit<ITest, 'questions'>;
}

export function TestCard({ test }: Props) {
  const { handleDelete, isPending } = useDeleteTest();
  return (
    <div className="bg-card p-4 rounded-[20px] relative  font-bold flex justify-between gap-4">
      {test.code && test.status === TestStatus.PUBLISHED && (
        <span className="absolute bg-secondary  top-0  left-0 rounded-ss-[20px] rounded-ee-[20px] py-1.5 px-4 flex gap-2">
          <Home className="w-6 h-6" />
          Code: {test.code}
        </span>
      )}
      {test.status === TestStatus.EXPIRED && (
        <span className="absolute bg-secondary  top-0  left-0 rounded-ss-[20px] rounded-ee-[20px] py-1.5 px-4 flex gap-2">
          <FcExpired className="w-6 h-6" />
          Expired
        </span>
      )}
      {test.status === TestStatus.DRAFT && (
        <span className="absolute bg-secondary  top-0  left-0 rounded-ss-[20px] rounded-ee-[20px] py-1.5 px-4 flex gap-2">
          <RiDraftLine className="w-6 h-6" />
          Draft
        </span>
      )}
      <div className="flex justify-between pt-4">
        <div className="flex flex-col ">
          <div className="mt-1 text-lg">{parser(test.title)}</div>
          {test.status === TestStatus.EXPIRED && test.expiresAt && (
            <p className="text-gray-600 font-normal text-sm">
              Ends in: {format(new Date(test.expiresAt), 'dd/MM/yyyy HH:mm')}
            </p>
          )}
          <div
            className={cn('flex gap-2 relative', {
              'before:h-full before:absolute before:top-0 before:left-[50%] before:translate-x-[50%] before:w-px  before:bg-primary':
                !!test.expiresAt,
            })}
          >
            <div className="text-gray-600 dark:text-gray-300 font-normal text-sm">
              Created at:{' '}
              {test.createdAt && format(new Date(test.createdAt), 'dd/MM/yyyy')}
            </div>
            {test.expiresAt && (
              <div className="text-gray-600 dark:text-gray-300 font-normal text-sm">
                Expires at:{' '}
                {test.expiresAt &&
                  format(new Date(test.expiresAt), 'dd/MM/yyyy')}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Link
          href={`/test/edit/${test.id}`}
          className="cursor-pointer"
          prefetch
        >
          <Button variant="secondary" size={'icon'}>
            <AiFillEdit className="w-6 h-6 dark:invert" />
          </Button>
        </Link>

        {test.status === TestStatus.PUBLISHED && (
          <Button variant="secondary" size={'icon'}>
            <RiShareForwardFill className="w-6 h-6 dark:invert" />
          </Button>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size={'icon'}>
              <Trash className="w-6 h-6" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-sm bg-card">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete test
                and dates relative to it and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(test.id)}
                disabled={isPending}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
