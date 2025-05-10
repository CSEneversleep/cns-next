'use client';

import { useState } from 'react';

export default function CreateUserTest() {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [folders, setFolders] = useState('');
  const [result, setResult] = useState('');

  const handleCreateUser = async () => {
    const res = await fetch('/api/user/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        fullname,
        folders: folders.split(',').map(f => f.trim()),
      }),
    });

    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>👤 Create User Test</h1>
      <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="fullname" value={fullname} onChange={e => setFullname(e.target.value)} />
      <input placeholder="folders (comma-separated)" value={folders} onChange={e => setFolders(e.target.value)} />
      <button onClick={handleCreateUser}>Create User</button>
      <pre>{result}</pre>
    </div>
  );
}