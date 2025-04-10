'use client';
import { cn } from '@/lib/utils';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import TextStyle from '@tiptap/extension-text-style';
import { MenuBar } from './MenuBar';
import { Label } from '@/components/ui/label';

interface Props {
  text: string;
  setText: (text: string) => void;
  className?: string;
  withLists?: boolean;
  label?: string;
  placeholder?: string;
}

export function TextEditor({
  text,
  setText,
  className,
  label,
  withLists = false,
}: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, OrderedList, BulletList],
    content: text,
    onUpdate: ({ editor }) => setText(editor.getHTML()),
    editorProps: {
      attributes: {
        class: cn(
          'focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border  p-2 rounded-sm transition-colors editor ',
          withLists && 'min-h-[140px]',
          className
        ),
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        {label && (
          <Label className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
            {label}
          </Label>
        )}
        <MenuBar withLists={withLists} editor={editor} />
      </div>
      <EditorContent className="focus-visible:right-0 " editor={editor} />
    </div>
  );
}
