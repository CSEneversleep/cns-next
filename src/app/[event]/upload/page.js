"use client";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

export default function UploadPage() {
  const params = useParams();
  const event = params.event; // Get the dynamic [event] value
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files); // Store selected files
    console.log("Selected files:", files);
  };

  const handleUpload = async () => {
    selectedFiles.forEach(async (file) => {
      const payload = {
        eventid: event,
        content: file,
        metadata: "what is metadata",
      };
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: payload,
        });

        if (response.ok) {
          console.log("Files uploaded successfully");
          setSelectedFiles([]); // Clear selected files after upload
        } else {
          console.error("Failed to upload files");
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      }
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
      {selectedFiles.length > 0 && (
        <button
          onClick={handleUpload}
          style={{
            display: "block",
            margin: "20px auto",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          업로드
        </button>
      )}
    </div>
  );
}
