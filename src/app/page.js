// @/app/page.js

// Components
import NavBar from '@/app/components/NavBar';
import EventList from '@/app/components/unique/EventList';
// Styles
import '@/styles/index.css';
import '@/styles/global.css';

export default function Home() {
  return (
    <div id="whole-container">
      <NavBar />
      <main className="main">
        <a href="/make" className="wide-button">
          새로운 추억 만들기
        </a>
        <EventList />
      </main>
    </div>
  );
}