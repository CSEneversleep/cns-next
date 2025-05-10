// @/app/page.js

import NavBar from '@/app/components/NavBar';
import '@/styles/index.css';
// Styles
import '@/styles/global.css';

export default function Home() {
  return (
    <div id="whole-container">
      <NavBar />
      <main className="main">
        <a href="/make" className="wide-button">
          새로운 추억 만들기
        </a>
      </main>
    </div>
  );
}