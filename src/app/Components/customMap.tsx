import React, { useState } from "react";
import { Map, Marker, AdvancedMarker, MapMouseEvent } from "@vis.gl/react-google-maps";
import Button from "./button";
import VehicleForm from "../Forms/vehicleForm";
import ViolationForm from "../Forms/violationForm";
import VehicleViolationForm from "../Forms/vehicleViolation";
import AdditionalVehicleForm from "../Forms/AdditionalVehicleForm";
import EvidenceForm from "../Forms/EvidenceForm";
import mainForm from "../Forms/EvidenceForm";
import VehicleViolations from "../Forms/vehicleViolations";
import VehicleList from "../Forms/VehicleList";
import { ViolationContext } from "../store/violationStore";
import 'bootstrap/dist/css/bootstrap.min.css';


export interface IExistingVehicleViolations
{
    id: string;
    lat: number;
    lng: number;
}

const [vehicles, setVehicles] = useState<IExistingVehicleViolations[] | null>(null);


const CustomMap: React.FC = () => {
  const [markerLocation, setMarkerLocation] = useState<{
  lat: number;
  lng: number;
}>();




const [showVehicleForm, setShowVehicleForm] = useState(false);

const [showVehicleCreateForm,setVehicleViolationCreateForm] = useState(false);

const handleButtonClick = () => {
  setShowVehicleForm(true);
};

const handleMapDblClick = (event: MapMouseEvent) => {
  const { lat, lng } = event.detail.latLng || { lat: 0, lng: 0 };
  setMarkerLocation({ lat, lng });
};
const handleCloseForm = () => {
  setShowVehicleForm(false);
};

const handleSubmitForm = () => {
  // Handle form submission logic here
  setShowVehicleForm(false); // Close the form after submission
};

const handleMarkerClick = () => {
  if (markerLocation) { // Check if markerLocation is defined
    const confirmation = window.confirm("Would you like to create a vehicle violation on set marker?");
    if (confirmation) {
      const latlng = markerLocation.lat.toString() + ";" + markerLocation.lng.toString();
      setVehicleViolationCreateForm(true);

      
      alert("Creating vehicle violation..." + latlng);
    } else {
      alert("Vehicle violation creation canceled.");
    }
  } else {
    alert("Marker location is not set.");
  }
};

  const randomImageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb9UGESK6l_GZCNxF1Ul5G8pg6mgJIHXhYflYKMTg7Mw&s";

  return (
    <div style={{ height: "98vh", position: "relative" }}>
      <Map
        defaultZoom={14}
        defaultCenter={{ lat: 59.39552664613792, lng: 24.671705895803086 }}
        disableDefaultUI
        disableDoubleClickZoom
        onDblclick={handleMapDblClick} 
      >
        <Marker position={markerLocation} onClick={handleMarkerClick} />
        <div
          style={{ position: "absolute", top: "20px", left: "20px", zIndex: 999 }}
        >
          <Button onClick={handleButtonClick} imageUrl={randomImageUrl} />
        </div>
        {showVehicleCreateForm && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 999,
            }}
          >
        <VehicleViolationForm 
              latlng={`${markerLocation!.lat};${markerLocation!.lng}`} 
              onCancel={handleCloseForm} 
              onSubmit={handleSubmitForm} 
            />
          </div>
          
        )}
      </Map>
    </div>
  );
};

export default CustomMap;