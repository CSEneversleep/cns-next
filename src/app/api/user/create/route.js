// /api/user/create/route.js

import { NextResponse } from 'next/server';
import { makeUser } from '@/utils/firebase/user';

export async function POST(req) {
  try {
    const { username, folders, fullname } = await req.json();

    if (!username || !folders || !fullname) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await makeUser(username, folders, fullname);
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('[POST /user/create] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}