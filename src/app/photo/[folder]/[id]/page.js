// src/app/photo/[id]/page.js
import Image from 'next/image';
import { photos } from '@/data/photos';

export const dynamic = 'force-dynamic';

export default async function PhotoPage({params}) {
    // 1) 데이터 가져오기 
    const {folder, id} = await params;
    const meta = photos.find(
        (p) => p.id === id && p.folder === folder
    );
    if (!meta) return <p>Not found omg</p>;

    // 2) 날짜 및 문자열 포맷
    const dateStr = meta.date ?? new Date(meta.timestamp).toLocaleDateString();
    const locationStr = `${meta.latitude.toFixed(5)}, ${meta.longitude.toFixed(5)}`;
    const peopleStr = meta.peoples?.map(p => p.name).join(', ') ?? '없음';

    return (
        <main className="p-6 max-w-xl mx-auto space-y-6">
        
        <div className="flex justify-center">
            <Image
            src={meta.src}
            alt={meta.title}
            width={400}
            height={300}
            className="rounded-lg object-contain"
            />
        </div>

        <div className="space-y-2 text-base leading-relaxed">
            <p><strong>제목:</strong> {meta.title}</p>
            <p><strong>날짜:</strong> {dateStr}</p>
            <p><strong>위치:</strong> {locationStr}</p>
            <p><strong>같이 간 사람들:</strong> {peopleStr}</p>
        </div>
        </main>
    );
}

