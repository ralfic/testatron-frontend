import { cn } from '@/lib/utils';

const tabs = [
  {
    id: 1,
    name: 'Questions',
  },
  {
    id: 2,
    name: 'Settings',
  },
];

interface Props {
  currentTab: number;
  setCurrentTab: (tab: number) => void;
  className?: string;
}

export function TestEditHeaderTabs({
  currentTab,
  setCurrentTab,
  className,
}: Props) {
  return (
    <div className={cn('flex gap-4  items-center justify-center', className)}>
      {tabs.map((tab) => (
        <p
          key={tab.id}
          className={cn(
            'text-lg cursor-pointer',
            currentTab === tab.id && 'border-b-2 border-b-cyan-400'
          )}
          onClick={() => setCurrentTab(tab.id)}
        >
          {tab.name}
        </p>
      ))}
    </div>
  );
}
