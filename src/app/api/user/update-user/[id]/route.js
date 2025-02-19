import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Accounts from '@/lib/models/userModel';
import { AccountsSchema } from '@/lib/schemas/UserSchema';

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params; 

    const { firstName, lastName } = await req.json();

    // Validate incoming data
    const parsedData = AccountsSchema.pick({ firstName, lastName }).safeParse({
      firstName,
      lastName,
    });

    if (!parsedData.success) {
      return NextResponse.json(
        { message: 'Validation error', errors: parsedData.error.errors },
        { status: 400 }
      );
    }

    // Extract valid data from parsedData
    const validData = parsedData.data;

    // Perform the update operation with the valid data
    const updatedAccount = await Accounts.findByIdAndUpdate(id, validData, {
      new: true,
    });

    if (updatedAccount) {
      return NextResponse.json(
        { message: 'Profile updated successfully', profile: updatedAccount },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Profile not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating Profile', error: error.message },
      { status: 500 }
    );
  }
}
