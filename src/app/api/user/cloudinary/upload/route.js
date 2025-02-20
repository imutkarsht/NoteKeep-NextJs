import uploadToCloudinary from "@/lib/upload-cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  const fileBuffer = await file.arrayBuffer();

  const mimeType = file.type;
  const encoding = 'base64';
  const base64Data = Buffer.from(fileBuffer).toString('base64');

  const fileUri = 'data:' + mimeType + ';' + encoding + ',' + base64Data;

  const res = await uploadToCloudinary(fileUri, file.name);

  if (res.success && res.result) {
    return NextResponse.json({
      message: 'success',
      imgUrl: res.result.secure_url,
    });
  } else return NextResponse.json({ message: 'failure' });
}
