// src/app/show/slide/page.js
import SlideShow from './SlideShow';

export default async function SlidePage() {
  // 예시로 데이터를 가져온다고 가정합니다.
  const photos = [
    {
      imageUrl: '/image/image1.jpg',
      latitude: '37.7749',
      longitude: '-122.4194',
      title: 'Photo 1',
      description: 'Description of Photo 1',
      createdAt: '2025-05-10',
      peoples: [{ name: 'John' }, { name: 'Jane' }]
    },
    {
      imageUrl: '/image/image2.jpg',
      latitude: '40.7128',
      longitude: '-74.0060',
      title: 'Photo 2',
      description: 'Description of Photo 2',
      createdAt: '2025-05-10',
      peoples: [{ name: 'Coldplay' }]
    },
    {
      imageUrl: '/image/image3.jpg',
      latitude: '40.7128',
      longitude: '-74.0060',
      title: 'Photo 3',
      description: 'Description of Photo 2',
      createdAt: '2025-05-10',
      peoples: [{ name: 'Coldplay' }, { name: 'Jin' }]
    },
        {
      imageUrl: '/image/image4.jpg',
      latitude: '40.7128',
      longitude: '-74.0060',
      title: 'Photo 3',
      description: 'Description of Photo 2',
      createdAt: '2025-05-10',
      peoples: [{ name: 'Coldplay' }, { name: 'Jin' }]
    },
    {
      imageUrl: '/image/image5.jpg',
      latitude: '40.7128',
      longitude: '-74.0060',
      title: 'Photo 3',
      description: 'Description of Photo 2',
      createdAt: '2025-05-10',
      peoples: [{ name: 'Coldplay' }, { name: 'Jin' }]
    },
    {
      imageUrl: '/image/image6.jpg',
      latitude: '40.7128',
      longitude: '-74.0060',
      title: 'Photo 3',
      description: 'Description of Photo 2',
      createdAt: '2025-05-10',
      peoples: [{ name: 'Coldplay' }, { name: 'Jin' }]
    },
  ];

  return <SlideShow photos={photos} />;
}