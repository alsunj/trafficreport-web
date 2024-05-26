import React, { useState, useEffect } from "react";
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
import type { IVehicleViolation } from "../types/IViolations";
import { VehicleViolationService } from "../services/VehicleViolationService";
import VehicleViolationsById from "../Forms/vehicleViolationbyID";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AlertHeading } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import Sidebar from "@/app/Components/sidebar";


export interface IExistingVehicleViolations
{
    id: string;
    lat: number;
    lng: number;
}


const endpoint = "https://alsunjtrafficreport.azurewebsites.net/api/v1/violations/VehicleViolation/GetVehicleViolations";
const vehicleViolationService = new VehicleViolationService(endpoint);

const CustomMap: React.FC = () => {
  const [markerLocation, setMarkerLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [existingVehicleViolations, setExistingVehicleViolations] = useState<IExistingVehicleViolations[] | null>(null);
;
useEffect(() => {
  const fetchData = async () => {
      try {

          const fetchedVehicleViolations: IVehicleViolation[] = await vehicleViolationService.getAll();
          const transformedVehicleViolations: IExistingVehicleViolations[] = fetchedVehicleViolations.map(vehicleViolation => {
            const [lat, lng] = vehicleViolation.coordinates.split(';').map(Number);
            return {
              id: vehicleViolation.id || '',
              lat,
              lng
            };
          });
          if (setExistingVehicleViolations) {
            setExistingVehicleViolations(transformedVehicleViolations);
          }
      } catch (error) {
          console.error("Error fetching vehicle violations:", error);
      }
  };

  fetchData();
}, [setExistingVehicleViolations]);




const [showVehicleForm, setShowVehicleForm] = useState(false);

const [showVehicleCreateForm,setVehicleViolationCreateForm] = useState(false);
const [selectedViolationId, setSelectedViolationId] = useState<string | null>(null);


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
  // Handle form submission logi  here
  setShowVehicleForm(false); // Close the form after submission
};

const handleExistingMarkerClick = (id: string) => () => {
  alert(`Marker with id ${id} clicked`);
  setSelectedViolationId(id);
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
  const crashicon= "https://cdn-icons-png.flaticon.com/512/1576/1576488.png"

  const randomImageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb9UGESK6l_GZCNxF1Ul5G8pg6mgJIHXhYflYKMTg7Mw&s";

  return (
    <div style={{ height: "98vh", position: "relative" }}>
        <Sidebar></Sidebar>
      <Map
        defaultZoom={14}
        defaultCenter={{ lat: 59.39552664613792, lng: 24.671705895803086 }}
        disableDefaultUI
        disableDoubleClickZoom
        onDblclick={handleMapDblClick}
        mapId={"5588886"}

      >
       {existingVehicleViolations?.map(violation => (
        <AdvancedMarker
          key={violation.id}
          position={{ lat: violation.lat, lng: violation.lng }}
          onClick={handleExistingMarkerClick(violation.id)}
          >
           <img src= {crashicon} width={50} height={50} />
        </AdvancedMarker>
      ))}

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
         {selectedViolationId && (
          <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 999,
          }}
        >
         
        <VehicleViolationsById id={selectedViolationId} />
        </div>
      )}
      </Map>
    </div>
  );
};

export default CustomMap;