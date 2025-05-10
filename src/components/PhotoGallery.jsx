'use client';

import { useState } from 'react';
import PhotoModal from './PhotoModal';

export default function PhotoGallery({ photos }) {
  // 선택된 사진을 담을 상태
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <>
        {/* 썸네일 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map(photo => (
            <img
                key={photo.id}
                src={photo.src}
                alt={`${photo.username}의 사진`}
                className="cursor-pointer rounded-lg hover:opacity-90"
                onClick={() => setSelectedPhoto(photo)}
            />
            ))}
        </div>

        {/* selectedPhoto가 있을 때만 모달 렌더 */}
        {selectedPhoto && (
            <PhotoModal
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
            />
        )}
        </>
    );
}
