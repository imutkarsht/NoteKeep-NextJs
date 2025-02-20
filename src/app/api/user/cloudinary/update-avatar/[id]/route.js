import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Accounts from '@/lib/models/userModel';

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const { imageUrl } = await req.json();
    const image = imageUrl.split('/').pop();

    if (!imageUrl) {
      return NextResponse.json(
        { message: 'Image URL is required' },
        { status: 400 }
      );
    }

    const updatedAccount = await Accounts.findByIdAndUpdate(
      id,
      { image },
      { new: true }
    );

    if (updatedAccount) {
      return NextResponse.json(
        {
          message: 'Profile Picture Updated successfully',
          profile: updatedAccount,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Profile not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error updating profile picture:', error);
    return NextResponse.json(
      { message: 'Error updating Profile Picture', error: error.message },
      { status: 500 }
    );
  }
}
