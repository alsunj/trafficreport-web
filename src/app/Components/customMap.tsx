import React, { useState, useEffect } from "react";
import { Map, Marker, AdvancedMarker, MapMouseEvent } from "@vis.gl/react-google-maps";
import Button from "./button";
import VehicleViolationForm from "../Forms/vehicleViolation";
import { VehicleViolationService } from "../services/VehicleViolationService";
import CommentForm from "../Forms/CommentForm";
import VehicleViolationsById from "../Forms/vehicleViolationbyID";
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from "@/app/Components/sidebar";
import EvidenceForm from "../Forms/EvidenceForm";
import AdditionalVehicleForm from "../Forms/AdditionalVehicleForm";


export interface IExistingVehicleViolations {
  id: string;
  lat: number;
  lng: number;
}


const endpoint = "VehicleViolation/GetVehicleViolations";
const vehicleViolationService = new VehicleViolationService(endpoint);

const CustomMap: React.FC<{ refreshMap: () => void }> = ({ refreshMap }) => {
  const [markerLocation, setMarkerLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [existingVehicleViolations, setExistingVehicleViolations] = useState<IExistingVehicleViolations[] | null>(null);
  const [showVehicleCreateForm, setVehicleViolationCreateForm] = useState(false);
  const [showVehicleViolationsById, setShowVehicleViolationsById] = useState(false);
  const [selectedViolationId, setSelectedViolationId] = useState<string | null>(null);



  const [showEvidenceForm, setShowEvidenceForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showAdditionalVehicleForm, setShowAdditionalVehicleForm] = useState(false);
  const [parentCommentId, setParentCommentId] = useState<string | null>(null);

  const toggleEvidenceForm = () => {
    setShowEvidenceForm(prev => !prev); // Toggle the state
    setShowVehicleViolationsById(false);

  };

  const toggleCommentForm = (ParentCommentId?: string) => {
    setShowCommentForm(prev => !prev); // Toggle the state
    setShowVehicleViolationsById(false);
    
    if (ParentCommentId !== undefined) {
      setParentCommentId(ParentCommentId); // If ParentCommentId is neither null nor undefined, set the state
    } 
    else {
      setParentCommentId(null); // Otherwise, explicitly set it to null
    }
    
    console.log(parentCommentId);
  };

  const toggleAdditionalVehicleForm = () => {
    setShowAdditionalVehicleForm(prev => !prev); // Toggle the state
    setShowVehicleViolationsById(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const fetchedVehicleViolations = await vehicleViolationService.getAll();
        const transformedVehicleViolations: IExistingVehicleViolations[] = fetchedVehicleViolations.map(vehicleViolation => {
          const [lat, lng] = vehicleViolation.coordinates.split(';').map(Number);
          return {
            id: vehicleViolation.id || '',
            lat,
            lng
          };
        });
        setExistingVehicleViolations(transformedVehicleViolations);

      } catch (error) {
        console.error("Error fetching vehicle violations:", error);
      }
    };

    fetchData();
  }, [refreshMap]);






  const handleMapDblClick = (event: MapMouseEvent) => {
    const { lat, lng } = event.detail.latLng || { lat: 0, lng: 0 };
    setMarkerLocation({ lat, lng });
  };

  const handleExistingMarkerClick = (id: string) => () => {
    setSelectedViolationId(id);
    setShowVehicleViolationsById(true);
  };

  const handleMapRefresh = () => {
    refreshMap();
  };
  const handleToggleVehicleViolationsById = () => {
    setShowVehicleViolationsById(!showVehicleViolationsById);
  };

  const SubmitAndCloseVehicleVCreateForm = () => {
    setVehicleViolationCreateForm(false);
    refreshMap();
  }

  const closeVehicleVCreateForm = () => {
    setVehicleViolationCreateForm(false);
  }
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
  const crashicon = "https://cdn-icons-png.flaticon.com/512/1576/1576488.png"

  const randomImageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb9UGESK6l_GZCNxF1Ul5G8pg6mgJIHXhYflYKMTg7Mw&s";

  return (
    <div style={{ height: "98vh", position: "relative" }}>
      <Map defaultZoom={14} defaultCenter={{ lat: 59.39552664613792, lng: 24.671705895803086 }} disableDefaultUI disableDoubleClickZoom onDblclick={handleMapDblClick} mapId={"5588886"}>
        <div style={{ position: "absolute", top: "20px", left: "20px", zIndex: 999 }}>
          <Sidebar />
        </div>
        {existingVehicleViolations?.map(violation => (
          <AdvancedMarker
            key={violation.id}
            position={{ lat: violation.lat, lng: violation.lng }}
            onClick={handleExistingMarkerClick(violation.id)}
          >
            <img src={crashicon} width={50} height={50} />
          </AdvancedMarker>
        ))}
        <Marker position={markerLocation} onClick={handleMarkerClick} />
        {showVehicleCreateForm && (
          <div className="centered-div">
            <VehicleViolationForm
              latlng={`${markerLocation!.lat};${markerLocation!.lng}`}
              onCancel={closeVehicleVCreateForm}
              onSubmit={SubmitAndCloseVehicleVCreateForm}
            />
          </div>

        )}
        {showVehicleViolationsById && selectedViolationId && (<div className="centered-div">
          <VehicleViolationsById
            vehicleViolationId={selectedViolationId}
            showVehicleViolationsById={showVehicleViolationsById}
            onSubmit={handleMapRefresh}
            onClose={handleToggleVehicleViolationsById}
            toggleEvidenceForm={toggleEvidenceForm}
            toggleCommentForm={toggleCommentForm}
            toggleAdditionalVehicleForm={toggleAdditionalVehicleForm}
          />
        </div>
        )}
        {showEvidenceForm && selectedViolationId && (<div className="centered-div">
          <EvidenceForm
            vehicleViolationId={selectedViolationId}
            onSubmit={toggleEvidenceForm}
          />

        </div>
        )}
        {showCommentForm && selectedViolationId && (
          <div className="centered-div">
            <CommentForm onSubmit={refreshMap}
              ParentCommentid={parentCommentId ?? undefined}  // Corrected prop name
              vehicleViolationid={selectedViolationId}
              onCancel={toggleCommentForm}

            />

          </div>
        )}
        {showAdditionalVehicleForm && (<div className="centered-div">
          <AdditionalVehicleForm
            onSubmit={toggleAdditionalVehicleForm}

          />

        </div>
        )}

      </Map>
    </div>
  );
};

export default CustomMap;