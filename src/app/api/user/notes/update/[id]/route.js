import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Note from '@/lib/models/noteModel';
import { ObjectId } from 'mongodb';

connectDB();

export async function PUT(req, { params }) {
  try {
    const { id } = await params;

    const { title, content, tags } = await req.json();

    console.log(id);

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid note ID' }, { status: 400 });
    }

    if (!title || !content || !tags || tags.length === 0) {
      return NextResponse.json(
        { message: 'Missing required fields (title, content, or tags)' },
        { status: 400 }
      );
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, tags },
      { new: true }
    );

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
