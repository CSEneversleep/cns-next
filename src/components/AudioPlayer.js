// src/components/AudioPlayer.jsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function AudioPlayer({ src, volume = 1 }) {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // 브라우저의 '사용자 상호작용 후 재생' 정책 우회
    const onFirstClick = () => {
      if (!started && audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current.play().catch(() => {/* 무시 */});
        setStarted(true);
        window.removeEventListener('click', onFirstClick);
      }
    };
    window.addEventListener('click', onFirstClick);
    return () => window.removeEventListener('click', onFirstClick);
  }, [started, volume]);

  return (
    /* loop 옵션으로 무한 반복 */
    <audio ref={audioRef} src={src} loop preload="auto" />
  );
}
