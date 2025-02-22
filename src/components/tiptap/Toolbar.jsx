import React from 'react';
import { Button } from '../ui/button';
import { useCurrentEditor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Strikethrough,
  Pilcrow,
  List,
  ListOrdered,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react';

const Toolbar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <div className="editor-container">
      <div className="toolbar flex flex-wrap gap-2 p-3 rounded-lg shadow-md">
        {[
          { icon: <Bold />, command: 'toggleBold', type: 'bold' },
          { icon: <Italic />, command: 'toggleItalic', type: 'italic' },
          { icon: <Strikethrough />, command: 'toggleStrike', type: 'strike' },
          { icon: <Pilcrow />, command: 'setParagraph', type: 'paragraph' },
          { icon: <List />, command: 'toggleBulletList', type: 'bulletList' },
          {
            icon: <ListOrdered />,
            command: 'toggleOrderedList',
            type: 'orderedList',
          },
          { icon: <Undo />, command: 'undo', type: '' },
          { icon: <Redo />, command: 'redo', type: '' },
        ].map(({ icon, command, type }) => (
          <Button
            key={command}
            type="button"
            onClick={() => editor.chain().focus()[command]().run()}
            disabled={!editor.can().chain().focus()[command]().run()}
            className={editor.isActive(type) ? 'is-active' : ''}
          >
            {icon}
          </Button>
        ))}
        {[
          { level: 1, icon: <Heading1 /> },
          { level: 2, icon: <Heading2 /> },
          { level: 3, icon: <Heading3 /> },
        ].map(({ level, icon }) => (
          <Button
            key={`heading-${level}`}
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            className={editor.isActive('heading', { level }) ? 'is-active' : ''}
          >
            {icon}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
