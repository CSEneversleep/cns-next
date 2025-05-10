// @/app/api/make/route.js

import { NextResponse } from 'next/server';
import { makeEvent } from '@/utils/firebase/event';

/**
 * [POST] /api/make
 *
 * 📥 Request Body (JSON):
 * {
 *   "eventname": "제 3회 SKYST",
 *   "data": { "host": "서울대학교" } // 선택적
 * }
 *
 * 📤 Response (JSON):
 * 성공: { "id": "생성된 ID", "eventname": "..." }
 * 실패: { status: 400, body: "에러 메시지" }
 */
export async function POST(req) {
  try {
    const { eventname, data } = await req.json();
    if (!eventname) throw new Error('eventname is required');

    const id = await makeEvent(eventname, data);
    return NextResponse.json({ id, eventname });
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }
}