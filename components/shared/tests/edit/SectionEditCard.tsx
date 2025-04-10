import { cn } from '@/lib/utils';
import parser from 'html-react-parser';
import { TestEditModal } from '../TestEditModal';
import { ITest } from '@/types';

export function SectionEditCard({ test }: { test: ITest }) {
  return (
    <div className={cn('flex gap-2 bg-card rounded-xl  py-4 px-5 flex-col')}>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 justify-center">
          <div className="text-2xl font-semibold">{parser(test.title)}</div>
          {test.description && (
            <div className="text-sm editor">{parser(test.description)}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <TestEditModal test={test} action="edit" />
        </div>
      </div>
    </div>
  );
}
