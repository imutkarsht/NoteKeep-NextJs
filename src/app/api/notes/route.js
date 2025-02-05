import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Note from '@/lib/models/noteModel';

connectDB();

export async function GET(req) {
  try {
    const notes = await Note.find({});
    if (notes) {
      return NextResponse.json(
        {
          message: 'Fetched Notes Successfully',
          notes: notes,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: 'No notes found',
        },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error in finding notes',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
