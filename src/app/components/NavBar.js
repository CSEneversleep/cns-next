// @/components/NavBar.js

import Link from 'next/link';
import '@/styles/components/navbar.css';

export default function NavBar() {
  return (
    <header id="navBar">
      <h1 className="logo">afterglow</h1>
      <nav className="nav">
        <Link href="/" className="link">메인화면</Link>
        <Link href="/memories" className="link">추억보기</Link>
      </nav>
    </header>
  );
}