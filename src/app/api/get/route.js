// @/app/api/get/route.js

import { getImage } from '@/utils/getImage';

export async function POST(req) {
  const { username, folder, filename } = await req.json();
  if (!username || !folder || !filename) { return Response.json({ error: 'username, folder, and filename are required' }, { status: 400 }); }
  const result = await getImage(username, folder, filename);
  if (!result) { return Response.json({ error: 'not found' }, { status: 404 }); }
  return Response.json(result);
}