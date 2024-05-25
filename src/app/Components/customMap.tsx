import React, { useState } from "react";
import { Map, Marker, AdvancedMarker } from "@vis.gl/react-google-maps";
import Button from "./button";
import VehicleForm from "../Forms/vehicleForm";
import ViolationForm from "../Forms/violationForm";
import VehicleViolationForm from "../Forms/vehicleViolation";
import AdditionalVehicleForm from "../Forms/AdditionalVehicleForm";
import EvidenceForm from "../Forms/EvidenceForm";
import mainForm from "../Forms/EvidenceForm";
import VehicleViolations from "../Forms/vehicleViolations";
import VehicleList from "../Forms/VehicleList";
import 'bootstrap/dist/css/bootstrap.min.css';


const CustomMap = () => {
  const [markerLocation, setMarkerLocation] = useState({
    lat: 59.39491,
    lng: 24.67178,
  });

  const [showVehicleForm, setShowVehicleForm] = useState(false);

  const handleButtonClick = () => {
    setShowVehicleForm(true);
  };

  const handleMarkerClick = () => {
    alert("Marker clicked!");
  };

  const handleVehicleSubmit = () => {
    alert("Form submitted!");
  };

  const randomImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb9UGESK6l_GZCNxF1Ul5G8pg6mgJIHXhYflYKMTg7Mw&s"; // Example URL for a random image

  return (
    <div style={{ height: "98vh", position: "relative" }}>
      <Map
        style={{ borderRadius: "20px" }}
        defaultZoom={13}
        defaultCenter={markerLocation}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        <Marker position={markerLocation} onClick={handleMarkerClick} >
        </Marker>
        <div style={{ position: "absolute", top: "20px", left: "20px", zIndex: 999 }}>
          <Button onClick={handleButtonClick} imageUrl={randomImageUrl} />
        </div>
        
        {showVehicleForm && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 999 }}>
            <VehicleViolations />
          </div>       
          )}
        </Map>
    </div>
  );
};

export default CustomMap;
