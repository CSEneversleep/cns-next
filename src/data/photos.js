// src/data/photos.js
export const photos = [
    {
        id: 'photo1',
        folder: 'folder1',
        title: '서울역 야경',
        description: '밤 9시 장노출 5초 📷',
        latitude: 37.556,
        longitude: 126.9723,
        peoples: [
            { name: '홍길동' },
            { name: '김철수' },
            { name: '이영희' },
        ],
        timestamp: 1710416400000,
        src: '/image/image1.png',   // ← 썸네일은 public/ 에 둡니다
    },
    {
        id: 'photo2',
        folder: 'folder2',
        title: '한강 피크닉',
        latitude: 37.5271,
        longitude: 126.9369,
        peoples: [
            { name: '홍길동' },
            { name: '김철수' },
        ],
        timestamp: 1710502800000,
        src: '/image/image2.png',
    },
];
