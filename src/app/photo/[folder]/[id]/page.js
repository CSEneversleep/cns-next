// app/photo/[folder]/[id]/page.js

import Image from 'next/image';
import { getImage } from '@/utils/getImage';

export const dynamic = 'force-dynamic'; // 캐싱 비활성화

export default async function PhotoPage({ params }) {
    const { folder, id } = await params;

    const meta = await getImage('kms', folder, id);
    if (!meta) return <p>해당 사진이 존재하지 않습니다.</p>;

    // const dateStr = meta.date ?? new Date(meta.timestamp).toLocaleDateString();
    const locationStr = `${meta.latitude?.toFixed(5)}, ${meta.longitude?.toFixed(5)}`;
    const peopleStr = meta.peoples?.map(p => p.name).join(', ') ?? '없음';

    return (
        <main className="p-6 max-w-xl mx-auto space-y-6">
        <div className="flex justify-center">
            <img src={meta.src} alt={meta.title} 
            width={400}
            height={300}
            className="rounded-lg object-contain" />
        </div>

        <div className="space-y-2 text-base leading-relaxed">
            <p><strong>제목:</strong> {meta.title}</p>
            {/* <p><strong>날짜:</strong> {dateStr}</p> */}
            <p><strong>위치:</strong> {locationStr}</p>
            <p><strong>같이 간 사람들:</strong> {peopleStr}</p>
        </div>
        </main>
    );
}
