// app/[event]/list/page.js

import PhotoGallery from '@/components/PhotoGallery';
import { getTotalImages } from '@/utils/firebase/getImage';  // Firebase 유틸 함수

export default async function ListPage({ params }) {
    const { event } = params;

    // 서버 측에서 Firebase 호출
    const photos = await getTotalImages(event);

    return (
        <div className="p-6">
        <h1 className="text-2xl mb-4">{event} 행사의 사진 목록</h1>
        {/* photos를 그대로 Client 컴포넌트로 넘김 */}
        <PhotoGallery photos={photos} />
        </div>
    );
}
