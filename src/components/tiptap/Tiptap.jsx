'use client';
import { EditorProvider } from '@tiptap/react';
import React from 'react';
import Toolbar from './Toolbar';
import { extensions } from '@/config/Tiptap.config';

const MenuBar = () => {
  return <Toolbar />;
};

export default function Tiptap({ setContent }) {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content=""
      onUpdate={({ editor }) => {
        setContent(editor.getHTML());
      }}
    ></EditorProvider>
  );
}
