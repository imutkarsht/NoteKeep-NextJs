'use client';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useState } from 'react';
import { Button } from './ui/button';
import parse from 'html-react-parser';

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const [parsedHtmlContent, setParsedHtmlContent] = useState('');

  if (!editor) return null;

  const handleEditorContent = () => {
    const html = editor.getHTML();
    setParsedHtmlContent(html);
  };

  return (
    <div className="editor-container">
      <div className="toolbar flex flex-wrap gap-2 p-3 rounded-lg shadow-md">
        {[
          { label: 'B', command: 'toggleBold', type: 'bold' },
          { label: 'I', command: 'toggleItalic', type: 'italic' },
          { label: 'S', command: 'toggleStrike', type: 'strike' },
          { label: 'P', command: 'setParagraph', type: 'paragraph' },
          {
            label: 'ul',
            command: 'toggleBulletList',
            type: 'bulletList',
          },
          {
            label: 'ol',
            command: 'toggleOrderedList',
            type: 'orderedList',
          },
          { label: 'Undo', command: 'undo', type: '' },
          { label: 'Redo', command: 'redo', type: '' },
        ].map(({ label, command, type }) => (
          <Button
            key={label}
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
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            className={editor.isActive('heading', { level }) ? 'is-active' : ''}
          >
            H{level}
          </Button>
        ))}
      </div>

      <div className="m-4">
        <Button
          className="bg-teal-500 text-white"
          onClick={handleEditorContent}
        >
          Save
        </Button>
      </div>

      <div className="tiptap mt-4">{parse(parsedHtmlContent)}</div>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
  }),
];

export default function Editor() {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content=""
    ></EditorProvider>
  );
}
