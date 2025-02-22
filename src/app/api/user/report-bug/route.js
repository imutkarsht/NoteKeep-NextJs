import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Bug from '@/lib/models/bugModel';

export async function POST(req) {
  try {
    await connectDB();

    const { reportedBy, bugType, severity, pageOrFeature, description } =
      await req.json();

    if (
      !reportedBy ||
      !bugType ||
      !severity ||
      !pageOrFeature ||
      !description
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const newBug = new Bug({
      reportedBy,
      bugType,
      severity,
      pageOrFeature,
      description,
    });

    await newBug.save();

    return NextResponse.json(
      { message: 'Bug report submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting bug report:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
