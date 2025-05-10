// @/app/[event]/upload/page.js

// Components
import NavBar from '@/app/components/NavBar';
import UploadSection from '@/app/components/unique/event/UploadSection';
// Utils
import { getEvent } from '@/utils/firebase/event';

export default async function EventUploadPage({ params }) {
  const { event } = await params;
  const eventData = await getEvent(event);
  const title = eventData?.eventname || '이벤트 없음';

  return (
    <div id="whole-container">
      <NavBar />
      <UploadSection title={title} event={event} />
    </div>
  );
}