'use client';

import { useEffect } from 'react';

export default function PhotoModal({ photo, onClose }) {
  // ESC 키로도 닫히게
    useEffect(() => {
        function handleKey(e) {
        if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return (
        <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose} // 배경 클릭 시 닫기
        >
        <div
            className="bg-white rounded-lg p-6 max-w-[90%] max-h-[90%] overflow-auto"
            onClick={e => e.stopPropagation()}  // 내부 클릭은 전파 차단
        >
            <img
            src={photo.src}
            alt=""
            className="max-w-full max-h-[70vh] mb-4"
            />
            <p className="text-gray-700 mb-2">제공자: {photo.username}</p>
            <button
            onClick={onClose}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
            닫기
            </button>
        </div>
        </div>
    );
}
