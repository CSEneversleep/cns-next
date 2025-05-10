// src/app/show/slide/page.js
import SlideShow from './SlideShow';
import SliderShow from './SliderShow';

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
      description: 'Description of Photo 3',
      createdAt: '2025-05-10',
      peoples: [{ name: '강명석'}, { name: '김인서' }]
    },
        {
      imageUrl: '/image/image4.jpg',
      latitude: '40.7128',
      longitude: '-74.0060',
      title: 'Photo 3',
      description: 'Description of Photo 2',
      createdAt: '2025-05-10',
      peoples: [{ name: '강명석' }, { name: '김범준' }]
    },
    {
      imageUrl: '/image/image6.jpg',
      latitude: '40.7128',
      longitude: '-74.0060',
      title: 'Photo 3',
      description: 'Description of Photo 2',
      createdAt: '2025-05-10',
      peoples: [{ name: '이형주' }, { name: '김범준' }]
    },
  ];
   const imageContainerStyle = {
    width: '400px', // 화면의 80% 크기
    height: '360px', // 화면의 80% 높이
    margin: 'auto',
    position: 'relative', // 절대 위치 조정을 위해 부모의 위치 설정
  };

  return <SliderShow photos={photos} style={imageContainerStyle} />;
}