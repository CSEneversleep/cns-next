// src/components/SlideShow.js
"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useRecorder from "@/hooks/useRecorder";
import styles from "./SlideShow.module.css";

/**
 * props
 * ─ entries  : [
 *      { type:"intro",  text:"…" },                       // 특수 슬라이드
 *      ["햄버거",   [photo, photo, …] ],                  // 일반 슬라이드
 *      …,
 *      { type:"outro",  text:"…" }
 *   ]
 * ─ interval : 각 슬라이드 표시 시간(ms)
 */
export function SlideShow({ entries, interval = 2500 }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  /* ─── 화면 녹화 훅 ─── */
  const { isRecording, start, stop } = useRecorder(containerRef, {
    fps: 30,
    mimeType: "video/webm;codecs=vp9",
    fileName: "photo2video.webm",
  });

  /* ─── 자동 전환 타이머 ─── */
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % entries.length),
      interval
    );
    return () => clearInterval(id);
  }, [entries.length, interval]);

  /* ─── 현재 슬라이드 정보 ─── */
  const cur = entries[index];
  const isSpecial = typeof cur === "object" && cur.type; // intro/outro 판별

  // 일반 슬라이드용 데이터 준비
  let kw, photos, gridN, displayPhotos;
  if (!isSpecial) {
    [kw, photos] = cur;                         // cur = [keyword, photos[]]
    gridN = Math.max(1, Math.floor(Math.sqrt(photos.length))); // √n 내림
    displayPhotos = photos.slice(0, gridN * gridN);            // 넘치는 사진 버림
  }

  return (
    <>
      {/* ───────── 녹화 버튼들 ───────── */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={start}
          disabled={isRecording}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          {isRecording ? "REC…" : "Start REC"}
        </button>
        <button
          onClick={stop}
          disabled={!isRecording}
          className="px-3 py-1 bg-gray-500 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* ───────── 600×600 슬라이드 영역 ───────── */}
      <div ref={containerRef} className={styles.container}>
        <AnimatePresence initial={false} mode="wait">
          {/* ─── 인트로 / 아웃트로 ─── */}
          {isSpecial && (
            <motion.div
              key={cur.type}
              className={styles.blackSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p>{cur.text}</p>
            </motion.div>
          )}

          {/* ─── 일반 키워드 슬라이드 ─── */}
          {!isSpecial && (
            <motion.div
              key={kw}
              className={styles.slide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* 중앙 라벨 */}
              <div className={styles.centerLabel}>#{kw}</div>

              {/* 바둑판 그리드 */}
              <div
                className={styles.grid}
                style={{
                  gridTemplateColumns: `repeat(${gridN}, 1fr)`,
                  gridTemplateRows: `repeat(${gridN}, 1fr)`,
                }}
              >
                {displayPhotos.map((p) => (
                  <div key={p.id} className={styles.cell}>
                    <img src={p.src} alt={p.tags.join(",")} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
