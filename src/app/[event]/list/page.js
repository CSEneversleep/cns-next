// app/[event]/list/page.js

import PhotoGallery from '@/components/PhotoGallery';
import { getTotalImage } from '@/utils/getImage';  // Firebase 유틸 함수

export default async function ListPage({ params }) {
    const { event } = await params;

    const rawPhotos = await getTotalImage(event);
    const photos = JSON.parse(JSON.stringify(rawPhotos));

    return (
        <div className="p-6">
        <h1 className="text-2xl mb-4">{event} 행사의 사진 목록</h1>
        {/* photos를 그대로 Client 컴포넌트로 넘김 */}
        <PhotoGallery photos={photos} />
        </div>
    );
}
