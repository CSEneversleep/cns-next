"use client";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

export default function UploadPage() {
  const params = useParams();
  const event = params.event;
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [username, setUsername] = useState("");
  const [imageData, setImageData] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // setImageData(files.map((file) => URL.createObjectURL(file))); // Create object URLs for preview
    setSelectedFiles(files); // Store selected files
    console.log("Selected file:", files);
  };

  const handleUpload = async () => {
    selectedFiles.forEach(async (file) => {
      const reader = new FileReader();
      reader.onload = async () => setImageData(reader.result);
      reader.readAsDataURL(file);

      const body = {
        eventid: event,
        content: imageData,
        metadata: {
          lastModified: new Date(file.lastModified).toLocaleDateString(),
          username: username,
          size: (file.size / 1024).toFixed(2) + " KB", // Convert size to KB
          type: file.type,
        },
      };

      try {
        const response = await fetch("/api/upload", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(body),
        });

        if (response.ok) {
          console.log("File uploaded successfully:", file.name);
        } else {
          console.error("Failed to upload file:", file.name);
          console.log(response);
        }
      } catch (error) {
        console.error("Error uploading file:", file.name, error);
      }
      setSelectedFiles([]); // Clear selected files after upload
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{event}에 추억 올리기</h1>
      <input
        type="text"
        placeholder="익명의 오소리"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        // multiple
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
