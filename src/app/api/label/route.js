import OpenAI from "openai";

export const runtime = "nodejs";      // Edge에서도 동작하지만 Vision은 Node 권장
export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    // ① 클라이언트가 보낸 { imageUrl }
    const { imageUrl } = await request.json();
    if (!imageUrl) {
      return Response.json({ error: "imageUrl is required" }, { status: 400 });
    }

    // ② Vision 프롬프트
    const messages = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              "다음 이미지를 보고 핵심 키워드 7개만 한글 명사로 콤마로 구분해줘. 다른 말은 쓰지 마.",
          },
          {
            type: "image_url",
            image_url: { url: imageUrl },
          },
        ],
      },
    ];

    // ③ OpenAI 호출
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-vision-preview",
      response_format: { type: "json_object" },
      max_tokens: 100, // 충분히 작게
      messages,
    });

    // ④ 결과 파싱 – {"keywords":"햄버거, 사람, 컴퓨터, 실내, 웃음"}
    const raw = completion.choices[0].message.content;
    const { keywords } = JSON.parse(raw);
    const tags = keywords
      .split(",")
      .map((w) => w.trim())
      .filter(Boolean);

    return Response.json({ tags }, { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "labeling failed" }, { status: 500 });
  }
}
