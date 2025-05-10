// app/[event]/list/page.js

// Component
import NavBar from '@/app/components/NavBar';
import PhotoGallery from '@/components/PhotoGallery';
// Style (CSS)
import '@/styles/global.css';
// Utils
import { getTotalImage } from '@/utils/getImage';  // Firebase 유틸 함수
import { getEvent } from '@/utils/firebase/event';

export default async function ListPage({ params }) {
    const { event } = await params;
    const eventData = await getEvent(event);
    const title = eventData?.eventname || '이벤트 없음';

    const rawPhotos = await getTotalImage(event);
    const photos = JSON.parse(JSON.stringify(rawPhotos));

    return (
        <div id="whole-container">
            <NavBar />
            <main className="main">
                <div className="p-6">
                <h1 className="text-2xl mb-4 ml-4">{title} 행사의 사진 목록</h1>
                {/* photos를 그대로 Client 컴포넌트로 넘김 */}
                <PhotoGallery photos={photos} />
                </div>
            </main>
        </div>
    );
}
