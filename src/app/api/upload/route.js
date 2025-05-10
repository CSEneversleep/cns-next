// @/app/api/upload/route.js
import { NextResponse } from 'next/server';
import { uploadImage } from '@/utils/uploadImage'; // 앞서 작성한 uploadImage 함수 사용

export async function POST(req) {
  try {
    const { eventid, content, metadata } = await req.json();
    const result = await uploadImage(eventid, content, metadata);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }
}
