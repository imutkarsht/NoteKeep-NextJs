import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Accounts from '@/lib/models/userModel';

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Accounts ID is required' },
        { status: 400 }
      );
    }

    const account = await Accounts.findOne({ _id: id });

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: account._id,
          name: account.firstName + ' ' + account.lastName,
          role: account.role,
          avatar: account.image,
          email: account.email,
          isVerified: account.isVerified
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching Accounts:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
