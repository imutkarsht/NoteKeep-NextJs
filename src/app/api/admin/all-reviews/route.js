import dbConnect from '@/lib/db';
import Bug from '@/lib/models/bugModel';
import Review from '@/lib/models/reviewModel';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await dbConnect();

    const reviews = await Review.find({}).populate(
      'reviewBy',
      'firstName lastName email image'
    );

    const bugReports = await Bug.find({}).populate(
      'reportedBy',
      'firstName lastName email image'
    );

    if (!reviews) {
      return NextResponse.json({ error: 'Reviews not found' }, { status: 404 });
    }

    if (!bugReports) {
      return NextResponse.json(
        { error: 'Bug Reports not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          reviews,
          bugReports,
        },
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
