// File: src/components/StarField.js
'use client';

import { useEffect } from 'react';

export default function StarField() {
    useEffect(() => {
        const container = document.querySelector('.star-container');
        if (!container) return;

        const STAR_COUNT = 1;
        for (let i = 0; i < STAR_COUNT; i++) {
        const star = document.createElement('span');
        star.className = 'star';

        // 랜덤 시작 위치 (상단 또는 좌측)
        if (Math.random() < 0.5) {
            star.style.top = '-5px';
            star.style.left = `${Math.random() * window.innerWidth}px`;
        } else {
            star.style.left = '-5px';
            star.style.top = `${Math.random() * window.innerHeight}px`;
        }

        // 랜덤 애니메이션 속도와 지연
        const duration = 2 + Math.random() * 4;   // 2~5초
        const delay = Math.random() * 15;          
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        container.appendChild(star);
        }
    }, []);

    return <section className="star-container" />;
}


