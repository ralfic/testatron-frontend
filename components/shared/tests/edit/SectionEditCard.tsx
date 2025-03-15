import { TextEditor } from '@/components/editor/TextEditor';
import { cn } from '@/lib/utils';
import { useTestStore } from '@/store/useTestStore';

interface Props {
  title: string;
  description: string | null;
  focusElementId?: string | number;
  setFocus?: () => void;
}

export function SectionEditCard({
  title,
  description,
  focusElementId,
  setFocus,
}: Props) {
  const { updateTestStore } = useTestStore();

  return (
    <div
      className={cn(
        'flex gap-2 bg-white rounded-xl  py-4 px-5 flex-col',
        focusElementId === 'header' && 'border-l-4 border-l-cyan-400'
      )}
      onClick={setFocus}
    >
      <>
        <TextEditor
          className="text-2xl font-semibold"
          text={title}
          setText={(text) => updateTestStore({ title: text })}
        />
        <TextEditor
          text={description || ''}
          setText={(text) => updateTestStore({ description: text })}
        />
      </>
    </div>
  );
}
