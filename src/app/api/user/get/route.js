// /api/user/get/route.js

import { NextResponse } from 'next/server';
import { getUser } from '@/utils/firebase/user';

export async function POST(req) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json({ error: 'Missing username' }, { status: 400 });
    }

    const userData = await getUser(username);
    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ status: 'success', user: userData });
  } catch (error) {
    console.error('[POST /user/get] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}