// src/app/show/slide/page.js
import SlideShow from './SlideShow';

export default async function Page() {
  // ★ 실제로는 DB·API 등에서 받아오면 됩니다.
  const photos = [
    {
      imageUrl: '/image/image1.jpg',
      latitude: '37.7749',
      longitude: '-122.4194',
      title: 'Photo 1',
      description: 'Description of Photo 1',
      createdAt: '2025-05-10T15:00:00Z',
      peoples: [{ name: 'John' }, { name: 'Jane' }],
    },
    {
      imageUrl: '/image/image2.jpg',
      latitude: '40.7128',
      longitude: '-74.0060',
      title: 'Photo 2',
      description: 'Description of Photo 2',
      createdAt: '2025-05-10T15:05:00Z',
      peoples: [{ name: 'Coldplay' }],
    },
    {
      imageUrl: '/image/image3.jpg',
      latitude: '48.8566',
      longitude: '2.3522',
      title: 'Photo 3',
      description: 'Description of Photo 3',
      createdAt: '2025-05-10T15:10:00Z',
      peoples: [{ name: 'Alice' }],
    },
  ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // 시간순 정렬

  return (
    <main className="container">
      <SlideShow photos={photos} animate = {true} width = "400px" height = "300px" arrowScale = {0.08} showArrows = {true}/>
    </main>
  );
}
