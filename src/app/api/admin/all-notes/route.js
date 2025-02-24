import dbConnect from '@/lib/db';
import Note from '@/lib/models/noteModel';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await dbConnect();

    const notes = await Note.find({}).populate('createdBy', 'firstName lastName email image');

    if (!notes) {
      return NextResponse.json({ error: 'Notes not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        notes: notes,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
