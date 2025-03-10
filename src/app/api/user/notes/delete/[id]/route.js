import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Note from '@/lib/models/noteModel';
import { ObjectId } from 'mongodb';

connectDB();

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;


    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid note ID' }, { status: 400 });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (deletedNote) {
      return NextResponse.json(
        { message: 'Note deleted successfully', note: deletedNote },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting note', error: error.message },
      { status: 500 }
    );
  }
}
