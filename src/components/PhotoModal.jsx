// app/components/PhotoModal.jsx
'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './PhotoModal.module.css';

export default function PhotoModal({ photo, onClose }) {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    const modalLayer = (
        // ② 네가 만든 클래스 그대로 사용
        <div className={styles.background} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.viewer}>
                    <img
                        src={photo.src}
                        alt={photo.title}
                    />
                </div>
                <div className={styles.thumbnails}>
                    {/* e.g. 미리보기 */}
                    <img src={photo.src} alt="thumbnail" />
                </div>
                <button onClick={onClose} className={styles.closeButton}>닫기</button>
            </div>
        </div>
    );

    return createPortal(modalLayer, document.body);
}
