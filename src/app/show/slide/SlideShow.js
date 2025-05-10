// src/app/show/slide/SlideShow.js
"use client";

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styles from './SlideShow.module.css';

export default function SlideShow({
  photos,
  animate = true,
  width = "100%",        // ← 추가: 컨테이너 가로
  height = null,          // ← 추가: 컨테이너 세로(지정 없으면 비율 유지)
  arrowScale = 0.08,
  showArrows = true
}) {
  const [index, setIndex]   = useState(0);
  const total               = photos.length;
  const audioRef            = useRef(null);
  const containerRef = useRef(null);   // ★ 컨테이너 DOM 참조
  const [arrowSize, setArrowSize] = useState(32);   // ★ 이 줄이 반드시 필요
  const [audioStarted, setAudioStarted] = useState(false);

  /* ------------ 자동 슬라이드 ------------ */
  useEffect(() => {
    if (!animate) return;
    const id = setInterval(() => {
      setIndex((p) => (p + 1) % total);
    }, 3000);
    return () => clearInterval(id);
  }, [total, animate]);

  const next = () => setIndex((p) => (p + 1) % total);
  const prev = () => setIndex((p) => (p - 1 + total) % total);

  /* ------------ 음악 ------------ */
  const handleFirstClick = () => {
    if (!audioStarted && audioRef.current) {
      audioRef.current.play().then(() => setAudioStarted(true)).catch(() => {});
    }
  };
 /* 화살표 크기 계산 → 화살표가 없으면 건너뜀 */
  useEffect(() => {
    if (!showArrows) return;
    if (typeof window === "undefined") return;
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

  /* ------------ 컨테이너 크기 ------------ */
  const containerStyle = height
    ? { width, height }                        // 고정 W×H
    : { width, paddingTop: "75%" };            // 비율 4:3 기본

  return (
    <div
      ref = {containerRef}
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
          <img className={styles.image} src={p.imageUrl} alt={p.title} />

          {/* ① 날짜 + 인물 오버레이 */}
          <div className={styles.infoOverlay}>
            <p>{new Date(p.createdAt).toLocaleDateString()}</p>
            {p.peoples?.length > 0 && (
              <p>{p.peoples.map((pe) => pe.name).join(", ")}</p>
            )}
          </div>

          {/* 하단 캡션 */}
          <div className={styles.caption}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </div>
        </div>
      ))}

      {/* 화살표 */}
      {showArrows && (
            <>
              <button
                className={`${styles.arrow} ${styles.left}`}
                style={{ fontSize: `${arrowSize}px`, padding: `${arrowSize * 0.3}px` }}
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                &#10094;
              </button>

              <button
                className={`${styles.arrow} ${styles.right}`}
                style={{ fontSize: `${arrowSize}px`, padding: `${arrowSize * 0.3}px` }}
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                &#10095;
              </button>
            </>
          )}

      <button
        className={`${styles.arrow} ${styles.right}`}
        onClick={(e) => { e.stopPropagation(); next(); }}
      >&#10095;</button>

      <audio ref={audioRef} src="/music/for_you.mp3" loop preload="auto" />
    </div>
  );
}
