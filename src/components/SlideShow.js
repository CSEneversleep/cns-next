"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useRecorder from "@/hooks/useRecorder";
import styles from "./SlideShow.module.css";

export function SlideShow({ entries, interval = 2500 }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  /* ─── 녹화 훅 ─── */
  const { isRecording, start, stop } = useRecorder(containerRef, {
    fps: 30,
    mimeType: "video/webm;codecs=vp9",
    fileName: "photo2video.webm",
  });

  /* ─── 자동 전환 ─── */
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % entries.length),
      interval
    );
    return () => clearInterval(id);
  }, [entries.length, interval]);

  const [kw, photos] = entries[index];

  /* ❶ 그리드 크기: floor(√n) → 6장 ⇒ 2×2(4장), 10장 ⇒ 3×3(9장) */
  const gridN = Math.max(1, Math.floor(Math.sqrt(photos.length)));
  const displayPhotos = photos.slice(0, gridN * gridN); // 초과분 버림

  return (
    <>
      {/* 녹화 버튼 */}
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

      {/* 600×600 슬라이드 영역 */}
      <div ref={containerRef} className={styles.container}>
        <AnimatePresence initial={false} mode="wait">
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

            {/* 바둑판 */}
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
        </AnimatePresence>
      </div>
    </>
  );
}
