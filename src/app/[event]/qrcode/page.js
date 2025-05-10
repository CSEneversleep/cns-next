"use client";
import { useParams } from "next/navigation";
import QRCode from "react-qr-code";

export default function QRPage() {
  const URL = process.env.NEXT_PUBLIC_URL;
  const { event } = useParams();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{event} QR Code</h1>
      <QRCode value={`${URL}/${event}`} size={300} />
    </div>
  );
}
