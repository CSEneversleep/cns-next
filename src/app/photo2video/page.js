// src/photo2video/page.js
import Image from "next/image";
import { groupPhotosByKeyword } from "@/utils/groupByKeyword";

// 필요하면 캐시 무효화
export const dynamic = "force-dynamic";

async function fetchPhotos() {
  // 예시 – 실제로는 DB·REST 등에서 받아오세요
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/get-total");
  return res.json(); // [{ id, s3Url, createdAt, ...}, ...]
}

// 서버에서 바로 라벨 붙이기
async function getLabeledPhoto(photo) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/label",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: photo.s3Url }),
      cache: "no-store",     // Vision 호출 결과를 매번 새로 받음
    }
  );
  const data = await res.json();
  return { ...photo, tags: data.tags }; // tags: ["햄버거", ...]
}

export default async function Photo2VideoPage() {
  const photos = await fetchPhotos();
  // ★ 병렬 Vision 호출 (비용 주의)
  const photosWithTags = await Promise.all(
    photos.map((p) => getLabeledPhoto(p))
  );
    
  const keywordGroups = groupPhotosByKeyword(photosWithTags);

  const sortedKeywords = Object.entries(keywordGroups)
  .sort((a,b) => b[1].length - a[1].length)  // 내림차순
  .map(([k]) => k);


  return (
    <main className="container mx-auto p-4">
      {sortedKeywords.map((kw) => (
        <section key={kw} className="mb-10">
          <h2 className="text-xl font-bold mb-2">#{kw}</h2>

          <div className="grid grid-cols-3 gap-4">
            {keywordGroups[kw].map((photo) => (
              <Image
                key={photo.id}
                src={photo.s3Url}
                alt={photo.tags.join(", ")}
                width={300}
                height={200}
                className="rounded-lg object-cover"
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
//   return (
//     <main className="py-8 flex justify-center">
//         <KeywordSlider groups={keywordGroups} interval={5000} />
//     </main>
//   );
}
