import EXIF from "exif-js"; // Add this import

export default function LoadImage({
  setSelectedFiles,
  setPreviews,
  setMetadata,
}) {
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
  return (
    <div>
      <h1> Upload one or more files </h1>
      <input type="file" multiple onChange={handleChange} />
    </div>
  );
}
