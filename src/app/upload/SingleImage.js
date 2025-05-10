import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function InputField({ label, value, setValue, placeholder }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <label>
        {label}:
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </label>
    </div>
  );
}
function LocationSelector({ setLatitude, setLongitude }) {
  useMapEvents({
    click(e) {
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
    },
  });
  return null;
}

export default function SingleImageShow({ image, metadata }) {
  console.log(metadata);

  // Set default values from metadata prop
  const [folder, setFolder] = useState(metadata?.folder || "");
  const [title, setTitle] = useState(metadata?.name || "");
  const [description, setDescription] = useState(metadata?.description || "");
  const [peoples, setPeoples] = useState([]);
  const [latitude, setLatitude] = useState(metadata?.latitude || 37.413294); // Default to San Francisco
  const [longitude, setLongitude] = useState(
    metadata?.longitude || 127.0016985
  );

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePeopleChange = (index, value) => {
    const updatedPeoples = [...peoples];
    updatedPeoples[index].name = value;
    setPeoples(updatedPeoples);
  };

  const addPerson = () => {
    setPeoples([...peoples, { name: "" }]);
  };

  const removePerson = (index) => {
    const updatedPeoples = peoples.filter((_, i) => i !== index);
    setPeoples(updatedPeoples);
  };

  const handleSave = () => {
    const updatedMetadata = {
      folder,
      title,
      description,
      peoples,
      latitude,
      longitude,
    };
    console.log("Updated Metadata:", updatedMetadata);
    alert("Metadata saved!");
  };

  return (
    <div style={{ padding: "200px" }}>
      <h1> Uploaded Image </h1>
      <img
        src={image}
        alt="Uploaded"
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <InputField
        label="Folder"
        value={folder}
        setValue={setFolder}
        placeholder="Enter folder name"
      />
      <InputField
        label="Title"
        value={title}
        setValue={setTitle}
        placeholder="Enter title"
      />
      <InputField
        label="Description"
        value={description}
        setValue={setDescription}
        placeholder="Enter description"
      />
      <div style={{ marginTop: "20px" }}>
        <h3>Select Location:</h3>
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latitude, longitude]} />
          <LocationSelector
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        </MapContainer>
        <p>
          Selected Location: Latitude: {latitude}, Longitude: {longitude}
        </p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>People:</h3>
        {peoples.map((person, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={person.name}
              onChange={(e) => handlePeopleChange(index, e.target.value)}
              placeholder={`Person ${index + 1}`}
              style={{ padding: "5px", marginRight: "10px" }}
            />
            <button
              type="button"
              onClick={() => removePerson(index)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addPerson}
          style={{
            marginTop: "10px",
            padding: "5px 10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Person
        </button>
      </div>
      <button
        type="button"
        onClick={handleSave}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Upload
      </button>
    </div>
  );
}
