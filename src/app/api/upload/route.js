import { uploadImage } from '@/utils/utils/uploadImage';

export async function POST(req) {
  const body = await req.json();
  const result = await uploadImage(body.username, body.folder, body.content, body.metadata);

  return Response.json(result);
}
