// @/app/components/unique/event/EventActions.js

'use client';

import Link from 'next/link';

export default function EventActions({ eventId }) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${location.origin}/${eventId}/upload`);
    alert('업로드 링크가 복사되었습니다!');
  };

  return (
    <div className="button-group">
      <button className="action-button" onClick={handleCopy}>
        사진 업로드 링크 복사
      </button>
      <Link href={`/${eventId}/qrcode`} className="action-button">
        QR 화면 띄우기
      </Link>
    </div>
  );
}