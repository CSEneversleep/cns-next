// @/app/page.js

import Link from 'next/link';
import '@/styles/index.css';

export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <h1 className="logo">afterglow</h1>
        <nav className="nav">
          <Link href="/" className="link">메인화면</Link>
          <Link href="/memories" className="link">추억보기</Link>
        </nav>
      </header>

      <main className="main">
        <Link href="/make" className="button">
          새로운 추억 만들기
        </Link>
      </main>
    </div>
  );
}