// @/app/components/unique/event/UploadSection.js

'use client';

import { useRef, useState } from 'react';
import '@/styles/global.css';
import '@/styles/event.css';

export default function UploadSection({ title, event }) {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [username, setUsername] = useState('');

  const placeholder = '익명의 오소리';

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const handleUpload = async () => {
    const finalUsername = username.trim() || placeholder;

    if (selectedFiles.length === 0) {
      alert('사진을 선택해주세요.');
      return;
    }

    try {
      for (const file of selectedFiles) {
        const reader = new FileReader();

        // FileReader는 비동기라 Promise로 감쌈
        const base64DataUrl = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const payload = {
          eventid: event,
          content: base64DataUrl,
          metadata: { title: finalUsername },
        };

        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`업로드 실패 (${file.name})`);
        }
      }

      alert('모든 파일 업로드 완료!');
      setSelectedFiles([]);
      setUsername('');
    } catch (err) {
      console.error(err);
      alert('업로드 중 에러 발생');
    }
  };

  return (
    <div id="upload-section">
      <h1>{title}에 추억 올리기</h1>
      <main className="main">
        <input
          type="text"
          placeholder={placeholder}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="wide-input"
        />

        <button
          onClick={handleButtonClick}
          className={`wide-button ${selectedFiles.length > 0 ? 'white-button' : ''}`}
        >
          사진 선택 ({selectedFiles.length}장)
        </button>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {selectedFiles.length > 0 && (
          <button
            onClick={handleUpload}
            className="wide-button"
          >
            업로드
          </button>
        )}
      </main>
    </div>
  );
}