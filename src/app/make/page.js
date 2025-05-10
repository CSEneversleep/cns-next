'use client';

// React
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Components
import NavBar from '@/app/components/NavBar';
// Styles
import '@/styles/global.css';

export default function MakePage() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (!title.trim()) return alert('제목을 입력해주세요.');
    setLoading(true);

    try {
      const res = await fetch('/api/make', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventname: title }),
      });

      if (!res.ok) throw new Error(await res.text());

      const { id } = await res.json();
      router.push(`/${id}`);
    } catch (err) {
      alert(`생성 실패: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="whole-container">
      <NavBar />
      <main className="main">
        <input
          className="wide-input"
          type="text"
          placeholder="제 3회 SKYST"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <button className="wide-button" onClick={handleCreate} disabled={loading}>
          {loading ? '생성 중...' : '새로운 추억 만들기'}
        </button>
      </main>
    </div>
  );
}