// @/app/api/value/event/route.js

import { NextResponse } from 'next/server';
import { getTotalEvent } from '@/utils/firebase/event';

/**
 * [GET] /api/value/event
 *
 * Response (200):
 * [
 *   { id: 'abc123', eventname: '제 3회 SKYST', ... },
 *   { id: 'def456', eventname: '제 2회 ABC', ... },
 *   ...
 * ]
 */
export async function GET() {
  try {
    const events = await getTotalEvent();
    return NextResponse.json(events, { status: 200 });
  } catch (err) {
    return new Response(`Error fetching events: ${err.message}`, { status: 500 });
  }
}