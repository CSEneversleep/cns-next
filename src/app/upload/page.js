"use client";
import { useState } from "react";
import SingleImageShow from "./SingleImage";
import MultipleImageShow from "./MultipleImage";
import EXIF from "exif-js"; // Add this import

export default function MultiFileUploadForm() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]); // Store multiple previews
  const [metadata, setMetadata] = useState([]); // Store metadata for each file

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Generate previews for all selected files
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);

    // Extract metadata for each file
    const fileMetadata = files.map((file) => {
      const metadata = {
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB", // Convert size to KB
        type: file.type,
        lastModified: new Date(file.lastModified).toDateString(),
      };

      // Extract GPS metadata if the file is an image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function () {
          EXIF.getData(file, function () {
            const gpsLat = EXIF.getTag(this, "GPSLatitude");
            const gpsLon = EXIF.getTag(this, "GPSLongitude");
            if (gpsLat && gpsLon) {
              metadata.location = {
                latitude: gpsLat,
                longitude: gpsLon,
              };
            }
          });
        };
        reader.readAsArrayBuffer(file);
      }

      return metadata;
    });

    setMetadata(fileMetadata);
  };

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
      <h1> Upload one or more files </h1>
      <input type="file" multiple onChange={handleChange} />
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
