import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Note from '@/lib/models/noteModel';

connectDB();

export async function POST(req) {
  try {
    const { title, content, tags } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: 'Title and content are required.' },
        { status: 400 }
      );
    }

    const newNote = await Note.create({
      title,
      content,
      tags,
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating the note.', error },
      { status: 500 }
    );
  }
}
