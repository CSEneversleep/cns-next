"use client";
import { useState } from "react";
import SingleImageShow from "./SingleImage";
import MultipleImageShow from "./MultipleImage";
import LoadImage from "./LoadImage";

export default function MultiFileUploadForm() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]); // Store multiple previews
  const [metadata, setMetadata] = useState([]); // Store metadata for each file

  // const handleUpload = async () => {
  //   console.log(selectedFiles);
  //   const formData = new FormData();
  //   selectedFiles.forEach((file) => formData.append("files", file));

  //   const res = await fetch("/api/upload", {
  //     method: "POST",
  //     body: formData,
  //   });

  //   const data = await res.json();
  //   alert(data.uploadedFiles ? "Upload successful!" : "Upload failed");
  // };

  return (
    <div style={{ padding: "200px" }}>
      <LoadImage
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        setPreviews={setPreviews}
        setMetadata={setMetadata}
      />
      <br />
      {selectedFiles.length === 0 ? null : selectedFiles.length === 1 ? (
        <SingleImageShow image={previews[0]} metadata={metadata[0]} />
      ) : (
        <MultipleImageShow images={previews} metadata={metadata} />
      )}
      {/* {previews.length > 0 && (
        <div>
          <h2>Previews:</h2>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {previews.map((preview, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <p>{metadata[index]?.name}</p>
                <p>{metadata[index]?.size}</p>
                <p>{metadata[index]?.type}</p>
                <p>{metadata[index]?.lastModified}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <button type="button" onClick={handleUpload}>
        Upload
      </button> */}
    </div>
  );
}
