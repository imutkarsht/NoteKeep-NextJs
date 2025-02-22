import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Review from '@/lib/models/reviewModel';

export async function POST(req) {
  await connectDB();

  try {
    const { reviewBy, stars, review } = await req.json();

    if (!reviewBy) {
      return NextResponse.json(
        { error: 'User ID (reviewBy) is required.' },
        { status: 400 }
      );
    }
    if (stars < 1 || stars > 5) {
      return NextResponse.json(
        { error: 'Stars must be between 1 and 5.' },
        { status: 400 }
      );
    }

    const newReview = new Review({
      reviewBy,
      stars,
      review,
    });

    await newReview.save();

    return NextResponse.json(
      { message: 'Review submitted successfully!', review: newReview },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong. Try again!' },
      { status: 500 }
    );
  }
}
