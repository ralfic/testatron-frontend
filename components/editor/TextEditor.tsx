'use client';
import { cn } from '@/lib/utils';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { MenuBar } from './MenuBar';
import { useState, useRef } from 'react';

interface Props {
  text: string;
  setText: (text: string) => void;
  className?: string;
}

export function TextEditor({ text, setText, className }: Props) {
  const [hiddenMenu, setHiddenMenu] = useState(true);
  const menuBarRef = useRef<HTMLDivElement>(null);

  const handleBlur = (event: React.FocusEvent) => {
    if (
      menuBarRef.current &&
      menuBarRef.current.contains(event.relatedTarget as Node)
    ) {
      return; // Не скрывать меню, если фокус перешел на MenuBar
    }
    setHiddenMenu(true);
  };

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: text,
    onUpdate: ({ editor }) => setText(editor.getHTML()),
    editorProps: {
      attributes: {
        class: cn(
          'focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-cyan-300',
          className,
          !hiddenMenu && 'border-b-2 '
        ),
      },
    },
  });

  return (
    <div>
      <EditorContent
        className="focus-visible:right-0"
        editor={editor}
        onFocus={() => setHiddenMenu(false)}
        onBlur={handleBlur}
      />
      <MenuBar ref={menuBarRef} editor={editor} hidden={hiddenMenu} />
    </div>
  );
}
