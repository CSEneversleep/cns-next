import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * 이미지 URL → 태그 배열
 * @param {string} imageUrl  ex) https://…/3ee98a6e-ae3.jpg
 * @returns {Promise<string[]>}  ex) ["햄버거","코딩",…]
 */
export async function labelImage(imageUrl) {
  const messages = [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: `
다음 이미지를 보고 핵심 **키워드 7개**를 추출해.
반드시 **JSON** 형식 {"keywords":"키워드1, 키워드2, …"} 로만 답해. 
다른 문구·공백·줄바꿈은 쓰지 마.
`.trim(),
        },
        { type: "image_url", image_url: { url: imageUrl } },
      ],
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    max_tokens: 50,
    messages,
  });

  const raw = completion.choices[0].message.content;
  const { keywords } = JSON.parse(raw);
  return keywords.split(",").map((w) => w.trim()).filter(Boolean);
}
