import { cloudinary } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { message: 'No image URL provided' },
        { status: 400 }
      );
    }

    const publicId = imageUrl.split('/').pop().split('.')[0];

    await cloudinary.uploader.destroy('notekeep-images/' + publicId);

    return NextResponse.json(
      { message: 'Old image deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete old image', error: error.message },
      { status: 500 }
    );
  }
}
