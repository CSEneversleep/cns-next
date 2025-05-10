// src/photo2video/page.js
import Image from "next/image";
import { groupPhotosByKeyword } from "@/utils/groupByKeyword";
import { getTotalImage } from "@/utils/getImage";
import { labelImage} from "@/lib/labelImage"
import pMap from "p-map";
import { SlideShow} from "@/components/SlideShow"

// 필요하면 캐시 무효화
export const dynamic = "force-dynamic";

const MAX_CONCURRENCY = 3;

async function fetchPhotos(event) {
  const res = await getTotalImage(event);
  return res;
}

export default async function Photo2VideoPage({params}) {
  const event = params;
  const photos = await fetchPhotos(event);
  // ★ 병렬 Vision 호출 (비용 주의)
  // 라벨링: 함수 직접 호출 → HTTP 오버헤드·URL 에러 없음
    const photosWithTags = await pMap(
    photos,
    async (p) => {
        const tags = await labelImage(p.src);
        return tags ? {...p, datetime: p.datetime.toMillis?.()      // ➜  Number (ms)
             ?? +new Date(p.datetime), tags} : null;
    },
    { concurrency: MAX_CONCURRENCY }
    );

  //여기까지 되면 다 된거임
  const cleaned = photosWithTags.filter(Boolean);
  const keywordGroups = groupPhotosByKeyword(cleaned);

    // 1. [키워드, 사진배열] 쌍으로 바꿔서
    const entries = Object.entries(keywordGroups)

    // 2. 사진 수 기준 내림차순 정렬 후, 상위 10개 자르기
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 10)

    console.log(entries);
    console.log("Here is END!!!!!!!!!!!!!! now top10 Groups");

    // 3. 다시 { 키워드: 사진배열, … } 형태의 객체로
    const top10Groups = Object.fromEntries(entries);
    console.log(top10Groups);

//   return (
//     <main className="container mx-auto p-4">
//       {sortedKeywords.map((kw) => (
//         <section key={kw} className="mb-10">
//           <h2 className="text-xl font-bold mb-2">#{kw}</h2>

//           <div className="grid grid-cols-3 gap-4">
//             {keywordGroups[kw].map((photo) => (
//               <img
//                 key={photo.id}
//                 src={photo.src}
//                 alt={photo.tags.join(", ")}
//                 width={300}
//                 height={200}
//                 className="rounded-lg object-cover"
//               />
//             ))}
//           </div>
//         </section>
//       ))}
//     </main>
//   );
  return (
    <main className="container mx-auto p-4">
      <SlideShow entries={entries} />
    </main>
  );
}