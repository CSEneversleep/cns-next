import { getEvent } from "@/utils/firebase/event";
import QRCode from "react-qr-code";

export default async function QRPage({ params }) {
  const URL = process.env.NEXT_PUBLIC_URL;
  const event = params.event;
  const eventData = await getEvent(event);
  const title = eventData?.eventname || "이벤트 없음";

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{title} QR Code</h1>
      <QRCode value={`${URL}/${event}`} size={300} />
    </div>
  );
}
