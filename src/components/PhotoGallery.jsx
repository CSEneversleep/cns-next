'use client';

import { useState } from 'react';
import PhotoModal from './PhotoModal';
import styles from './PhotoGallery.module.css';

export default function PhotoGallery({ photos }) {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <>
            {/* grid-template이 픽셀 고정인 CSS Module 적용 */}
            <div className={styles.gallery}>
                {photos.map((photo, idx) => (
                    <img
                        key={idx}
                        src={photo.src}
                        alt={`${photo.username}의 사진`}
                        className={styles.thumb}
                        onClick={() => setSelectedPhoto(photo)}
                    />
                ))}
            </div>

            {selectedPhoto && (
                <PhotoModal
                    photo={selectedPhoto}
                    onClose={() => setSelectedPhoto(null)}
                />
            )}
        </>
    );
}
