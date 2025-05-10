// src/app/show/slide/SliderShow.js

"use client";  // Client-side rendering을 위한 directive

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';  // swiper import
import 'swiper/swiper-bundle.css';  // swiper 스타일 import
import styles from './SliderShow.module.css';  // 스타일 import

function SliderShow({ photos, style }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div style={{ ...style }}>
      <h1>{photos[currentIndex].title}</h1>
      <p>{photos[currentIndex].description}</p>
      <div className={styles.imageContainer}>
        <Swiper
          spaceBetween={10}  // 슬라이드 간 간격
          slidesPerView={1}  // 한 번에 보여줄 슬라이드 수
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}  // 슬라이드 변경 시 인덱스 업데이트
          navigation={{
            prevEl: `.${styles.arrowPrev}`,  // 이전 버튼
            nextEl: `.${styles.arrowNext}`,  // 다음 버튼
          }}  // 화살표 버튼 동작 설정
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className={styles.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* 화살표 버튼 추가 */}
        <div className={`${styles.arrow} ${styles.arrowPrev}`}>&lt;</div> {/* 왼쪽 화살표 */}
        <div className={`${styles.arrow} ${styles.arrowNext}`}>&gt;</div> {/* 오른쪽 화살표 */}
      </div>
    </div>
  );
}

export default SliderShow;
