// src/app/show/slide/SlideShow.js
"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './SlideShow.module.css';

export default function SlideShow({
  photos,
  animate = true,
  width = "100%",        // 컨테이너 가로
  height = null,         // 컨테이너 세로(지정 없으면 비율 유지)
  arrowScale = 0.08,
  showArrows = true
}) {
  const [index, setIndex] = useState(0);
  const total = photos.length;
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const [arrowSize, setArrowSize] = useState(32);
  const [audioStarted, setAudioStarted] = useState(false);

  useEffect(() => {
    console.log("📸 photos:", photos);
  }, [photos]);

  // 자동 슬라이드
  useEffect(() => {
    if (!animate) return;
    const id = setInterval(() => {
      setIndex((p) => (p + 1) % total);
    }, 3000);
    return () => clearInterval(id);
  }, [total, animate]);

  const next = () => setIndex((p) => (p + 1) % total);
  const prev = () => setIndex((p) => (p - 1 + total) % total);

  // 첫 클릭 시 음악 재생
  const handleFirstClick = () => {
    if (!audioStarted && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setAudioStarted(true))
        .catch(() => {});
    }
  };

  // 화살표 크기 계산
  useEffect(() => {
    if (!showArrows || typeof window === "undefined") return;
    const el = containerRef.current;
    if (!el) return;

    function update() {
      const { offsetWidth: w, offsetHeight: h } = el;
      setArrowSize(Math.min(w, h) * arrowScale);
    }
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [arrowScale, showArrows]);

  // 컨테이너 스타일 (4:3 비율 기본)
  const containerStyle = height
    ? { width, height }
    : { width, paddingTop: "75%" };

  return (
    <div
      ref={containerRef}
      className={`${styles.slider} ${!animate ? styles.noAnim : ""}`}
      style={containerStyle}
      onClick={handleFirstClick}
    >
      {photos.map((p, i) => (
        <div
          key={i}
          className={`
            ${styles.slide}
            ${i === index ? styles.active : ""}
            ${!animate ? styles.noAnimSlide : ""}
          `}
        >
          {/* 이미지 */}
          <img className={styles.image} src={p.src} alt={p.username} />

         {/* username이 있을 때만 렌더링 */}
          {p.username && (
            <div className={styles.infoOverlay}>
              <p>Image by: {p.username}</p>
            </div>
          )}
        </div>
      ))}

      {/* 좌우 화살표 */}
      {showArrows && (
        <>
          <button
            className={`${styles.arrow} ${styles.left}`}
            style={{
              fontSize: `${arrowSize}px`,
              padding: `${arrowSize * 0.3}px`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            &#10094;
          </button>

          <button
            className={`${styles.arrow} ${styles.right}`}
            style={{
              fontSize: `${arrowSize}px`,
              padding: `${arrowSize * 0.3}px`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            &#10095;
          </button>
        </>
      )}

      {/* 백업 우측 버튼(필요없으면 제거 가능)
      <button
        className={`${styles.arrow} ${styles.right}`}
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
      >
        &#10095;
      </button> */}

      <audio ref={audioRef} src="/music/for_you.mp3" loop preload="auto" />
    </div>
  );
}
