// src/photo2video/page.js
import Image from "next/image";
import { groupPhotosByKeyword } from "@/utils/groupByKeyword";
import { getTotalImage } from "@/utils/getImage";
import { labelImage} from "@/lib/labelImage"

// 필요하면 캐시 무효화
export const dynamic = "force-dynamic";

async function fetchPhotos() {
  const res = await getTotalImage("temp");
  return res;
}

export default async function Photo2VideoPage() {
  const photos = await fetchPhotos();
  console.log(photos);
  // ★ 병렬 Vision 호출 (비용 주의)
  // 라벨링: 함수 직접 호출 → HTTP 오버헤드·URL 에러 없음
  const photosWithTags = await Promise.all(
    photos.map(async (p) => {
      const tags = await labelImage(p.src);
      return { ...p, datetime: p.datetime.toISOString(), tags };
    })
  );

  //여기까지 되면 다 된거임
  const keywordGroups = groupPhotosByKeyword(photosWithTags);

  const sortedKeywords = Object.keys(keywordGroups).sort();
  console.log(photos);

  return (
    <main className="container mx-auto p-4">
      {sortedKeywords.map((kw) => (
        <section key={kw} className="mb-10">
          <h2 className="text-xl font-bold mb-2">#{kw}</h2>

          <div className="grid grid-cols-3 gap-4">
            {keywordGroups[kw].map((photo) => (
              <img
                key={photo.id}
                src={photo.src}
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