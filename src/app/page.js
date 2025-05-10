// @/app/page.js

import NavBar from '@/app/components/NavBar';
import '@/styles/index.css';

export default function Home() {
  return (
    <div className="container">
      <NavBar />
      <main className="main">
        <a href="/make" className="button">
          새로운 추억 만들기
        </a>
      </main>
    </div>
  );
}