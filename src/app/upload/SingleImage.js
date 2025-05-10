import { useState, useEffect } from "react";
import MapView from "./MapView";

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

export default function SingleImageShow({ image, metadata }) {
  console.log(metadata);

  // Set default values from metadata prop
  const [folder, setFolder] = useState(metadata?.folder || "");
  const [title, setTitle] = useState(metadata?.name || "");
  const [description, setDescription] = useState(metadata?.description || "");
  const [peoples, setPeoples] = useState([]);
  const [latitude, setLatitude] = useState(
    metadata?.latitude || 37.565643683342
  ); // Default to a fallback location
  const [longitude, setLongitude] = useState(metadata?.longitude || 126.97722);
  const [address, setAddress] = useState(""); // State to store the address
  const [showMap, setShowMap] = useState(false); // State to toggle map visibility

  // useEffect(() => {
  //   // Use Geolocation API to get the user's current location
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setLatitude(position.coords.latitude);
  //         setLongitude(position.coords.longitude);
  //       },
  //       (error) => {
  //         console.error("Error fetching location:", error);
  //       }
  //     );
  //   }
  // }, []);

  useEffect(() => {
    // Fetch address using reverse geocoding whenever latitude or longitude changes
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        setAddress(data.display_name || "Address not found");
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("Error fetching address");
      }
    };

    fetchAddress();
  }, [latitude, longitude]);

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

  const toggleMap = () => {
    setShowMap(!showMap);
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
        <h3>Location:</h3>
        <button
          type="button"
          onClick={toggleMap}
          style={{
            marginBottom: "10px",
            padding: "5px 10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {showMap ? "Hide Map" : "Select Location"}
        </button>
        {showMap && (
          <MapView
            latitude={latitude}
            longitude={longitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        )}
        <p>Selected Address: {address}</p>
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
