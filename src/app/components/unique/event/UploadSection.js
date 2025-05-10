// @/app/components/unique/event/UploadSection.js

'use client';

import { useRef, useState } from 'react';
import '@/styles/global.css';
import '@/styles/event.css';

export default function UploadSection({ title, event }) {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [username, setUsername] = useState('');
  const [isUploading, setIsUploading] = useState(false);

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

    setIsUploading(true);

    try {
      // 1. 파일 → base64 인코딩 먼저 병렬 처리
      const dataUrls = await Promise.all(
        selectedFiles.map(file => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve({ name: file.name, dataUrl: reader.result });
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        })
      );

      // 2. base64 → fetch 병렬 처리
      const uploadPromises = dataUrls.map(({ name, dataUrl }) => {
        const payload = {
          eventid: event,
          content: dataUrl,
          metadata: { title: finalUsername },
        };

        return fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).then(response => {
          if (!response.ok) {
            throw new Error(`업로드 실패 (${name})`);
          }
        });
      });

      await Promise.all(uploadPromises);

      alert('모든 파일 업로드 완료!');
      setSelectedFiles([]);
      setUsername('');
    } catch (err) {
      console.error(err);
      alert('업로드 중 에러 발생');
    }

    setIsUploading(false);
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