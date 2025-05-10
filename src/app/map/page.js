'use client';

import { useRouter } from 'next/navigation';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
// import { locations } from '@/data/locations';
import Pin from '@/components/Pin';

// test data for locations
const locations = [
    { folder: 'trip',   title: '서울역 야경',  latitude: 37.556, longitude: 126.9723, redirect_to: '/photos/seoul-night' },
    { folder: 'friend', title: '한강 피크닉',  latitude: 37.5271, longitude: 126.9369, redirect_to: '/photos/hangang' },
    { folder: 'work',   title: '회사 세미나',  latitude: 37.5651, longitude: 126.9895, redirect_to: '/photos/workshop' },
];

// pin color
const pinColor = {
  trip:   '#e74c3c', // 빨강
  friend: '#3498db', // 파랑
  work:   '#f1c40f', // 노랑
};

export default function MapPage() {
    const router = useRouter();
    const center = locations[0];

    return (
        <div style={{ width: '100%', height: '100vh' }}>
        <Map
            initialViewState={{ latitude: center.latitude, longitude: center.longitude, zoom: 10 }}
            mapStyle="https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        >
            <NavigationControl position="top-right" />

            {locations.map((loc) => (
            <Marker
                key={`${loc.latitude}-${loc.longitude}`}
                latitude={loc.latitude}
                longitude={loc.longitude}
                anchor="bottom"
            >
                <button
                onClick={() => router.push(loc.redirect_to)}
                title={loc.title}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                <Pin color={pinColor[loc.folder] || '#8e44ad'} />
                </button>
            </Marker>
            ))}
        </Map>
        </div>
    );
}
