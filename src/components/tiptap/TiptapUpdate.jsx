'use client';
import { EditorProvider } from '@tiptap/react';
import React from 'react';
import Toolbar from './Toolbar';
import { extensions } from '@/config/Tiptap.config';

const MenuBar = () => {
  return <Toolbar />;
};

export default function TiptapUpdate({ setContent, content }) {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
      onUpdate={({ editor }) => {
        setContent(editor.getHTML());
      }}
    ></EditorProvider>
  );
}
