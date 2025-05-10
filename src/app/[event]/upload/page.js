'use client';

// Next
import { useParams } from 'next/navigation';
// React
import { useRef, useState } from 'react';
// Component
import NavBar from '@/app/components/NavBar';
// Style (CSS)
import '@/styles/global.css';
import '@/styles/event.css'; 

export default function UploadPage() {
  const { event } = useParams();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState('');

  const placeholder = '익명의 오소리';

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    const finalUsername = username.trim() || placeholder;
    if (!selectedFile) {
      alert('사진을 선택해주세요.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64DataUrl = reader.result;

      const payload = {
        eventid: event,
        content: base64DataUrl,
        metadata: {
          title: finalUsername,
        },
      };

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          alert('업로드 완료!');
          setSelectedFile(null);
          setUsername('');
        } else {
          alert('업로드 실패');
        }
      } catch (err) {
        console.error(err);
        alert('에러 발생');
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <div id="whole-container">
      <NavBar />
      <div id="upload-section">
        <h1>{event}에 추억 올리기</h1>
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
            className={`wide-button ${selectedFile ? 'white-button' : ''}`}
          >
            사진 선택
          </button>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          {selectedFile && (
            <button
              onClick={handleUpload}
              className="wide-button"
              style={{ marginTop: '1rem' }}
            >
              업로드
            </button>
          )}
        </main>
      </div>
    </div>
  );
}