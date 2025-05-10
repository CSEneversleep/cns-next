import { labelImage } from "@/lib/labelImage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { src } = await request.json();        // ← 필드 이름 변경
    if (!src) return Response.json({ error: "src missing" }, { status: 400 });

    const tags = await labelImage(src);
    return Response.json({ tags });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "label failed" }, { status: 500 });
  }
}