import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Accounts from '@/lib/models/userModel';

export async function PUT(req, { params }) {
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

    const changedRole = account.role === 'admin' ? 'user' : 'admin';
    const updatedAccount = await Accounts.findOneAndUpdate(
        {_id: id},
        {role: changedRole},
        {new: true}
    )
    return NextResponse.json(
      {
        success: true,
        user: {
          id: updatedAccount._id,
          name: updatedAccount.firstName + ' ' + updatedAccount.lastName,
          role: updatedAccount.role,
          avatar: updatedAccount.image,
          email: updatedAccount.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching Account:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
