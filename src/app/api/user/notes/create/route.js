import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Note from '@/lib/models/noteModel';
import { NoteSchema } from '@/lib/schemas/NoteSchema';
import mongoose from 'mongoose';

export async function POST(req) {
  try {
    await connectDB();
    const { title, content, tags, userId } = await req.json();

    const parsedData = NoteSchema.safeParse({ title, content, tags });
    if (!parsedData.success) {
      return NextResponse.json(
        { message: 'Validation error', errors: parsedData.error.errors },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID (createdBy) is required.' },
        { status: 400 }
      );
    }

    const newNote = await Note.create({
      ...parsedData.data,
      createdBy: new mongoose.Types.ObjectId(userId),
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating the note.', error: error.message },
      { status: 500 }
    );
  }
}
