'use client';

import { useState } from 'react';

export default function UploadTestPage() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result); // Data URL
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !image) {
      alert('이미지와 제목을 모두 입력해주세요.');
      return;
    }

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify({
        username: 'kms',
        folder: 'test',
        content: image,
        metadata: { title },
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    setResult(json);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>서버 업로드 테스트</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <br /><br />
        <button type="submit">업로드</button>
      </form>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h3>업로드 결과</h3>
          <img src={result.src} alt="uploaded" width={200} />
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
