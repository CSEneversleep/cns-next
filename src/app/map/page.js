'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import Pin from '@/components/Pin';

const colorPalette = [
    '#e74c3c', '#3498db', '#f1c40f',
    '#2ecc71', '#9b59b6', '#1abc9c',
];

export default function MapPage() {
    const router = useRouter();
    const [locations, setLocations] = useState([]);
    const [active, setActive] = useState('all');
    const [loading, setLoading] = useState(true);

  /* ---------- 1. 데이터 fetch ---------- */
    useEffect(() => {
        (async () => {
        try {
            const res = await fetch('/api/get-total', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'kms', folder: 'math' }),
        });
        if (!res.ok) throw new Error('fetch failed');

        const raw = await res.json();
        const converted = raw.map(item => ({
            folder: item.folder,
            title : item.title,
            latitude : item.latitude,
            longitude: item.longitude,
            redirect_to: `/photo/${item.id.split('__')[1]}`,
        }));
        setLocations(converted);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
        })();
    }, []);

  /* ---------- 2. 파생 상태 계산 ---------- */
    const folders = useMemo(
        () => Array.from(new Set(locations.map(l => l.folder))),
        [locations]
    );

    // 동적 폴더 → 색 매핑
    const folderColor = useMemo(() => {
        const map = {};
        folders.forEach((f, idx) => {
        map[f] = colorPalette[idx % colorPalette.length];
        });
        return map;
    }, [folders]);

    // 좌표가 있는 데이터만
    const dataWithCoords = locations.filter(
        l => typeof l.latitude === 'number' && typeof l.longitude === 'number'
    );

    const filtered =
        active === 'all'
        ? dataWithCoords
        : dataWithCoords.filter(l => l.folder === active);

    const center = filtered[0] ?? { latitude: 37.5665, longitude: 126.9780 }; // ✅ fallback: 서울시청

    /* ---------- 3. UI 렌더 ---------- */
    if (loading) return <p style={{ padding: 20 }}>로딩 중…</p>;

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
        {/* 사이드바 */}
        <aside style={{ width: 150, borderRight: '1px solid #ddd', padding: '1rem' }}>
            <h3 style={{ marginBottom: 8 }}>폴더 선택</h3>

        <button
            onClick={() => setActive('all')}
            style={{
                width: '100%', marginBottom: 6,
                background: active === 'all' ? '#333' : '#f0f0f0',
                color: active === 'all' ? '#fff' : '#000',
                border: 'none', padding: '4px 0', cursor: 'pointer',
            }}
        >전체</button>

        {folders.map(f => (
            <button
            key={f}
            onClick={() => setActive(f)}
            style={{
                width: '100%', marginBottom: 6,
                background: active === f ? folderColor[f] : '#f0f0f0',
                color: active === f ? '#fff' : '#000',
                border: 'none', padding: '4px 0', cursor: 'pointer',
            }}
            >{f}</button>
        ))}
        </aside>

        {/* 지도 */}
        <div style={{ flex: 1 }}>
        <Map
            initialViewState={{ latitude: center.latitude, longitude: center.longitude, zoom: 10 }}
            mapStyle="https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        >
            <NavigationControl position="top-right" />
            {filtered.map(loc => (
                <Marker key={`${loc.latitude}-${loc.longitude}-${loc.title}`}
                        latitude={loc.latitude}
                        longitude={loc.longitude}
                        anchor="bottom">
                <button
                    onClick={() => router.push(loc.redirect_to)}
                    title={loc.title}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <Pin color={folderColor[loc.folder]} />
                </button>
                </Marker>
            ))}
            </Map>
        </div>
    </div>
    );
}
