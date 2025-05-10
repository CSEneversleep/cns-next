'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [imageData, setImageData] = useState('');
  const [title, setTitle] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageData(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventid: 'temp',
          content: imageData,
          metadata: { title },
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setResult(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🖼️ 이미지 업로드</h1>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br />
      <input
        type="text"
        placeholder="제목 입력"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <button onClick={handleUpload}>업로드</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>업로드 성공</h2>
          <p><strong>제목:</strong> {result.title}</p>
          <p><strong>타입:</strong> {result.contentType}</p>
          <img src={result.src} alt={result.title} style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
}
