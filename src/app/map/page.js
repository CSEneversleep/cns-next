'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import Pin from '@/components/Pin';           // 앞서 만든 아이콘

/* 폴더 → 핀 색상 매핑 */
const pinColor = {
    folder1: '#e74c3c',
    folder2: '#3498db',
    folder3: '#f1c40f',
};

export default function MapPage() {
    const router = useRouter();

    const [locations, setLocations] = useState([]);
    const [active, setActive] = useState('all');

    useEffect(() => {
        async function fetchLocations() {
            const res = await fetch('/api/get-all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'kms',
                folder: 'math' // 또는 사용자가 선택할 수 있게 만들 수도 있음
            }),
            });

            if (res.ok) {
            const data = await res.json();

            const converted = data.map(item => ({
                folder: item.folder,
                title: item.title,
                latitude: item.latitude ?? 37.5,
                longitude: item.longitude ?? 126.9,
                redirect_to: `/photo/${item.id.split('__')[1]}`, // 예: math__abc123 → abc123
            }));

            setLocations(converted);
            } else {
            console.error('Failed to fetch locations');
            }
        }

        fetchLocations();
    }, []);


    /* ⭐ 중복 없는 폴더 목록 계산 */
    const folders = useMemo(
        () => Array.from(new Set(locations.map((l) => l.folder))),
        []
    );

    /* ⭐ 필터링된 위치 */
    const filtered = active === 'all'
        ? locations
        : locations.filter((l) => l.folder === active);

    /* 지도의 초기 중심은 필터링 결과 첫 번째 좌표 */
    const center = filtered[0] ?? locations[0];

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
        {/* === 사이드바 === */}
        <aside
            style={{
            width: 150,
            borderRight: '1px solid #ddd',
            padding: '1rem',
            boxSizing: 'border-box',
            }}
        >
            <h3 style={{ margin: '0 0 0.5rem', fontSize: 16 }}>폴더 선택</h3>

            {/* '전체' 버튼 */}
            <button
            onClick={() => setActive('all')}
            style={{
                display: 'block',
                width: '100%',
                marginBottom: 6,
                background: active === 'all' ? '#333' : '#f0f0f0',
                color: active === 'all' ? '#fff' : '#000',
                border: 'none',
                padding: '4px 0',
                cursor: 'pointer',
            }}
            >
            전체
            </button>

            {/* 각 폴더 버튼 */}
            {folders.map((f) => (
            <button
                key={f}
                onClick={() => setActive(f)}
                style={{
                display: 'block',
                width: '100%',
                marginBottom: 6,
                background: active === f ? pinColor[f] : '#f0f0f0',
                color: active === f ? '#fff' : '#000',
                border: 'none',
                padding: '4px 0',
                cursor: 'pointer',
                }}
            >
                {f}
            </button>
            ))}
        </aside>

        {/* === 지도 영역 === */}
        <div style={{ flex: 1 }}>
            <Map
            initialViewState={{
                latitude: center.latitude,
                longitude: center.longitude,
                zoom: 10,
            }}
            mapStyle="https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            >
            <NavigationControl position="top-right" />

            {filtered.map((loc) => (
                <Marker
                key={`${loc.latitude}-${loc.longitude}-${loc.title}`}
                latitude={loc.latitude}
                longitude={loc.longitude}
                anchor="bottom"
                >
                <button
                    onClick={() => router.push(loc.redirect_to)}
                    title={loc.title}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <Pin color={pinColor[loc.folder]} />
                </button>
                </Marker>
            ))}
            </Map>
        </div>
        </div>
    );
}
