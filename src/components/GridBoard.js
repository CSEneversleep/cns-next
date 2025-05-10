"use client";
import Image from "next/image";

/**
 * props:
 *  - tag      : "코딩"
 *  - photos   : [{ id, s3Url, tags }]
 *  - cellSize : px 단위 한 변 길이 (기본 180)
 */
export default function GridBoard({ tag, photos, cellSize = 180 }) {
  /* --- 동적으로 그리드 행·열 계산 --- */
  const n = photos.length;
  const cols = Math.ceil(Math.sqrt(n));          // 최소 정사각형
  const rows = Math.ceil(n / cols);

  /* 중앙 태그 오버레이 위치 계산 */
  const centerCol = Math.floor(cols / 2) + 1;    // 1‑base
  const centerRow = Math.floor(rows / 2) + 1;

  return (
    <div
      className="relative mx-auto"
      style={{
        /* 전체 그리드 사이즈 */
        width: cols * cellSize,
        height: rows * cellSize * (4 / 3),        // 3:4 비율 보정
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridAutoRows: `${(4 / 3) * cellSize}px`,  // 3:4 셀 비율
      }}
    >
      {photos.map((p, idx) => (
        <div key={p.id} className="w-full h-full overflow-hidden">
          <Image
            src={p.s3Url}
            alt={p.tags.join(",")}
            width={cellSize}
            height={(4 / 3) * cellSize}
            className="object-cover w-full h-full"
            priority={idx < 6}              // 첫 화면만 우선 로드
          />
        </div>
      ))}

      {/* 중앙 태그 박스 */}
      <div
        className="absolute flex items-center justify-center font-bold text-2xl text-black"
        style={{
          gridColumn: centerCol,
          gridRow: centerRow,
          /* absolute라 그리드 좌표 무시, 직접 중앙 고정 */
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <span
          className="px-4 py-2 border-4 border-red-500 rounded-md bg-white"
          style={{ lineHeight: 1 }}
        >
          #{tag}
        </span>
      </div>
    </div>
  );
}
