// src/photo2video/page.js
import Image from "next/image";
import { groupPhotosByKeyword } from "@/utils/groupByKeyword";
import { getTotalImage } from "@/utils/getImage";
import { labelImage} from "@/lib/labelImage"
import PQueue from "p-queue";
import { SlideShow} from "@/components/SlideShow"
import AudioPlayer from "@/components/AudioPlayer";

// 필요하면 캐시 무효화
export const dynamic = "force-dynamic";

const MAX_CONCURRENCY = 5;
const MAX_RPM = 60;

async function fetchPhotos() {
  const res = await getTotalImage("a08746d3-c0b");
  return res;
}

export default async function Photo2VideoPage() {
  const photos = await fetchPhotos();
  console.log(photos.length);
  // ★ 병렬 Vision 호출 (비용 주의)
  // 라벨링: 함수 직접 호출 → HTTP 오버헤드·URL 에러 없음
  const queue = new PQueue({
    concurrency: MAX_CONCURRENCY,
    interval: 60_000,       // 60 초
    intervalCap: MAX_RPM,   // 한 인터벌(분) 당 최대 N 개
  });
  
  const photosWithTags = await Promise.all(
    photos.map((p) =>
      queue.add(async () => {
        const tags = await labelImage(p.src);
        return tags
          ? { ...p, datetime: p.datetime.toMillis?.() ?? +new Date(p.datetime), tags }
          : null;
      })
    )
  );

  //여기까지 되면 다 된거임
  const cleaned = photosWithTags.filter(Boolean);
  const keywordGroups = groupPhotosByKeyword(cleaned);
  console.log(keywordGroups);

    // 1. [키워드, 사진배열] 쌍으로 바꿔서
    const entries = Object.entries(keywordGroups)

    // 2. 사진 수 기준 내림차순 정렬 후, 상위 10개 자르기
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 5)

    console.log(entries);
    console.log("Here is END!!!!!!!!!!!!!! now top10 Groups");

    // 3. 다시 { 키워드: 사진배열, … } 형태의 객체로
    const intro = { type: 'intro', text: '제 3회 SKYST Hackerthon을 마친 그대에게' };
    const outro = { type: 'outro', text: '여러분, 감사하고 수고하셨습니다!!' };
    const allSlides = [intro, ...entries, outro];

  return (
    <main className="container mx-auto p-4">
      <AudioPlayer src="/music/for_you.mp3" volume={0.7} />
      <SlideShow entries={allSlides} />
    </main>
  );
}