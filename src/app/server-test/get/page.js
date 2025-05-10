// @/app/server-test/get-all/page.js

'use client';

import { useState } from 'react';

export default function GetImageTest() {
  const [username, setUsername] = useState('');
  const [folder, setFolder] = useState('');
  const [filename, setFilename] = useState('');
  const [image, setImage] = useState(null);

  const fetchImage = async () => {
    const res = await fetch('/api/get', {
      method: 'POST',
      body: JSON.stringify({ username, folder, filename }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setImage(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🔍 Get Single Image</h1>
      <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="folder" value={folder} onChange={(e) => setFolder(e.target.value)} />
      <input placeholder="filename" value={filename} onChange={(e) => setFilename(e.target.value)} />
      <button onClick={fetchImage}>검색</button>

      {image && image.src && (
        <div style={{ marginTop: 20 }}>
          <h3>{image.title}</h3>
          <img src={image.src} width={200} />
          <pre>{JSON.stringify(image, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
