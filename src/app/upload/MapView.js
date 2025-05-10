"use client";
import dynamic from "next/dynamic";

const DynamicMapView = dynamic(() => import("./MapViewComponent"), {
  ssr: false,
});

export default function MapView(props) {
  return <DynamicMapView {...props} />;
}
