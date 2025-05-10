import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationSelector({ setLatitude, setLongitude }) {
  useMapEvents({
    click(e) {
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
    },
  });
  return null;
}

export default function MapViewComponent({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
}) {
  return (
    <div style={{ marginTop: "10px" }}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]} />
        <LocationSelector
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
      </MapContainer>
    </div>
  );
}
