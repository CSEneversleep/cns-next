// @/app/api/get-total/route.js

import { getTotalImage } from '@/utils/getImage';

export async function POST(req) {
  const { username } = await req.json();
  if (!username) { return Response.json({ error: 'username and folder are required' }, { status: 400 }); }
  const result = await getTotalImage(username);
  return Response.json(result);
}