import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Note from '@/lib/models/noteModel';
import { ObjectId } from 'mongodb';
import { NoteSchema } from '@/lib/schemas/NoteSchema';

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const { title, content, tags } = await req.json();

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid note ID' }, { status: 400 });
    }

    const parsedData = NoteSchema.safeParse({ title, content, tags });
    if (!parsedData.success) {
      return NextResponse.json(
        { message: 'Validation error', errors: parsedData.error.errors },
        { status: 400 }
      );
    }

    const updatedNote = await Note.findByIdAndUpdate(id, parsedData.data, {
      new: true,
    });

    if (updatedNote) {
      return NextResponse.json(
        { message: 'Note updated successfully', note: updatedNote },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating note', error: error.message },
      { status: 500 }
    );
  }
}
