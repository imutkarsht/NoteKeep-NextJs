import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Accounts from '@/lib/models/userModel';

export async function POST(req) {
  try {
    await dbConnect();
    const { email } = await req.json(); 
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const account = await Accounts.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, account },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying account:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
