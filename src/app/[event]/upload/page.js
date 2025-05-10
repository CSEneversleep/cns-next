"use client";
import { useParams } from "next/navigation";
import { useRef } from "react";

export default function UploadPage() {
  const params = useParams();
  const event = params.event; // Get the dynamic [event] value
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("Selected files:", files); // Handle the selected files
    const fileMetadata = files.map((file) => {
      const metadata = {
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB", // Convert size to KB
        type: file.type,
        lastModified: new Date(file.lastModified).toDateString(),
      };
      return metadata;
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{event}에 추억 올리기</h1>
      <input
        type="text"
        placeholder="익명의 오소리"
        style={{
          display: "block",
          margin: "20px auto",
          padding: "10px",
          width: "80%",
          maxWidth: "400px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <button
        onClick={handleButtonClick}
        style={{
          display: "block",
          margin: "20px auto",
          padding: "10px 20px",
          backgroundColor: "#FFC107",
          color: "#000",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        사진 선택
      </button>
      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}
