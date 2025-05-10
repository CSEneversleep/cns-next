"use client";  // Client-side rendering을 위한 directive

import { useEffect, useState, useRef } from 'react';

function SlideShow({ photos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // 초기값 false로 설정
  const audioRef = useRef(null);  // useRef로 수정

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
          setIsPlaying(true); // 오디오가 재생되면 상태 변경
        })
        .catch((error) => {
          console.error("오디오 재생 실패:", error); // 에러가 발생한 경우 콘솔에 출력
        });
    }
  };

  return (
    <div onClick={handleUserInteraction} style={{ cursor: 'pointer' }}>
      <h1>{photos[currentIndex].title}</h1>
      <p>{photos[currentIndex].description}</p>
      <img
        src={photos[currentIndex].imageUrl}
        alt={photos[currentIndex].title}
        style={{ width: '100%', height: 'auto' }}
      />
      <audio ref={audioRef} loop>
        <source src="/music/for_you.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default SlideShow;
