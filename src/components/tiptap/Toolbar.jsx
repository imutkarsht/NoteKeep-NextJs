import React from 'react';
import { Button } from '../ui/button';
import { useCurrentEditor } from '@tiptap/react';

const Toolbar = () => {
    const { editor } = useCurrentEditor();

  if (!editor) return null;
  return (
    <div className="editor-container">
      <div className="toolbar flex flex-wrap gap-2 p-3 rounded-lg shadow-md">
        {[
          { label: 'B', command: 'toggleBold', type: 'bold' },
          { label: 'I', command: 'toggleItalic', type: 'italic' },
          { label: 'S', command: 'toggleStrike', type: 'strike' },
          { label: 'P', command: 'setParagraph', type: 'paragraph' },
          { label: 'ul', command: 'toggleBulletList', type: 'bulletList' },
          { label: 'ol', command: 'toggleOrderedList', type: 'orderedList' },
          { label: 'Undo', command: 'undo', type: '' },
          { label: 'Redo', command: 'redo', type: '' },
        ].map(({ label, command, type }) => (
          <Button
            key={label}
            type="button"
            onClick={() => editor.chain().focus()[command]().run()}
            disabled={!editor.can().chain().focus()[command]().run()}
            className={editor.isActive(type) ? 'is-active' : ''}
          >
            {label}
          </Button>
        ))}
        {[1, 2, 3].map((level) => (
          <Button
            key={level}
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            className={editor.isActive('heading', { level }) ? 'is-active' : ''}
          >
            H{level}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
