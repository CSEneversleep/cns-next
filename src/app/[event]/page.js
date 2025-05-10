// @/app/[event]/page.js

import Link from 'next/link';
// Component
import NavBar from '@/app/components/NavBar';
import EventActions from '@/app/components/unique/event/EventActions';
// Style (CSS)
import '@/styles/global.css';
import '@/styles/event.css';    
// Utils
import { getEvent } from '@/utils/firebase/event';

export default async function EventPage({ params }) {
  const { event } = await params;
  const eventData = await getEvent(event);
  const title = eventData?.eventname || '이벤트 없음';

  return (
    <div id="whole-container">
      <NavBar />
      <main className="main">
        <h1 className="event-title">{title}의 숨결</h1>

        {/* View Buttons */}
        <div className="button-group">
          <Link href={`/${event}/slide`} className="view-button">슬라이드처럼 보기</Link>
          <Link href={`/${event}/list`} className="view-button">목록으로 보기</Link>
          <Link href={`/`} className="view-button">동영상으로 만들기</Link>
        </div>

        {/* Action Buttons */}
        <EventActions eventId={event} />
      </main>
    </div>
  );
}