'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import Pin from '@/components/Pin';           // 앞서 만든 아이콘

/* 하드코딩 테스트 데이터 */
const locations = [
    { folder: 'folder1', title: '서울역', latitude: 37.556, longitude: 126.9723, redirect_to: '/photos/1' },
    { folder: 'folder2', title: '한강',   latitude: 37.5271, longitude: 126.9369, redirect_to: '/photos/2' },
    { folder: 'folder3', title: '회사',   latitude: 37.5651, longitude: 126.9895, redirect_to: '/photos/3' },
    { folder: 'folder1', title: '광화문', latitude: 37.5759, longitude: 126.9768, redirect_to: '/photos/4' },
];

/* 폴더 → 핀 색상 매핑 */
const pinColor = {
    folder1: '#e74c3c',
    folder2: '#3498db',
    folder3: '#f1c40f',
};

export default function MapPage() {
    const router = useRouter();

    /* ⭐ 현재 선택된 폴더 상태. 'all' = 전부 보기 */
    const [active, setActive] = useState('all');

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
