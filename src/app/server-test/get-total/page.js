// @/app/server-test/get-all/page.js

'use client';

import { useState } from 'react';

export default function GetAllImageTest() {
  const [result, setResult] = useState(null);
  const [username, setUsername] = useState('');

  const fetchImages = async () => {
    const res = await fetch('/api/get-total', {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📦 Get All Images</h1>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchImages}>불러오기</button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}