// src/app/show/slide/SlideShow.js
"use client";  // Client-side rendering을 위한 directive

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // AnimatePresence 임포트
import styles from './SlideShow.module.css';

function SlideShow({ photos, style }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // 이미지 전환
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000); // 3초마다 이미지 전환

    return () => clearInterval(intervalId);
  }, [photos.length]);

  // 사용자가 화면을 클릭하면 오디오 재생 시작
  const handleUserInteraction = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("오디오 재생 실패:", error);
        });
    }
  };

  // 사람들 이름과 날짜 문자열 생성
  const peopleNames = photos[currentIndex].peoples.map(person => person.name).join(', ');
  const date = photos[currentIndex].createdAt;

  return (
    <div onClick={handleUserInteraction} style={{ cursor: 'pointer', ...style }}>
      <h1>{photos[currentIndex].title}</h1>
      <p>{photos[currentIndex].description}</p>
      <div className={styles.container}>
        {/* AnimatePresence로 이미지 전환 시 애니메이션 추가 */}
        <AnimatePresence exitBeforeEnter>
          <motion.img
            key={currentIndex} // key 값을 currentIndex로 설정해 매번 이미지가 변경될 때마다 리렌더링하도록 함
            src={photos[currentIndex].imageUrl}
            alt={photos[currentIndex].title}
            className={styles.image}
            initial={{ opacity: 0 }} // 시작 시 이미지가 보이지 않음
            animate={{ opacity: 1 }} // 서서히 나타남
            exit={{ opacity: 0 }} // 사라짐
            transition={{ 
              duration: 1, // 애니메이션 지속 시간
              ease: "easeInOut", // 부드러운 애니메이션 시작과 끝
            }} // 자연스럽게 변화
          />
        </AnimatePresence>
        {/* 오른쪽 구석에 날짜, 사람 이름 표시 */}
        <div className={styles.overlay}>
          <p>{date}</p>
          <p>{peopleNames}</p>
        </div>
      </div>
      <audio ref={audioRef} loop>
        <source src="/music/for_you.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default SlideShow;
