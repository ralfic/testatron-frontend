import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, ListOrdered, Redo, Underline, Undo } from 'lucide-react';
import { RxListBullet, RxTextNone } from 'react-icons/rx';
import { cn } from '@/lib/utils';

interface Props {
  editor: Editor | null;
  withLists?: boolean;
}

export function MenuBar({ editor, withLists }: Props) {
  if (!editor) {
    return null;
  }

  const listButtons = [
    {
      icon: <RxListBullet />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      disabled: !editor.can().chain().focus().toggleBulletList().run(),
      pressed: editor.isActive('bulletList'),
    },
    {
      icon: <ListOrdered />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive('orderedList'),
    },
  ];

  const MenuBarButtons = [
    {
      icon: <Bold />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      disabled: !editor.can().chain().focus().toggleBold().run(),
      pressed: editor.isActive('bold'),
    },
    {
      icon: <Italic />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
      pressed: editor.isActive('italic'),
    },
    {
      icon: <Underline />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      disabled: !editor.can().chain().focus().toggleUnderline().run(),
      pressed: editor.isActive('underline'),
    },

    {
      icon: <Undo />,
      onClick: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().chain().focus().undo().run(),
      pressed: editor.isActive('undo'),
    },
    {
      icon: <Redo />,
      onClick: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().chain().focus().redo().run(),
    },
    {
      icon: <RxTextNone />,
      onClick: () => {
        editor.chain().focus().unsetAllMarks().run();
      },
      disabled: !editor.can().chain().focus().unsetAllMarks().run(),
    },
  ];

  if (withLists) {
    MenuBarButtons.splice(MenuBarButtons.length - 1, 0, ...listButtons);
  }

  return (
    <div className={cn('flex gap-1 py-1 transition-all justify-end')}>
      {MenuBarButtons.map(({ icon, onClick, disabled, pressed }, i) => (
        <Button
          className={cn(pressed ? 'bg-muted' : '', 'w-7 h-7')}
          key={i}
          variant="ghost"
          size="icon"
          onClick={onClick}
          disabled={disabled}
          type="button"
        >
          {icon}
        </Button>
      ))}
    </div>
  );
}
