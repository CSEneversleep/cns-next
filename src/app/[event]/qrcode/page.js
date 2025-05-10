import { getEvent } from "@/utils/firebase/event";
import QRCode from "react-qr-code";
import { headers } from "next/headers";

export default async function QRPage({ params }) {
  const event = await params.event;
  const eventData = await getEvent(event);
  const title = eventData?.eventname || "이벤트 없음";

  // 요청 헤더에서 호스트 정보 가져오기
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const fullURL = `${protocol}://${host}/${event}`;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{title} QR Code</h1>
      <QRCode value={fullURL} size={300} />
    </div>
  );
}