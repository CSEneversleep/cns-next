"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function QRPage() {
  const URL = process.env.NEXT_PUBLIC_URL;
  const params = useParams();
  const { event } = params;
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    setQrCodeUrl(
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${URL}/${event}/`
    );
  }, [event]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{event} QR코드</h1>
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
    </div>
  );
}
