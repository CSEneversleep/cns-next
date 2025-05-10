'use client';

import { useState } from 'react';

export default function GetUserTest() {
  const [username, setUsername] = useState('');
  const [result, setResult] = useState('');

  const handleGetUser = async () => {
    const res = await fetch('/api/user/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🔍 Get User Test</h1>
      <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
      <button onClick={handleGetUser}>Get User</button>
      <pre>{result}</pre>
    </div>
  );
}