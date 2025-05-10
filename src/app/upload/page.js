"use client";
import { useState } from "react";

export default function MultiFileUploadForm() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.uploadedFiles ? "Upload successful!" : "Upload failed");
  };

  return (
    <div style={{ padding: "200px" }}>
      <h1> Upload one or more files </h1>
      <input type="file" multiple onChange={handleChange} />
      <button type="button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}
