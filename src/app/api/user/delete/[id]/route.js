import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Accounts from '@/lib/models/userModel';
import { ObjectId } from 'mongodb';

connectDB();

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    console.log(id);

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid note ID' }, { status: 400 });
    }

    const deletedAccount = await Accounts.findByIdAndDelete(id);

    if (deletedAccount) {
      return NextResponse.json(
        { message: 'Account deleted successfully', account: deletedAccount },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: 'Account not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting Account', error: error.message },
      { status: 500 }
    );
  }
}
