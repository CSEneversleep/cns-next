// @/app/api/get-all/route.js

import { getAllImage } from '@/utils/getImage';

export async function POST(req) {
  const { username, folder } = await req.json();

  if (!username || !folder) {
    return Response.json({ error: 'username and folder are required' }, { status: 400 });
  }

  const result = await getAllImage(username, folder);
  return Response.json(result);
}