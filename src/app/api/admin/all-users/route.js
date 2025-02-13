import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Accounts from '@/lib/models/userModel';

export async function GET(req) {
  try {
    await dbConnect();

    const accounts = await Accounts.find({});

    if (!accounts) {
      return NextResponse.json(
        { error: 'Accounts not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        users: {
          accounts: accounts.map((account) => ({
            id: account._id,
            name: account.firstName + ' ' + account.lastName,
            role: account.role,
            avatar: account.image,
            email: account.email,
            joinDate: account.createdAt,
            isVerified: account.isVerified,
          })),
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
