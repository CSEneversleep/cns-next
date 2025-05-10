"use client";
import { useState } from "react";

export default function MultiFileUploadForm() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    if (files) {
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleUpload = async () => {
    console.log(selectedFiles);
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
      <br />
      <button type="button" onClick={handleUpload}>
        Upload
      </button>
      {preview && (
        <div>
          <h2>Preview:</h2>
          <img
            src={preview}
            alt="Preview"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      )}
    </div>
  );
}
